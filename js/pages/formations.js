/**
 * FICHIER : formations.js
 *
 * OBJECTIF :
 * Gestion des interactions spécifiques à la page formations
 * Initialisation du sidebar et du système de thème
 *
 * DÉPENDANCES :
 * - js/utils/themes.js (GestionnaireThemes)
 * - js/components/sidebar.js (SidebarManager)
 *
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 15 octobre 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log(' Page formations chargée');

    // Initialiser le gestionnaire de thèmes
    if (typeof GestionnaireThemes !== 'undefined') {
        window.gestionnaireThemes = new GestionnaireThemes();
        console.log('✅ Gestionnaire de thèmes initialisé');
    }

    // Initialiser le gestionnaire de sidebar
    if (typeof SidebarManager !== 'undefined') {
        window.sidebarManager = new SidebarManager();
        console.log('✅ Gestionnaire de sidebar initialisé');
    }

    // Gestion du bouton de thème dans la sidebar
    const boutonTheme = document.getElementById('bouton-theme-dynamique');
    if (boutonTheme && window.gestionnaireThemes) {
        boutonTheme.addEventListener('click', function() {
            console.log('🎨 Changement de thème demandé');
            window.gestionnaireThemes.changerTheme();
            // Mettre à jour l'icône du thème
            mettreAJourIconeTheme();
        });
    }

    // Fonction pour mettre à jour l'icône du thème
    function mettreAJourIconeTheme() {
        const iconeTheme = document.querySelector('.icone-theme-dynamique');
        if (iconeTheme && window.gestionnaireThemes) {
            const themeActuel = window.gestionnaireThemes.obtenirThemeActuel();
            console.log('🎨 Thème actuel:', themeActuel);

            // Mettre à jour l'icône selon le thème
            if (themeActuel === 'sombre') {
                iconeTheme.innerHTML = `
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                `;
            } else {
                iconeTheme.innerHTML = `
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                `;
            }
        }
    }

    // Gestion du bouton d'aide dans la sidebar
    const boutonAide = document.querySelector('.sidebar-aide-bouton');
    if (boutonAide) {
        boutonAide.addEventListener('click', function() {
            console.log('💬 Redirection vers contact');
            window.location.href = '/pages/contact.html';
        });
    }

    // Initialiser l'icône du thème
    mettreAJourIconeTheme();

    console.log('✅ Page formations initialisée avec succès');
});