/**
 * FICHIER : sidebar-manager.js
 *
 * OBJECTIF :
 * Gestionnaire de sidebar réutilisable
 * Gère l'état actif des liens de navigation
 * Initialise le sidebar sur toutes les pages
 *
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 15 octobre 2025
 */

class SidebarManager {
    constructor() {
        this.currentPage = this.detectCurrentPage();
        this.init();
    }

    /**
     * Détecte la page actuelle basée sur l'URL
     */
    detectCurrentPage() {
        const path = window.location.pathname;
        
        if (path === '/' || path === '/index.html') {
            return 'accueil';
        } else if (path.includes('/dashboard.html')) {
            return 'dashboard';
        } else if (path.includes('/formations')) {
            return 'formations';
        } else if (path.includes('/about.html')) {
            return 'about';
        } else if (path.includes('/actualites.html')) {
            return 'actualites';
        } else if (path.includes('/admissions.html')) {
            return 'admissions';
        } else if (path.includes('/contact.html')) {
            return 'contact';
        }
        
        return 'accueil'; // Par défaut
    }

    /**
     * Initialise le sidebar
     */
    init() {
        this.setActiveLink();
        this.initThemeButton();
        this.initHelpButton();
        console.log(`✅ Sidebar initialisé - Page active: ${this.currentPage}`);
    }

    /**
     * Définit le lien actif dans la navigation
     */
    setActiveLink() {
        // Supprimer toutes les classes actives
        const allLinks = document.querySelectorAll('.sidebar-nav-link');
        allLinks.forEach(link => {
            link.classList.remove('actif');
            link.removeAttribute('aria-current');
        });

        // Ajouter la classe active au bon lien
        const activeLink = this.getActiveLink();
        if (activeLink) {
            activeLink.classList.add('actif');
            activeLink.setAttribute('aria-current', 'page');
        }
    }

    /**
     * Obtient le lien actif basé sur la page courante
     */
    getActiveLink() {
        const linkMap = {
            'accueil': '/index.html',
            'dashboard': '/pages/dashboard.html',
            'formations': '/pages/formations/index.html',
            'about': '/pages/about.html',
            'actualites': '/pages/actualites.html',
            'admissions': '/pages/admissions.html',
            'contact': '/pages/contact.html'
        };

        const targetUrl = linkMap[this.currentPage];
        if (targetUrl) {
            return document.querySelector(`.sidebar-nav-link[href="${targetUrl}"]`);
        }
        
        return null;
    }

    /**
     * Initialise le bouton de thème
     */
    initThemeButton() {
        const themeButton = document.getElementById('bouton-theme-dynamique');
        if (themeButton && window.gestionnaireThemes) {
            themeButton.addEventListener('click', () => {
                window.gestionnaireThemes.changerTheme();
                this.updateThemeIcon();
            });
        }
    }

    /**
     * Met à jour l'icône du thème
     */
    updateThemeIcon() {
        const icon = document.querySelector('.icone-theme-dynamique');
        if (icon && window.gestionnaireThemes) {
            const currentTheme = window.gestionnaireThemes.obtenirThemeActuel();
            
            if (currentTheme === 'sombre') {
                icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
            } else {
                icon.innerHTML = `
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                `;
            }
        }
    }

    /**
     * Initialise le bouton d'aide
     */
    initHelpButton() {
        const helpButton = document.querySelector('.sidebar-aide-bouton');
        if (helpButton) {
            helpButton.addEventListener('click', () => {
                window.location.href = '/pages/contact.html';
            });
        }
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    if (typeof SidebarManager !== 'undefined') {
        window.sidebarManager = new SidebarManager();
    }
});