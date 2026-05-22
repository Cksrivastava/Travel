/**
 * Premium Luxury Tourism Website - Andaman & Nicobar Islands
 * Core Client-side Dynamic Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. PRELOADER HANDLING ---
    const preloader = document.getElementById('preloader');

    // Simulate premium resource allocation loading delay / window onload
    const hidePreloader = () => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }
    };

    // Ensure preloader always dismisses safely
    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 2000); // Fallback timeout guarantee


    // --- 3. STICKY NAVBAR & SCROLL HIGHLIGHTS ---
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link:not(.btn-nav)');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Navbar state switch
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility toggle
        if (scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Highlight active nav tab based on window position if on homepage
        if (!document.body.classList.contains('subpage-body')) {
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 150;
                const sectionId = section.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top behavior
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. MOBILE HAMBURGER MENU ---
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('mobile-active');
            // Toggle hamburger icon animation states
            hamburger.classList.toggle('is-active');
        });

        // Close dropdown when picking a link
        const menuLinks = navLinksContainer.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('mobile-active');
                hamburger.classList.remove('is-active');
            });
        });
    }

    // --- 5. INTERSECTION OBSERVER SCROLL REVEAL ENGINE ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional logic: keep observer persistent or unobserve after load
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => elementObserver.observe(el));

    // --- 6. STATS COUNTERS PROGRESSIVE INCREMENT ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const startCounters = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 80; // Speed dynamic frame divisor

            const updateCount = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
    };

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                startCounters();
            }
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // --- 7. FAMOUS BEACHES CATEGORY FILTERING ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const beachCards = document.querySelectorAll('.beach-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update button visual styles
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            beachCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                // Use transform/transition friendly display logic
                if (filterValue === 'all' || filterValue === cardCat) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // --- 8. TESTIMONIALS SLIDING CAROUSEL ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentSlide = 0;
    let autoSlideInterval;

    const goToSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i]?.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                dots[i]?.classList.add('active');
            }
        });
        currentSlide = index;
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });

    const nextSlide = () => {
        const target = (currentSlide + 1) % slides.length;
        goToSlide(target);
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 6000);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    if (slides.length > 0) {
        startAutoSlide();
    }

    // --- 9. MASONRY GALLERY LIGHTBOX MODAL ---
    const galleryItems = document.querySelectorAll('.masonry-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const highResSrc = item.getAttribute('data-src');
            const captionText = item.querySelector('.gallery-overlay span')?.innerText || '';

            if (lightboxImg && lightbox) {
                lightboxImg.src = highResSrc;
                lightboxCaption.innerText = captionText;
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden'; // Lock backdrop scroll
            }
        });
    });

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // --- 10. LUXURY CAB RENTALS & DISTANCE ESTIMATOR ENGINE ---
    // Distance mappings matrix (in kilometers)
    const routesMatrix = {
        airport: {
            corbyn: { dist: 7.5, time: '20 mins', base: 500 },
            radhanagar: { dist: 68.0, time: '2.5 hours', base: 3200 },
            elephant: { dist: 72.0, time: '2.8 hours', base: 3500 },
            laxmanpur: { dist: 54.0, time: '2.0 hours', base: 2800 },
            cellular: { dist: 4.5, time: '12 mins', base: 400 },
            wandoor: { dist: 22.0, time: '45 mins', base: 1200 },
            chidiya: { dist: 25.0, time: '55 mins', base: 1400 },
            baratang: { dist: 100.0, time: '3.5 hours', base: 4500 },
            diglipur: { dist: 300.0, time: '10 hours', base: 12000 }
        },
        jetty: {
            corbyn: { dist: 9.0, time: '25 mins', base: 600 },
            radhanagar: { dist: 62.0, time: '2.2 hours', base: 3000 },
            elephant: { dist: 66.0, time: '2.4 hours', base: 3300 },
            laxmanpur: { dist: 48.0, time: '1.8 hours', base: 2600 },
            cellular: { dist: 3.0, time: '10 mins', base: 350 },
            wandoor: { dist: 24.0, time: '50 mins', base: 1300 },
            chidiya: { dist: 28.0, time: '60 mins', base: 1500 },
            baratang: { dist: 95.0, time: '3.2 hours', base: 4300 },
            diglipur: { dist: 295.0, time: '9.5 hours', base: 11800 }
        },
        city: {
            corbyn: { dist: 6.0, time: '15 mins', base: 450 },
            radhanagar: { dist: 65.0, time: '2.3 hours', base: 3100 },
            elephant: { dist: 69.0, time: '2.6 hours', base: 3400 },
            laxmanpur: { dist: 51.0, time: '1.9 hours', base: 2700 },
            cellular: { dist: 2.0, time: '8 mins', base: 300 },
            wandoor: { dist: 20.0, time: '40 mins', base: 1100 },
            chidiya: { dist: 22.0, time: '50 mins', base: 1300 },
            baratang: { dist: 98.0, time: '3.4 hours', base: 4400 },
            diglipur: { dist: 298.0, time: '9.8 hours', base: 11900 }
        }
    };

    // Vehicular configuration multipliers
    const vehicleMultipliers = {
        scorpio: { mult: 1.0, label: 'Mahindra Scorpio SUV' },
        innova: { mult: 1.25, label: 'Toyota Innova Crysta' },
        swift: { mult: 0.72, label: 'Maruti Suzuki Swift' },
        i10: { mult: 0.7, label: 'Hyundai Grand i10 Nios' },
        wagonr: { mult: 0.68, label: 'Maruti Suzuki Wagon R' },
        tiago: { mult: 0.68, label: 'Tata Tiago' }
    };

    const calcOrigin = document.getElementById('calcOrigin');
    const calcDest = document.getElementById('calcDest');
    const calcCar = document.getElementById('calcCar');

    const resDistance = document.getElementById('resDistance');
    const resDuration = document.getElementById('resDuration');
    const resPrice = document.getElementById('resPrice');

    // Global variable tracking actual calculated active dynamic cab fare
    let currentCalculatedCabFare = 750; // Initial synchronized default

    const recalculateCabFare = () => {
        if (!calcOrigin || !calcDest || !calcCar) return;

        const oVal = calcOrigin.value;
        const dVal = calcDest.value;
        const cVal = calcCar.value;

        const routeData = routesMatrix[oVal]?.[dVal];
        const carData = vehicleMultipliers[cVal];

        if (routeData && carData) {
            // Apply precision mapping
            resDistance.innerText = `${routeData.dist} km`;
            resDuration.innerText = routeData.time;

            const finalFare = Math.round(routeData.base * carData.mult);
            currentCalculatedCabFare = finalFare;
            if (resPrice) {
                resPrice.innerText = 'Available on enquiry';
                resPrice.style.transform = 'scale(1.15)';
                setTimeout(() => resPrice.style.transform = 'scale(1)', 200);
            }

            // Synchronize with the live pricing planner block inside the custom booking tab
            updateLiveBookingSummary();
        }
    };

    if (calcOrigin) {
        calcOrigin.addEventListener('change', recalculateCabFare);
        calcOrigin.addEventListener('input', recalculateCabFare);
    }
    if (calcDest) {
        calcDest.addEventListener('change', recalculateCabFare);
        calcDest.addEventListener('input', recalculateCabFare);
    }
    if (calcCar) {
        calcCar.addEventListener('change', recalculateCabFare);
        calcCar.addEventListener('input', recalculateCabFare);
    }

    // Initial pass-through setup calculation
    recalculateCabFare();

    // Trigger ride intent helper
    const btnBookRideFromCalc = document.getElementById('btnBookRideFromCalc');
    if (btnBookRideFromCalc) {
        btnBookRideFromCalc.addEventListener('click', () => {
            // Pre-select options inside primary form or scroll to reservation panel smoothly
            const chkIncludeCab = document.getElementById('chkIncludeCab');
            if (chkIncludeCab) {
                chkIncludeCab.checked = true;
                updateLiveBookingSummary();
            }

            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Populate active notes context automatically
            const bookNotes = document.getElementById('bookNotes');
            if (bookNotes) {
                const originLabel = calcOrigin.options[calcOrigin.selectedIndex].text;
                const destLabel = calcDest.options[calcDest.selectedIndex].text;
                const carLabel = vehicleMultipliers[calcCar.value].label;
                bookNotes.value = `Requested Private Chauffeured Transit: ${originLabel} to ${destLabel} via ${carLabel}.`;
            }
        });
    }

    // --- 11. DYNAMIC TRIP ESTIMATOR & SECURE BOOKING FORM LOGIC ---
    const bookPackageSelect = document.getElementById('bookPackage');
    const chkIncludeCab = document.getElementById('chkIncludeCab');

    const lblBasePkg = document.getElementById('lblBasePkg');
    const lblAddonCab = document.getElementById('lblAddonCab');
    const lblTotalEst = document.getElementById('lblTotalEst');

    function updateLiveBookingSummary() {
        if (!bookPackageSelect || !lblBasePkg || !lblAddonCab || !lblTotalEst) return;

        // Base package cost extraction
        const baseCost = 0;
        const selectedOptionText = bookPackageSelect.options[bookPackageSelect.selectedIndex].text.split('(')[0].trim();
        lblBasePkg.innerText = selectedOptionText;

        let addonCost = 0;
        if (chkIncludeCab && chkIncludeCab.checked) {
            const activeCarLabel = vehicleMultipliers[calcCar?.value || 'scorpio'].label;
            lblAddonCab.innerText = activeCarLabel;
            lblAddonCab.style.color = 'var(--sunset-deep)';
        } else {
            lblAddonCab.innerText = 'Not Added Yet';
            lblAddonCab.style.color = 'var(--text-secondary)';
        }

        lblTotalEst.innerText = 'Shared after enquiry';
    }

    if (bookPackageSelect) bookPackageSelect.addEventListener('change', updateLiveBookingSummary);
    if (chkIncludeCab) chkIncludeCab.addEventListener('change', updateLiveBookingSummary);

    // Run initial summary map
    updateLiveBookingSummary();

    const WEB3FORMS_ACCESS_KEY = '8043e8d9-e6e8-469e-be4d-011e8c2a3710';

    const submitToWeb3Forms = (fields) => {
        const formData = new FormData();
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);
        Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value || 'Not provided');
        });
        if (fields.email && fields.email.includes('@')) {
            formData.append('cc', fields.email);
            formData.append('reply_to', fields.email);
        }

        return fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
        }).then(response => {
            if (!response.ok) throw new Error('Unable to send form');
            return response.json();
        }).then(data => {
            if (!data.success) throw new Error(data.message || 'Unable to send form');
            return data;
        });
    };

    // Secure submission logic
    const tripBookingForm = document.getElementById('tripBookingForm');
    const formSuccessNotice = document.getElementById('formSuccessNotice');
    const outEmail = document.getElementById('outEmail');
    const btnResetForm = document.getElementById('btnResetForm');

    if (tripBookingForm) {
        tripBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btnSubmit = document.getElementById('btnSubmitBooking');
            const btnTxt = btnSubmit?.querySelector('.btn-txt');
            const btnLoader = btnSubmit?.querySelector('.btn-loader');
            const userEmail = document.getElementById('bookEmail')?.value || 'Guest';
            const bookName = document.getElementById('bookName')?.value?.trim() || 'Not provided';
            const bookPhone = document.getElementById('bookPhone')?.value?.trim() || 'Not provided';
            const bookDate = document.getElementById('bookDate')?.value || 'Not provided';
            const bookDest = document.getElementById('bookDest')?.selectedOptions?.[0]?.text || 'Not provided';
            const bookPackage = document.getElementById('bookPackage')?.selectedOptions?.[0]?.text || 'Not provided';
            const includeCab = document.getElementById('chkIncludeCab')?.checked ? 'Yes' : 'No';
            const bookNotes = document.getElementById('bookNotes')?.value?.trim() || 'No extra requirements provided';

            // Show loading animation state
            if (btnTxt && btnLoader) {
                btnTxt.style.display = 'none';
                btnLoader.style.display = 'inline-block';
            }
            if (btnSubmit) btnSubmit.disabled = true;

            submitToWeb3Forms({
                subject: `New Plan Trip Enquiry - ${bookName}`,
                form_type: 'Plan Trip / Secure Reservation',
                name: bookName,
                email: userEmail,
                phone: bookPhone,
                travel_start_date: bookDate,
                destination: bookDest,
                package_tier: bookPackage,
                include_cab_preference: includeCab,
                special_requirements: bookNotes,
                page: window.location.href
            }).then(() => {
                tripBookingForm.style.display = 'none';
                if (outEmail) outEmail.innerText = userEmail;
                if (formSuccessNotice) {
                    formSuccessNotice.style.display = 'block';
                    formSuccessNotice.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }).catch(() => {
                alert('Unable to send enquiry right now. Please try again or contact us on WhatsApp.');
            }).finally(() => {
                if (btnTxt && btnLoader) {
                    btnTxt.style.display = 'inline-block';
                    btnLoader.style.display = 'none';
                }
                if (btnSubmit) btnSubmit.disabled = false;
            });
        });
    }

    if (btnResetForm) {
        btnResetForm.addEventListener('click', () => {
            if (formSuccessNotice && tripBookingForm) {
                formSuccessNotice.style.display = 'none';
                tripBookingForm.reset();
                tripBookingForm.style.display = 'block';
                updateLiveBookingSummary();
            }
        });
    }

    // --- 12. FAQ ACCORDION ENGINE ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parentItem = question.parentElement;
            const isCurrentlyActive = parentItem.classList.contains('active');

            // Optionally close other accordions for premium clean look
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = null;
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Re-open if it wasn't the one already opened
            if (!isCurrentlyActive) {
                parentItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                const activeAnswer = parentItem.querySelector('.faq-answer');
                if (activeAnswer) {
                    activeAnswer.style.maxHeight = activeAnswer.scrollHeight + 40 + 'px';
                }
            }
        });
    });

    // Handle internal smooth routing behavior adjustments offset helper
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    e.preventDefault();
                    const topOffset = targetEl.offsetTop - 70; // Compensate for sticky sticky navbar height
                    window.scrollTo({
                        top: topOffset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 13. DYNAMIC PACKAGES CATEGORY TOGGLING ---
    const packageTabButtons = document.querySelectorAll('.package-tab-btn');
    const packageCards = document.querySelectorAll('.package-card');

    if (packageTabButtons.length > 0 && packageCards.length > 0) {
        // Initial state validation: show only active category cards smoothly
        const activeInitialCategory = document.querySelector('.package-tab-btn.active')?.getAttribute('data-pkg') || 'couple';
        packageCards.forEach(card => {
            if (card.getAttribute('data-category') === activeInitialCategory) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });

        packageTabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                packageTabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const targetCategory = btn.getAttribute('data-pkg');

                packageCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (targetCategory === 'all' || cardCategory === targetCategory) {
                        card.style.display = 'flex';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // --- 14. SITE-WIDE ENQUIRY MODAL ---
    const createEnquiryModal = () => {
        if (document.getElementById('enquiryModal')) return;

        const modal = document.createElement('div');
        modal.className = 'enquiry-modal';
        modal.id = 'enquiryModal';
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="enquiry-modal__overlay" data-enquiry-close></div>
            <div class="enquiry-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="enquiryTitle">
                <button class="enquiry-modal__close" type="button" aria-label="Close enquiry form" data-enquiry-close>
                    <i class="fas fa-times"></i>
                </button>
                <div class="form-header">
                    <h3 id="enquiryTitle"><i class="fas fa-paper-plane"></i> Enquiry Now</h3>
                    <p>Share your details and our team will contact you shortly.</p>
                </div>
                <form id="siteEnquiryForm" class="booking-form" action="https://api.web3forms.com/submit" method="POST">
                    <input type="hidden" name="access_key" value="8043e8d9-e6e8-469e-be4d-011e8c2a3710">
                    <div class="input-field-group">
                        <label for="enquiryName"><i class="fas fa-user"></i> Full Name *</label>
                        <input type="text" id="enquiryName" name="name" placeholder="Enter your full name" required>
                    </div>
                    <div class="form-row-2">
                        <div class="input-field-group">
                            <label for="enquiryMobile"><i class="fas fa-phone-alt"></i> Mobile / WhatsApp *</label>
                            <input type="tel" id="enquiryMobile" name="mobile" placeholder="+91 XXXXX XXXXX" required>
                        </div>
                        <div class="input-field-group">
                            <label for="enquiryEmail"><i class="fas fa-envelope"></i> Email Address *</label>
                            <input type="email" id="enquiryEmail" name="email" placeholder="name@domain.com" required>
                        </div>
                    </div>
                    <div class="form-row-2">
                        <div class="input-field-group">
                            <label for="enquiryTravelDate"><i class="fas fa-calendar-day"></i> Travel Date</label>
                            <input type="date" id="enquiryTravelDate" name="travel_date">
                        </div>
                        <div class="input-field-group">
                            <label for="enquiryGuests"><i class="fas fa-users"></i> No. of Travelers</label>
                            <input type="number" id="enquiryGuests" name="travelers" min="1" placeholder="1">
                        </div>
                    </div>
                    <div class="input-field-group">
                        <label for="enquiryInterest"><i class="fas fa-map-marked-alt"></i> Interested In</label>
                        <input type="text" id="enquiryInterest" name="interest" placeholder="Package, cab, activity, honeymoon..." readonly>
                    </div>
                    <div class="input-field-group">
                        <label for="enquiryMessage"><i class="fas fa-comment-dots"></i> Other Essential Details</label>
                        <textarea id="enquiryMessage" name="message" rows="3" placeholder="Pickup city, hotel preference, special requirements..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-submit-full">Submit Enquiry</button>
                </form>
                <div id="enquirySuccess" class="form-success-box text-center" style="display: none;">
                    <i class="fas fa-check-circle success-icon"></i>
                    <h4>Enquiry Sent Successfully!</h4>
                    <p>Our team will contact you soon with the right details.</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    };

    const getEnquiryContext = (trigger) => {
        const explicitInterest = trigger?.getAttribute('data-enquiry-interest');
        if (explicitInterest) return explicitInterest;

        if (trigger.id === 'btnBookRideFromCalc' && calcOrigin && calcDest && calcCar) {
            const originLabel = calcOrigin.options[calcOrigin.selectedIndex].text;
            const destLabel = calcDest.options[calcDest.selectedIndex].text;
            const carLabel = vehicleMultipliers[calcCar.value]?.label || calcCar.options[calcCar.selectedIndex].text;
            return `${carLabel}: ${originLabel} to ${destLabel}`;
        }

        const card = trigger.closest('.activity-card, .package-card, .hm-card, .beach-card, .island-card, .tour-card, .route-card, .fleet-card, .flight-assistance-banner, .package-calc-banner, .cab-calculator-box');
        const title = card?.querySelector('h3, h4')?.innerText?.trim();
        return title || trigger.innerText.trim() || document.title;
    };

    const openEnquiryModal = (trigger) => {
        createEnquiryModal();
        const modal = document.getElementById('enquiryModal');
        const interest = document.getElementById('enquiryInterest');
        const form = document.getElementById('siteEnquiryForm');
        const success = document.getElementById('enquirySuccess');

        if (interest && trigger) interest.value = getEnquiryContext(trigger);
        if (form) form.style.display = 'block';
        if (success) success.style.display = 'none';
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        setTimeout(() => document.getElementById('enquiryName')?.focus(), 50);
    };

    const closeEnquiryModal = () => {
        const modal = document.getElementById('enquiryModal');
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    document.querySelectorAll('[data-enquiry-trigger]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openEnquiryModal(trigger);
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('[data-enquiry-close]')) {
            closeEnquiryModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeEnquiryModal();
    });

    document.addEventListener('submit', (e) => {
        if (e.target?.id !== 'siteEnquiryForm') return;
        e.preventDefault();
        const name = document.getElementById('enquiryName')?.value?.trim() || 'Not provided';
        const mobile = document.getElementById('enquiryMobile')?.value?.trim() || 'Not provided';
        const email = document.getElementById('enquiryEmail')?.value?.trim() || 'Not provided';
        const travelDate = document.getElementById('enquiryTravelDate')?.value || 'Not provided';
        const guests = document.getElementById('enquiryGuests')?.value || 'Not provided';
        const interest = document.getElementById('enquiryInterest')?.value?.trim() || 'General enquiry';
        const message = document.getElementById('enquiryMessage')?.value?.trim() || 'No extra details provided';

        const subject = `New Travel Enquiry - ${interest}`;
        const body = [
            'New enquiry received from the website:',
            '',
            `Name: ${name}`,
            `Mobile / WhatsApp: ${mobile}`,
            `Customer Email: ${email}`,
            `Travel Date: ${travelDate}`,
            `No. of Travelers: ${guests}`,
            `Interested In: ${interest}`,
            '',
            'Other Essential Details:',
            message,
            '',
            `Page: ${window.location.href}`
        ].join('\n');

        const submitButton = e.target.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerText = 'Sending...';
        }

        submitToWeb3Forms({
            subject,
            form_type: 'Website Enquiry',
            name,
            mobile,
            email,
            travel_date: travelDate,
            travelers: guests,
            interest,
            message,
            full_details: body,
            page: window.location.href
        })
            .then(() => {
                e.target.style.display = 'none';
                const success = document.getElementById('enquirySuccess');
                if (success) {
                    success.style.display = 'block';
                    success.querySelector('h4').innerText = 'Enquiry Sent Successfully!';
                    success.querySelector('p').innerText = 'Our team will contact you soon with the right details.';
                }
            })
            .catch(() => {
                alert('Unable to send enquiry right now. Please try again or contact us on WhatsApp.');
            })
            .finally(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerText = 'Submit Enquiry';
                }
            });
    });
});
