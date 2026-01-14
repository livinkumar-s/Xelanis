document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (!entry.target.dataset.animated) {
                    setTimeout(() => {
                        entry.target.dataset.animated = 'true';
                    }, 800);
                }
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});