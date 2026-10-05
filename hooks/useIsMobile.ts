'use client';

import { useState, useEffect } from 'react';

interface UseIsMobileOptions {
    initialIsMobile: boolean;
    breakpoint?: number;
}

interface UseIsMobileResult {
    isMobile: boolean;
    isTouch: boolean;
}

export function useIsMobile({
    initialIsMobile,
    breakpoint = 768,
}: UseIsMobileOptions): UseIsMobileResult {
    const [isMobile, setIsMobile] = useState(initialIsMobile);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

        const updateMobile = () => {
            setIsMobile(mql.matches);
        };

        const updateTouch = () => {
            setIsTouch(
                window.matchMedia('(pointer: coarse)').matches ||
                navigator.maxTouchPoints > 0
            );
        };

        updateMobile();
        updateTouch();

        mql.addEventListener('change', updateMobile);

        return () => {
            mql.removeEventListener('change', updateMobile);
        };
    }, [breakpoint]);

    return {
        isMobile,
        isTouch,
    };
}