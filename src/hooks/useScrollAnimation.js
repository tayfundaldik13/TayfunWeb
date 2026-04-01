import { useEffect, useRef } from 'react';

export default function useScrollAnimation(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-visible');
                        entry.target.classList.remove('scroll-hidden');
                    }
                });
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
            }
        );

        // observe the element itself and all children with scroll-hidden
        const children = element.querySelectorAll('.scroll-hidden');
        children.forEach((child) => observer.observe(child));

        if (element.classList.contains('scroll-hidden')) {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, []);

    return ref;
}
