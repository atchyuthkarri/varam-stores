import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const useGsapScroll = () => {
  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });
    lenisInstance = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 2. Smooth Anchor Navigation via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -85,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 3. GSAP Animations & In/Out Transitions
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

      // --- Product Sections Reveal (Fresh Picks, Bakery & Dairy, Most Selling, Pantry Superfoods) ---
      ['#fresh-picks', '#bakery-dairy', '#most-selling', '#pantry-superfoods'].forEach((secId) => {
        const sectionCards = gsap.utils.toArray<HTMLElement>(`${secId} .gsap-product-card`);
        if (sectionCards.length > 0) {
          gsap.from(sectionCards, {
            opacity: 0,
            y: 35,
            scale: 0.97,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: secId,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });

      // --- Trust Bar Reveal ---
      const trustItems = gsap.utils.toArray<HTMLElement>('.gsap-trust-item');
      if (trustItems.length > 0) {
        gsap.from(trustItems, {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-trust-bar',
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      }

      // --- Brand Story Reveal ---
      const storySection = document.querySelector('#story');
      if (storySection) {
        const storyContent = storySection.querySelector('.gsap-story-content');
        const storyImage = storySection.querySelector('.gsap-story-image');

        if (storyContent) {
          gsap.from(storyContent, {
            opacity: 0,
            x: -40,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: storySection,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          });
        }

        if (storyImage) {
          gsap.from(storyImage, {
            opacity: 0,
            x: 40,
            scale: 0.96,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: storySection,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          });
        }
      }

      // --- Generic Section Headings Reveal ---
      const headings = gsap.utils.toArray<HTMLElement>('.gsap-section-header');
      headings.forEach((header) => {
        gsap.from(header, {
          opacity: 0,
          y: 25,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      });
    });

    // Refresh ScrollTrigger once DOM settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      ctx.revert();
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};
