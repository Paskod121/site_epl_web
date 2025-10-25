/**
 * FICHIER : cta.js
 * 
 * OBJECTIF : 
 * Gestion du composant CTA réutilisable
 * Animations et interactions avancées
 * Compatible avec les 2 thèmes (Clair, Sombre)
 * 
 * DÉPENDANCES :
 * - css/components/cta.css (styles du CTA)
 * - css/components/buttons.css (styles des boutons)
 * 
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 15 octobre 2025
 */

/**
 * Classe pour gérer le composant CTA
 */
class CTAComponent {
    constructor(selector = '.cta-section') {
        this.selector = selector;
        this.ctaElement = document.querySelector(selector);
        this.isInitialized = false;
        
        if (this.ctaElement) {
            this.init();
        }
    }
    
    /**
     * Initialise le composant CTA
     */
    init() {
        if (this.isInitialized) return;
        
        console.log('🚀 Initialisation du composant CTA');
        
        // Ajouter les événements
        this.addEventListeners();
        
        // Ajouter les animations
        this.addAnimations();
        
        // Observer les changements de thème
        this.observeThemeChanges();
        
        this.isInitialized = true;
        console.log('✅ Composant CTA initialisé');
    }
    
    /**
     * Ajoute les événements aux boutons CTA
     */
    addEventListeners() {
        const boutons = this.ctaElement.querySelectorAll('.bouton');
        
        boutons.forEach(bouton => {
            // Effet de survol avancé
            bouton.addEventListener('mouseenter', (e) => {
                this.handleButtonHover(e.target, true);
            });
            
            bouton.addEventListener('mouseleave', (e) => {
                this.handleButtonHover(e.target, false);
            });
            
            // Effet de clic
            bouton.addEventListener('click', (e) => {
                this.handleButtonClick(e.target);
            });
            
            // Effet de focus pour l'accessibilité
            bouton.addEventListener('focus', (e) => {
                this.handleButtonFocus(e.target, true);
            });
            
            bouton.addEventListener('blur', (e) => {
                this.handleButtonFocus(e.target, false);
            });
        });
    }
    
    /**
     * Gère l'effet de survol des boutons
     */
    handleButtonHover(bouton, isHovering) {
        const icone = bouton.querySelector('.icone-cta');
        
        if (isHovering) {
            bouton.style.transform = 'translateY(-2px)';
            if (icone) {
                icone.style.transform = 'scale(1.1) rotate(5deg)';
            }
        } else {
            bouton.style.transform = 'translateY(0)';
            if (icone) {
                icone.style.transform = 'scale(1) rotate(0deg)';
            }
        }
    }
    
    /**
     * Gère l'effet de clic des boutons
     */
    handleButtonClick(bouton) {
        // Animation de clic
        bouton.style.transform = 'translateY(0) scale(0.98)';
        
        setTimeout(() => {
            bouton.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
        
        // Ajouter un effet de ripple
        this.createRippleEffect(bouton);
    }
    
    /**
     * Gère l'effet de focus des boutons
     */
    handleButtonFocus(bouton, isFocused) {
        if (isFocused) {
            bouton.style.outline = '2px solid rgba(255, 255, 255, 0.8)';
            bouton.style.outlineOffset = '2px';
        } else {
            bouton.style.outline = 'none';
            bouton.style.outlineOffset = '0';
        }
    }
    
    /**
     * Crée un effet de ripple sur le bouton
     */
    createRippleEffect(bouton) {
        const ripple = document.createElement('span');
        const rect = bouton.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        bouton.style.position = 'relative';
        bouton.style.overflow = 'hidden';
        bouton.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    /**
     * Ajoute les animations au CTA
     */
    addAnimations() {
        // Animation d'apparition
        this.ctaElement.style.opacity = '0';
        this.ctaElement.style.transform = 'translateY(30px)';
        
        // Observer l'intersection pour déclencher l'animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateIn();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(this.ctaElement);
    }
    
    /**
     * Animation d'entrée du CTA
     */
    animateIn() {
        this.ctaElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        this.ctaElement.style.opacity = '1';
        this.ctaElement.style.transform = 'translateY(0)';
        
        // Animation en cascade des éléments
        const titre = this.ctaElement.querySelector('.cta-titre');
        const description = this.ctaElement.querySelector('.cta-description');
        const actions = this.ctaElement.querySelector('.cta-actions');
        
        if (titre) {
            titre.style.opacity = '0';
            titre.style.transform = 'translateY(20px)';
            setTimeout(() => {
                titre.style.transition = 'all 0.6s ease';
                titre.style.opacity = '1';
                titre.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (description) {
            description.style.opacity = '0';
            description.style.transform = 'translateY(20px)';
            setTimeout(() => {
                description.style.transition = 'all 0.6s ease';
                description.style.opacity = '1';
                description.style.transform = 'translateY(0)';
            }, 400);
        }
        
        if (actions) {
            actions.style.opacity = '0';
            actions.style.transform = 'translateY(20px)';
            setTimeout(() => {
                actions.style.transition = 'all 0.6s ease';
                actions.style.opacity = '1';
                actions.style.transform = 'translateY(0)';
            }, 600);
        }
    }
    
    /**
     * Observe les changements de thème
     */
    observeThemeChanges() {
        // Écouter les changements de thème
        document.addEventListener('themeChanged', (event) => {
            this.handleThemeChange(event.detail.theme);
        });
        
        // Observer les changements d'attribut data-theme
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    this.handleThemeChange(document.documentElement.getAttribute('data-theme'));
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
    
    /**
     * Gère les changements de thème
     */
    handleThemeChange(theme) {
        console.log('🎨 Changement de thème CTA:', theme);
        
        // Ajouter une classe pour les transitions fluides
        this.ctaElement.classList.add('theme-transitioning');
        
        setTimeout(() => {
            this.ctaElement.classList.remove('theme-transitioning');
        }, 300);
    }
    
    /**
     * Met à jour le contenu du CTA
     */
    updateContent(options = {}) {
        const {
            titre = 'Prêt à rejoindre l\'excellence ?',
            description = 'Découvrez nos formations et commencez votre parcours d\'ingénieur dès maintenant.',
            boutonPrimaire = {
                texte: 'Découvrir nos formations',
                url: '/pages/formations/index.html'
            },
            boutonSecondaire = {
                texte: 'Nous contacter',
                url: '/pages/contact.html'
            }
        } = options;
        
        // Mettre à jour le titre
        const titreElement = this.ctaElement.querySelector('.cta-titre');
        if (titreElement) {
            titreElement.textContent = titre;
        }
        
        // Mettre à jour la description
        const descriptionElement = this.ctaElement.querySelector('.cta-description');
        if (descriptionElement) {
            descriptionElement.textContent = description;
        }
        
        // Mettre à jour les boutons
        const boutons = this.ctaElement.querySelectorAll('.bouton');
        if (boutons[0]) {
            boutons[0].href = boutonPrimaire.url;
            boutons[0].querySelector('span').textContent = boutonPrimaire.texte;
        }
        
        if (boutons[1]) {
            boutons[1].href = boutonSecondaire.url;
            boutons[1].querySelector('span').textContent = boutonSecondaire.texte;
        }
    }
    
    /**
     * Détruit le composant CTA
     */
    destroy() {
        if (!this.isInitialized) return;
        
        // Supprimer les événements
        const boutons = this.ctaElement.querySelectorAll('.bouton');
        boutons.forEach(bouton => {
            bouton.replaceWith(bouton.cloneNode(true));
        });
        
        this.isInitialized = false;
        console.log('🗑️ Composant CTA détruit');
    }
}

/**
 * Fonction utilitaire pour initialiser tous les CTA de la page
 */
function initAllCTAs() {
    const ctaElements = document.querySelectorAll('.cta-section');
    const ctaInstances = [];
    
    ctaElements.forEach((element, index) => {
        const cta = new CTAComponent(`.cta-section:nth-of-type(${index + 1})`);
        ctaInstances.push(cta);
    });
    
    return ctaInstances;
}

/**
 * CSS pour l'effet ripple
 */
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.theme-transitioning {
    transition: all 0.3s ease !important;
}
`;

// Ajouter le CSS pour l'effet ripple
if (!document.querySelector('#cta-ripple-css')) {
    const style = document.createElement('style');
    style.id = 'cta-ripple-css';
    style.textContent = rippleCSS;
    document.head.appendChild(style);
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CTAComponent, initAllCTAs };
}

// Auto-initialisation si le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCTAs);
} else {
    initAllCTAs();
}