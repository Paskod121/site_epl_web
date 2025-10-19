# Guide Équipes - Site EPL

> **Guide pratique pour les développeurs de l'équipe**

## 📋 Table des matières

- [🏗️ Architecture](#architecture)
- [🧩 Composants disponibles](#composants)
- [📄 Créer une nouvelle page](#nouvelle-page)
- [🔧 Utilisation des composants](#utilisation)
- [⚡ Performance](#performance)
- [🐛 Debug](#debug)

---

## 🏗️ Architecture

### Structure du projet
```
site_epl_web/
├── components/          # Composants réutilisables
├── css/                # Styles organisés
├── js/utils/           # Scripts utilitaires
├── pages/              # Pages HTML
└── docs/               # Documentation
```

### Système de chargement
- **ChargeurComposants** : Charge les composants réutilisables
- **ChargeurPages** : Gère le chargement des pages
- **GestionnaireNavigation** : Synchronise sidebar/breadcrumb

---

##  Composants disponibles

### 1. Sidebar (`components/sidebar.html`)
**Navigation principale + thème**
```html
<div id="sidebar-container"></div>
```

### 2. Navbar (`components/navbar.html`)
**Navigation mobile uniquement**
```html
<div id="navbar-container"></div>
```

### 3. Breadcrumb (`components/breadcrumb.html`)
**Fil d'Ariane avec icônes**
```html
<div id="breadcrumb-container"></div>
```

### 4. Footer (`components/footer.html`)
**Footer standardisé**
```html
<footer class="footer-principal"></footer>
```

### 5. CTA (`components/cta.html`)
**Call-to-action réutilisable**
```html
<section class="cta-section"></section>
```

### 6. Modal (`components/modal.html`)
**Système de modales**
```html
<div id="modal-container"></div>
```

---

## 📄 Créer une nouvelle page

### 1. Structure HTML de base
```html
<!DOCTYPE html>
<html lang="fr" data-theme="clair">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma Page - École Polytechnique de Lomé</title>
    
    <!-- CSS obligatoires -->
    <link rel="stylesheet" href="/css/base/variables.css">
    <link rel="stylesheet" href="/css/base/reset.css">
    <link rel="stylesheet" href="/css/components/sidebar.css">
    <link rel="stylesheet" href="/css/components/nouveaux-composants.css">
    <link rel="stylesheet" href="/css/layouts/main.css">
</head>
<body>
    <!-- Skip link pour l'accessibilité -->
    <a href="#contenu-principal" class="skip-link">Aller au contenu principal</a>

    <!-- Containers obligatoires -->
    <div id="navbar-container"></div>
    <div id="breadcrumb-container"></div>
    <div id="sidebar-container"></div>

    <!-- Contenu principal -->
    <main id="contenu-principal" class="contenu-principal">
        <!-- Votre contenu ici -->
    </main>

    <!-- Footer -->
    <footer class="footer-principal"></footer>

    <!-- Scripts obligatoires -->
    <script src="/js/utils/themes.js"></script>
    <script src="/js/utils/chargeur-composants.js"></script>
    <script src="/js/utils/chargeur-pages.js"></script>
    <script src="/js/utils/gestionnaire-animations.js"></script>
    <script src="/js/utils/gestionnaire-navigation.js"></script>

    <!-- Script de la page -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Initialiser la page
            if (typeof chargeurPages !== 'undefined') {
                chargeurPages.initialiser('nom-de-votre-page');
            }

            // Synchroniser la navigation
            if (typeof gestionnaireNavigation !== 'undefined') {
                setTimeout(() => {
                    gestionnaireNavigation.forcerSynchronisation();
                }, 100);
            }
        });
    </script>
</body>
</html>
```

### 2. Ajouter la page dans la configuration
**Fichier : `js/utils/chargeur-pages.js`**
```javascript
this.configurationPages = {
    // ... pages existantes
    'nom-de-votre-page': ["breadcrumb", "sidebar", "footer"],
};
```

### 3. Ajouter l'icône breadcrumb (optionnel)
**Fichier : `components/breadcrumb.html`**
```javascript
const icones = {
    // ... icônes existantes
    'nom-de-votre-page': `
        <svg class="breadcrumb-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <!-- Votre SVG ici -->
        </svg>
    `,
};
```

---

## 🔧 Utilisation des composants

### Charger un composant manuellement
```javascript
// Charger un composant
chargeurComposants.charger('sidebar', 'sidebar-container')
    .then(() => {
        console.log('Composant chargé');
    })
    .catch(erreur => {
        console.error('Erreur:', erreur);
    });
```

### Ouvrir une modal
```javascript
// Ouvrir une modal
const modal = new GestionnaireModal();
modal.ouvrir('Titre', 'Contenu de la modal', [
    { texte: 'Annuler', action: 'fermer' },
    { texte: 'Confirmer', action: 'confirmer', classe: 'bouton-primaire' }
]);
```

### Changer de thème
```javascript
// Changer de thème
gestionnaireThemes.changerTheme('sombre');
```

---

## ⚡ Performance

### Bonnes pratiques
- ✅ **Utiliser les composants réutilisables**
- ✅ **Respecter l'architecture modulaire**
- ✅ **Tester sur mobile et desktop**
- ✅ **Vérifier les thèmes clair/sombre**

### Éviter
- ❌ **Dupliquer le code HTML**
- ❌ **Charger les composants manuellement**
- ❌ **Ignorer la gestion d'erreurs**
- ❌ **Oublier la responsivité**

---

## 🐛 Debug

### Logs utiles
```javascript
// Activer les logs détaillés
console.log('🔍 Debug activé');

// Vérifier l'état des composants
console.log('Sidebar:', document.querySelector('#sidebar-container').innerHTML);
console.log('Breadcrumb:', document.querySelector('#breadcrumb-container').innerHTML);
```

### Problèmes courants
1. **Composant ne se charge pas** , Vérifier le nom dans `chargeur-pages.js`
2. **Icône breadcrumb manquante** , Ajouter dans `breadcrumb.html`
3. **Navigation cassée** → Vérifier `gestionnaire-navigation.js`

---

## 📞 Support

- **Documentation complète** : `docs/COMPOSANTS.md`
- **Exemples** : Voir les pages existantes
- **Questions** : GitHub Discussions

---

**Objectif : Développement rapide et cohérent pour toute l'équipe !**