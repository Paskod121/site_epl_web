#  Documentation des Composants

> **Guide complet des composants réutilisables**

## 📋 Composants disponibles

| Composant | Fichier | Usage | Responsive |
|-----------|---------|-------|------------|
| **Sidebar** | `sidebar.html` | Navigation principale | ✅ |
| **Navbar** | `navbar.html` | Navigation mobile | Mobile uniquement |
| **Breadcrumb** | `breadcrumb.html` | Fil d'Ariane | ✅ |
| **Footer** | `footer.html` | Pied de page | ✅ |
| **CTA** | `cta.html` | Call-to-action | ✅ |
| **Modal** | `modal.html` | Fenêtres modales | ✅ |

---

## Sidebar (`components/sidebar.html`)

### Fonctionnalités
- Navigation principale
- Toggle thème clair/sombre
- État actif automatique
- Responsive design

### Utilisation
```html
<div id="sidebar-container"></div>
```

### Configuration
```javascript
// Dans chargeur-pages.js
'ma-page': ["sidebar", "footer"]
```

### CSS
```css
/* Styles dans css/components/sidebar.css */
.sidebar-nav-link.actif {
    background: var(--couleur-accent);
    color: white;
}
```

---

## 📱 Navbar (`components/navbar.html`)

### Fonctionnalités
- Navigation mobile uniquement
- Logo EPL
- Toggle thème
- Menu hamburger

### Utilisation
```html
<div id="navbar-container"></div>
```

### Auto-chargement
```javascript
// Se charge automatiquement sur mobile (≤768px)
if (window.innerWidth <= 768) {
    composantsPage.unshift("navbar");
}
```

---

##  Breadcrumb (`components/breadcrumb.html`)

### Fonctionnalités
- Fil d'Ariane automatique
- Icônes SVG pour chaque page
- Liens de navigation
- Centré et stylisé

### Utilisation
```html
<div id="breadcrumb-container"></div>
```

### Ajouter une icône
```javascript
// Dans breadcrumb.html
const icones = {
    'ma-page': `
        <svg class="breadcrumb-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
    `,
};
```

### Pages supportées
- `formations` → 📚 Formations
- `dashboard` → 📊 Tableau de bord
- `contact` → 📧 Contact
- `about` → ℹ️ À propos
- `actualites` → 📰 Actualités
- `admissions` → 👥 Admissions

---

##  Footer (`components/footer.html`)

### Fonctionnalités
- Copyright EPL
- Liens légaux
- Design cohérent

### Utilisation
```html
<footer class="footer-principal">
    <!-- Se charge automatiquement -->
</footer>
```

---

##  CTA (`components/cta.html`)

### Fonctionnalités
- Call-to-action réutilisable
- Boutons d'action
- Design responsive

### Utilisation
```html
<section class="cta-section">
    <!-- Se charge automatiquement -->
</section>
```

### Configuration
```javascript
// Pages avec CTA
'index': ["breadcrumb", "sidebar", "footer", "cta"],
'formations': ["breadcrumb", "sidebar", "footer", "cta"],
```

---

## 🪟 Modal (`components/modal.html`)

### Fonctionnalités
- Fenêtres modales
- Boutons personnalisables
- Overlay avec fermeture
- Animations fluides

### Utilisation
```javascript
// Ouvrir une modal
const modal = new GestionnaireModal();
modal.ouvrir(
    'Titre de la modal',
    'Contenu HTML',
    [
        { texte: 'Annuler', action: 'fermer' },
        { texte: 'Confirmer', action: 'confirmer', classe: 'bouton-primaire' }
    ]
);
```

### Méthodes disponibles
```javascript
modal.ouvrir(titre, contenu, boutons);
modal.fermer();
modal.mettreAJourContenu(nouveauContenu);
```

---

## Système de Thèmes

### Variables CSS
```css
:root {
    --couleur-fond-primaire: #ffffff;
    --couleur-texte-primaire: #1a1a1a;
    --couleur-accent: #3b82f6;
}

[data-theme="sombre"] {
    --couleur-fond-primaire: #0f172a;
    --couleur-texte-primaire: #f8fafc;
}
```

### JavaScript
```javascript
// Changer de thème
gestionnaireThemes.changerTheme('sombre');

// Obtenir le thème actuel
const theme = gestionnaireThemes.obtenirThemeActuel();
```

---

## Performance

### Cache automatique
- Les composants sont mis en cache
- Rechargement uniquement si nécessaire
- Fallbacks en cas d'échec

### Chargement parallèle
- Tous les composants se chargent en même temps
- Indicateurs de chargement
- Gestion d'erreurs robuste

### Optimisations
```javascript
// Timeout de 8 secondes
// Retry automatique
// Validation du contenu
// AbortController pour annuler les requêtes lentes
```

---

## 🐛 Debug

### Logs utiles
```javascript
// Vérifier l'état des composants
console.log('Sidebar:', document.querySelector('#sidebar-container').innerHTML);
console.log('Breadcrumb:', document.querySelector('#breadcrumb-container').innerHTML);

// Vérifier la navigation
gestionnaireNavigation.forcerSynchronisation();
```

### Problèmes courants

#### 1. Composant ne se charge pas
```javascript
// Vérifier la configuration
console.log(chargeurPages.configurationPages);
```

#### 2. Icône breadcrumb manquante
```javascript
// Ajouter dans breadcrumb.html
const icones = {
    'ma-page': `<svg>...</svg>`
};
```

#### 3. Navigation cassée
```javascript
// Forcer la synchronisation
gestionnaireNavigation.forcerSynchronisation();
```

---

## 📝 Exemples d'utilisation

### Page complète
```html
<!DOCTYPE html>
<html lang="fr" data-theme="clair">
<head>
    <title>Ma Page - EPL</title>
    <link rel="stylesheet" href="/css/base/variables.css">
    <link rel="stylesheet" href="/css/components/nouveaux-composants.css">
</head>
<body>
    <div id="navbar-container"></div>
    <div id="breadcrumb-container"></div>
    <div id="sidebar-container"></div>
    
    <main id="contenu-principal">
        <h1>Ma Page</h1>
        <p>Contenu de la page</p>
    </main>
    
    <script src="/js/utils/chargeur-pages.js"></script>
    <script src="/js/utils/gestionnaire-navigation.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            chargeurPages.initialiser('ma-page');
            setTimeout(() => {
                gestionnaireNavigation.forcerSynchronisation();
            }, 100);
        });
    </script>
</body>
</html>
```

### Modal personnalisée
```javascript
const modal = new GestionnaireModal();
modal.ouvrir(
    'Confirmation',
    '<p>Êtes-vous sûr de vouloir continuer ?</p>',
    [
        { texte: 'Annuler', action: 'fermer' },
        { texte: 'Continuer', action: 'confirmer', classe: 'bouton-primaire' }
    ]
);
```

---

##  Bonnes pratiques

### ✅ À faire
- Utiliser les composants réutilisables
- Respecter l'architecture modulaire
- Tester sur mobile et desktop
- Vérifier les thèmes clair/sombre

### ❌ À éviter
- Dupliquer le code HTML
- Charger les composants manuellement
- Ignorer la gestion d'erreurs
- Oublier la responsivité

---

**Objectif : Développement rapide et cohérent !**
