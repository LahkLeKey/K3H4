import { useCallback, useEffect, useRef } from "react";

type Debounced<T extends (...args: any[]) => any> = ((...args: Parameters<T>) => void) & { cancel: () => void };

// Lightweight debounce helper to avoid external deps
export function useDebouncedCallback<T extends (...args: any[]) => any>(fn: T, wait: number): Debounced<T> {
    const fnRef = useRef(fn);
    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debounced = useCallback((...args: Parameters<T>) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            fnRef.current(...args);
        }, wait);
    }, [wait]);

    const cancel = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => cancel, [cancel]);

    return Object.assign(debounced, { cancel });
}