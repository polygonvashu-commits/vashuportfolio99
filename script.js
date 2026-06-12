/* ==========================================================================
   JavaScript Functionality: Vashu Sangwan Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('.navbar');
    
    mobileNavToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
        mobileNavToggle.classList.toggle('active');
        
        // Animated hamburger bars
        const bars = mobileNavToggle.querySelectorAll('.bar');
        if (mobileNavToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('open')) {
                navbar.classList.remove('open');
                mobileNavToggle.classList.remove('active');
                mobileNavToggle.querySelectorAll('.bar').forEach(bar => bar.style.transform = 'none');
                mobileNavToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
            }
        });
    });

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.navbar a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.navbar a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    };
    window.addEventListener('scroll', highlightNav);

    // --- Intersection Observer for Scroll Reveals ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Animated Stats Counter ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const speed = 100; // Alter duration
            const increment = target / speed;

            const updateCount = () => {
                const count = +stat.innerText;
                if (count < target) {
                    stat.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 15);
                } else {
                    stat.innerText = target;
                }
            };
            updateCount();
        });
    };

    const statsSection = document.querySelector('.stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedStats) {
                animateStats();
                animatedStats = true;
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- Skills Filter Category ---
    const categoryButtons = document.querySelectorAll('.skill-tab-btn');
    const skillItems = document.querySelectorAll('.skill-item');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-category');

            skillItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filter === 'all' || itemCategory === filter) {
                    item.style.display = 'flex';
                    // subtle fade-in transition
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // --- Tech Impact / ROI Calculator ---
    const hoursSpentInput = document.getElementById('hours-spent');
    const hoursSpentVal = document.getElementById('hours-spent-val');
    const laborCostInput = document.getElementById('labor-cost');
    const laborCostVal = document.getElementById('labor-cost-val');
    
    const resultHoursEl = document.getElementById('result-hours');
    const resultCashEl = document.getElementById('result-cash');

    const calculateSavings = () => {
        const hoursPerWeek = parseInt(hoursSpentInput.value, 10);
        const hourlyRate = parseInt(laborCostInput.value, 10);

        // Update range value indicators
        hoursSpentVal.innerText = `${hoursPerWeek} hrs`;
        laborCostVal.innerText = `$${hourlyRate}/hr`;

        // Calculate: AI and Automation can typically optimize 80% of manual repetitive tasks
        const weeklySaved = Math.round(hoursPerWeek * 0.8);
        const monthlySaved = Math.round(weeklySaved * 4.3); // average weeks in a month
        const monthlyCashSaved = monthlySaved * hourlyRate;

        // Animate/Render values
        resultHoursEl.innerText = `${monthlySaved} hrs`;
        resultCashEl.innerText = `$${monthlyCashSaved.toLocaleString()}`;
    };

    hoursSpentInput.addEventListener('input', calculateSavings);
    laborCostInput.addEventListener('input', calculateSavings);
    
    // Initial call
    calculateSavings();

    // --- Interactive WhatsApp Contact Form ---
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value;
        const business = document.getElementById('form-biz').value || 'N/A';
        const serviceNeeded = document.getElementById('form-needs').value;
        const msg = document.getElementById('form-msg').value || 'Hello!';

        // Formatting message for WhatsApp API
        const text = `Hi Vashu, I am writing to you from your Portfolio.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Business:* ${encodeURIComponent(business)}%0A*Requirement:* ${encodeURIComponent(serviceNeeded)}%0A*Message:* ${encodeURIComponent(msg)}`;
        
        const waLink = `https://wa.me/919996829482?text=${text}`;
        
        // Open WhatsApp chat window
        window.open(waLink, '_blank');
    });

    // --- Space Canvas Particle Starfield Animation ---
    const canvas = document.getElementById('space-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        let shootingStars = [];
        let numStars = window.innerWidth < 768 ? 60 : 130; // Calibrate for mobile performance
        let speedMultiplier = 0.3;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
            
            // Re-init stars inside new dimensions
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    radius: Math.random() * 1.5 + 0.5,
                    alpha: Math.random(),
                    decay: Math.random() * 0.01 + 0.003,
                    dx: (Math.random() - 0.5) * speedMultiplier,
                    dy: (Math.random() - 0.5) * speedMultiplier
                });
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const addShootingStar = () => {
            if (shootingStars.length < 2) { // Max 2 active shooting stars
                shootingStars.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * (window.innerHeight / 3),
                    length: Math.random() * 80 + 40,
                    speed: Math.random() * 10 + 8,
                    angle: Math.PI / 6 + Math.random() * (Math.PI / 12), // Downward diagonal
                    opacity: 1.0
                });
            }
        };

        const animateStars = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            
            // Draw & Update Stars
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 255, ${star.alpha})`; 
                ctx.fill();

                // Twinkle
                star.alpha += star.decay;
                if (star.alpha > 0.9 || star.alpha < 0.1) {
                    star.decay = -star.decay;
                }

                // Drift
                star.x += star.dx;
                star.y += star.dy;

                // Wraparound
                if (star.x < 0) star.x = window.innerWidth;
                if (star.x > window.innerWidth) star.x = 0;
                if (star.y < 0) star.y = window.innerHeight;
                if (star.y > window.innerHeight) star.y = 0;
            });

            // Draw & Update Shooting Stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                let s = shootingStars[i];
                let tailX = s.x - Math.cos(s.angle) * s.length;
                let tailY = s.y - Math.sin(s.angle) * s.length;

                ctx.beginPath();
                let grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
                grad.addColorStop(0, `rgba(0, 255, 255, ${s.opacity})`);
                grad.addColorStop(0.3, `rgba(168, 85, 247, ${s.opacity * 0.6})`);
                grad.addColorStop(1, 'rgba(13, 20, 35, 0)');
                
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();

                // Move shooting star
                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.opacity -= 0.02; // Fading

                if (s.opacity <= 0 || s.x > window.innerWidth || s.y > window.innerHeight) {
                    shootingStars.splice(i, 1);
                }
            }

            // Spawn shooting stars periodically
            if (Math.random() < 0.008) {
                addShootingStar();
            }

            requestAnimationFrame(animateStars);
        };

        animateStars();
    }

    // --- Modal Popup Controls ---
    const contactModal = document.getElementById('contact-modal');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const closeModalButton = document.querySelector('.modal-close');

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent background scrolling
        });
    });

    const closeModal = () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Close when clicking outside content area
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal();
            }
        });
    }

    // Modal submit handler
    const modalForm = document.getElementById('modal-contact-form');
    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('modal-name').value;
            const business = document.getElementById('modal-biz').value || 'N/A';
            const service = document.getElementById('modal-needs').value;
            const msg = document.getElementById('modal-msg').value || 'Hello Vashu!';

            const text = `Hi Vashu, I am requesting a project quote from your Portfolio Modal Popup.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Business Name:* ${encodeURIComponent(business)}%0A*Service:* ${encodeURIComponent(service)}%0A*Project details:* ${encodeURIComponent(msg)}`;
            const waLink = `https://wa.me/919996829482?text=${text}`;
            
            window.open(waLink, '_blank');
            closeModal();
        });
    }

    // --- Dynamic Scroll Progress Indicator ---
    const progressEl = document.createElement('div');
    progressEl.className = 'scroll-progress-bar';
    document.body.appendChild(progressEl);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressEl.style.width = scrolled + '%';
    });

    // --- FAQ Accordion Controls ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');

        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close other FAQs
            faqItems.forEach(el => {
                if (el !== item) {
                    el.classList.remove('active');
                    el.querySelector('.faq-answer').style.maxHeight = null;
                    el.querySelector('.faq-icon i').className = 'fa-solid fa-plus';
                }
            });

            // Toggle selected FAQ
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.className = 'fa-solid fa-minus';
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = null;
                icon.className = 'fa-solid fa-plus';
            }
        });
    });
});
