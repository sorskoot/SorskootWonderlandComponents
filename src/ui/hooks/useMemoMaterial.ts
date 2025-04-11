import {Material} from '@wonderlandengine/api';
import React, {useMemo} from 'react';
import {MaterialPool} from '../../utils/MaterialPool.js';

/**
 * React hook that returns a memoized material from the pool.
 * This hook prevents unnecessary material creation on component re-renders.
 *
 * @param name - Unique identifier for the material in the pool
 * @param createMaterial - Function that creates the material if it doesn't exist in the pool
 * @param deps - Optional dependency array that will trigger recreation when changed (similar to useMemo deps)
 * @returns The requested material instance from the pool
 */
export const useMemoMaterial = <T extends Material>(
    name: string,
    createMaterial: () => T,
    deps: React.DependencyList = []
): T => {
    return useMemo(() => {
        return MaterialPool.instance.getOrSetMaterial(name, createMaterial);
    }, deps);
};
