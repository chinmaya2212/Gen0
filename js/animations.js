/**
 * Scroll animations using Intersection Observer
 */
document.addEventListener('DOMContentLoaded', () => {
    // Set up the intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that triggers the animation
                entry.target.classList.add('is-visible');

                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Get all elements that need to be animated
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Staggered delay for grid elements
    const staggerElements = document.querySelectorAll('.stagger-in');
    staggerElements.forEach((el, index) => {
        // Base delay depending on the parent container index if grouped
        const delay = (index % 4) * 0.15;
        el.style.transitionDelay = `${delay}s`;
    });

    // Start observing
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
