'use client';

import { useEffect, useState } from 'react';

export function usePrimaryInput() {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(pointer: coarse)');

        const update = () => {
            setIsTouch(mediaQuery.matches);
        };

        update();

        mediaQuery.addEventListener('change', update);

        return () => {
            mediaQuery.removeEventListener('change', update);
        };
    }, []);

    return {
        isTouch,
        isMouse: !isTouch,
    };
}