/**
 * FICHIER : Sidebar.js
 *
 * OBJECTIF :
 * Composant sidebar de navigation réutilisable
 * Gestion des interactions, responsive, accessibilité
 * Compatible avec tous les thèmes
 *
 * DÉPENDANCES :
 * - css/components/sidebar.css (styles)
 * - js/utils/themes.js (gestionnaire de thèmes)
 *
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 15 octobre 2025
 */

/**
 * COMPOSANT SIDEBAR DE NAVIGATION
 *
 * FONCTIONNALITÉS :
 * - Navigation responsive avec overlay mobile
 * - Gestion des états actifs selon la page
 * - Support clavier complet (accessibilité)
 * - Animations fluides d'ouverture/fermeture
 * - Intégration avec le système de thèmes
 * - Auto-détection de la page active
 *
 * UTILISATION :
 * - S'initialise automatiquement au chargement
 * - Compatible avec toutes les pages
 * - Gère les changements de thème automatiquement
 */
class ComposantSidebar {
    constructor() {
        // Éléments DOM principaux
        this.sidebar = document.getElementById('sidebar');
        this.overlay = document.getElementById('sidebar-overlay');
        this.boutonToggle = document.getElementById('bouton-toggle-sidebar');

        // État de la sidebar
        this.estOuverte = false;
        this.estCompacte = false;

        // Configuration responsive
        this.breakpointMobile = 768;
        this.breakpointTablet = 1024;

        // Initialisation
        this.initialiser();

        console.log('🧭 Sidebar initialisée');
    }

    /**
     * Initialise le composant sidebar
     * Configure tous les événements et comportements
     */
    initialiser() {
        // Vérifie que la sidebar existe
        if (!this.sidebar) {
            console.warn('⚠️ Élément sidebar non trouvé');
            return;
        }
        
        // ÉTAT INITIAL : Sidebar fermée par défaut (système original)
        this.sidebar.classList.remove('ouvert');
        this.estOuverte = false;
        
        // Masque l'overlay par défaut
        if (this.overlay) {
            this.overlay.classList.remove('visible');
        }
        
        // Configure les événements
        this.configurerEvenements();
        
        // Détermine la page active
        this.determinerPageActive();
        
        // Configure le responsive
        this.configurerResponsive();
        
        // Intègre avec le système de thèmes
        this.integrerAvecThemes();
        
        // Ajoute les animations d'entrée
        this.ajouterAnimationsEntree();
    }
    
    /**
     * Configure tous les événements de la sidebar
     */
    configurerEvenements() {
        // Bouton toggle (hamburger)
        if (this.boutonToggle) {
            this.boutonToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
        
        // Overlay pour fermer sur mobile
        if (this.overlay) {
            this.overlay.addEventListener('click', () => {
                this.fermerSidebar();
            });
        }
        
        // Navigation clavier
        this.configurerNavigationClavier();
        
        // Redimensionnement de fenêtre
        window.addEventListener('resize', this.gererRedimensionnement.bind(this));
        
        // Échapper pour fermer
        document.addEventListener('keydown', this.gererTouches.bind(this));
    }
    
    /**
     * Configure la navigation au clavier pour l'accessibilité
     */
    configurerNavigationClavier() {
        const liensNavigation = this.sidebar.querySelectorAll('.sidebar-nav-link');
        
        liensNavigation.forEach((lien, index) => {
            // Gestion des touches fléchées
            lien.addEventListener('keydown', (evenement) => {
                switch (evenement.key) {
                    case 'ArrowDown':
                        evenement.preventDefault();
                        this.focuserLienSuivant(index, liensNavigation);
                        break;
                    case 'ArrowUp':
                        evenement.preventDefault();
                        this.focuserLienPrecedent(index, liensNavigation);
                        break;
                    case 'Home':
                        evenement.preventDefault();
                        liensNavigation[0].focus();
                        break;
                    case 'End':
                        evenement.preventDefault();
                        liensNavigation[liensNavigation.length - 1].focus();
                        break;
                }
            });
        });
    }
    
    /**
     * Focus sur le lien suivant
     * 
     * @param {number} indexActuel - Index du lien actuel
     * @param {NodeList} liens - Liste de tous les liens
     */
    focuserLienSuivant(indexActuel, liens) {
        const indexSuivant = (indexActuel + 1) % liens.length;
        liens[indexSuivant].focus();
    }
    
    /**
     * Focus sur le lien précédent
     * 
     * @param {number} indexActuel - Index du lien actuel
     * @param {NodeList} liens - Liste de tous les liens
     */
    focuserLienPrecedent(indexActuel, liens) {
        const indexPrecedent = indexActuel === 0 ? liens.length - 1 : indexActuel - 1;
        liens[indexPrecedent].focus();
    }
    
    /**
     * Gère les touches globales (Echap, etc.)
     * 
     * @param {KeyboardEvent} evenement - L'événement clavier
     */
    gererTouches(evenement) {
        // Échap pour fermer la sidebar
        if (evenement.key === 'Escape' && this.estOuverte) {
            this.fermerSidebar();
        }
    }
    
    /**
     * Gère le redimensionnement de la fenêtre
     */
    gererRedimensionnement() {
        const largeurFenetre = window.innerWidth;
        
        if (largeurFenetre >= this.breakpointMobile) {
            // Desktop/Tablet : sidebar toujours visible
            this.fermerSidebar();
        }
    }
    
    /**
     * Ouvre la sidebar
     */
    ouvrirSidebar() {
        if (this.estOuverte) return;
        
        this.estOuverte = true;
        this.sidebar.classList.add('ouvert');
        
        // Overlay seulement sur mobile
        if (this.overlay && window.innerWidth < this.breakpointMobile) {
            this.overlay.classList.add('visible');
            this.overlay.style.pointerEvents = 'auto'; // Active les clics sur mobile
        }
        
        // Focus sur le premier lien pour l'accessibilité
        const premierLien = this.sidebar.querySelector('.sidebar-nav-link');
        if (premierLien) {
            premierLien.focus();
        }
        
        // Émet un événement personnalisé
        window.dispatchEvent(new CustomEvent('sidebar-ouverte', {
            detail: { sidebar: this.sidebar }
        }));
        
        console.log('🧭 Sidebar ouverte');
    }
    
    /**
     * Ferme la sidebar
     */
    fermerSidebar() {
        if (!this.estOuverte) return;
        
        this.estOuverte = false;
        this.sidebar.classList.remove('ouvert');
        
        if (this.overlay) {
            this.overlay.classList.remove('visible');
            this.overlay.style.pointerEvents = 'none'; // Désactive les clics
        }
        
        // Retourne le focus au bouton toggle
        if (this.boutonToggle) {
            this.boutonToggle.focus();
        }
        
        // Émet un événement personnalisé
        window.dispatchEvent(new CustomEvent('sidebar-fermee', {
            detail: { sidebar: this.sidebar }
        }));
        
        console.log('🧭 Sidebar fermée');
    }
    
    /**
     * Toggle l'état ouvert/fermé de la sidebar
     */
    toggleSidebar() {
        if (this.estOuverte) {
            this.fermerSidebar();
        } else {
            this.ouvrirSidebar();
        }
    }
    
    /**
     * Détermine quelle page est active et met à jour la navigation
     */
    determinerPageActive() {
        const cheminActuel = window.location.pathname;
        const liensNavigation = this.sidebar.querySelectorAll('.sidebar-nav-link');
        
        // Retire la classe active de tous les liens
        liensNavigation.forEach(lien => {
            lien.classList.remove('actif');
        });
        
        // Trouve le lien correspondant à la page actuelle
        liensNavigation.forEach(lien => {
            const href = lien.getAttribute('href');
            
            if (href && this.estPageActive(cheminActuel, href)) {
                lien.classList.add('actif');
                
                // Scroll vers le lien actif si nécessaire
                lien.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        });
    }
    
    /**
     * Vérifie si une page est active
     * 
     * @param {string} cheminActuel - Le chemin actuel
     * @param {string} href - Le href du lien
     * @returns {boolean} True si la page est active
     */
    estPageActive(cheminActuel, href) {
        // Normalise les chemins
        const cheminNormalise = cheminActuel.replace(/\/$/, '') || '/';
        const hrefNormalise = href.replace(/\/$/, '') || '/';
        
        // Page d'accueil
        if (cheminNormalise === '/' && hrefNormalise === '/') {
            return true;
        }
        
        // Pages spécifiques
        if (cheminNormalise.includes(hrefNormalise) && hrefNormalise !== '/') {
            return true;
        }
        
        return false;
    }
    
    /**
     * Configure le comportement responsive
     */
    configurerResponsive() {
        const largeurFenetre = window.innerWidth;
        
        if (largeurFenetre < this.breakpointMobile) {
            // Mobile : sidebar masquée par défaut
            this.sidebar.classList.add('mobile');
        } else {
            // Desktop : sidebar visible
            this.sidebar.classList.remove('mobile');
        }
    }
    
    /**
     * Intègre la sidebar avec le système de thèmes
     */
    integrerAvecThemes() {
        // Écoute les changements de thème
        window.addEventListener('changement-theme', (evenement) => {
            const nouveauTheme = evenement.detail.theme;
            console.log(`🎨 Sidebar adaptée au thème : ${nouveauTheme}`);
            
            // Met à jour les attributs ARIA si nécessaire
            this.mettreAJourAttributsAria();
        });
    }
    
    /**
     * Met à jour les attributs ARIA pour l'accessibilité
     */
    mettreAJourAttributsAria() {
        // Met à jour l'état de la sidebar
        this.sidebar.setAttribute('aria-expanded', this.estOuverte);
        
        // Met à jour les liens de navigation
        const liensNavigation = this.sidebar.querySelectorAll('.sidebar-nav-link');
        liensNavigation.forEach(lien => {
            const estActif = lien.classList.contains('actif');
            lien.setAttribute('aria-current', estActif ? 'page' : 'false');
        });
    }
    
    /**
     * Ajoute les animations d'entrée
     */
    ajouterAnimationsEntree() {
        // Ajoute la classe d'animation
        this.sidebar.classList.add('animation-entree');
        
        // Retire la classe après l'animation
        setTimeout(() => {
            this.sidebar.classList.remove('animation-entree');
        }, 300);
    }
    
    /**
     * Active le mode compact
     */
    activerModeCompact() {
        this.estCompacte = true;
        this.sidebar.classList.add('compact');
        
        console.log('🧭 Mode compact activé');
    }
    
    /**
     * Désactive le mode compact
     */
    desactiverModeCompact() {
        this.estCompacte = false;
        this.sidebar.classList.remove('compact');
        
        console.log('🧭 Mode compact désactivé');
    }
    
    /**
     * Toggle le mode compact
     */
    toggleModeCompact() {
        if (this.estCompacte) {
            this.desactiverModeCompact();
        } else {
            this.activerModeCompact();
        }
    }
    
    /**
     * Récupère l'état actuel de la sidebar
     * 
     * @returns {Object} État de la sidebar
     */
    obtenirEtat() {
        return {
            estOuverte: this.estOuverte,
            estCompacte: this.estCompacte,
            largeurFenetre: window.innerWidth,
            pageActive: this.obtenirPageActive()
        };
    }
    
    /**
     * Récupère la page actuellement active
     * 
     * @returns {string} Nom de la page active
     */
    obtenirPageActive() {
        const lienActif = this.sidebar.querySelector('.sidebar-nav-link.actif');
        return lienActif ? lienActif.textContent.trim() : 'Inconnue';
    }
    
    /**
     * Détruit le composant et nettoie les événements
     */
    detruire() {
        // Retire tous les événements
        if (this.boutonToggle) {
            this.boutonToggle.removeEventListener('click', this.toggleSidebar);
        }
        
        if (this.overlay) {
            this.overlay.removeEventListener('click', this.fermerSidebar);
        }
        
        window.removeEventListener('resize', this.gererRedimensionnement);
        document.removeEventListener('keydown', this.gererTouches);
        
        console.log('🧭 Sidebar détruite');
    }
}

// Auto-initialisation si le DOM est chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ComposantSidebar = ComposantSidebar;
        window.sidebar = new ComposantSidebar();
    });
} else {
    window.ComposantSidebar = ComposantSidebar;
    window.sidebar = new ComposantSidebar();
}

// Export pour utilisation en module si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComposantSidebar;
}