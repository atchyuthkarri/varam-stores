import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Export getLenis as null for seamless backward compatibility
export const getLenis = () => null;

export const useGsapScroll = () => {
  useEffect(() => {
    // 1. Smooth Anchor Navigation using native browser scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          const targetY = targetElement.getBoundingClientRect().top + window.scrollY - 85;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 2. GSAP Animations & In/Out Transitions
    const ctx = gsap.context(() => {
      // --- Hero Parallax & Reveal ---
      const heroBg = document.querySelector('.gsap-hero-bg');
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.gsap-hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Hero Elements Entrance
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.gsap-hero-eyebrow', { opacity: 0, y: 15, duration: 0.6 })
        .from('.gsap-hero-title', { opacity: 0, y: 25, duration: 0.8 }, '-=0.4')
        .from('.gsap-hero-desc', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
        .from('.gsap-hero-cta', { opacity: 0, y: 18, stagger: 0.1, duration: 0.6 }, '-=0.4')
        .from('.gsap-hero-usp', { opacity: 0, y: 20, stagger: 0.08, duration: 0.6 }, '-=0.3');

      // --- Category Section Reveal ---
      const categoryCards = gsap.utils.toArray<HTMLElement>('#categories .gsap-category-card');
      if (categoryCards.length > 0) {
        gsap.from(categoryCards, {
          opacity: 0,
          y: 35,
          scale: 0.95,
          duration: 0.65,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'transform,scale',
          scrollTrigger: {
            trigger: '#categories',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // --- Farm Fresh Banner Reveal ---
      const farmBanner = document.querySelector('.gsap-farm-banner');
      if (farmBanner) {
        gsap.from(farmBanner, {
          opacity: 0,
          scale: 0.96,
          y: 35,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: farmBanner,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });

        // Parallax image inside banner
        const farmImg = farmBanner.querySelector('.gsap-farm-img');
        if (farmImg) {
          gsap.to(farmImg, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: farmBanner,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      }

      // --- 3 Promo Cards Staggered Reveal ---
      const promoCards = gsap.utils.toArray<HTMLElement>('#promotions .gsap-promo-card');
      if (promoCards.length > 0) {
        gsap.from(promoCards, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#promotions',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Section headers are kept fully visible by default without opacity animations
      // to guarantee instant readability across all devices and fast scrolling.
    });

    // Refresh ScrollTrigger once DOM settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener('click', handleAnchorClick);
      ctx.revert();
    };
  }, []);
};
