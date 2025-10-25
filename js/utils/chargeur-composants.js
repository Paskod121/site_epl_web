/**
 * CHARGEUR DE COMPOSANTS RÉUTILISABLES - Version Robuste
 *
 * Ce module gère le chargement sécurisé des composants réutilisables.
 * Il inclut la gestion d'erreurs, le cache et les fallbacks.
 *
 * FONCTIONNALITÉS :
 * - Chargement sécurisé avec gestion d'erreurs
 * - Cache intelligent pour éviter les rechargements
 * - Fallbacks automatiques en cas d'échec
 * - Chargement parallèle pour de meilleures performances
 *
 * POUR L'ÉQUIPE :
 * - Utiliser chargeurComposants.charger() au lieu de fetch() direct
 * - Les erreurs sont gérées automatiquement
 * - Le cache améliore les performances
 *
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 18 Octobre 2025
 */
class ChargeurComposants {
    constructor() {
        // Cache des composants chargés pour éviter les rechargements
        this.cacheComposants = new Map();

        // Configuration des composants disponibles
        this.composantsDisponibles = {
            sidebar: "/components/sidebar.html",
            footer: "/components/footer.html",
            cta: "/components/cta.html",
            navbar: "/components/navbar.html",
            breadcrumb: "/components/breadcrumb.html",
            modal: "/components/modal.html",
        };

        // Fallbacks en cas d'échec de chargement
        this.fallbacks = {
            sidebar: this.creerFallbackSidebar(),
            footer: this.creerFallbackFooter(),
            cta: this.creerFallbackCta(),
            navbar: this.creerFallbackNavbar(),
            breadcrumb: this.creerFallbackBreadcrumb(),
            modal: this.creerFallbackModal(),
        };

        console.log("🔧 ChargeurComposants initialisé");
    }

    /**
     * Charge un composant de manière sécurisée
     *
     * @param {string} nomComposant - Nom du composant à charger
     * @param {string} conteneurId - ID du conteneur où insérer le composant
     * @param {Object} options - Options de chargement
     * @returns {Promise<boolean>} True si le chargement a réussi
     */
    async charger(nomComposant, conteneurId, options = {}) {
        console.log(
            `🔍 Chargement du composant "${nomComposant}" dans "${conteneurId}"`
        );

        // Vérification des paramètres
        if (!this.composantsDisponibles[nomComposant]) {
            console.error(`❌ Composant "${nomComposant}" non disponible`);
            return false;
        }

        const conteneur = document.getElementById(conteneurId);
        if (!conteneur) {
            console.error(`❌ Conteneur "${conteneurId}" non trouvé`);
            return false;
        }

        // Vérification du cache
        if (this.cacheComposants.has(nomComposant) && !options.forceReload) {
            console.log(`📦 Utilisation du cache pour "${nomComposant}"`);
            conteneur.innerHTML = this.cacheComposants.get(nomComposant);
            this.initialiserComposant(nomComposant, conteneur);
            return true;
        }

        try {
            // Chargement du composant
            const contenu = await this.chargerComposant(nomComposant);

            // Insertion dans le conteneur
            conteneur.innerHTML = contenu;

            // Mise en cache
            this.cacheComposants.set(nomComposant, contenu);

            // Initialisation du composant
            this.initialiserComposant(nomComposant, conteneur);

            console.log(`✅ Composant "${nomComposant}" chargé avec succès`);
            return true;
        } catch (erreur) {
            console.error(
                `❌ Erreur lors du chargement de "${nomComposant}":`,
                erreur
            );

            // Utilisation du fallback
            if (this.fallbacks[nomComposant]) {
                console.log(`🔄 Utilisation du fallback pour "${nomComposant}"`);
                conteneur.innerHTML = this.fallbacks[nomComposant];
                return true;
            }

            return false;
        }
    }

    /**
     * Charge le contenu d'un composant depuis le serveur
     *
     * @param {string} nomComposant - Nom du composant
     * @returns {Promise<string>} Contenu HTML du composant
     */
    async chargerComposant(nomComposant) {
        const cheminComposant = this.composantsDisponibles[nomComposant];

        // Timeout pour éviter les blocages
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            console.warn(`⏰ Timeout lors du chargement de ${nomComposant}`);
        }, 8000); // 8s timeout

        try {
            const reponse = await fetch(cheminComposant, {
                method: "GET",
                headers: {
                    Accept: "text/html",
                    "Cache-Control": "no-cache",
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!reponse.ok) {
                throw new Error(`Erreur HTTP ${reponse.status}: ${reponse.statusText}`);
            }

            const contenu = await reponse.text();

            if (!contenu || contenu.trim() === "") {
                throw new Error("Composant vide reçu du serveur");
            }

            // Validation supplémentaire du contenu
            if (contenu.includes('<script') && contenu.includes('</script>')) {
                console.log(`✅ Composant ${nomComposant} contient du JavaScript`);
            }

            return contenu;
        } catch (erreur) {
            clearTimeout(timeoutId);
            
            if (erreur.name === 'AbortError') {
                throw new Error(`Timeout lors du chargement de ${nomComposant}`);
            }
            
            throw erreur;
        }
    }

    /**
     * Initialise un composant après son chargement
     *
     * @param {string} nomComposant - Nom du composant
     * @param {HTMLElement} conteneur - Conteneur du composant
     */
    initialiserComposant(nomComposant, conteneur) {
        // Animation d'entrée du composant
        if (typeof animateurEPL !== "undefined") {
            setTimeout(() => {
                animateurEPL.animerEntree(conteneur, nomComposant);
            }, 100);
        }

        switch (nomComposant) {
            case "sidebar":
                this.initialiserSidebar(conteneur);
                break;
            case "footer":
                this.initialiserFooter(conteneur);
                break;
            case "cta":
                this.initialiserCta(conteneur);
                break;
        }
    }

    /**
     * Initialise la sidebar après son chargement
     *
     * @param {HTMLElement} conteneur - Conteneur de la sidebar
     */
    initialiserSidebar(conteneur) {
        // Configuration des événements de la sidebar
        const boutonsNavigation = conteneur.querySelectorAll(
            ".sidebar-lien-navigation"
        );
        boutonsNavigation.forEach((bouton) => {
            bouton.addEventListener("click", function (evenement) {
                // Ajout d'un indicateur de chargement
                const lien = evenement.currentTarget;
                const texte = lien.querySelector(".sidebar-texte-navigation");
                const texteOriginal = texte.textContent;

                texte.textContent = "Chargement...";
                lien.style.opacity = "0.7";

                // Restauration après un délai
                setTimeout(() => {
                    texte.textContent = texteOriginal;
                    lien.style.opacity = "1";
                }, 1000);
            });
        });

        // Configuration du bouton d'aide
        const boutonAide = conteneur.querySelector(".sidebar-aide-bouton");
        if (boutonAide) {
            boutonAide.addEventListener("click", function () {
                window.location.href = "/pages/contact.html";
            });
        }

        console.log("✅ Sidebar initialisée");
    }

    /**
     * Initialise le footer après son chargement
     *
     * @param {HTMLElement} conteneur - Conteneur du footer
     */
    initialiserFooter(conteneur) {
        // Configuration des liens du footer
        const liensFooter = conteneur.querySelectorAll(".footer-link");
        liensFooter.forEach((lien) => {
            lien.addEventListener("click", function (evenement) {
                // Ajout d'un effet visuel
                evenement.currentTarget.style.transform = "scale(0.95)";
                setTimeout(() => {
                    evenement.currentTarget.style.transform = "scale(1)";
                }, 150);
            });
        });

        console.log("✅ Footer initialisé");
    }

    /**
     * Initialise le CTA après son chargement
     *
     * @param {HTMLElement} conteneur - Conteneur du CTA
     */
    initialiserCta(conteneur) {
        // Configuration des boutons CTA
        const boutonsCta = conteneur.querySelectorAll(".bouton");
        boutonsCta.forEach((bouton) => {
            bouton.addEventListener("click", function (evenement) {
                // Animation de clic
                evenement.currentTarget.style.transform = "scale(0.95)";
                setTimeout(() => {
                    evenement.currentTarget.style.transform = "scale(1)";
                }, 150);
            });
        });

        console.log("✅ CTA initialisé");
    }

    /**
     * Charge plusieurs composants en parallèle
     *
     * @param {Array} composants - Liste des composants à charger
     * @returns {Promise<Object>} Résultats du chargement
     */
    async chargerParallele(composants) {
        console.log(`🚀 Chargement parallèle de ${composants.length} composants`);

        const promesses = composants.map(async (composant) => {
            const { nom, conteneurId, options = {} } = composant;
            const resultat = await this.charger(nom, conteneurId, options);
            return { nom, resultat };
        });

        const resultats = await Promise.allSettled(promesses);

        const succes = resultats.filter(
            (r) => r.status === "fulfilled" && r.value.resultat
        ).length;
        console.log(
            `✅ ${succes}/${composants.length} composants chargés avec succès`
        );

        return resultats;
    }

    /**
     * Vide le cache des composants
     */
    viderCache() {
        this.cacheComposants.clear();
        console.log("🗑️ Cache des composants vidé");
    }

    /**
     * Crée un fallback pour la sidebar
     *
     * @returns {string} HTML de fallback
     */
    creerFallbackSidebar() {
        return `
            <aside class="sidebar sidebar-fallback" role="navigation">
                <div class="sidebar-en-tete">
                    <div class="sidebar-logo-conteneur">
                        <div class="sidebar-logo-cercle">
                            <svg class="sidebar-logo-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                            </svg>
                        </div>
                        <div class="sidebar-logo-texte">
                            <div class="sidebar-logo-titre">EPL</div>
                            <div class="sidebar-logo-sous-titre">École Polytechnique</div>
                        </div>
                    </div>
                </div>
                <nav class="sidebar-navigation">
                    <a href="/index.html" class="sidebar-lien-navigation">
                        <span class="sidebar-texte-navigation">Accueil</span>
                    </a>
                    <a href="/pages/formations/index.html" class="sidebar-lien-navigation">
                        <span class="sidebar-texte-navigation">Formations</span>
                    </a>
                    <a href="/pages/contact.html" class="sidebar-lien-navigation">
                        <span class="sidebar-texte-navigation">Contact</span>
                    </a>
                </nav>
                <div class="sidebar-aide">
                    <p>Navigation simplifiée disponible</p>
                </div>
            </aside>
        `;
    }

    /**
     * Crée un fallback pour le footer
     *
     * @returns {string} HTML de fallback
     */
    creerFallbackFooter() {
        return `
            <footer class="footer-principal footer-fallback">
                <div class="container">
                    <div class="footer-bottom">
                        <div class="footer-copyright">
                            <p>&copy; 2025 École Polytechnique de Lomé. Tous droits réservés.</p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    /**
     * Crée un fallback pour le CTA
     *
     * @returns {string} HTML de fallback
     */
    creerFallbackCta() {
        return `
            <section class="cta-section cta-fallback">
                <div class="container">
                    <div class="cta-contenu">
                        <h2 class="cta-titre">Prêt à rejoindre l'excellence ?</h2>
                        <p class="cta-description">
                            Découvrez nos formations et commencez votre parcours d'ingénieur.
                        </p>
                        <div class="cta-actions">
                            <a href="/pages/formations/index.html" class="bouton bouton-primaire">
                                Découvrir nos formations
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    creerFallbackNavbar() {
        return `
            <nav class="navbar-epl">
                <div class="navbar-conteneur">
                    <div class="navbar-logo">
                        <a href="/" class="logo-lien">
                            <span class="logo-texte">EPL</span>
                            <span class="logo-sous-texte">École Polytechnique</span>
                        </a>
                    </div>
                    <div class="navbar-menu-desktop">
                        <a href="/" class="lien-nav-epl">Accueil</a>
                        <a href="/formations" class="lien-nav-epl">Formations</a>
                        <a href="/dashboard" class="lien-nav-epl">Dashboard</a>
                        <a href="/contact" class="lien-nav-epl">Contact</a>
                    </div>
                </div>
            </nav>
        `;
    }

    creerFallbackBreadcrumb() {
        return `
            <nav class="breadcrumb-epl">
                <ol class="breadcrumb-liste">
                    <li class="breadcrumb-item">
                        <a href="/" class="breadcrumb-lien">
                            <span class="icone-accueil">🏠</span>
                            Accueil
                        </a>
                    </li>
                </ol>
            </nav>
        `;
    }

    creerFallbackModal() {
        return `
            <div class="modal-epl-overlay" style="display: none;">
                <div class="modal-epl-conteneur">
                    <div class="modal-epl-header">
                        <h3 class="modal-epl-titre">Modal</h3>
                        <button class="modal-epl-fermer">×</button>
                    </div>
                    <div class="modal-epl-contenu">
                        <p>Contenu de la modal</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Instance globale accessible partout dans l'application
const chargeurComposants = new ChargeurComposants();

// Export pour utilisation en module si nécessaire
if (typeof module !== "undefined" && module.exports) {
    module.exports = { ChargeurComposants, chargeurComposants };
}

// Export pour utilisation globale
if (typeof window !== "undefined") {
    window.ChargeurComposants = ChargeurComposants;
    window.chargeurComposants = chargeurComposants;
}