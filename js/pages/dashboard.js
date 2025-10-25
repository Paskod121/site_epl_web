/**
 * FICHIER : Dashboard.js
 *
 * OBJECTIF :
 * Gestion de la page dashboard avec graphiques et statistiques
 * Intégration Chart.js, données en temps réel
 * Compatible avec les 2 thèmes
 *
 * DÉPENDANCES :
 * - Chart.js (graphiques)
 * - assets/data/formations.json (données)
 * - assets/data/actualites.json (actualités)
 *
 * AUTEUR : sCtt3 | EPL Devs
 * DERNIÈRE MODIFICATION : 15 octobre 2025
 */

/**
 * DASHBOARD EPL
 * 
 * FONCTIONNALITÉS :
 * - Graphiques interactifs avec Chart.js
 * - Statistiques en temps réel
 * - Actualités récentes
 * - Formations populaires
 * - Animations de comptage
 * - Mise à jour automatique
 * 
 * UTILISATION :
 * - S'initialise automatiquement sur la page dashboard
 * - Compatible avec tous les thèmes
 * - Responsive et accessible
 */
class DashboardEPL {
    constructor() {
        // Éléments DOM
        this.derniereMiseAJour = document.getElementById('derniere-mise-a-jour');
        this.statEtudiants = document.getElementById('stat-etudiants');
        this.statFormations = document.getElementById('stat-formations');
        this.statInsertion = document.getElementById('stat-insertion');
        this.conteneurActualites = document.getElementById('actualites-dashboard-container');
        this.conteneurFormations = document.getElementById('formations-populaires-container');

        // Graphiques
        this.graphiqueFormations = null;
        this.graphiqueEvolution = null;

        // État de l'application
        this.estInitialise = false;
        this.donnees = {
            formations: [],
            actualites: [],
            statistiques: {}
        };

        // Configuration
        this.config = {
            miseAJourIntervalle: 300000, // 5 minutes
            animationDelai: 100,
            performance: true
        };

        // Timer de mise à jour
        this.timerMiseAJour = null;

        // Initialisation
        this.initialiser();

        console.log('📊 Dashboard EPL initialisé');
    }

    /**
     * Initialise le dashboard complet
     */
    async initialiser() {
        try {
            // Met à jour l'heure de dernière mise à jour
            this.mettreAJourHeure();

            // Charge les données
            await this.chargerDonnees();

            // Initialise les graphiques
            this.initialiserGraphiques();

            // Affiche les statistiques
            this.afficherStatistiques();

            // Charge les actualités
            await this.chargerActualites();

            // Charge les formations populaires
            await this.chargerFormationsPopulaires();

            // Configure la mise à jour automatique
            this.configurerMiseAJourAutomatique();

            // Marque comme initialisé
            this.estInitialise = true;

            console.log('✅ Dashboard EPL prêt');

        } catch (erreur) {
            console.error('❌ Erreur lors de l\'initialisation du dashboard :', erreur);
        }
    }

    /**
     * Charge toutes les données nécessaires
     */
    async chargerDonnees() {
        try {
            // Charge les formations
            const reponseFormations = await fetch('/assets/data/formations.json');
            this.donnees.formations = await reponseFormations.json();

            // Charge les actualités
            const reponseActualites = await fetch('/assets/data/actualites.json');
            this.donnees.actualites = await reponseActualites.json();

            // Génère les statistiques
            this.genererStatistiques();

            console.log('📊 Données chargées avec succès');

        } catch (erreur) {
            console.error('❌ Erreur lors du chargement des données :', erreur);
            throw erreur;
        }
    }

    /**
     * Génère les statistiques à partir des données
     */
    genererStatistiques() {
        const formations = this.donnees.formations;

        // Statistiques de base
        this.donnees.statistiques = {
            totalEtudiants: formations.reduce((total, formation) =>
                total + parseInt(formation.etudiants), 0),
            totalFormations: formations.length,
            tauxInsertion: 95,
            repartitionFormations: formations.map(formation => ({
                nom: formation.nom,
                etudiants: parseInt(formation.etudiants),
                couleur: formation.couleur
            })),
            evolutionInscriptions: this.genererEvolutionInscriptions(),
            tauxReussite: {
                general: 92,
                parFormation: formations.map(formation => ({
                    nom: formation.nom,
                    taux: 85 + Math.random() * 15 // Simulation
                }))
            }
        };
    }

    /**
     * Génère des données d'évolution des inscriptions
     */
    genererEvolutionInscriptions() {
        const annees = ['2020', '2021', '2022', '2023', '2024'];
        return annees.map(annee => ({
            annee,
            inscriptions: 50 + Math.random() * 100 // Simulation
        }));
    }

    /**
     * Initialise tous les graphiques
     */
    initialiserGraphiques() {
        // Graphique de répartition par formation
        this.initialiserGraphiqueFormations();

        // Graphique d'évolution des inscriptions
        this.initialiserGraphiqueEvolution();
    }

    /**
     * Initialise le graphique de répartition par formation
     */
    initialiserGraphiqueFormations() {
        const canvas = document.getElementById('graphique-formations');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const donnees = this.donnees.statistiques.repartitionFormations;

        this.graphiqueFormations = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: donnees.map(d => d.nom),
                datasets: [{
                    data: donnees.map(d => d.etudiants),
                    backgroundColor: donnees.map(d => d.couleur),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const pourcentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed} étudiants (${pourcentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 1000
                }
            }
        });
    }

    /**
     * Initialise le graphique d'évolution des inscriptions
     */
    initialiserGraphiqueEvolution() {
        const canvas = document.getElementById('graphique-evolution');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const donnees = this.donnees.statistiques.evolutionInscriptions;

        this.graphiqueEvolution = new Chart(ctx, {
            type: 'line',
            data: {
                labels: donnees.map(d => d.annee),
                datasets: [{
                    label: 'Inscriptions',
                    data: donnees.map(d => d.inscriptions),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `Inscriptions: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    /**
     * Affiche les statistiques avec animations
     */
    afficherStatistiques() {
        // Met à jour les statistiques principales
        this.animerComptage(this.statEtudiants, this.donnees.statistiques.totalEtudiants, '+');
        this.animerComptage(this.statFormations, this.donnees.statistiques.totalFormations);
        this.animerComptage(this.statInsertion, this.donnees.statistiques.tauxInsertion, '%');
    }

    /**
     * Anime le comptage d'une valeur
     */
    animerComptage(element, valeurFinale, suffixe = '') {
        if (!element) return;

        const duree = 2000; // 2 secondes
        const etapes = 60;
        const increment = valeurFinale / etapes;
        let valeurActuelle = 0;

        const timer = setInterval(() => {
            valeurActuelle += increment;

            if (valeurActuelle >= valeurFinale) {
                valeurActuelle = valeurFinale;
                clearInterval(timer);
            }

            element.textContent = Math.floor(valeurActuelle) + suffixe;
        }, duree / etapes);

        // Ajoute l'animation CSS
        element.classList.add('animation-comptage');
    }

    /**
     * Charge et affiche les actualités récentes
     */
    async chargerActualites() {
        if (!this.conteneurActualites) return;

        try {
            // Affiche les 3 dernières actualités
            const actualitesRecentes = this.donnees.actualites.slice(0, 3);

            this.conteneurActualites.innerHTML = actualitesRecentes.map(actualite => `
                <article class="actualite-card">
                    <div class="card-image">
                        <img src="${actualite.image}" alt="${actualite.titre}" loading="lazy">
                        <span class="card-date">${actualite.date}</span>
                    </div>
                    <div class="card-contenu">
                        <h3 class="card-titre">${actualite.titre}</h3>
                        <p class="card-description">${actualite.description}</p>
                        <a href="/pages/actualites/${actualite.slug}.html" class="bouton bouton-outline">
                            Lire la suite
                        </a>
                    </div>
                </article>
            `).join('');

        } catch (erreur) {
            console.error('❌ Erreur lors du chargement des actualités :', erreur);
        }
    }

    /**
     * Charge et affiche les formations populaires
     */
    async chargerFormationsPopulaires() {
        if (!this.conteneurFormations) return;

        try {
            // Trie les formations par nombre d'étudiants
            const formationsPopulaires = [...this.donnees.formations]
                .sort((a, b) => parseInt(b.etudiants) - parseInt(a.etudiants))
                .slice(0, 3);

            this.conteneurFormations.innerHTML = formationsPopulaires.map((formation, index) => `
                <article class="formation-populaire-card">
                    <div class="formation-populaire-header">
                        <h3 class="formation-populaire-titre">${formation.nom}</h3>
                        <div class="formation-populaire-rang">
                            <span aria-hidden="true">🏆</span>
                            <span>#${index + 1}</span>
                        </div>
                    </div>
                    <div class="formation-populaire-contenu">
                        <div class="formation-populaire-stats">
                            <div class="formation-populaire-stat">
                                <div class="formation-populaire-stat-valeur">${formation.etudiants}</div>
                                <div class="formation-populaire-stat-label">Étudiants</div>
                            </div>
                            <div class="formation-populaire-stat">
                                <div class="formation-populaire-stat-valeur">${formation.duree}</div>
                                <div class="formation-populaire-stat-label">Durée</div>
                            </div>
                            <div class="formation-populaire-stat">
                                <div class="formation-populaire-stat-valeur">${formation.niveau}</div>
                                <div class="formation-populaire-stat-label">Niveau</div>
                            </div>
                        </div>
                        <p class="formation-populaire-description">${formation.description}</p>
                        <div class="formation-populaire-actions">
                            <a href="/pages/formations/${formation.slug}.html" class="bouton bouton-primaire">
                                En savoir plus
                            </a>
                            <a href="/pages/contact.html" class="bouton bouton-outline">
                                Candidater
                            </a>
                        </div>
                    </div>
                </article>
            `).join('');

        } catch (erreur) {
            console.error('❌ Erreur lors du chargement des formations populaires :', erreur);
        }
    }

    /**
     * Configure la mise à jour automatique
     */
    configurerMiseAJourAutomatique() {
        // Mise à jour périodique
        this.timerMiseAJour = setInterval(() => {
            this.mettreAJourDonnees();
        }, this.config.miseAJourIntervalle);

        // Mise à jour lors du retour de focus
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.mettreAJourDonnees();
            }
        });
    }

    /**
     * Met à jour les données du dashboard
     */
    async mettreAJourDonnees() {
        try {
            console.log('🔄 Mise à jour des données du dashboard...');

            // Recharge les données
            await this.chargerDonnees();

            // Met à jour les graphiques
            this.mettreAJourGraphiques();

            // Met à jour les statistiques
            this.afficherStatistiques();

            // Met à jour l'heure
            this.mettreAJourHeure();

            console.log('✅ Données mises à jour');

        } catch (erreur) {
            console.error('❌ Erreur lors de la mise à jour :', erreur);
        }
    }

    /**
     * Met à jour les graphiques
     */
    mettreAJourGraphiques() {
        // Met à jour le graphique des formations
        if (this.graphiqueFormations) {
            const donnees = this.donnees.statistiques.repartitionFormations;
            this.graphiqueFormations.data.datasets[0].data = donnees.map(d => d.etudiants);
            this.graphiqueFormations.update('active');
        }

        // Met à jour le graphique d'évolution
        if (this.graphiqueEvolution) {
            const donnees = this.donnees.statistiques.evolutionInscriptions;
            this.graphiqueEvolution.data.datasets[0].data = donnees.map(d => d.inscriptions);
            this.graphiqueEvolution.update('active');
        }
    }

    /**
     * Met à jour l'heure de dernière mise à jour
     */
    mettreAJourHeure() {
        if (!this.derniereMiseAJour) return;

        const maintenant = new Date();
        const heure = maintenant.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        this.derniereMiseAJour.textContent = heure;
    }

    /**
     * Récupère les statistiques actuelles
     */
    obtenirStatistiques() {
        return {
            ...this.donnees.statistiques,
            derniereMiseAJour: this.derniereMiseAJour?.textContent,
            estInitialise: this.estInitialise
        };
    }

    /**
     * Récupère l'état du dashboard
     */
    obtenirEtat() {
        return {
            estInitialise: this.estInitialise,
            graphiques: {
                formations: !!this.graphiqueFormations,
                evolution: !!this.graphiqueEvolution
            },
            donnees: {
                formations: this.donnees.formations.length,
                actualites: this.donnees.actualites.length
            }
        };
    }

    /**
     * Détruit le dashboard et nettoie les ressources
     */
    detruire() {
        // Détruit les graphiques
        if (this.graphiqueFormations) {
            this.graphiqueFormations.destroy();
        }
        if (this.graphiqueEvolution) {
            this.graphiqueEvolution.destroy();
        }

        // Annule le timer de mise à jour
        if (this.timerMiseAJour) {
            clearInterval(this.timerMiseAJour);
        }

        console.log('🗑️ Dashboard EPL détruit');
    }
}

// Auto-initialisation si la page dashboard existe
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.hero-dashboard')) {
            window.DashboardEPL = DashboardEPL;
        }
    });
} else {
    if (document.querySelector('.hero-dashboard')) {
        window.DashboardEPL = DashboardEPL;
    }
}

// Export pour utilisation en module si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardEPL;
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    new DashboardEPL();

    // Gestion du sélecteur de thème dans la sidebar
    const boutonThemeDynamique = document.getElementById('bouton-theme-dynamique');
    const iconeThemeDynamique = document.querySelector('.icone-theme-dynamique');

    // Vérifier que les éléments existent
    if (!boutonThemeDynamique || !iconeThemeDynamique) {
        console.error('Éléments du sélecteur de thème non trouvés');
        return;
    }

    // Cycle des thèmes : clair -> sombre -> clair
    const themes = ['clair', 'sombre'];
    let indexThemeActuel = 0;

    // Fonction pour mettre à jour l'icône selon le thème
    function mettreAJourIconeTheme(theme) {
        let iconeSVG = '';

        switch (theme) {
            case 'clair':
                iconeSVG = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
                break;
            case 'sombre':
                iconeSVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
                break;
        }

        iconeThemeDynamique.innerHTML = iconeSVG;
    }

    // Initialiser avec le thème actuel
    const themeActuel = localStorage.getItem('theme-prefere-epl') || 'clair';
    indexThemeActuel = themes.indexOf(themeActuel);
    mettreAJourIconeTheme(themeActuel);

    // Gestion du clic pour cycle
    boutonThemeDynamique.addEventListener('click', () => {
        console.log('🎨 Bouton de thème cliqué !');

        // Passer au thème suivant
        indexThemeActuel = (indexThemeActuel + 1) % themes.length;
        const nouveauTheme = themes[indexThemeActuel];

        console.log(`🎨 Changement vers le thème : ${nouveauTheme}`);

        // Appliquer le thème
        document.documentElement.setAttribute('data-theme', nouveauTheme);
        localStorage.setItem('theme-prefere-epl', nouveauTheme);

        // Mettre à jour l'affichage
        mettreAJourIconeTheme(nouveauTheme);

        // Déclencher l'événement de changement de thème
        const event = new CustomEvent('themeChanged', { detail: { theme: nouveauTheme } });
        window.dispatchEvent(event);

        // Animation de rotation
        iconeThemeDynamique.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            iconeThemeDynamique.style.transform = '';
        }, 300);
    });
});