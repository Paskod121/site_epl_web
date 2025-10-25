/**
 * FICHIER : index.js - Page d'accueil
 * 
 * OBJECTIF : 
 * Gestion du sidebar et des interactions pour la page d'accueil
 * Compatible avec le système de thèmes
 * 
 * DÉPENDANCES :
 * - js/utils/themes.js (gestion des thèmes)
 * - js/components/sidebar.js (gestion du sidebar)
 * 
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 15 octobre 2025
 */

// Initialisation du sidebar et des thèmes
document.addEventListener('DOMContentLoaded', function() {
    console.log(' Initialisation de la page d\'accueil');
    
    // Initialiser le gestionnaire de thèmes
    if (typeof GestionnaireThemes !== 'undefined') {
        window.gestionnaireThemes = new GestionnaireThemes();
        console.log('✅ Gestionnaire de thèmes initialisé');
    }
    
    // Initialiser le sidebar
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
        });
    }
    
    // Gestion du bouton d'aide dans la sidebar
    const boutonAide = document.querySelector('.sidebar-aide-bouton');
    if (boutonAide) {
        boutonAide.addEventListener('click', function() {
            console.log('💬 Redirection vers contact');
            window.location.href = '/pages/contact.html';
        });
    }
    
    console.log('✅ Page d\'accueil initialisée avec succès');
});