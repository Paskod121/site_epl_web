/**
 * GESTIONNAIRE GLOBAL DU BOUTON DE THÈME
 * 
 * Ce script assure que le bouton de thème fonctionne sur toutes les pages,
 * même celles qui utilisent le composant sidebar dynamique.
 * 
 * PROBLÈME RÉSOLU :
 * - Les pages avec sidebar dynamique n'avaient pas de bouton de thème fonctionnel
 * - Conflits entre boutons intégrés et composant sidebar
 * - Timing d'initialisation des composants
 * 
 * SOLUTION :
 * - Détection automatique du bouton de thème sur toutes les pages
 * - Gestion des conflits d'événements
 * - Retry automatique si le composant n'est pas encore chargé
 * 
 * POUR L'ÉQUIPE :
 * - Importer ce fichier après themes.js
 * - Fonctionne automatiquement, pas de configuration nécessaire
 * - Logs détaillés pour le debug
 * 
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 18 Octobre 2025
 */
class GestionnaireThemeGlobal {
    constructor() {
        this.boutonConfigure = false;
        this.init();
    }

    /**
     * Initialise le gestionnaire global
     */
    init() {
        console.log('🌍 GestionnaireThemeGlobal initialisé');
        
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.configurerBoutonTheme());
        } else {
            this.configurerBoutonTheme();
        }
    }

    /**
     * Configure le bouton de thème
     */
    configurerBoutonTheme() {
        if (this.boutonConfigure) {
            console.log('⚠️ Bouton de thème déjà configuré');
            return;
        }

        console.log('🔍 Recherche du bouton de thème...');
        
        // Chercher le bouton de thème
        const boutonTheme = document.getElementById('bouton-theme-dynamique');
        
        if (boutonTheme) {
            console.log('✅ Bouton de thème trouvé');
            
            // Vérifier si le gestionnaire de thèmes est disponible
            if (typeof GestionnaireThemes !== 'undefined') {
                console.log('✅ GestionnaireThemes disponible');
                
                // Initialiser le gestionnaire de thèmes s'il n'existe pas encore
                if (!window.gestionnaireThemes) {
                    window.gestionnaireThemes = new GestionnaireThemes();
                    console.log('✅ Gestionnaire de thèmes initialisé globalement');
                }
                
                // Supprimer tous les anciens écouteurs d'événements
                const nouveauBouton = boutonTheme.cloneNode(true);
                boutonTheme.parentNode.replaceChild(nouveauBouton, boutonTheme);
                
                // Gestion du clic sur le bouton de thème
                nouveauBouton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🎨 Clic sur le bouton de thème détecté (global)');
                    
                    if (window.gestionnaireThemes) {
                        console.log('🔄 Appel de changerTheme()...');
                        window.gestionnaireThemes.changerTheme();
                        this.mettreAJourIconeTheme();
                    } else {
                        console.error('❌ Gestionnaire de thèmes non disponible');
                    }
                });
                
                // Initialiser l'icône du thème
                this.mettreAJourIconeTheme();
                
                this.boutonConfigure = true;
                console.log('✅ Bouton de thème configuré globalement avec succès');
            } else {
                console.log('⏳ Gestionnaire de thèmes pas encore chargé, réessai dans 300ms...');
                setTimeout(() => this.configurerBoutonTheme(), 300);
            }
        } else {
            console.log('⏳ Bouton de thème pas encore chargé, réessai dans 300ms...');
            setTimeout(() => this.configurerBoutonTheme(), 300);
        }
    }

    /**
     * Met à jour l'icône du thème
     */
    mettreAJourIconeTheme() {
        const iconeTheme = document.querySelector('.icone-theme-dynamique');
        if (iconeTheme && window.gestionnaireThemes) {
            const themeActuel = window.gestionnaireThemes.obtenirThemeActuel();
            console.log('🎨 Thème actuel:', themeActuel);

            if (themeActuel === 'sombre') {
                iconeTheme.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
            } else {
                iconeTheme.innerHTML = `
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                `;
            }
        }
    }
}

// Initialiser le gestionnaire global
window.gestionnaireThemeGlobal = new GestionnaireThemeGlobal();