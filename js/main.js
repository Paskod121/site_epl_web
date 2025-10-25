/**
 * FICHIER : Main.js
 * 
 * OBJECTIF : 
 * Fichier JavaScript principal de l'application
 * Initialisation des composants et gestion globale
 * Compatible avec tous les thèmes
 * 
 * DÉPENDANCES :
 * - js/utils/themes.js (gestionnaire de thèmes)
 * - js/components/sidebar.js (composant sidebar)
 * 
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 15 octobre 2025
 */

/**
 * APPLICATION PRINCIPALE EPL
 * 
 * FONCTIONNALITÉS :
 * - Initialisation de tous les composants
 * - Gestion des événements globaux
 * - Intégration avec le système de thèmes
 * - Gestion des erreurs et du chargement
 * 
 * UTILISATION :
 * - S'initialise automatiquement au chargement de la page
 * - Coordonne tous les composants de l'application
 */
class ApplicationEPL {
    constructor() {
        // État de l'application
        this.estInitialisee = false;
        this.composants = new Map();

        // Configuration
        this.config = {
            debug: true,
            performance: true,
            accessibilite: true
        };

        // Initialisation
        this.initialiser();

        console.log('🚀 Application EPL initialisée');
    }

    /**
     * Initialise l'application complète
     */
    async initialiser() {
        try {
            // Affiche l'indicateur de chargement
            this.afficherChargement();

            // Initialise les composants dans l'ordre
            await this.initialiserComposants();

            // Configure les événements globaux
            this.configurerEvenementsGlobaux();

            // Configure l'accessibilité
            this.configurerAccessibilite();

            // Configure les performances
            this.configurerPerformances();

            // Marque l'application comme initialisée
            this.estInitialisee = true;

            // Masque l'indicateur de chargement
            this.masquerChargement();

            // Émet l'événement d'initialisation
            this.emettreEvenement('application-initialisee');

            console.log('✅ Application EPL prête');

        } catch (erreur) {
            console.error('❌ Erreur lors de l\'initialisation :', erreur);
            this.gererErreur(erreur);
        }
    }

    /**
     * Initialise tous les composants de l'application
     */
    async initialiserComposants() {
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }

        // Initialise le gestionnaire de thèmes
        if (window.gestionnaireThemes) {
            this.composants.set('themes', window.gestionnaireThemes);
            console.log('🎨 Gestionnaire de thèmes initialisé');
        }

        // Initialise la sidebar
        if (window.sidebar) {
            this.composants.set('sidebar', window.sidebar);
            console.log('🧭 Sidebar initialisée');
        }

        // Initialise les autres composants si disponibles
        this.initialiserComposantsOptionnels();
    }

    /**
     * Initialise les composants optionnels
     */
    initialiserComposantsOptionnels() {
        // Composant Hero si disponible
        if (window.ComposantHero) {
            try {
                const hero = new window.ComposantHero();
                this.composants.set('hero', hero);
                console.log(' Hero initialisé');
            } catch (erreur) {
                console.warn('⚠️ Hero non disponible :', erreur);
            }
        }

        // Autres composants peuvent être ajoutés ici
    }

    /**
     * Configure les événements globaux
     */
    configurerEvenementsGlobaux() {
        // Événements de redimensionnement
        window.addEventListener('resize', this.gererRedimensionnement.bind(this));

        // Événements de scroll
        window.addEventListener('scroll', this.gererScroll.bind(this));

        // Événements de clavier
        document.addEventListener('keydown', this.gererClavier.bind(this));

        // Événements de changement de thème
        window.addEventListener('changement-theme', this.gererChangementTheme.bind(this));

        // Événements de visibilité de page
        document.addEventListener('visibilitychange', this.gererVisibilite.bind(this));

        console.log('🔧 Événements globaux configurés');
    }

    /**
     * Configure l'accessibilité
     */
    configurerAccessibilite() {
        if (!this.config.accessibilite) return;

        // Améliore la navigation au clavier
        this.ameliorerNavigationClavier();

        // Configure les attributs ARIA
        this.configurerAttributsAria();

        // Configure les annonces pour les lecteurs d'écran
        this.configurerAnnonces();

        console.log('♿ Accessibilité configurée');
    }

    /**
     * Améliore la navigation au clavier
     */
    ameliorerNavigationClavier() {
        // Gestion de la touche Tab
        document.addEventListener('keydown', (evenement) => {
            if (evenement.key === 'Tab') {
                document.body.classList.add('navigation-clavier');
            }
        });

        // Supprime la classe au clic
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('navigation-clavier');
        });
    }

    /**
     * Configure les attributs ARIA
     */
    configurerAttributsAria() {
        // Ajoute les attributs ARIA manquants
        const boutons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
        boutons.forEach(bouton => {
            if (!bouton.getAttribute('aria-label') && bouton.textContent.trim()) {
                bouton.setAttribute('aria-label', bouton.textContent.trim());
            }
        });

        // Configure les landmarks
        const main = document.querySelector('main');
        if (main && !main.getAttribute('role')) {
            main.setAttribute('role', 'main');
        }
    }

    /**
     * Configure les annonces pour les lecteurs d'écran
     */
    configurerAnnonces() {
        // Crée la région d'annonces
        const regionAnnonces = document.createElement('div');
        regionAnnonces.setAttribute('aria-live', 'polite');
        regionAnnonces.setAttribute('aria-atomic', 'true');
        regionAnnonces.className = 'sr-only';
        regionAnnonces.id = 'region-annonces';
        document.body.appendChild(regionAnnonces);
    }

    /**
     * Configure les performances
     */
    configurerPerformances() {
        if (!this.config.performance) return;

        // Lazy loading des images
        this.configurerLazyLoading();

        // Preload des ressources critiques
        this.preloadRessourcesCritiques();

        // Optimisation des animations
        this.optimiserAnimations();

        console.log('⚡ Performances configurées');
    }

    /**
     * Configure le lazy loading des images
     */
    configurerLazyLoading() {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => observer.observe(img));
        }
    }

    /**
     * Preload des ressources critiques
     */
    preloadRessourcesCritiques() {
        // Preload des polices
        const polices = [
            '/assets/fonts/inter.woff2',
            '/assets/fonts/inter-bold.woff2'
        ];

        polices.forEach(police => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = police;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    /**
     * Optimise les animations
     */
    optimiserAnimations() {
        // Utilise requestAnimationFrame pour les animations
        let ticking = false;

        const optimiserAnimation = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Logique d'animation ici
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Applique l'optimisation aux événements de scroll
        window.addEventListener('scroll', optimiserAnimation);
    }

    /**
     * Gère le redimensionnement de la fenêtre
     */
    gererRedimensionnement() {
        // Notifie tous les composants du redimensionnement
        this.composants.forEach(composant => {
            if (composant.gererRedimensionnement) {
                composant.gererRedimensionnement();
            }
        });

        // Émet un événement personnalisé
        window.dispatchEvent(new CustomEvent('redimensionnement', {
            detail: {
                largeur: window.innerWidth,
                hauteur: window.innerHeight
            }
        }));
    }

    /**
     * Gère le scroll de la page
     */
    gererScroll() {
        // Performance : utilise requestAnimationFrame
        if (!this.scrollTicking) {
            requestAnimationFrame(() => {
                // Logique de scroll ici
                this.scrollTicking = false;
            });
            this.scrollTicking = true;
        }
    }

    /**
     * Gère les événements clavier
     */
    gererClavier(evenement) {
        // Raccourcis globaux
        if (evenement.ctrlKey || evenement.metaKey) {
            switch (evenement.key) {
                case 'k':
                    evenement.preventDefault();
                    this.ouvrirRecherche();
                    break;
                case '/':
                    evenement.preventDefault();
                    this.ouvrirAide();
                    break;
            }
        }

        // Échap pour fermer les modales
        if (evenement.key === 'Escape') {
            this.fermerModales();
        }
    }

    /**
     * Gère les changements de thème
     */
    gererChangementTheme(evenement) {
        const nouveauTheme = evenement.detail.theme;

        // Notifie tous les composants du changement
        this.composants.forEach(composant => {
            if (composant.gererChangementTheme) {
                composant.gererChangementTheme(nouveauTheme);
            }
        });

        // Annonce le changement aux lecteurs d'écran
        this.annoncer(`Thème changé vers ${nouveauTheme}`);
    }

    /**
     * Gère les changements de visibilité de la page
     */
    gererVisibilite() {
        if (document.hidden) {
            // Page masquée : pause des animations
            document.body.classList.add('page-masquee');
        } else {
            // Page visible : reprend les animations
            document.body.classList.remove('page-masquee');
        }
    }

    /**
     * Affiche l'indicateur de chargement
     */
    afficherChargement() {
        // Crée l'indicateur de chargement
        const loader = document.createElement('div');
        loader.id = 'loader-app';
        loader.className = 'loader-app';
        loader.innerHTML = `
            <div class="loader-spinner"></div>
            <p class="loader-texte">Chargement de l'application...</p>
        `;

        // Ajoute les styles
        const style = document.createElement('style');
        style.textContent = `
            .loader-app {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: var(--couleur-fond-principal);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.3s ease;
            }
            .loader-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid var(--couleur-bordure);
                border-top: 4px solid var(--couleur-primaire);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            .loader-texte {
                margin-top: 16px;
                color: var(--couleur-texte-secondaire);
                font-size: 14px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(loader);
    }

    /**
     * Masque l'indicateur de chargement
     */
    masquerChargement() {
        const loader = document.getElementById('loader-app');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 300);
        }
    }

    /**
     * Gère les erreurs de l'application
     */
    gererErreur(erreur) {
        console.error('❌ Erreur application :', erreur);

        // Affiche un message d'erreur à l'utilisateur
        this.afficherMessageErreur('Une erreur est survenue. Veuillez recharger la page.');

        // Envoie l'erreur au service de monitoring (si configuré)
        if (this.config.debug) {
            this.envoyerErreur(erreur);
        }
    }

    /**
     * Affiche un message d'erreur
     */
    afficherMessageErreur(message) {
        const regionAnnonces = document.getElementById('region-annonces');
        if (regionAnnonces) {
            regionAnnonces.textContent = message;
        }
    }

    /**
     * Annonce un message aux lecteurs d'écran
     */
    annoncer(message) {
        const regionAnnonces = document.getElementById('region-annonces');
        if (regionAnnonces) {
            regionAnnonces.textContent = message;
        }
    }

    /**
     * Émet un événement personnalisé
     */
    emettreEvenement(nom, detail = {}) {
        window.dispatchEvent(new CustomEvent(nom, { detail }));
    }

    /**
     * Ouvre la recherche
     */
    ouvrirRecherche() {
        // Implémentation de la recherche
        console.log('🔍 Ouverture de la recherche');
    }

    /**
     * Ouvre l'aide
     */
    ouvrirAide() {
        // Implémentation de l'aide
        console.log('❓ Ouverture de l'aide');
    }

    /**
     * Ferme toutes les modales
     */
    fermerModales() {
        // Ferme toutes les modales ouvertes
        const modales = document.querySelectorAll('.modal.ouvert');
        modales.forEach(modal => {
            modal.classList.remove('ouvert');
        });
    }

    /**
     * Récupère un composant par nom
     */
    obtenirComposant(nom) {
        return this.composants.get(nom);
    }

    /**
     * Récupère l'état de l'application
     */
    obtenirEtat() {
        return {
            estInitialisee: this.estInitialisee,
            composants: Array.from(this.composants.keys()),
            config: this.config
        };
    }

    /**
     * Détruit l'application
     */
    detruire() {
        // Détruit tous les composants
        this.composants.forEach(composant => {
            if (composant.detruire) {
                composant.detruire();
            }
        });

        // Nettoie les événements
        window.removeEventListener('resize', this.gererRedimensionnement);
        window.removeEventListener('scroll', this.gererScroll);
        document.removeEventListener('keydown', this.gererClavier);

        console.log('🗑️ Application EPL détruite');
    }
}

// Auto-initialisation de l'application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.appEPL = new ApplicationEPL();
    });
} else {
    window.appEPL = new ApplicationEPL();
}

// Export pour utilisation en module si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApplicationEPL;
}