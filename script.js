/**
 * L'Assiette d'Or - Script Principal
 * Gère les interactions et animations du site
 */

// ============================================
// GESTION DU MENU ACCORDÉON
// ============================================

function toggleMenu(button) {
    const menuItems = button.nextElementSibling;
    const isOpen = menuItems.style.display !== 'none';
    
    // Fermer tous les autres menus
    document.querySelectorAll('.menu-items').forEach(item => {
        item.style.display = 'none';
    });
    
    document.querySelectorAll('.menu-category-header').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ouvrir le menu cliqué
    if (!isOpen) {
        menuItems.style.display = 'block';
        button.classList.add('active');
    }
}

// Ouvrir le premier menu par défaut au chargement
document.addEventListener('DOMContentLoaded', function() {
    const firstMenuButton = document.querySelector('.menu-category-header');
    if (firstMenuButton) {
        const menuItems = firstMenuButton.nextElementSibling;
        menuItems.style.display = 'block';
        firstMenuButton.classList.add('active');
    }
});

// ============================================
// GESTION DE LA RÉSERVATION
// ============================================

function handleReservation() {
    alert('Système de réservation: Fonctionnalité à implémenter\n\nVous pouvez nous contacter directement:\n📞 +33 (0)1 23 45 67 89\n📧 contact@assiettedor.fr');
}

// ============================================
// NAVIGATION LISSE
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens vides ou '#'
        if (href === '#' || href === '') {
            return;
        }
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ANIMATIONS À L'APPARITION (INTERSECTION OBSERVER)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les sections
document.querySelectorAll('.histoire, .menu, .galerie, .footer').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// ============================================
// GALERIE - ZOOM AU SURVOL
// ============================================

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.05)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// ============================================
// PARALLAXE HERO
// ============================================

window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ============================================
// GESTION DE LA NAVBAR STICKY
// ============================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// GESTION DU MENU MOBILE
// ============================================

// Ajouter la gestion du menu mobile si nécessaire
function initMobileMenu() {
    const navbarMenu = document.querySelector('.navbar-menu');
    
    // Fermer le menu au clic sur un lien
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navbarMenu) {
                navbarMenu.style.display = 'none';
            }
        });
    });
}

initMobileMenu();

// ============================================
// UTILITAIRES
// ============================================

/**
 * Détecter si le navigateur supporte certaines fonctionnalités
 */
function supportsWebP() {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
}

/**
 * Fonction pour déboguer (à utiliser en développement)
 */
function debug(message) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('[L\'Assiette d\'Or]', message);
    }
}

debug('Site chargé avec succès');

// ============================================
// GESTION DES ERREURS D'IMAGES
// ============================================

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.error('Erreur de chargement d\'image:', this.src);
        // Optionnel: remplacer par une image par défaut
        // this.src = 'images/placeholder.jpg';
    });
});

// ============================================
// OPTIMISATION DES PERFORMANCES
// ============================================

// Lazy loading des images (si supporté)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// INITIALISATION COMPLÈTE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    debug('DOM complètement chargé');
    
    // Initialiser les interactions
    initializeInteractions();
});

function initializeInteractions() {
    // Ajouter les classes d'interaction
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--primary');
        });
    });
    
    debug('Interactions initialisées');
}

// ============================================
// GESTION DES ÉVÉNEMENTS CLAVIER
// ============================================

document.addEventListener('keydown', function(e) {
    // Échap pour fermer les menus
    if (e.key === 'Escape') {
        document.querySelectorAll('.menu-items').forEach(item => {
            item.style.display = 'none';
        });
        document.querySelectorAll('.menu-category-header').forEach(btn => {
            btn.classList.remove('active');
        });
    }
});

// ============================================
// GESTION DE LA VISIBILITÉ DE LA PAGE
// ============================================

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        debug('Page cachée');
    } else {
        debug('Page visible');
    }
});
