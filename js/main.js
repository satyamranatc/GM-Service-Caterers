/**
 * GM Service Caterers — Production JavaScript Suite
 * Luxury Pure Vegetarian Catering & Royal Crockery Services (Indore)
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
    var themecolor = themeElem ? themeElem.value : '#000000';
    var themeElem1 = document.getElementById('themeColor1');
    var themeColor1 = themeElem1 ? themeElem1.value : '#111216';
    document.documentElement.style.setProperty('--theme-color', themecolor);
    document.documentElement.style.setProperty('--theme-color-light', themeColor1);
    document.documentElement.style.setProperty('--theme-color-gold', '#d4af37');
    document.documentElement.style.setProperty('--theme-color-gold-light', '#f5d77f');
    document.documentElement.style.setProperty('--theme-color-gold-bright', '#ffe082');
    document.documentElement.style.setProperty('--theme-color-gold-pale', '#fbf7ee');
    document.documentElement.style.setProperty('--theme-color-bronze', '#aa771c');
    document.documentElement.style.setProperty('--theme-color-emerald', '#27ae60');
    document.documentElement.style.setProperty('--theme-color-emerald-light', '#2ecc71');
    document.documentElement.style.setProperty('--theme-color-dark1', '#000000');
    document.documentElement.style.setProperty('--theme-color-dark2', '#090a0d');
    document.documentElement.style.setProperty('--theme-color-dark3', '#111216');
}

// ==========================================
// 2. Modals (Image Preview & Share Sheet)
// ==========================================
const imageModal = document.getElementById('imageModal');
const shareModal = document.getElementById('shareModal');
const modalImg = document.getElementById('img01');
const captionText = document.getElementById('caption');
const imageModalClose = document.getElementById('imageModalClose');
const imageModalFullscreenBtn = document.getElementById('imageModalFullscreenBtn');
const shareModalClose = document.getElementById('shareModalClose');

function closeImageModal() {
    if (imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = '';
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(function() {});
        }
    }
}

function openImageModal(e) {
    if (!imageModal || !modalImg) return;
    modalImg.src = e.src;
    if (captionText) {
        captionText.innerHTML = e.alt || '';
    }
    imageModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function toggleImageModalFullscreen() {
    if (!imageModal) return;
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(function() {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    } else {
        if (imageModal.requestFullscreen) {
            imageModal.requestFullscreen().catch(function() {});
        } else if (imageModal.webkitRequestFullscreen) {
            imageModal.webkitRequestFullscreen();
        }
    }
}

if (imageModalClose) {
    imageModalClose.onclick = closeImageModal;
}

if (imageModalFullscreenBtn) {
    imageModalFullscreenBtn.onclick = toggleImageModalFullscreen;
}

window.addEventListener('click', function (event) {
    if (event.target === imageModal || event.target.classList.contains('modal-image-wrapper')) {
        closeImageModal();
    }
    if (event.target === shareModal && shareModal) {
        shareModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
        if (shareModal) {
            shareModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
});

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
                    el.textContent = target.toLocaleString('en-IN') + suffix;
                    return;
                }
                const progress = elapsed / duration;
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeProgress * target);
                el.textContent = currentVal.toLocaleString('en-IN') + suffix;
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
                const targetVal = parseInt(stat.getAttribute('data-target'), 10);
                stat.textContent = (isNaN(targetVal) ? stat.getAttribute('data-target') : targetVal.toLocaleString('en-IN')) + (stat.getAttribute('data-suffix') || '');
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
// 6. Interactive Crockery & Dining Services Filter
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
// 7. Video Showcase Playback Controller
// ==========================================
function toggleVideoPlay(btn, videoId) {
    const video = document.getElementById(videoId);
    if (!video) return;
    const icon = btn.querySelector('i');
    if (video.paused) {
        video.play().catch(function() {});
        if (icon) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        }
    } else {
        video.pause();
        if (icon) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    }
}

function toggleVideoMute(btn, videoId) {
    const video = document.getElementById(videoId);
    if (!video) return;
    const icon = btn.querySelector('i');
    video.muted = !video.muted;
    if (video.muted) {
        if (icon) {
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-off');
        }
    } else {
        if (icon) {
            icon.classList.remove('fa-volume-off');
            icon.classList.add('fa-volume-up');
        }
    }
}

function toggleVideoFullscreen(videoId) {
    const video = document.getElementById(videoId);
    if (!video) return;

    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(function() {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        return;
    }

    if (video.requestFullscreen) {
        video.requestFullscreen().catch(function() {
            if (video.webkitEnterFullscreen) {
                video.webkitEnterFullscreen();
            }
        });
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

function initVideoPlayers() {
    const videos = document.querySelectorAll('.card-video-player');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(function() {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.3 });

        videos.forEach(v => videoObserver.observe(v));
    }
}

function copyPaymentUPI(btn) {
    const upiText = '9425410558@axl';
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(upiText).then(() => {
            if (!btn) return;
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check" style="color:#4ade80;"></i> <span style="color:#4ade80;">Copied!</span>';
            setTimeout(() => {
                btn.innerHTML = originalHtml;
            }, 2000);
        }).catch(() => {
            prompt('Copy UPI ID:', upiText);
        });
    } else {
        prompt('Copy UPI ID:', upiText);
    }
}

// ==========================================
// Initialization on DOM Ready
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initThemeVariables();
    initEnquiryForm();
    initAnimationsAndNavigation();
    initVideoPlayers();
});
