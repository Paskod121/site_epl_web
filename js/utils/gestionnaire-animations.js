/**
 * GESTIONNAIRE D'ANIMATIONS EPL - Version Élégante
 *
 * Ce module gère toutes les animations et transitions
 * pour donner une image professionnelle à l'EPL.
 *
 * FONCTIONNALITÉS :
 * - Animations de chargement élégantes
 * - Transitions fluides des composants
 * - Micro-interactions professionnelles
 * - Gestion des préférences d'accessibilité
 * - Animations de thème
 *
 * POUR L'ÉQUIPE :
 * - Utiliser animateurEPL.animer() pour déclencher des animations
 * - Les animations s'adaptent automatiquement aux préférences utilisateur
 * - Support complet de l'accessibilité
 *
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 18 Octobre 2025
 */
class GestionnaireAnimations {
    constructor() {
        // Configuration des animations
        this.animationsActivees = true;
        this.dureeAnimations = {
            rapide: 200,
            normale: 400,
            lente: 800,
        };

        // Détection des préférences d'accessibilité
        this.prefereReductionMouvement = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        this.prefereHauteContraste = window.matchMedia(
            "(prefers-contrast: high)"
        ).matches;

        // Configuration des animations selon les préférences
        this.configurerAnimations();

        // Écoute des changements de préférences
        this.configurerEcoutePreferences();

        console.log("🎨 GestionnaireAnimations initialisé");
    }

    /**
     * Configure les animations selon les préférences utilisateur
     */
    configurerAnimations() {
        if (this.prefereReductionMouvement) {
            this.animationsActivees = false;
            console.log("♿ Animations désactivées (préférence utilisateur)");
        }

        if (this.prefereHauteContraste) {
            console.log("🔍 Mode haute contraste détecté");
        }
    }

    /**
     * Écoute les changements de préférences système
     */
    configurerEcoutePreferences() {
        const mediaQueryReduction = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );
        const mediaQueryContraste = window.matchMedia("(prefers-contrast: high)");

        mediaQueryReduction.addEventListener("change", (e) => {
            this.prefereReductionMouvement = e.matches;
            this.animationsActivees = !e.matches;
            console.log(
                `♿ Animations ${this.animationsActivees ? "activées" : "désactivées"}`
            );
        });

        mediaQueryContraste.addEventListener("change", (e) => {
            this.prefereHauteContraste = e.matches;
            console.log(`🔍 Haute contraste ${e.matches ? "activé" : "désactivé"}`);
        });
    }

    /**
     * Affiche un spinner de chargement EPL élégant
     *
     * @param {string} conteneurId - ID du conteneur
     * @param {string} message - Message de chargement
     * @param {Object} options - Options d'animation
     */
    afficherSpinnerEPL(conteneurId, message = "Chargement...", options = {}) {
        const conteneur = document.getElementById(conteneurId);
        if (!conteneur) {
            console.error(`❌ Conteneur "${conteneurId}" non trouvé`);
            return;
        }

        const spinnerHTML = `
            <div class="spinner-epl" data-animation="spinner-epl">
                <div class="logo-epl-anime"></div>
                <p class="texte-chargement-epl">${message}</p>
                <div class="barre-progression-epl"></div>
            </div>
        `;

        conteneur.innerHTML = spinnerHTML;

        // Animation d'entrée si activée
        if (this.animationsActivees) {
            setTimeout(() => {
                this.animerEntree(conteneur.querySelector(".spinner-epl"));
            }, 100);
        }

        console.log(`🎨 Spinner EPL affiché dans "${conteneurId}"`);
    }

    /**
     * Anime l'entrée d'un composant
     *
     * @param {HTMLElement} element - Élément à animer
     * @param {string} typeAnimation - Type d'animation
     */
    animerEntree(element, typeAnimation = "composant") {
        if (!element || !this.animationsActivees) return;

        // Retire les classes d'animation existantes
        element.classList.remove(
            "composant-entree",
            "sidebar-entree",
            "footer-entree",
            "cta-entree"
        );

        // Ajoute la classe d'animation appropriée
        const classeAnimation = this.obtenirClasseAnimation(typeAnimation);
        element.classList.add(classeAnimation);

        // Retire la classe après l'animation
        setTimeout(() => {
            element.classList.remove(classeAnimation);
        }, this.dureeAnimations.lente);

        console.log(`🎨 Animation d'entrée "${typeAnimation}" appliquée`);
    }

    /**
     * Obtient la classe d'animation appropriée
     *
     * @param {string} type - Type d'animation
     * @returns {string} Classe CSS
     */
    obtenirClasseAnimation(type) {
        const correspondances = {
            sidebar: "sidebar-entree",
            footer: "footer-entree",
            cta: "cta-entree",
            composant: "composant-entree",
        };

        return correspondances[type] || "composant-entree";
    }

    /**
     * Anime la sortie d'un élément
     *
     * @param {HTMLElement} element - Élément à animer
     * @param {Function} callback - Fonction à exécuter après l'animation
     */
    animerSortie(element, callback) {
        if (!element || !this.animationsActivees) {
            if (callback) callback();
            return;
        }

        element.style.transition = "all 0.3s ease-out";
        element.style.opacity = "0";
        element.style.transform = "translateY(-20px)";

        setTimeout(() => {
            if (callback) callback();
        }, 300);

        console.log("🎨 Animation de sortie appliquée");
    }

    /**
     * Anime le changement de thème
     *
     * @param {string} nouveauTheme - Nouveau thème
     */
    animerChangementTheme(nouveauTheme) {
        if (!this.animationsActivees) return;

        // Ajoute une classe temporaire pour l'animation
        document.body.classList.add("transition-theme-epl");

        // Retire la classe après la transition
        setTimeout(() => {
            document.body.classList.remove("transition-theme-epl");
        }, 500);

        console.log(`🎨 Animation de changement de thème vers "${nouveauTheme}"`);
    }

    /**
     * Affiche une notification animée
     *
     * @param {string} message - Message à afficher
     * @param {string} type - Type de notification (success, error, info)
     * @param {number} duree - Durée d'affichage en ms
     */
    afficherNotification(message, type = "info", duree = 5000) {
        const notification = document.createElement("div");
        notification.className = `notification-epl notification-${type}`;

        const icone = this.obtenirIconeNotification(type);
        const couleur = this.obtenirCouleurNotification(type);

        notification.innerHTML = `
            <div class="notification-epl-contenu">
                <div class="notification-epl-header">
                    <span class="notification-epl-icone">${icone}</span>
                    <h4 class="notification-epl-titre">${this.obtenirTitreNotification(
            type
        )}</h4>
                    <button class="notification-epl-fermer" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <p class="notification-epl-message">${message}</p>
            </div>
        `;

        // Styles dynamiques
        notification.style.borderLeft = `4px solid ${couleur}`;

        document.body.appendChild(notification);

        // Animation d'entrée
        if (this.animationsActivees) {
            setTimeout(() => {
                notification.style.opacity = "1";
                notification.style.transform = "translateX(0) scale(1)";
            }, 100);
        }

        // Suppression automatique
        setTimeout(() => {
            this.fermerNotification(notification);
        }, duree);

        console.log(`🎨 Notification "${type}" affichée: ${message}`);
    }

    /**
     * Ferme une notification avec animation
     *
     * @param {HTMLElement} notification - Notification à fermer
     */
    fermerNotification(notification) {
        if (!notification) return;

        if (this.animationsActivees) {
            notification.classList.add("fermeture");
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        } else {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }
    }

    /**
     * Obtient l'icône pour un type de notification
     *
     * @param {string} type - Type de notification
     * @returns {string} Icône
     */
    obtenirIconeNotification(type) {
        const icones = {
            success: "✅",
            error: "❌",
            warning: "⚠️",
            info: "ℹ️",
        };

        return icones[type] || icones["info"];
    }

    /**
     * Obtient la couleur pour un type de notification
     *
     * @param {string} type - Type de notification
     * @returns {string} Couleur CSS
     */
    obtenirCouleurNotification(type) {
        const couleurs = {
            success: "var(--couleur-secondaire)",
            error: "var(--couleur-erreur)",
            warning: "var(--couleur-avertissement)",
            info: "var(--couleur-info)",
        };

        return couleurs[type] || couleurs["info"];
    }

    /**
     * Obtient le titre pour un type de notification
     *
     * @param {string} type - Type de notification
     * @returns {string} Titre
     */
    obtenirTitreNotification(type) {
        const titres = {
            success: "Succès",
            error: "Erreur",
            warning: "Attention",
            info: "Information",
        };

        return titres[type] || titres["info"];
    }

    /**
     * Anime un bouton au clic
     *
     * @param {HTMLElement} bouton - Bouton à animer
     */
    animerClicBouton(bouton) {
        if (!bouton || !this.animationsActivees) return;

        bouton.classList.add("bouton-epl-hover");
        bouton.style.transform = "scale(0.95)";

        setTimeout(() => {
            bouton.style.transform = "scale(1)";
        }, 150);

        console.log("🎨 Animation de clic appliquée");
    }

    /**
     * Anime un lien de navigation
     *
     * @param {HTMLElement} lien - Lien à animer
     */
    animerLienNavigation(lien) {
        if (!lien || !this.animationsActivees) return;

        lien.classList.add("lien-nav-epl");

        // Animation au hover
        lien.addEventListener("mouseenter", () => {
            if (this.animationsActivees) {
                lien.style.transform = "translateX(5px)";
            }
        });

        lien.addEventListener("mouseleave", () => {
            if (this.animationsActivees) {
                lien.style.transform = "translateX(0)";
            }
        });
    }

    /**
     * Active ou désactive les animations
     *
     * @param {boolean} active - Activer les animations
     */
    activerAnimations(active) {
        this.animationsActivees = active;

        if (!active) {
            // Retire toutes les classes d'animation
            document.querySelectorAll("[data-animation]").forEach((element) => {
                element.classList.remove(
                    "composant-entree",
                    "sidebar-entree",
                    "footer-entree",
                    "cta-entree"
                );
            });
        }

        console.log(`🎨 Animations ${active ? "activées" : "désactivées"}`);
    }

    /**
     * Obtient l'état des animations
     *
     * @returns {Object} État des animations
     */
    obtenirEtatAnimations() {
        return {
            activees: this.animationsActivees,
            reductionMouvement: this.prefereReductionMouvement,
            hauteContraste: this.prefereHauteContraste,
        };
    }
}

// Instance globale accessible partout dans l'application
const animateurEPL = new GestionnaireAnimations();

// Export pour utilisation en module si nécessaire
if (typeof module !== "undefined" && module.exports) {
    module.exports = { GestionnaireAnimations, animateurEPL };
}

// Export pour utilisation globale
if (typeof window !== "undefined") {
    window.GestionnaireAnimations = GestionnaireAnimations;
    window.animateurEPL = animateurEPL;
}