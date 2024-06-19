window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0; // Initial scroll position
    const mainNav = document.getElementById('mainNav'); // Main navigation element
    const headerHeight = mainNav.clientHeight; // Height of the navigation header

    /**
     * Throttle function to limit how often a function can run
     * @param {function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {function} - Throttled function
     */
    const throttle = (func, limit) => {
        let lastFunc; // Last timeout function
        let lastRan; // Last time the function was run
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                // If the function hasn't run yet, run it and set lastRan
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                // Clear the last timeout function
                clearTimeout(lastFunc);
                // Set a new timeout to run the function after the limit
                lastFunc = setTimeout(function() {
                    // If enough time has passed since last run, run the function
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        }
    };

    /**
     * Function to check the scroll position and update the navigation bar's visibility
     */
    const checkScroll = () => {
        const currentTop = window.scrollY; // Current scroll position from the top of the page
        if (currentTop < scrollPos) {
            // If scrolling up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                // If scrolled down more than 0 and navigation is fixed, make it visible
                mainNav.classList.add('is-visible');
            } else {
                // Otherwise, remove visibility and fixed class
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // If scrolling down
            mainNav.classList.remove('is-visible'); // Always remove visibility when scrolling down
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                // If scrolled past the header height and navigation is not fixed, fix it
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop; // Update the scroll position
    };

    // Add scroll event listener with the throttled checkScroll function
    window.addEventListener('scroll', throttle(checkScroll, 100));
});
