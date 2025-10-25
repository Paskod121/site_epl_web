# GUIDE DE CONTRIBUTION - Site EPL

> **Comment contribuer efficacement au projet EPL**

##  Objectifs de Contribution

Ce guide vous aide à contribuer au site web de l'École Polytechnique de Lomé en respectant l'architecture modulaire et les standards de qualité établis.

---

## 🚀 Démarrage Rapide

### Prérequis
- **Navigateur moderne** : Chrome, Firefox, Safari, Edge
- **Serveur local** : Python 3+ ou Node.js
- **Éditeur de code** : VS Code recommandé
- **Git** : Pour la gestion des versions

### Installation
```bash
# 1. Cloner le projet
git clone https://github.com/Paskod121/site_epl_web.git
cd site_epl_web

# 2. Lancer le serveur local
python -m http.server 8000
# Ou avec Node.js : npx http-server

# 3. Ouvrir dans le navigateur
# http://localhost:8000
```

---

## 🏗️ Architecture du Projet

### Structure Modulaire
```
site_epl_web/
├── components/          # Composants réutilisables HTML
├── css/                # Architecture CSS modulaire
│   ├── base/          # Variables et styles de base
│   ├── components/    # Styles des composants
│   ├── layouts/       # Mises en page
│   └── pages/         # Styles spécifiques aux pages
├── js/                # JavaScript modulaire
│   ├── components/    # Logique des composants
│   ├── features/      # Fonctionnalités métier
│   └── utils/         # Utilitaires partagés
├── pages/             # Pages HTML du site
└── docs/              # Documentation complète
```

### Principes Fondamentaux
1. **Modularité** : Chaque composant est indépendant
2. **Réutilisabilité** : Éviter la duplication de code
3. **Maintenabilité** : Code clair et documenté
4. **Performance** : Optimisation continue

---

## 📋 Types de Contributions

### 1. **Nouvelles Pages**
- Créer des pages HTML complètes
- Respecter la structure modulaire
- Intégrer les composants existants

### 2. **Composants**
- Développer des composants réutilisables
- Documenter l'utilisation
- Tester sur tous les thèmes

### 3. **Fonctionnalités**
- Ajouter des fonctionnalités JavaScript
- Améliorer l'expérience utilisateur
- Optimiser les performances

### 4. **Documentation**
- Améliorer la documentation existante
- Créer des guides d'utilisation
- Documenter les nouvelles fonctionnalités

---

## 🔧 Standards de Développement

### HTML
```html
<!-- Structure sémantique -->
<main id="contenu-principal" class="contenu-principal">
    <section class="ma-section" role="region" aria-labelledby="titre-section">
        <h2 id="titre-section">Titre de la section</h2>
        <!-- Contenu -->
    </section>
</main>
```

**Règles :**
- Utiliser des balises sémantiques
- Ajouter les attributs ARIA
- Respecter la hiérarchie des titres
- Inclure les skip links

### CSS
```css
/* Utiliser les variables CSS */
.ma-classe {
    color: var(--couleur-texte-principal);
    background: var(--couleur-fond-principal);
    transition: var(--transition-theme);
}

/* Mobile-first */
@media (min-width: 768px) {
    .ma-classe {
        /* Styles desktop */
    }
}
```

**Règles :**
- Utiliser les variables CSS définies
- Approche mobile-first
- Commenter les sections complexes
- Organiser par fonctionnalité

### JavaScript
```javascript
/**
 * FONCTIONNALITÉ : Description claire
 * 
 * @param {string} param1 - Description du paramètre
 * @returns {boolean} Description du retour
 */
function maFonction(param1) {
    try {
        // Logique de la fonction
        console.log('✅ Fonction exécutée avec succès');
        return true;
    } catch (error) {
        console.error('❌ Erreur:', error);
        return false;
    }
}
```

**Règles :**
- Commenter en français ou anglais
- Utiliser des logs avec emojis
- Gérer les erreurs
- Respecter le camelCase

---

## 📄 Créer une Nouvelle Page

### 1. Structure de Base
```html
<!DOCTYPE html>
<html lang="fr" data-theme="clair">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma Page - École Polytechnique de Lomé</title>
    
    <!-- Meta tags SEO -->
    <meta name="description" content="Description de la page">
    <meta name="keywords" content="mots-clés, EPL, formations">
    
    <!-- Styles CSS -->
    <link rel="stylesheet" href="/css/base/variables.css">
    <link rel="stylesheet" href="/css/base/reset.css">
    <link rel="stylesheet" href="/css/components/sidebar.css">
    <link rel="stylesheet" href="/css/components/footer.css">
    <link rel="stylesheet" href="/css/layouts/main.css">
    <link rel="stylesheet" href="/css/pages/ma-page.css">
</head>
<body>
    <!-- Skip link pour l'accessibilité -->
    <a href="#contenu-principal" class="skip-link">Aller au contenu principal</a>
    
    <!-- Navbar mobile -->
    <div id="navbar-container"></div>
    
    <!-- Breadcrumb -->
    <div id="breadcrumb-container"></div>
    
    <!-- Sidebar -->
    <div id="sidebar-container"></div>
    
    <!-- Contenu principal -->
    <main id="contenu-principal" class="contenu-principal">
        <!-- Votre contenu ici -->
    </main>
    
    <!-- Footer -->
    <div id="footer-container"></div>
    
    <!-- Scripts JavaScript -->
    <script src="/js/utils/chargeur-pages.js"></script>
    <script src="/js/utils/gestionnaire-navigation.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            chargeurPages.initialiser('ma-page');
        });
    </script>
</body>
</html>
```

### 2. Configuration des Composants
```javascript
// Dans chargeur-pages.js
const configurationPages = {
    'ma-page': ["navbar", "breadcrumb", "sidebar", "footer"]
};
```

### 3. Ajouter le Lien de Navigation
```html
<!-- Dans components/sidebar.html -->
<div class="sidebar-nav-item" role="none">
    <a href="/pages/ma-page.html" class="sidebar-nav-link" role="menuitem">
        <svg class="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <!-- Icône SVG -->
        </svg>
        <span class="sidebar-nav-text">Ma Page</span>
    </a>
</div>
```

---

## 🧩 Développer un Composant

### 1. Structure HTML
```html
<!-- components/mon-composant.html -->
<div class="mon-composant" role="region" aria-label="Description">
    <h3 class="mon-composant-titre">Titre</h3>
    <div class="mon-composant-contenu">
        <!-- Contenu du composant -->
    </div>
</div>
```

### 2. Styles CSS
```css
/* css/components/mon-composant.css */
.mon-composant {
    background: var(--couleur-fond-principal);
    color: var(--couleur-texte-principal);
    padding: var(--espacement-md);
    border-radius: var(--rayon-md);
    transition: var(--transition-theme);
}

.mon-composant-titre {
    font-size: var(--texte-lg);
    font-weight: var(--poids-bold);
    margin-bottom: var(--espacement-sm);
}
```

### 3. Logique JavaScript
```javascript
// js/components/mon-composant.js
class MonComposant {
    constructor() {
        this.initialiser();
    }
    
    initialiser() {
        console.log('🚀 MonComposant initialisé');
        this.configurerEvenements();
    }
    
    configurerEvenements() {
        // Configuration des événements
    }
}

// Auto-initialisation
document.addEventListener('DOMContentLoaded', function() {
    new MonComposant();
});
```

---

## 🎨 Système de Thèmes

### Variables CSS
```css
/* Utiliser les variables définies */
.ma-classe {
    color: var(--couleur-texte-principal);
    background: var(--couleur-fond-principal);
    border: 1px solid var(--couleur-bordure);
}
```

### JavaScript
```javascript
// Changer de thème
gestionnaireThemes.changerTheme();

// Obtenir le thème actuel
const theme = gestionnaireThemes.obtenirThemeActuel();

// Écouter les changements
document.addEventListener('changement-theme', function(event) {
    console.log('Nouveau thème:', event.detail.theme);
});
```

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile first */
.ma-classe {
    /* Styles mobile */
}

@media (min-width: 768px) {
    .ma-classe {
        /* Styles tablette */
    }
}

@media (min-width: 1024px) {
    .ma-classe {
        /* Styles desktop */
    }
}
```

### Composants Responsive
- **Sidebar** : Menu hamburger sur mobile
- **Navbar** : Affichage conditionnel selon la taille
- **Grilles** : Adaptation automatique du nombre de colonnes

---

## 🧪 Tests et Validation

### Tests Manuels
1. **Thèmes** : Vérifier clair/sombre
2. **Responsive** : Tester mobile, tablette, desktop
3. **Navigation** : Vérifier tous les liens
4. **Accessibilité** : Navigation au clavier
5. **Performance** : Temps de chargement

### Outils de Test
- **Lighthouse** : Performance et accessibilité
- **WAVE** : Accessibilité web
- **GTmetrix** : Performance
- **BrowserStack** : Tests multi-navigateurs

---

## 📝 Documentation

### Commenter le Code
```javascript
/**
 * FONCTIONNALITÉ : Description claire de la fonction
 * 
 * UTILISATION :
 * - Appeler cette fonction pour...
 * - Paramètres requis : ...
 * 
 * EXEMPLE :
 * maFonction('param1', 'param2');
 * 
 * @param {string} param1 - Description du paramètre
 * @param {number} param2 - Description du paramètre
 * @returns {boolean} Description du retour
 */
function maFonction(param1, param2) {
    // Implémentation
}
```

### Mettre à Jour la Documentation
1. **README.md** : Informations générales
2. **COMPOSANTS.md** : Documentation des composants
3. **CHANGELOG.md** : Historique des modifications
4. **DEVELOPPEMENT.md** : Guide technique

---

## 🚫 Erreurs à Éviter

### ❌ À ne pas faire
- Dupliquer le code HTML
- Ignorer la gestion d'erreurs
- Oublier la responsivité
- Négliger l'accessibilité
- Modifier les composants existants sans documentation

### ✅ Bonnes pratiques
- Utiliser les composants existants
- Respecter l'architecture modulaire
- Tester sur tous les thèmes
- Documenter les nouvelles fonctionnalités
- Suivre les conventions de nommage

---

## 🔄 Workflow de Contribution

### 1. Préparation
```bash
# Créer une branche feature
git checkout -b feature/ma-nouvelle-fonctionnalite

# Vérifier l'état du projet
git status
```

### 2. Développement
- Développer en respectant les standards
- Tester régulièrement
- Documenter les modifications

### 3. Validation
```bash
# Vérifier les modifications
git diff

# Ajouter les fichiers modifiés
git add .

# Commit avec message descriptif
git commit -m "feat: ajouter nouvelle page formations"

# Pousser la branche
git push origin feature/ma-nouvelle-fonctionnalite
```

### 4. Pull Request
- Créer une PR descriptive
- Mentionner les modifications
- Demander une review

---

## 📞 Support et Aide

### Ressources
- **Documentation** : `docs/` pour tous les guides
- **Exemples** : Pages existantes comme référence
- **Logs** : Console du navigateur pour le debug

### Contact
- **GitHub Issues** : Pour signaler des bugs
- **Discussions** : Pour poser des questions
- **Email** : contact@epl.tg

---

## 🏆 Reconnaissance

Les contributeurs seront mentionnés dans :
- **README.md** : Section Hall of Fame
- **CHANGELOG.md** : Crédits des contributions
- **Documentation** : Mentions dans les guides

---

**Merci de contribuer à l'excellence du site EPL !**

*Ensemble, nous construisons l'avenir de l'éducation au Togo.*
