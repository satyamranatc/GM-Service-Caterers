/**
 * GM Service Caterers — Production JavaScript Suite
 * Luxury Pure Vegetarian Catering & Royal Banquets (Indore)
 * Modular Architecture: Theme | Modals | Sharing | Enquiry | Animations | Navigation
 */

// ==========================================
// 1. Dynamic Theme & CSS Variable Controller
// ==========================================
function ColorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    var rgb = '#', c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
    }
    return rgb;
}

function initThemeVariables() {
    var themeElem = document.getElementById('themeColor');
    var themecolor = themeElem ? themeElem.value : '#141210';
    var themeElem1 = document.getElementById('themeColor1');
    var themeColor1 = themeElem1 ? themeElem1.value : '#fdfaf3';
    document.documentElement.style.setProperty('--theme-color', themecolor);
    document.documentElement.style.setProperty('--theme-color-light', themeColor1);
    document.documentElement.style.setProperty('--theme-color-gold', '#cba46b');
    document.documentElement.style.setProperty('--theme-color-gold-light', '#dfba73');
    document.documentElement.style.setProperty('--theme-color-bronze', '#8e6328');
    document.documentElement.style.setProperty('--theme-color-emerald', '#1e3f20');
    document.documentElement.style.setProperty('--theme-color-emerald-light', '#2e7d32');
    document.documentElement.style.setProperty('--theme-color-emerald-mint', '#27ae60');
    document.documentElement.style.setProperty('--theme-color-emerald-soft', 'rgba(30, 63, 32, 0.08)');
    document.documentElement.style.setProperty('--theme-color-emerald-border', 'rgba(46, 125, 50, 0.32)');
    document.documentElement.style.setProperty('--theme-color-dark1', '#1a1714');
    document.documentElement.style.setProperty('--theme-color-dark2', '#221e1a');
    document.documentElement.style.setProperty('--theme-color-dark3', '#2a2520');
}

// ==========================================
// 2. Modals (Image Preview & Share Sheet)
// ==========================================
const imageModal = document.getElementById('imageModal');
const shareModal = document.getElementById('shareModal');
const modalImg = document.getElementById('img01');
const captionText = document.getElementById('caption');
const imageModalClose = document.getElementById('imageModalClose');
const shareModalClose = document.getElementById('shareModalClose');

window.addEventListener('click', function (event) {
    if (event.target === imageModal && imageModal) {
        imageModal.style.display = 'none';
    }
    if (event.target === shareModal && shareModal) {
        shareModal.style.display = 'none';
    }
});

function openImageModal(e) {
    if (!imageModal || !modalImg) return;
    imageModal.style.display = 'block';
    modalImg.src = e.src;
    if (captionText) {
        captionText.innerHTML = e.alt || '';
    }
}

if (imageModalClose) {
    imageModalClose.onclick = function () {
        if (imageModal) imageModal.style.display = 'none';
    };
}

function openShareModal(e, title) {
    title = title || 'GM Service Caterers | Luxury Catering';
    if (navigator.share) {
        navigator.share({
            title: title,
            url: window.location.href,
        }).catch(function(err) {
            console.log('Share dismissed or failed:', err);
        });
    } else if (shareModal) {
        shareModal.style.display = 'flex';
    }
}

if (shareModalClose) {
    shareModalClose.onclick = function () {
        if (shareModal) shareModal.style.display = 'none';
    };
}

// ==========================================
// 3. Sharing Integrations (WhatsApp, SMS, etc.)
// ==========================================
function handleCustomWhatsappShare() {
    const inputElem = document.getElementById('whatsapp-input');
    if (!inputElem) return;
    let mobile = inputElem.value.trim().replace(/[^0-9]/g, '');
    if (mobile.length < 10) {
        alert('Please enter a valid 10-digit mobile number');
        inputElem.focus();
        return;
    }
    if (mobile.length === 10) {
        mobile = '91' + mobile;
    }
    const message = encodeURIComponent('Please check GM Service Caterers digital card: ' + window.location.href);
    window.open('https://wa.me/' + mobile + '?text=' + message, '_blank');
}

function handleDirectWhatsappShare(e) {
    const shareUrl = 'https://wa.me/?text=' + encodeURIComponent('Please check GM Service Caterers digital card: ' + window.location.href);
    window.open(shareUrl, '_blank');
}

// ==========================================
// 4. Quick Enquiry WhatsApp Form Handler
// ==========================================
function initEnquiryForm() {
    const form1 = document.getElementById('form1');
    if (!form1) return;

    form1.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = (document.getElementById('txtGuestName')?.value || '').trim();
        const phone = (document.getElementById('txtGuestphoneNumber')?.value || '').trim();
        const email = (document.getElementById('txtGuestEmailId')?.value || '').trim();
        const message = (document.getElementById('txtGuestmessage')?.value || '').trim();

        const fullMessage = 'Hello GM Service Caterers,\n*Name:* ' + name + '\n*Phone:* ' + phone + '\n*Email:* ' + email + '\n*Event Requirements:* ' + message;
        const whatsappNumber = '918109001111';
        const whatsappURL = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(fullMessage);

        window.open(whatsappURL, '_blank');
    });
}

// ==========================================
// 5. Micro-Interactions, Animations & Navigation
// ==========================================
function initAnimationsAndNavigation() {
    // 5.1 Curtain Intro Controller
    const curtain = document.getElementById('brandCurtain');
    if (curtain) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            curtain.remove();
        } else {
            let dismissed = false;
            const dismissCurtain = () => {
                if (dismissed) return;
                dismissed = true;
                curtain.classList.add('curtain-dismissed');
                setTimeout(() => {
                    if (curtain.parentNode) curtain.parentNode.removeChild(curtain);
                }, 600);
            };

            setTimeout(dismissCurtain, 750);
            window.addEventListener('touchstart', dismissCurtain, { passive: true, once: true });
            window.addEventListener('mousedown', dismissCurtain, { once: true });
            window.addEventListener('scroll', dismissCurtain, { passive: true, once: true });
        }
    }

    // 5.2 Count-Up Statistics
    const statCards = document.querySelectorAll('.stat-number');
    if (statCards.length) {
        const animateNumber = (el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 600;
            let startTime = null;

            const step = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                if (elapsed >= duration) {
                    el.textContent = target + suffix;
                    return;
                }
                const progress = elapsed / duration;
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeProgress * target);
                el.textContent = currentVal + suffix;
                requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const statsObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateNumber(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.25 });

            statCards.forEach(stat => statsObserver.observe(stat));
        } else {
            statCards.forEach(stat => {
                stat.textContent = stat.getAttribute('data-target') + (stat.getAttribute('data-suffix') || '');
            });
        }
    }

    // 5.3 Smooth Scroll-Reveal Animations
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length) {
        if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const revealObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        obs.unobserve(entry.target);
                        setTimeout(() => {
                            entry.target.style.willChange = 'auto';
                        }, 700);
                    }
                });
            }, {
                threshold: 0.05,
                rootMargin: '0px 0px -30px 0px'
            });

            revealElements.forEach(el => revealObserver.observe(el));
        } else {
            revealElements.forEach(el => el.classList.add('revealed'));
        }
    }

    // 5.4 Active Tab Navigation Scroll Spy
    const navLinks = document.querySelectorAll('.footer-menu .footer-menu-link');
    const sections = [
        document.getElementById('homesection'),
        document.getElementById('AboutUsSection'),
        document.getElementById('ProductsServicesSection'),
        document.getElementById('PaymentOptionsSection'),
        document.getElementById('feedbacksection'),
        document.getElementById('enquirysection')
    ].filter(Boolean);

    function updateActiveNav() {
        const scrollPos = window.scrollY + 180;
        let activeId = 'homesection';

        for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                activeId = sec.id;
            }
        }

        // If scrolled to bottom of document, activate enquiry
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
            activeId = 'enquirysection';
        }

        navLinks.forEach(link => {
            const targetHash = link.getAttribute('href') || '';
            if (targetHash === '#' + activeId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('resize', updateActiveNav, { passive: true });
    updateActiveNav();
}

// ==========================================
// 6. Interactive Signature Services & Menus Filter
// ==========================================
function filterServices(category, element) {
    const chips = document.querySelectorAll('.service-filter-chip');
    chips.forEach(c => c.classList.remove('active'));
    if (element) element.classList.add('active');

    const cards = document.querySelectorAll('#ProductGroup .card');
    cards.forEach(card => {
        const cats = card.getAttribute('data-categories') || '';
        if (category === 'all' || cats.includes(category)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================================
// Initialization on DOM Ready
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initThemeVariables();
    initEnquiryForm();
    initAnimationsAndNavigation();
});
