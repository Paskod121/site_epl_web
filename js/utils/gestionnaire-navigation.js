/**
 * GESTIONNAIRE DE NAVIGATION GLOBAL
 *
 * Ce module synchronise la sidebar et le breadcrumb
 * pour maintenir l'état actif cohérent.
 *
 * FONCTIONNALITÉS :
 * - Synchronisation sidebar/breadcrumb
 * - Gestion de l'état actif
 * - Navigation cohérente
 *
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 18 Octobre 2025
 */
class GestionnaireNavigation {
    constructor() {
        this.estInitialise = false;
        this.timeoutSynchronisation = null;
        this.dernierePositionScroll = 0;
        this.seuilScroll = 100; // Seuil en pixels pour déclencher l'animation
        this.initialiser();
    }

    initialiser() {
        // Attendre que le DOM soit chargé
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () =>
                this.synchroniserNavigation()
            );
        } else {
            this.synchroniserNavigation();
        }

        // Écouter les changements de page
        this.gererChangementsPage();

        // Gérer le scroll intelligent du breadcrumb
        this.gererScrollBreadcrumb();
    }

    synchroniserNavigation() {
        // Éviter les synchronisations multiples
        if (this.timeoutSynchronisation) {
            clearTimeout(this.timeoutSynchronisation);
        }

        this.timeoutSynchronisation = setTimeout(() => {
            console.log("🔄 Synchronisation de la navigation...");

            try {
                // Marquer le lien actif dans la sidebar
                this.marquerLienActif();

                // Réinitialiser le breadcrumb si nécessaire
                this.reinitialiserBreadcrumb();

                this.estInitialise = true;
                console.log("✅ Navigation synchronisée avec succès");
            } catch (erreur) {
                console.error("❌ Erreur lors de la synchronisation:", erreur);
                // Retry après 500ms
                setTimeout(() => this.synchroniserNavigation(), 500);
            }
        }, 100);
    }

    marquerLienActif() {
        const chemin = window.location.pathname;
        console.log("📍 Chemin actuel:", chemin);

        // Retire toutes les classes actives
        const liensActifs = document.querySelectorAll(
            ".sidebar-nav-item.actif, .lien-nav-epl.actif, .nav-item.actif"
        );
        liensActifs.forEach((lien) => {
            lien.classList.remove("actif");
            lien.removeAttribute("aria-current");
        });

        // Détermine le lien actif selon le chemin
        let lienActif = null;

        if (
            chemin === "/" ||
            chemin === "/index.html" ||
            chemin.includes("index.html")
        ) {
            lienActif = document.querySelector(
                'a[href="/"], a[href="/index.html"], a[href*="index.html"]'
            );
        } else if (
            chemin.includes("/formations") ||
            chemin.includes("formations")
        ) {
            lienActif = document.querySelector(
                'a[href*="/formations"], a[href*="formations"], a[href*="pages/formations"]'
            );
        } else if (chemin.includes("/dashboard") || chemin.includes("dashboard")) {
            lienActif = document.querySelector(
                'a[href*="/dashboard"], a[href*="dashboard"], a[href*="pages/dashboard"]'
            );
        } else if (chemin.includes("/contact") || chemin.includes("contact")) {
            lienActif = document.querySelector(
                'a[href*="/contact"], a[href*="contact"], a[href*="pages/contact"]'
            );
        } else if (chemin.includes("/about") || chemin.includes("about")) {
            lienActif = document.querySelector(
                'a[href*="/about"], a[href*="about"], a[href*="pages/about"]'
            );
        }

        // Si pas trouvé, essaie une approche plus générale
        if (!lienActif) {
            const segments = chemin.split("/").filter((s) => s);
            if (segments.length > 0) {
                const dernierSegment = segments[segments.length - 1];
                lienActif = document.querySelector(`a[href*="${dernierSegment}"]`);
            }
        }

        // Marque le lien comme actif
        if (lienActif) {
            lienActif.classList.add("actif");
            lienActif.setAttribute("aria-current", "page");
            console.log("✅ Lien actif marqué:", lienActif.textContent.trim());
        } else {
            console.warn("⚠️ Aucun lien correspondant trouvé pour:", chemin);
            // Affiche tous les liens disponibles pour debug
            const tousLiens = document.querySelectorAll("a[href]");
            console.log(
                "🔍 Liens disponibles:",
                Array.from(tousLiens).map((l) => l.href)
            );
        }
    }

    reinitialiserBreadcrumb() {
        // Vérifie si le breadcrumb existe et le réinitialise
        const breadcrumbContainer = document.getElementById("breadcrumb-container");
        console.log("🔍 Breadcrumb container:", breadcrumbContainer);

        if (breadcrumbContainer) {
            console.log(
                "📄 Contenu breadcrumb:",
                breadcrumbContainer.innerHTML.trim()
            );

            if (breadcrumbContainer.innerHTML.trim()) {
                // Le breadcrumb est déjà chargé, on le met à jour
                console.log("🔄 Mise à jour du breadcrumb...");
                this.mettreAJourBreadcrumb();
            } else {
                // Le breadcrumb n'est pas chargé, on le charge
                console.log("⚠️ Breadcrumb vide, tentative de chargement...");
                this.chargerBreadcrumb();
            }
        } else {
            console.warn("❌ Container breadcrumb non trouvé");
        }
    }

    mettreAJourBreadcrumb() {
        // Force la mise à jour du breadcrumb
        const chemin = window.location.pathname;
        const segments = chemin.split("/").filter((segment) => segment);

        const breadcrumbListe = document.querySelector(".breadcrumb-liste");
        if (!breadcrumbListe) {
            console.warn("⚠️ Liste breadcrumb non trouvée");
            return;
        }

        console.log("🔄 Mise à jour breadcrumb pour:", segments);

        // Garde seulement le premier élément (Accueil)
        const premierElement = breadcrumbListe.querySelector(".breadcrumb-item");
        if (premierElement) {
            breadcrumbListe.innerHTML = premierElement.outerHTML;
        }

        // Ajoute les segments (filtre les segments techniques)
        const segmentsFiltres = segments.filter(
            (segment) =>
                segment !== "pages" &&
                segment !== "index.html" &&
                segment !== "html" &&
                segment !== "site_epl_web" &&
                segment !== "epl" &&
                segment !== "web"
        );

        console.log("🔍 Segments filtrés:", segmentsFiltres);

        segmentsFiltres.forEach((segment, index) => {
            const estDernier = index === segmentsFiltres.length - 1;
            const nomAffichage = this.formaterNomBreadcrumb(segment);
            const url = this.genererUrlBreadcrumb(segment);
            const icone = this.obtenirIconeBreadcrumb(segment);

            const item = document.createElement("li");
            item.className = "breadcrumb-item";

            if (estDernier) {
                item.innerHTML = `
                    <span class="breadcrumb-actuel">
                        ${icone}
                        <span class="breadcrumb-texte">${nomAffichage}</span>
                    </span>
                `;
            } else {
                item.innerHTML = `
                    <a href="${url}" class="breadcrumb-lien">
                        ${icone}
                        <span class="breadcrumb-texte">${nomAffichage}</span>
                    </a>
                `;
            }

            breadcrumbListe.appendChild(item);
        });

        console.log("✅ Breadcrumb mis à jour");
    }

    genererUrlBreadcrumb(segment) {
        // Génère les URLs correctes pour le breadcrumb
        const correspondances = {
            formations: "/pages/formations/index.html",
            dashboard: "/pages/dashboard.html",
            contact: "/pages/contact.html",
            about: "/pages/about.html",
            actualites: "/pages/actualites.html",
            admissions: "/pages/admissions.html",
        };

        return correspondances[segment] || `/${segment}`;
    }

    formaterNomBreadcrumb(segment) {
        // Nettoie le segment (enlève .html, .php, etc.)
        const segmentNettoye = segment.replace(/\.(html|php|aspx)$/i, "");

        console.log("🔍 Formater nom breadcrumb - Segment original:", segment);
        console.log(
            "🔍 Formater nom breadcrumb - Segment nettoyé:",
            segmentNettoye
        );

        const correspondances = {
            formations: "Formations",
            dashboard: "Tableau de bord",
            contact: "Contact",
            about: "À propos",
            actualites: "Actualités",
            admissions: "Admissions",
            admin: "Administration",
            profil: "Profil",
            parametres: "Paramètres",
        };

        const resultat =
            correspondances[segmentNettoye] ||
            segmentNettoye.charAt(0).toUpperCase() + segmentNettoye.slice(1);
        console.log("🔍 Formater nom breadcrumb - Résultat:", resultat);

        return resultat;
    }

    obtenirIconeBreadcrumb(segment) {
        // Nettoie le segment (enlève .html, .php, etc.)
        const segmentNettoye = segment.replace(/\.(html|php|aspx)$/i, "");

        console.log("🔍 Obtenir icône breadcrumb - Segment original:", segment);
        console.log(
            "🔍 Obtenir icône breadcrumb - Segment nettoyé:",
            segmentNettoye
        );

        const icones = {
            formations: `
                <svg class="breadcrumb-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    <path d="M8 7h8"/>
                    <path d="M8 11h8"/>
                    <path d="M8 15h4"/>
                </svg>
            `,
            dashboard: `
                <svg class="breadcrumb-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                </svg>
            `,
            contact: `
                <svg class="breadcrumb-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
            `,
            about: `
                <svg class="breadcrumb-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
            `,
            actualites: `
                <svg class="breadcrumb-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="M8 6h8M8 10h8M8 14h5"/>
                    <path d="M4 2h4v4H4z"/>
                    <path d="M5 3h2v2H5z"/>
                </svg>
            `,
            admissions: `
                <svg class="breadcrumb-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                    <path d="M18 6l4 4-4 4"/>
                    <path d="M22 10H10"/>
                    <path d="M18 6l2 2"/>
                </svg>
            `,
        };
        const icone =
            icones[segmentNettoye] ||
            `
            <svg class="breadcrumb-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
            </svg>
        `;

        console.log(
            "🔍 Obtenir icône breadcrumb - Icône trouvée:",
            segmentNettoye in icones
        );
        console.log(
            "🔍 Obtenir icône breadcrumb - Icône finale:",
            icone.substring(0, 50) + "..."
        );

        return icone;
    }

    chargerBreadcrumb() {
        // Charge le breadcrumb via le chargeur de composants
        if (typeof chargeurComposants !== "undefined") {
            chargeurComposants
                .charger("breadcrumb", "breadcrumb-container")
                .then(() => {
                    console.log("✅ Breadcrumb chargé avec succès");
                })
                .catch((erreur) => {
                    console.error("❌ Erreur chargement breadcrumb:", erreur);
                });
        } else {
            console.warn("⚠️ ChargeurComposants non disponible");
        }
    }

    gererChangementsPage() {
        // Écouter les clics sur les liens de navigation
        document.addEventListener("click", (e) => {
            const lien = e.target.closest("a[href]");
            if (lien && !lien.href.includes("#")) {
                // Délai pour laisser le temps à la page de se charger
                setTimeout(() => {
                    this.synchroniserNavigation();
                }, 100);
            }
        });

        // Écouter les changements d'historique
        window.addEventListener("popstate", () => {
            setTimeout(() => {
                this.synchroniserNavigation();
            }, 100);
        });

        // Vérification périodique de l'état de navigation
        setInterval(() => {
            if (this.estInitialise) {
                this.verifierEtatNavigation();
            }
        }, 5000); // Vérifier toutes les 5 secondes
    }

    verifierEtatNavigation() {
        const sidebar = document.querySelector("#sidebar-container");
        const breadcrumb = document.querySelector("#breadcrumb-container");

        if (sidebar && breadcrumb) {
            // Vérifier si les composants sont vides
            if (
                sidebar.innerHTML.trim() === "" ||
                breadcrumb.innerHTML.trim() === ""
            ) {
                console.log("🔄 Composants vides détectés, re-synchronisation...");
                this.synchroniserNavigation();
            }
        }
    }

    /**
     * Gère le scroll intelligent du breadcrumb
     */
    gererScrollBreadcrumb() {
        let timeoutScroll;

        window.addEventListener("scroll", () => {
            // Debouncing pour éviter les appels multiples
            clearTimeout(timeoutScroll);
            timeoutScroll = setTimeout(() => {
                this.gererScrollBreadcrumbIntelligent();
            }, 10);
        });
    }

    gererScrollBreadcrumbIntelligent() {
        const positionActuelle =
            window.pageYOffset || document.documentElement.scrollTop;
        const breadcrumbConteneur = document.querySelector(".breadcrumb-conteneur");

        if (!breadcrumbConteneur) return;

        // Ne pas gérer le scroll sur la page d'accueil
        if (
            window.location.pathname === "/" ||
            window.location.pathname === "/index.html"
        ) {
            return;
        }

        // Logique de scroll intelligent
        if (
            positionActuelle > this.dernierePositionScroll &&
            positionActuelle > this.seuilScroll
        ) {
            // Scroll vers le bas - cacher le breadcrumb
            if (!breadcrumbConteneur.classList.contains("cache")) {
                breadcrumbConteneur.classList.add("cache");
                console.log("📱 Breadcrumb caché (scroll vers le bas)");
            }
        } else if (
            positionActuelle < this.dernierePositionScroll ||
            positionActuelle <= this.seuilScroll
        ) {
            // Scroll vers le haut ou en haut de page - montrer le breadcrumb
            if (breadcrumbConteneur.classList.contains("cache")) {
                breadcrumbConteneur.classList.remove("cache");
                console.log("📱 Breadcrumb visible (scroll vers le haut)");
            }
        }

        this.dernierePositionScroll = positionActuelle;
    }

    /**
     * Force la synchronisation (utile pour les SPA)
     */
    forcerSynchronisation() {
        console.log("🔄 Forçage de la synchronisation...");

        // Attendre que les composants soient chargés
        const verifierComposants = () => {
            const sidebar = document.querySelector("#sidebar-container");
            const breadcrumb = document.querySelector("#breadcrumb-container");

            if (sidebar && breadcrumb) {
                this.synchroniserNavigation();
            } else {
                console.log("⏳ Attente des composants...");
                setTimeout(verifierComposants, 200);
            }
        };

        verifierComposants();
    }
}

// Instance globale
const gestionnaireNavigation = new GestionnaireNavigation();

// Export pour utilisation globale
if (typeof window !== "undefined") {
    window.GestionnaireNavigation = GestionnaireNavigation;
    window.gestionnaireNavigation = gestionnaireNavigation;
}