/**
 * Additional interactions (Metrics count up + Mouse track glow)
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mouse Tracking Glow Effect for Tiles
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        tile.addEventListener('mousemove', (e) => {
            const rect = tile.getBoundingClientRect();
            // Calculate mouse position relative to the element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set CSS variables for the radial gradient center
            tile.style.setProperty('--mouse-x', `${x}px`);
            tile.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 2. Metrics Counter Animation
    const counters = document.querySelectorAll('.metric__number');
    let hasCounted = false;

    // Use intersection observer to start counting when visible
    const metricsObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                startCounters();
                hasCounted = true;
                observer.disconnect(); // Stop observing after counting
            }
        });
    }, metricsObserverOptions);

    const metricsSection = document.querySelector('.metrics');
    if (metricsSection) {
        countObserver.observe(metricsSection);
    }

    function startCounters() {
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const animate = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Calculate increment increment step
                const inc = target / speed;

                // If count has not reached target
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(animate, 20);
                } else {
                    counter.innerText = target;
                }
            };

            animate();
        });
    }

    // 3. Mannat-style Canvas Network Background
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let particles = [];

        window.addEventListener('resize', () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            init();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 176, 202, 0.6)'; // Capgemini Cyan
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            // Create particles based on screen width
            const density = window.innerWidth < 768 ? 40 : 100;
            for (let i = 0; i < density; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw connecting lines
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        // Opacity based on distance
                        ctx.strokeStyle = `rgba(0, 176, 202, ${0.15 - dist / 800})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        init();
        animate();
    }

    // 4. Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
