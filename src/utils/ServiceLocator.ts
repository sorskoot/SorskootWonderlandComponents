/**
 * Determines whether the provided constructor represents a Wonderland Component class.
 *
 * @param token - The constructor function or class to check.
 * @returns True if `token` is the Wonderland Component base or a subclass thereof; otherwise false.
 */
function isComponentClass(token: unknown): boolean {
    if (typeof token !== 'function') return false;
    let proto = (token as Function).prototype;
    while (proto) {
        const ctor = proto.constructor;
        if (ctor && typeof ctor.name === 'string' && ctor.name === '_Component') {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

const ORIGINAL_CLASS = Symbol('original-class');
/**
 * Class decorator to register an instance with the Service Locator when the class is constructed.
 */
function register<T extends Constructor<any>>(token: T): T {
    const Wrapped = class extends token {
        constructor(...args: any[]) {
            super(...args);
            SL.register(token, this); // use original token
        }
    };

    const staticNames = Object.getOwnPropertyNames(token).filter(
        (n) => n !== 'prototype' && n !== 'name' && n !== 'length'
    );

    for (const name of staticNames) {
        try {
            const desc = Object.getOwnPropertyDescriptor(token, name);
            if (desc) Object.defineProperty(Wrapped, name, desc);
        } catch {
            // ignore failures copying some built-ins
        }
    }

    // expose the original constructor for the Service Locator normalisation
    Reflect.defineProperty(Wrapped, ORIGINAL_CLASS, {
        value: token,
        writable: false,
        enumerable: false,
        configurable: false,
    });

    return Wrapped as unknown as T;
}

/**
 * Class decorator to register an instance of a Wonderland Component with the Service Locator when the class is initialized (init()).
 */
function registerComponent<T extends Constructor<any>>(token: T): T {
    if (!isComponentClass(token)) {
        throw new Error(`@registerComponent can only be used on Wonderland Components`);
    }

    const originalInit = token.prototype.init;

    (token.prototype as any).init = function (...args: any[]) {
        SL.register(token, this);
        if (typeof originalInit === 'function') {
            originalInit.apply(this, args);
        }
    };

    return token;
}

/**
 * Property decorator factory to lazily inject a service instance from the Service Locator.
 *
 * When applied to a property, it defines a getter that returns the instance registered
 * for the provided token. The value is cached on first access.
 *
 * Example:
 *  @inject(MyService)
 *  public declare myService: MyService;
 *
 */
function inject<T>(token: Constructor<T>): (target: any, propertyKey: string) => void {
    return function (target: any, propertyKey: string) {
        SL.inject(target, propertyKey, token);
    };
}

/**
 * Constructor type used as a token for the Service Locator.
 *
 * Use the concrete class constructor when registering or requesting services.
 */
type Constructor<T> = new (...args: any[]) => T;

/**
 * Internal Service Locator implementation.
 *
 * - Keeps a registry Map mapping constructor tokens to concrete instances.
 * - Exposes static helper methods used by the public decorators and exported API.
 *
 * Note: This is intentionally simple and synchronous. It expects services to be
 * registered before they are requested; use `register` from an instance `init`
 * or during application bootstrap.
 */
class SL {
    private static registry = new Map<Constructor<any>, any>();

    /**
     * Register an instance for a constructor token.
     *
     * Logs an error if the token is already registered.
     */
    static register<T>(token: Constructor<T>, instance: T): void {
        const normalized = (Reflect.get(token, ORIGINAL_CLASS) as Constructor<T>) || token;
        if (SL.registry.has(normalized)) {
            console.error(`ServiceLocator: ${normalized.name} already registered.`);
        } else {
            SL.registry.set(normalized, instance);
        }
    }

    /**
     * Retrieve an instance for a constructor token.
     *
     * If not present and the token is not a Wonderland Component class, the locator will attempt to
     * construct and register a default instance (works only for parameterless constructors).
     *
     * Throws if no instance is registered for a Wonderland Component class.
     */
    static get<T>(token: Constructor<T>): T {
        const normalized = (Reflect.get(token, ORIGINAL_CLASS) as Constructor<T>) || token;
        let instance = SL.registry.get(normalized) as T | undefined;

        if (!instance) {
            // if it's a plain class (not a Wonderland Component), attempt to auto-construct a singleton
            if (!isComponentClass(normalized)) {
                try {
                    instance = new normalized();
                    // register newly-created singleton so we don't recreate it later
                    SL.registry.set(normalized, instance);
                } catch (err) {
                    throw new Error(
                        `ServiceLocator: Failed to construct ${normalized.name}: ${(err as Error).message}`
                    );
                }
            } else {
                throw new Error(
                    `ServiceLocator: No instance registered for ${normalized.name}`
                );
            }
        }

        return instance as T;
    }

    /**
     * Define a lazy property on the target that resolves the requested token from the registry.
     *
     * The injected value is cached on the concrete instance using a non-enumerable property
     * to avoid prototype-level shared caches.
     */
    static inject<T>(target: any, propertyKey: string, token: Constructor<T>): void {
        const cacheKey = `__service_locator_cache_${propertyKey}`;

        Object.defineProperty(target, propertyKey, {
            get: function (this: any) {
                // if the value is already cached on this instance, return it
                if (Object.prototype.hasOwnProperty.call(this, cacheKey)) {
                    return this[cacheKey];
                }

                const resolved = SL.get(token);

                // cache on the instance as non-enumerable, non-writable
                Object.defineProperty(this, cacheKey, {
                    value: resolved,
                    writable: false,
                    enumerable: false,
                    configurable: true,
                });

                return resolved;
            },
            enumerable: true,
            configurable: true,
        });
    }
    /**
     * Clear the entire registry.
     *
     * Useful for tests / resetting state.
     */
    static clear(): void {
        SL.registry.clear();
    }
}

/**
 * Public Service Locator API.
 */
export const ServiceLocator = {
    register,
    inject: inject,
    registerComponent,
    get: SL.get,
    clear: SL.clear,
};
