// ===================================
// CONFIGURACIÓN Y VARIABLES
// ===================================
const CONFIG = {
  carouselInterval: 2000, // 2 segundos entre imágenes
  scrollThreshold: 100,
  observerThreshold: 0.15,
};

// ===================================
// MENÚ HAMBURGUESA MÓVIL
// ===================================
class MobileMenu {
  constructor() {
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navlinks = document.querySelector('.navlinks');
    this.nav = document.querySelector('.nav');
    this.overlay = null;
    this.init();
  }

  init() {
    if (!this.menuToggle || !this.navlinks) return;

    // Crear overlay
    this.createOverlay();

    // Event listener para botón hamburguesa
    this.menuToggle.addEventListener('click', () => this.toggleMenu());

    // Cerrar menú al hacer click en overlay
    this.overlay.addEventListener('click', () => this.closeMenu());

    // Cerrar menú al hacer click en un enlace
    this.navlinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navlinks.classList.contains('active')) {
        this.closeMenu();
      }
    });
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'nav-overlay';
    document.body.appendChild(this.overlay);
  }

  toggleMenu() {
    const isActive = this.navlinks.classList.contains('active');
    if (isActive) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.navlinks.classList.add('active');
    this.menuToggle.classList.add('active');
    this.overlay.classList.add('active');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
  }

  closeMenu() {
    this.navlinks.classList.remove('active');
    this.menuToggle.classList.remove('active');
    this.overlay.classList.remove('active');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restaurar scroll del body
  }
}

// ===================================
// CARRUSEL DE IMÁGENES DEL HERO
// ===================================
class HeroCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.carousel-indicator');
    this.currentSlide = 0;
    this.autoPlayInterval = null;
    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Mostrar primera slide
    this.showSlide(0);

    // Auto-play
    this.startAutoPlay();

    // Event listeners para indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });

    // Pausar auto-play cuando el mouse está sobre el hero
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mouseenter', () => this.stopAutoPlay());
      hero.addEventListener('mouseleave', () => this.startAutoPlay());
    }
  }

  showSlide(index) {
    // Ocultar todas las slides
    this.slides.forEach((slide) => slide.classList.remove('active'));
    this.indicators.forEach((indicator) => indicator.classList.remove('active'));

    // Mostrar slide actual
    if (this.slides[index]) {
      this.slides[index].classList.add('active');
      this.indicators[index]?.classList.add('active');
      this.currentSlide = index;
    }
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(next);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, CONFIG.carouselInterval);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

// ===================================
// NAVEGACIÓN FIJA CON SCROLL
// ===================================
class StickyHeader {
  constructor() {
    this.header = document.querySelector('header');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    if (!this.header) return;

    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    // Agregar clase cuando hay scroll
    if (currentScroll > CONFIG.scrollThreshold) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }

    // Ocultar header al hacer scroll hacia abajo, mostrar al subir
    if (currentScroll > this.lastScroll && currentScroll > 200) {
      this.header.classList.add('hidden');
    } else {
      this.header.classList.remove('hidden');
    }

    this.lastScroll = currentScroll;
  }
}

// ===================================
// NAVEGACIÓN ACTIVA
// ===================================
class ActiveNav {
  constructor() {
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.navlinks a[href^="#"]');
    this.init();
  }

  init() {
    if (this.sections.length === 0) return;

    window.addEventListener('scroll', () => this.updateActiveLink());
    
    // Smooth scroll al hacer click
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  updateActiveLink() {
    let currentSection = '';

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 150) {
        currentSection = section.getAttribute('id');
      }
    });

    this.navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}

// ===================================
// INTERSECTION OBSERVER (Animaciones al hacer scroll)
// ===================================
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('section, .card, .mini');
    this.init();
  }

  init() {
    const observerOptions = {
      threshold: CONFIG.observerThreshold,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    this.elements.forEach((el) => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }
}

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
class ScrollToTop {
  constructor() {
    this.button = this.createButton();
    this.init();
  }

  createButton() {
    const button = document.createElement('button');
    button.className = 'scroll-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(button);
    return button;
  }

  init() {
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    });

    // Click para volver arriba
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}

// ===================================
// EFECTO PARALLAX SUAVE
// ===================================
class ParallaxEffect {
  constructor() {
    this.parallaxElements = document.querySelectorAll('.parallax');
    this.init();
  }

  init() {
    if (this.parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      this.parallaxElements.forEach((element) => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        element.style.transform = `translate3d(0, ${rate}px, 0)`;
      });
    });
  }
}

// ===================================
// ANIMACIÓN DE NÚMEROS (Contador)
// ===================================
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('[data-count]');
    this.init();
  }

  init() {
    if (this.counters.length === 0) return;

    const observerOptions = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          this.animateCounter(entry.target);
          entry.target.classList.add('counted');
        }
      });
    }, observerOptions);

    this.counters.forEach((counter) => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
}

// ===================================
// LAZY LOADING DE IMÁGENES
// ===================================
class LazyLoadImages {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }

  init() {
    if (this.images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    this.images.forEach((img) => imageObserver.observe(img));
  }
}

// ===================================
// MANEJO DE FORMULARIOS (si los agregas)
// ===================================
class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll('form[data-contact]');
    this.init();
  }

  init() {
    this.forms.forEach((form) => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    });
  }

  handleSubmit(e, form) {
    e.preventDefault();

    // Validación básica
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log('Datos del formulario:', data);

    // Aquí puedes agregar lógica para enviar a un servidor
    // o integrar con servicios como FormSpree, EmailJS, etc.

    // Mostrar mensaje de éxito
    this.showMessage(form, 'Mensaje enviado correctamente', 'success');
  }

  showMessage(form, message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    form.appendChild(messageEl);

    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }
}

// ===================================
// INICIALIZACIÓN
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Cochería García - Landing Page Cargada');

  // Inicializar componentes
  new HeroCarousel();
  new StickyHeader();
  new ActiveNav();
  new ScrollAnimations();
  new ScrollToTop();
  new MobileMenu();
  new ParallaxEffect();
  new CounterAnimation();
  new LazyLoadImages();
  new FormHandler();

  // Año dinámico en footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// ===================================
// MANEJO DE ERRORES GLOBALES
// ===================================
window.addEventListener('error', (e) => {
  console.error('Error en la página:', e.error);
});

// ===================================
// PERFORMANCE MONITORING (Opcional)
// ===================================
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('⚡ Tiempo de carga:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
  });
}

// ===================================
// GESTIÓN DE COOKIES Y CONSENTIMIENTO
// ===================================
class CookieConsent {
  constructor() {
    this.storageKey = 'cookieConsent';
    this.init();
  }

  init() {
    // Verificar si el usuario ya ha dado consentimiento
    if (!this.hasConsent()) {
      this.showBanner();
    }
  }

  hasConsent() {
    return localStorage.getItem(this.storageKey) === 'accepted';
  }

  showBanner() {
    // Crear el banner
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-label', 'Aviso de cookies');

    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-banner-text">
          <p>
            <strong>Utilizamos cookies</strong> para asegurarnos de que obtengas la mejor experiencia en nuestro sitio web. 
            Puedes obtener más información en nuestra 
            <a href="politica-cookies.html" target="_blank" rel="noopener">Política de Cookies</a>
          </p>
        </div>
        <div class="cookie-banner-buttons">
          <button class="btn btn-ghost cookie-reject" aria-label="Rechazar cookies">Rechazar</button>
          <button class="btn btn-primary cookie-accept" aria-label="Aceptar cookies">Aceptar</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Agregar animación
    setTimeout(() => banner.classList.add('show'), 10);

    // Event listeners
    banner.querySelector('.cookie-accept').addEventListener('click', () => {
      this.acceptCookies();
    });

    banner.querySelector('.cookie-reject').addEventListener('click', () => {
      this.rejectCookies();
    });
  }

  acceptCookies() {
    localStorage.setItem(this.storageKey, 'accepted');
    this.closeBanner();
    console.log('✓ Cookies aceptadas');
  }

  rejectCookies() {
    localStorage.setItem(this.storageKey, 'rejected');
    this.closeBanner();
    console.log('✓ Cookies rechazadas');
  }

  closeBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 300);
    }
  }
}

// Inicializar consentimiento de cookies cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new CookieConsent();
});
