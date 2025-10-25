#  GUIDE DE DÉVELOPPEMENT - Site EPL

##  **VUE D'ENSEMBLE DU PROJET**

Ce projet est le site web de l'École Polytechnique de Lomé (EPL), développé avec une architecture modulaire et des composants réutilisables.

### **ARCHITECTURE GÉNÉRALE**

```
site_epl_web/
├── 📁 components/          # Composants réutilisables (HTML)
├── 📁 css/                 # Styles organisés par fonction
├── 📁 js/                  # Scripts JavaScript modulaires
├── 📁 pages/              # Pages HTML du site
├── 📁 api/                # Backend PHP
└── 📁 assets/             # Données et ressources
```

---

## 🔧 **SYSTÈME DE THÈMES**

### **Fichiers Principaux :**
- `js/utils/themes.js` - Gestionnaire principal des thèmes
- `js/utils/theme-global.js` - Script global pour toutes les pages
- `css/base/variables.css` - Variables CSS des thèmes

### **Utilisation :**
```html
<!-- Dans chaque page HTML -->
<script src="/js/utils/themes.js"></script>
<script src="/js/utils/theme-global.js"></script>
```

### **API pour l'équipe :**
```javascript
// Changer de thème
window.gestionnaireThemes.changerTheme();

// Obtenir le thème actuel
const theme = window.gestionnaireThemes.obtenirThemeActuel();

// Écouter les changements de thème
document.addEventListener('themeChanged', function(event) {
    console.log('Nouveau thème:', event.detail.theme);
});
```

---

##  **COMPOSANTS RÉUTILISABLES**

### **1. Sidebar (`components/sidebar.html`)**
- **Fonctionnalités :** Navigation responsive, bouton de thème, gestion des liens actifs
- **Utilisation :** Charger via `fetch()` dans un conteneur `#sidebar-container`
- **CSS requis :** `/css/components/sidebar.css`
- **JS requis :** `/js/components/sidebar.js`

### **2. Footer (`components/footer.html`)**
- **Fonctionnalités :** Footer standardisé avec liens et copyright
- **Utilisation :** Charger via `fetch()` dans un conteneur `#footer-container`
- **CSS requis :** `/css/components/footer.css`

### **3. CTA (`components/cta.html`)**
- **Fonctionnalités :** Call-to-action avec animations et thèmes
- **Utilisation :** Charger via `fetch()` dans un conteneur `#cta-container`
- **CSS requis :** `/css/components/cta.css`
- **JS requis :** `/js/components/cta.js`

---

## 📄 **PAGES DÉVELOPPÉES**

### **Pages Complètes :**
- ✅ `index.html` - Page d'accueil
- ✅ `dashboard.html` - Tableau de bord
- ✅ `formations/index.html` - Page formations
- ✅ `about.html` - À propos
- ✅ `contact.html` - Contact
- ✅ `admissions.html` - Admissions

### **Pages "En Développement" :**
- 🔄 `actualites.html` - Actualités
- 🔄 `mentions-legales.html` - Mentions légales
- 🔄 `politique-confidentialite.html` - Politique de confidentialité
- 🔄 `plan-du-site.html` - Plan du site

### **Pages à Développer :**
- 📝 `espace-etudiant.html` - Espace étudiant
- 📝 `recherche.html` - Recherche
- 📝 `statistiques.html` - Statistiques
- 📝 `bourses.html` - Bourses
- 📝 `evenements.html` - Événements
- 📝 `galerie.html` - Galerie
- 📝 `partenaires.html` - Partenaires
- 📝 `vie-campus.html` - Vie campus

---

##  **SYSTÈME CSS**

### **Structure :**
```
css/
├── base/           # Variables, reset, typography
├── components/     # Styles des composants
├── layouts/         # Layout principal
├── layoutss/        # Layouts spécifiques
└── pages/          # Styles par page
```

### **Variables CSS :**
- Utilisez les variables définies dans `css/base/variables.css`
- Tous les thèmes sont gérés via ces variables
- Exemple : `var(--couleur-fond-primaire)`, `var(--couleur-texte-primaire)`

---

##  **RESPONSIVE DESIGN**

### **Breakpoints :**
- Mobile : `< 768px`
- Tablet : `768px - 1024px`
- Desktop : `> 1024px`

### **Approche :**
- Mobile-first
- Sidebar responsive avec menu hamburger
- Composants adaptatifs

---

## **DÉVELOPPEMENT**

### **Ajouter une Nouvelle Page :**

1. **Créer le fichier HTML :**
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle Page - École Polytechnique de Lomé</title>
    
    <!-- Styles CSS -->
    <link rel="stylesheet" href="/css/base/variables.css">
    <link rel="stylesheet" href="/css/base/reset.css">
    <link rel="stylesheet" href="/css/components/sidebar.css">
    <link rel="stylesheet" href="/css/components/footer.css">
    <link rel="stylesheet" href="/css/components/cta.css">
    <link rel="stylesheet" href="/css/layouts/main.css">
</head>
<body>
    <!-- Sidebar -->
    <div id="sidebar-container"></div>
    
    <!-- Contenu principal -->
    <main id="contenu-principal" class="contenu-principal">
        <!-- Votre contenu ici -->
    </main>
    
    <!-- Footer -->
    <div id="footer-container"></div>
    
    <!-- Scripts JavaScript -->
    <script src="/js/utils/themes.js"></script>
    <script src="/js/utils/theme-global.js"></script>
    <script src="/js/components/sidebar.js"></script>
    <script src="/js/components/footer.js"></script>
    <script src="/js/components/cta.js"></script>
    <script src="/js/main.js"></script>
    
    <!-- Script de la page -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Charger les composants
            fetch('/components/sidebar.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('sidebar-container').innerHTML = html;
                    // Marquer le lien actif
                    const activeLink = document.querySelector('a[href="/pages/votre-page.html"]');
                    if (activeLink) {
                        activeLink.classList.add('actif');
                    }
                });
                
            fetch('/components/footer.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('footer-container').innerHTML = html;
                });
        });
    </script>
</body>
</html>
```

2. **Ajouter le lien dans le sidebar :**
   - Modifier `components/sidebar.html`
   - Ajouter le lien dans la section navigation

3. **Créer le CSS si nécessaire :**
   - Créer un fichier dans `css/pages/`
   - Importer dans la page HTML

---

## 🔍 **DEBUG ET LOGS**

### **Console Logs :**
- Tous les scripts ont des logs détaillés
- Utilisez `F12` pour voir les logs dans la console
- Logs avec emojis pour faciliter le debug

### **Problèmes Courants :**
1. **Bouton de thème ne fonctionne pas :**
   - Vérifier que `themes.js` et `theme-global.js` sont chargés
   - Vérifier les logs dans la console

2. **Sidebar ne se charge pas :**
   - Vérifier que le conteneur `#sidebar-container` existe
   - Vérifier que `sidebar.js` est chargé

3. **Styles ne s'appliquent pas :**
   - Vérifier que `variables.css` est chargé
   - Vérifier que l'attribut `data-theme` est présent sur `<html>`

---

## 📋 **CONVENTIONS DE CODE**

### **Nommage :**
- **Variables :** camelCase (`nomVariable`)
- **Fonctions :** camelCase (`nomFonction`)
- **Classes :** PascalCase (`NomClasse`)
- **Fichiers :** kebab-case (`nom-fichier.js`)

### **Commentaires :**
- Commentaires en français ou anglais 
- Expliquer le "pourquoi" pas seulement le "quoi"
- Utiliser des emojis pour les logs (🎨, ✅, ❌, 🔄)

### **Structure :**
- Un fichier = une responsabilité
- Composants réutilisables
- Pas de duplication de code

---

##  **PROCHAINES ÉTAPES**

### **Priorité 1 :**
1. Développer le contenu des pages non developé
2. Créer les formulaires (contact, admissions)
3. Intégrer les données réelles

### **Priorité 2 :**
1. Optimiser les performances
2. Ajouter les animations
3. Tester sur différents navigateurs

### **Priorité 3 :**
1. Documentation utilisateur
2. Tests automatisés
3. Déploiement

---

## 📞 **CONTACT ÉQUIPE**

Pour toute question sur le code ou l'architecture :
- Vérifier d'abord cette documentation
- Consulter les logs dans la console
- Tester sur le serveur local (`python -m http.server 8000`)

**Bonne continuation !**