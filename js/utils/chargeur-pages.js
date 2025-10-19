/**
 * CHARGEUR DE PAGES OPTIMISÉ - Version Performance
 *
 * Ce module gère le chargement optimisé des composants sur les pages.
 * Il remplace les appels fetch() individuels par un système centralisé.
 *
 * FONCTIONNALITÉS :
 * - Chargement parallèle des composants
 * - Gestion d'erreurs robuste
 * - Cache intelligent
 * - Indicateurs de chargement
 * - Fallbacks automatiques
 *
 * POUR L'ÉQUIPE :
 * - Remplacer les fetch() par chargeurPages.initialiser()
 * - Les composants se chargent automatiquement
 * - Gestion d'erreurs transparente
 *
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 18 Octobre 2025
 */
class ChargeurPages {
    constructor() {
        // Configuration des composants par page
        this.configurationPages = {
            index: ["breadcrumb", "sidebar", "footer", "cta"],
            dashboard: ["breadcrumb", "sidebar", "footer"],
            formations: ["breadcrumb", "sidebar", "footer", "cta"],
            contact: ["breadcrumb", "sidebar", "footer"],
            about: ["breadcrumb", "sidebar", "footer"],
            actualites: ["breadcrumb", "sidebar", "footer"],
            admissions: ["breadcrumb", "sidebar", "footer"],
        };

        // Indicateurs de chargement
        this.indicateursChargement = new Map();

        // Statistiques de performance
        this.statistiques = {
            composantsCharges: 0,
            erreurs: 0,
            tempsMoyenChargement: 0,
        };

        console.log("🚀 ChargeurPages initialisé");
        
        // Gère le redimensionnement de fenêtre
        this.gererRedimensionnement();
    }

    /**
     * Initialise le chargement des composants pour une page
     *
     * @param {string} nomPage - Nom de la page (index, dashboard, etc.)
     * @param {Object} options - Options de chargement
     */
    async initialiser(nomPage, options = {}) {
        console.log(`📄 Initialisation de la page "${nomPage}"`);

        const debutChargement = performance.now();

        // Récupère la configuration de la page
        let composantsPage = this.configurationPages[nomPage] || [];
        console.log(`🔧 Composants configurés pour "${nomPage}":`, composantsPage);

        // Ajoute navbar seulement sur mobile
        if (window.innerWidth <= 768) {
            composantsPage = ["navbar", ...composantsPage];
            console.log(`📱 Mobile détecté, navbar ajouté:`, composantsPage);
        }

        if (composantsPage.length === 0) {
            console.warn(`⚠️ Aucun composant configuré pour la page "${nomPage}"`);
            return;
        }

        // Affiche les indicateurs de chargement
        this.afficherIndicateursChargement(composantsPage);

        try {
            // Charge les composants en parallèle
            const resultats = await this.chargerComposantsParallele(
                composantsPage,
                options
            );

            // Calcule les statistiques
            const finChargement = performance.now();
            const tempsChargement = finChargement - debutChargement;

            this.mettreAJourStatistiques(resultats, tempsChargement);

            // Masque les indicateurs de chargement
            this.masquerIndicateursChargement();

            console.log(
                `✅ Page "${nomPage}" initialisée en ${tempsChargement.toFixed(2)}ms`
            );
        } catch (erreur) {
            console.error(
                `❌ Erreur lors de l'initialisation de la page "${nomPage}":`,
                erreur
            );
            this.masquerIndicateursChargement();
            this.afficherErreurChargement(erreur);
        }
    }

    /**
     * Charge plusieurs composants en parallèle
     *
     * @param {Array} composants - Liste des composants à charger
     * @param {Object} options - Options de chargement
     * @returns {Promise<Array>} Résultats du chargement
     */
    async chargerComposantsParallele(composants, options = {}) {
        console.log(`🔄 Chargement parallèle de ${composants.length} composants`);

        const promesses = composants.map(async (nomComposant) => {
            const conteneurId = this.obtenirIdConteneur(nomComposant);
            const resultat = await chargeurComposants.charger(
                nomComposant,
                conteneurId,
                options
            );

            return {
                composant: nomComposant,
                conteneur: conteneurId,
                succes: resultat,
                timestamp: Date.now(),
            };
        });

        const resultats = await Promise.allSettled(promesses);

        // Traite les résultats
        const resultatsTraites = resultats.map((resultat, index) => {
            if (resultat.status === "fulfilled") {
                return resultat.value;
            } else {
                console.error(
                    `❌ Erreur lors du chargement de ${composants[index]}:`,
                    resultat.reason
                );
                return {
                    composant: composants[index],
                    conteneur: this.obtenirIdConteneur(composants[index]),
                    succes: false,
                    erreur: resultat.reason,
                    timestamp: Date.now(),
                };
            }
        });

        return resultatsTraites;
    }

    /**
     * Obtient l'ID du conteneur pour un composant
     *
     * @param {string} nomComposant - Nom du composant
     * @returns {string} ID du conteneur
     */
    obtenirIdConteneur(nomComposant) {
        const correspondances = {
            sidebar: "sidebar-container",
            footer: "footer-container",
            cta: "cta-container",
        };

        return correspondances[nomComposant] || `${nomComposant}-container`;
    }

    /**
     * Affiche les indicateurs de chargement
     *
     * @param {Array} composants - Liste des composants en cours de chargement
     */
    afficherIndicateursChargement(composants) {
        composants.forEach((nomComposant) => {
            const conteneurId = this.obtenirIdConteneur(nomComposant);
            const conteneur = document.getElementById(conteneurId);

            if (conteneur) {
                // Crée un indicateur de chargement
                const indicateur = this.creerIndicateurChargement(nomComposant);
                conteneur.innerHTML = indicateur;

                // Sauvegarde l'indicateur pour le masquer plus tard
                this.indicateursChargement.set(nomComposant, conteneur);
            }
        });
    }

    /**
     * Crée un indicateur de chargement pour un composant
     *
     * @param {string} nomComposant - Nom du composant
     * @returns {string} HTML de l'indicateur
     */
    creerIndicateurChargement(nomComposant) {
        const messages = {
            sidebar: "Chargement de la navigation...",
            footer: "Chargement du pied de page...",
            cta: "Chargement des actions...",
        };

        const message =
            messages[nomComposant] || `Chargement de ${nomComposant}...`;

        // Utilise le spinner EPL élégant si disponible
        if (typeof animateurEPL !== "undefined") {
            return `
                <div class="spinner-epl" data-composant="${nomComposant}" data-animation="spinner-epl">
                    <div class="logo-epl-anime"></div>
                    <p class="texte-chargement-epl">${message}</p>
                    <div class="barre-progression-epl"></div>
                </div>
            `;
        }

        // Fallback vers l'ancien système
        return `
            <div class="indicateur-chargement" data-composant="${nomComposant}">
                <div class="indicateur-chargement-spinner"></div>
                <p class="indicateur-chargement-texte">${message}</p>
            </div>
        `;
    }

    /**
     * Masque tous les indicateurs de chargement
     */
    masquerIndicateursChargement() {
        this.indicateursChargement.forEach((conteneur, nomComposant) => {
            const indicateur = conteneur.querySelector(".indicateur-chargement");
            if (indicateur) {
                indicateur.style.opacity = "0";
                setTimeout(() => {
                    if (indicateur.parentNode) {
                        indicateur.parentNode.removeChild(indicateur);
                    }
                }, 300);
            }
        });

        this.indicateursChargement.clear();
    }

    /**
     * Affiche une erreur de chargement
     *
     * @param {Error} erreur - Erreur de chargement
     */
    afficherErreurChargement(erreur) {
        // Crée une notification d'erreur
        const notification = document.createElement("div");
        notification.className = "notification-erreur";
        notification.innerHTML = `
            <div class="notification-erreur-contenu">
                <h3>Erreur de chargement</h3>
                <p>Certains composants n'ont pas pu être chargés. La page fonctionne en mode dégradé.</p>
                <button onclick="this.parentElement.parentElement.remove()">Fermer</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Supprime automatiquement après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    /**
     * Met à jour les statistiques de performance
     *
     * @param {Array} resultats - Résultats du chargement
     * @param {number} tempsChargement - Temps de chargement en ms
     */
    mettreAJourStatistiques(resultats, tempsChargement) {
        const succes = resultats.filter((r) => r.succes).length;
        const erreurs = resultats.filter((r) => !r.succes).length;

        this.statistiques.composantsCharges += succes;
        this.statistiques.erreurs += erreurs;
        this.statistiques.tempsMoyenChargement =
            (this.statistiques.tempsMoyenChargement + tempsChargement) / 2;

        console.log(
            `📊 Statistiques: ${succes} succès, ${erreurs} erreurs, ${tempsChargement.toFixed(
                2
            )}ms`
        );
    }

    /**
     * Obtient les statistiques de performance
     *
     * @returns {Object} Statistiques actuelles
     */
    obtenirStatistiques() {
        return { ...this.statistiques };
    }

    /**
     * Réinitialise les statistiques
     */
    reinitialiserStatistiques() {
        this.statistiques = {
            composantsCharges: 0,
            erreurs: 0,
            tempsMoyenChargement: 0,
        };
        console.log("📊 Statistiques réinitialisées");
    }

    /**
     * Gère le redimensionnement de fenêtre pour afficher/masquer la navbar
     */
    gererRedimensionnement() {
        let timeoutRedimensionnement;
        
        window.addEventListener('resize', () => {
            clearTimeout(timeoutRedimensionnement);
            timeoutRedimensionnement = setTimeout(() => {
                this.gererAffichageNavbar();
            }, 250);
        });
    }

    /**
     * Affiche ou masque la navbar selon la taille d'écran
     */
    gererAffichageNavbar() {
        const navbarContainer = document.getElementById('navbar-container');
        if (!navbarContainer) return;

        if (window.innerWidth <= 768) {
            // Mobile : afficher navbar si pas déjà chargée
            if (!navbarContainer.innerHTML.trim()) {
                chargeurComposants.charger('navbar', 'navbar-container');
            }
        } else {
            // Desktop : masquer navbar
            navbarContainer.innerHTML = '';
        }
    }
}

// Instance globale accessible partout dans l'application
const chargeurPages = new ChargeurPages();

// Export pour utilisation en module si nécessaire
if (typeof module !== "undefined" && module.exports) {
    module.exports = { ChargeurPages, chargeurPages };
}

// Export pour utilisation globale
if (typeof window !== "undefined") {
    window.ChargeurPages = ChargeurPages;
    window.chargeurPages = chargeurPages;
}