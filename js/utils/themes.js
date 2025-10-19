/**
 * GESTIONNAIRE DE THÈMES - Système de thèmes clair/sombre
 *
 * Ce module gère le changement de thème sur toutes les pages du site EPL.
 * Il utilise les variables CSS définies dans /css/base/variables.css
 *
 * FONCTIONNEMENT :
 * - Sauvegarde automatique du choix utilisateur dans localStorage
 * - Détection de la préférence système au premier chargement
 * - Application immédiate du thème sans rechargement de page
 * - Émission d'événements pour synchroniser les composants
 *
 * POUR L'ÉQUIPE :
 * - Importer ce fichier dans chaque page HTML
 * - Le thème s'applique automatiquement au chargement
 * - Utiliser window.gestionnaireThemes.changerTheme() pour changer le thème
 * - Écouter l'événement 'themeChanged' pour réagir aux changements
 *
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 18 Octobre 2025
 */
class GestionnaireThemes {
    constructor() {
        // Configuration des thèmes disponibles (ordre de rotation)
        this.themesDisponibles = ["clair", "sombre"];

        // Récupération du thème sauvegardé ou détection automatique
        this.themeActuel = this.obtenirThemeSauvegarde();

        // Application immédiate du thème au chargement de la page
        this.appliquerTheme(this.themeActuel);

        // Configuration des boutons de thème sur la page
        this.configurerBoutonsTheme();

        // Écoute des changements de préférence système (dark/light mode)
        this.configurerDetectionSysteme();

        console.log(`🎨 Thème initialisé : ${this.themeActuel}`);
    }

    /**
     * Récupère le thème depuis le localStorage
     * Si aucun thème sauvegardé, utilise la préférence système
     *
     * @returns {string} Le nom du thème à appliquer
     */
    obtenirThemeSauvegarde() {
        // Récupère le thème sauvegardé dans le localStorage
        const themeSauvegarde = localStorage.getItem("theme-prefere-epl");

        // Vérifie que le thème sauvegardé est valide
        if (themeSauvegarde && this.themesDisponibles.includes(themeSauvegarde)) {
            return themeSauvegarde;
        }

        // Détecte si l'utilisateur préfère le mode sombre via les préférences système
        const prefereSombre = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const prefereContraste = window.matchMedia(
            "(prefers-contrast: high)"
        ).matches;

        // Logique de sélection du thème par défaut
        if (prefereContraste) {
            return "clair"; // Contraste élevé = thème clair
        } else if (prefereSombre) {
            return "sombre"; // Mode sombre préféré
        } else {
            return "clair"; // Par défaut, thème clair
        }
    }

    /**
     * Applique un thème à la page avec gestion d'erreurs robuste
     *
     * @param {string} nomTheme - 'clair', 'sombre' ou 'doux'
     * @returns {boolean} True si le thème a été appliqué avec succès
     */
    appliquerTheme(nomTheme) {
        console.log(`🎨 [GestionnaireThemes] Application du thème "${nomTheme}"`);

        try {
            // Valide que le thème existe
            if (!this.themesDisponibles.includes(nomTheme)) {
                console.error(
                    `❌ Thème "${nomTheme}" invalide. Thèmes disponibles :`,
                    this.themesDisponibles
                );
                return false;
            }

            // Vérifie que le DOM est prêt
            if (!document.documentElement) {
                console.error("❌ Élément HTML non disponible");
                return false;
            }

            // Applique l'attribut data-theme sur l'élément HTML
            document.documentElement.setAttribute("data-theme", nomTheme);
            console.log(
                `✅ [GestionnaireThemes] Attribut data-theme="${nomTheme}" appliqué`
            );

            // Sauvegarde le choix dans le localStorage avec gestion d'erreur
            try {
                localStorage.setItem("theme-prefere-epl", nomTheme);
                console.log(
                    `💾 [GestionnaireThemes] Thème sauvegardé dans localStorage`
                );
            } catch (erreurLocalStorage) {
                console.warn(
                    "⚠️ Impossible de sauvegarder le thème dans localStorage:",
                    erreurLocalStorage
                );
                // Continue même si la sauvegarde échoue
            }

            // Met à jour le thème actuel
            this.themeActuel = nomTheme;

            // Met à jour l'état visuel des boutons de thème
            this.mettreAJourBoutonsTheme();

            // Émet un événement personnalisé pour les autres composants
            try {
                window.dispatchEvent(
                    new CustomEvent("changement-theme", {
                        detail: {
                            theme: nomTheme,
                            timestamp: Date.now(),
                        },
                    })
                );
            } catch (erreurEvenement) {
                console.warn(
                    "⚠️ Erreur lors de l'émission de l'événement:",
                    erreurEvenement
                );
            }

            // Animation du changement de thème
            if (typeof animateurEPL !== "undefined") {
                animateurEPL.animerChangementTheme(nomTheme);
            }

            console.log(`🎨 Thème changé vers : ${nomTheme}`);
            return true;
        } catch (erreur) {
            console.error("❌ Erreur lors de l'application du thème:", erreur);

            // Fallback vers le thème clair en cas d'erreur
            try {
                document.documentElement.setAttribute("data-theme", "clair");
                this.themeActuel = "clair";
                console.log("🔄 Fallback vers le thème clair");
            } catch (erreurFallback) {
                console.error("❌ Erreur critique lors du fallback:", erreurFallback);
            }

            return false;
        }
    }

    /**
     * Change vers le thème suivant (rotation circulaire)
     * clair => sombre => clair ...
     */
    changerThemeSuivant() {
        const indexActuel = this.themesDisponibles.indexOf(this.themeActuel);
        const indexSuivant = (indexActuel + 1) % this.themesDisponibles.length;
        const themeSuivant = this.themesDisponibles[indexSuivant];

        this.appliquerTheme(themeSuivant);
    }

    /**
     * Change de thème (méthode principale utilisée par les boutons)
     * Alterne entre clair et sombre
     */
    changerTheme() {
        console.log(`🔄 [GestionnaireThemes] Changement de thème demandé`);
        console.log(`📊 [GestionnaireThemes] Thème actuel: ${this.themeActuel}`);

        const nouveauTheme = this.themeActuel === "clair" ? "sombre" : "clair";
        console.log(`🎯 [GestionnaireThemes] Nouveau thème: ${nouveauTheme}`);

        this.appliquerTheme(nouveauTheme);
    }

    /**
     * Change vers un thème spécifique
     *
     * @param {string} nomTheme - Le thème à appliquer
     */
    changerVersTheme(nomTheme) {
        this.appliquerTheme(nomTheme);
    }

    /**
     * Récupère le thème actuellement appliqué
     *
     * @returns {string} Le nom du thème actuel
     */
    obtenirThemeActuel() {
        return this.themeActuel;
    }

    /**
     * Récupère la liste des thèmes disponibles
     *
     * @returns {string[]} Liste des thèmes
     */
    obtenirThemesDisponibles() {
        return [...this.themesDisponibles];
    }

    /**
     * Configure les boutons de thème s'ils existent
     * Recherche automatiquement les boutons avec data-theme-cible
     */
    configurerBoutonsTheme() {
        // Recherche tous les boutons de thème
        const boutonsTheme = document.querySelectorAll("[data-theme-cible]");

        boutonsTheme.forEach((bouton) => {
            // Supprime les anciens événements pour éviter les doublons
            bouton.removeEventListener("click", this.gererClicBoutonTheme);

            // Ajoute le nouvel événement
            bouton.addEventListener("click", this.gererClicBoutonTheme.bind(this));
        });

        // Met à jour l'état visuel des boutons
        this.mettreAJourBoutonsTheme();
    }

    /**
     * Gère le clic sur un bouton de thème
     *
     * @param {Event} evenement - L'événement de clic
     */
    gererClicBoutonTheme(evenement) {
        const themeCible = evenement.currentTarget.dataset.themeCible;

        if (themeCible && this.themesDisponibles.includes(themeCible)) {
            this.changerVersTheme(themeCible);
        } else {
            console.error(`❌ Thème cible invalide : ${themeCible}`);
        }
    }

    /**
     * Met à jour l'état visuel des boutons de thème
     * Ajoute la classe 'actif' au bouton du thème actuel
     */
    mettreAJourBoutonsTheme() {
        const boutonsTheme = document.querySelectorAll("[data-theme-cible]");

        boutonsTheme.forEach((bouton) => {
            const themeBouton = bouton.dataset.themeCible;

            // Retire la classe actif de tous les boutons
            bouton.classList.remove("actif");

            // Ajoute la classe actif au bouton du thème actuel
            if (themeBouton === this.themeActuel) {
                bouton.classList.add("actif");
            }
        });
    }

    /**
     * Configure la détection des changements de préférence système
     * Permet de changer automatiquement le thème si l'utilisateur change ses préférences
     */
    configurerDetectionSysteme() {
        // Écoute les changements de préférence de couleur
        const mediaQuerySombre = window.matchMedia("(prefers-color-scheme: dark)");
        const mediaQueryContraste = window.matchMedia("(prefers-contrast: high)");

        // Fonction de gestion des changements
        const gererChangementPreference = () => {
            // Ne change le thème que si aucun thème n'a été explicitement choisi
            const themeExplicite = localStorage.getItem("theme-prefere-epl");

            if (!themeExplicite) {
                // Recalcule le thème par défaut basé sur les nouvelles préférences
                const nouveauTheme = this.obtenirThemeSauvegarde();
                this.appliquerTheme(nouveauTheme);
            }
        };

        // Ajoute les écouteurs d'événements
        mediaQuerySombre.addEventListener("change", gererChangementPreference);
        mediaQueryContraste.addEventListener("change", gererChangementPreference);
    }

    /**
     * Réinitialise le thème aux préférences système
     * Supprime le choix sauvegardé et recalcule le thème par défaut
     */
    reinitialiserTheme() {
        // Supprime le thème sauvegardé
        localStorage.removeItem("theme-prefere-epl");

        // Recalcule le thème par défaut
        const themeParDefaut = this.obtenirThemeSauvegarde();
        this.appliquerTheme(themeParDefaut);

        console.log("🔄 Thème réinitialisé aux préférences système");
    }

    /**
     * Vérifie si un thème est supporté
     *
     * @param {string} nomTheme - Le nom du thème à vérifier
     * @returns {boolean} True si le thème est supporté
     */
    estThemeSupporte(nomTheme) {
        return this.themesDisponibles.includes(nomTheme);
    }
}

// Instance globale accessible partout dans l'application
const gestionnaireThemes = new GestionnaireThemes();

// Export pour utilisation en module si nécessaire
if (typeof module !== "undefined" && module.exports) {
    module.exports = { GestionnaireThemes, gestionnaireThemes };
}

// Export pour utilisation en module ES6 si nécessaire
if (typeof window !== "undefined") {
    window.GestionnaireThemes = GestionnaireThemes;
    window.gestionnaireThemes = gestionnaireThemes;
}