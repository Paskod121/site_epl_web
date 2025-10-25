/**
 * FICHIER : Hero.js
 * 
 * OBJECTIF : 
 * Composant Hero pour la section principale de la page d'accueil
 * Animations et interactions avancées
 * Compatible avec les 2 thèmes
 * 
 * DÉPENDANCES :
 * - css/components/hero.css (styles)
 * - js/utils/themes.js (gestionnaire de thèmes)
 * 
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 15 octobre 2025
 */

/**
 * COMPOSANT HERO
 * 
 * FONCTIONNALITÉS :
 * - Animations d'entrée fluides
 * - Effets de parallaxe subtils
 * - Interactions avec le scroll
 * - Optimisation des performances
 * - Support des animations réduites
 * 
 * UTILISATION :
 * - S'initialise automatiquement sur la page d'accueil
 * - Compatible avec tous les thèmes
 * - Responsive et accessible
 */
class ComposantHero {
    constructor() {
        // Éléments DOM
        this.heroSection = document.querySelector('.hero-section');
        this.heroContenu = document.querySelector('.hero-contenu');
        this.heroTitre = document.querySelector('.hero-titre');
        this.heroDescription = document.querySelector('.hero-description');
        this.heroActions = document.querySelector('.hero-actions');
        this.heroVisuel = document.querySelector('.hero-visuel');
        this.heroImage = document.querySelector('.hero-image');
        this.heroBadge = document.querySelector('.hero-badge');
        
        // État du composant
        this.estInitialise = false;
        this.estVisible = false;
        this.animationFrame = null;
        
        // Configuration
        this.config = {
            parallaxe: true,
            animations: true,
            performance: true
        };
        
        // Initialisation
        this.initialiser();
        
        console.log(' Hero initialisé');
    }
    
    /**
     * Initialise le composant Hero
     */
    initialiser() {
        // Vérifie que les éléments existent
        if (!this.heroSection) {
            console.warn('⚠️ Section Hero non trouvée');
            return;
        }
        
        // Configure les animations
        this.configurerAnimations();
        
        // Configure les interactions
        this.configurerInteractions();
        
        // Configure l'observateur d'intersection
        this.configurerObservateurIntersection();
        
        // Configure le parallaxe
        if (this.config.parallaxe) {
            this.configurerParallaxe();
        }
        
        // Marque comme initialisé
        this.estInitialise = true;
        
        // Émet l'événement d'initialisation
        this.emettreEvenement('hero-initialise');
    }
    
    /**
     * Configure les animations d'entrée
     */
    configurerAnimations() {
        if (!this.config.animations) return;
        
        // Vérifie les préférences de mouvement
        const prefereMouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefereMouvementReduit) {
            // Désactive les animations si l'utilisateur préfère
            this.config.animations = false;
            return;
        }
        
        // Ajoute les classes d'animation
        this.heroTitre?.classList.add('animation-entree');
        this.heroDescription?.classList.add('animation-entree');
        this.heroActions?.classList.add('animation-entree');
        this.heroVisuel?.classList.add('animation-entree');
        
        // Configure les délais d'animation
        if (this.heroDescription) {
            this.heroDescription.style.animationDelay = '0.2s';
        }
        if (this.heroActions) {
            this.heroActions.style.animationDelay = '0.4s';
        }
        if (this.heroVisuel) {
            this.heroVisuel.style.animationDelay = '0.6s';
        }
    }
    
    /**
     * Configure les interactions utilisateur
     */
    configurerInteractions() {
        // Effet de survol sur l'image
        if (this.heroImage) {
            this.heroImage.addEventListener('mouseenter', this.gererSurvolImage.bind(this));
            this.heroImage.addEventListener('mouseleave', this.gererSortieImage.bind(this));
        }
        
        // Effet de survol sur le badge
        if (this.heroBadge) {
            this.heroBadge.addEventListener('mouseenter', this.gererSurvolBadge.bind(this));
            this.heroBadge.addEventListener('mouseleave', this.gererSortieBadge.bind(this));
        }
        
        // Effet de survol sur les boutons d'action
        if (this.heroActions) {
            const boutons = this.heroActions.querySelectorAll('.bouton');
            boutons.forEach(bouton => {
                bouton.addEventListener('mouseenter', this.gererSurvolBouton.bind(this));
                bouton.addEventListener('mouseleave', this.gererSortieBouton.bind(this));
            });
        }
    }
    
    /**
     * Configure l'observateur d'intersection
     */
    configurerObservateurIntersection() {
        if (!('IntersectionObserver' in window)) return;
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.observateurIntersection = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.gererEntreeVue();
                } else {
                    this.gererSortieVue();
                }
            });
        }, options);
        
        this.observateurIntersection.observe(this.heroSection);
    }
    
    /**
     * Configure l'effet de parallaxe
     */
    configurerParallaxe() {
        if (!this.config.parallaxe) return;
        
        // Écoute les événements de scroll
        window.addEventListener('scroll', this.gererParallaxe.bind(this));
        
        // Écoute les événements de redimensionnement
        window.addEventListener('resize', this.gererRedimensionnementParallaxe.bind(this));
    }
    
    /**
     * Gère l'effet de parallaxe
     */
    gererParallaxe() {
        if (!this.config.performance) {
            // Utilise requestAnimationFrame pour optimiser
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            
            this.animationFrame = requestAnimationFrame(() => {
                this.appliquerParallaxe();
            });
        } else {
            this.appliquerParallaxe();
        }
    }
    
    /**
     * Applique l'effet de parallaxe
     */
    appliquerParallaxe() {
        const scrollY = window.pageYOffset;
        const vitesseParallaxe = 0.5;
        
        // Parallaxe sur l'image
        if (this.heroImage) {
            const translateY = scrollY * vitesseParallaxe;
            this.heroImage.style.transform = `translateY(${translateY}px)`;
        }
        
        // Parallaxe sur le badge
        if (this.heroBadge) {
            const translateY = scrollY * vitesseParallaxe * 0.3;
            this.heroBadge.style.transform = `translateY(${translateY}px)`;
        }
    }
    
    /**
     * Gère l'entrée dans la vue
     */
    gererEntreeVue() {
        if (this.estVisible) return;
        
        this.estVisible = true;
        
        // Déclenche les animations d'entrée
        if (this.config.animations) {
            this.declencherAnimationsEntree();
        }
        
        // Émet l'événement
        this.emettreEvenement('hero-entree-vue');
        
        console.log(' Hero entré dans la vue');
    }
    
    /**
     * Gère la sortie de la vue
     */
    gererSortieVue() {
        if (!this.estVisible) return;
        
        this.estVisible = false;
        
        // Émet l'événement
        this.emettreEvenement('hero-sortie-vue');
        
        console.log(' Hero sorti de la vue');
    }
    
    /**
     * Déclenche les animations d'entrée
     */
    declencherAnimationsEntree() {
        // Animation du titre
        if (this.heroTitre) {
            this.heroTitre.style.animation = 'apparitionTitre 0.8s ease-out';
        }
        
        // Animation de la description
        if (this.heroDescription) {
            this.heroDescription.style.animation = 'apparitionDescription 0.8s ease-out 0.2s both';
        }
        
        // Animation des actions
        if (this.heroActions) {
            this.heroActions.style.animation = 'apparitionActions 0.8s ease-out 0.4s both';
        }
        
        // Animation du visuel
        if (this.heroVisuel) {
            this.heroVisuel.style.animation = 'apparitionVisuel 0.8s ease-out 0.6s both';
        }
    }
    
    /**
     * Gère le survol de l'image
     */
    gererSurvolImage() {
        if (!this.heroImage) return;
        
        this.heroImage.style.transform = 'scale(1.05)';
        this.heroImage.style.transition = 'transform 0.3s ease';
    }
    
    /**
     * Gère la sortie de l'image
     */
    gererSortieImage() {
        if (!this.heroImage) return;
        
        this.heroImage.style.transform = 'scale(1)';
    }
    
    /**
     * Gère le survol du badge
     */
    gererSurvolBadge() {
        if (!this.heroBadge) return;
        
        this.heroBadge.style.transform = 'scale(1.1)';
        this.heroBadge.style.transition = 'transform 0.2s ease';
    }
    
    /**
     * Gère la sortie du badge
     */
    gererSortieBadge() {
        if (!this.heroBadge) return;
        
        this.heroBadge.style.transform = 'scale(1)';
    }
    
    /**
     * Gère le survol des boutons
     */
    gererSurvolBouton(evenement) {
        const bouton = evenement.currentTarget;
        bouton.style.transform = 'translateY(-2px)';
        bouton.style.transition = 'transform 0.2s ease';
    }
    
    /**
     * Gère la sortie des boutons
     */
    gererSortieBouton(evenement) {
        const bouton = evenement.currentTarget;
        bouton.style.transform = 'translateY(0)';
    }
    
    /**
     * Gère le redimensionnement pour le parallaxe
     */
    gererRedimensionnementParallaxe() {
        // Recalcule les positions après redimensionnement
        this.appliquerParallaxe();
    }
    
    /**
     * Active le mode performance
     */
    activerModePerformance() {
        this.config.performance = true;
        this.config.parallaxe = false;
        
        // Supprime les écouteurs de parallaxe
        window.removeEventListener('scroll', this.gererParallaxe);
        window.removeEventListener('resize', this.gererRedimensionnementParallaxe);
        
        console.log('⚡ Mode performance activé pour Hero');
    }
    
    /**
     * Désactive le mode performance
     */
    desactiverModePerformance() {
        this.config.performance = false;
        this.config.parallaxe = true;
        
        // Réactive le parallaxe
        this.configurerParallaxe();
        
        console.log('🎨 Mode performance désactivé pour Hero');
    }
    
    /**
     * Récupère l'état du composant
     */
    obtenirEtat() {
        return {
            estInitialise: this.estInitialise,
            estVisible: this.estVisible,
            config: this.config
        };
    }
    
    /**
     * Émet un événement personnalisé
     */
    emettreEvenement(nom, detail = {}) {
        const evenement = new CustomEvent(nom, { detail });
        this.heroSection?.dispatchEvent(evenement);
    }
    
    /**
     * Détruit le composant
     */
    detruire() {
        // Supprime les écouteurs d'événements
        window.removeEventListener('scroll', this.gererParallaxe);
        window.removeEventListener('resize', this.gererRedimensionnementParallaxe);
        
        // Annule l'animation frame en cours
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Désabonne l'observateur d'intersection
        if (this.observateurIntersection) {
            this.observateurIntersection.disconnect();
        }
        
        console.log('🗑️ Hero détruit');
    }
}

// Auto-initialisation si le composant existe
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.hero-section')) {
            window.ComposantHero = ComposantHero;
            window.hero = new ComposantHero();
        }
    });
} else {
    if (document.querySelector('.hero-section')) {
        window.ComposantHero = ComposantHero;
        window.hero = new ComposantHero();
    }
}

// Export pour utilisation en module si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComposantHero;
}