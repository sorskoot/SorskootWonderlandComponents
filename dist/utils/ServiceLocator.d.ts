/**
 * Class decorator to register an instance with the Service Locator when the class is constructed.
 */
declare function register<T extends Constructor<any>>(token: T): T;
/**
 * Class decorator to register an instance of a Wonderland Component with the Service Locator when the class is initialized (init()).
 */
declare function registerComponent<T extends Constructor<any>>(token: T): T;
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
declare function inject<T>(token: Constructor<T>): (target: any, propertyKey: string) => void;
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
declare class SL {
    private static registry;
    /**
     * Register an instance for a constructor token.
     *
     * Logs an error if the token is already registered.
     */
    static register<T>(token: Constructor<T>, instance: T): void;
    /**
     * Retrieve an instance for a constructor token.
     *
     * If not present and the token is not a Wonderland Component class, the locator will attempt to
     * construct and register a default instance (works only for parameterless constructors).
     *
     * Throws if no instance is registered for a Wonderland Component class.
     */
    static get<T>(token: Constructor<T>): T;
    /**
     * Define a lazy property on the target that resolves the requested token from the registry.
     *
     * The injected value is cached on the concrete instance using a non-enumerable property
     * to avoid prototype-level shared caches.
     */
    static inject<T>(target: any, propertyKey: string, token: Constructor<T>): void;
    /**
     * Clear the entire registry.
     *
     * Useful for tests / resetting state.
     */
    static clear(): void;
}
/**
 * Public Service Locator API.
 */
export declare const ServiceLocator: {
    register: typeof register;
    inject: typeof inject;
    registerComponent: typeof registerComponent;
    get: typeof SL.get;
    clear: typeof SL.clear;
};
export {};
