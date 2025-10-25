# 🎓 Site Web École Polytechnique de Lomé

<div align="center">

**L'enseignement supérieur d'excellence au Togo, accessible à tous**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/epl-togo/site-web)
[![License](https://img.shields.io/badge/license-GPL--3.0-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-production%20ready-green.svg)](https://github.com/epl-togo/site-web)
[![Architecture](https://img.shields.io/badge/architecture-modulaire-purple.svg)](docs/DEVELOPPEMENT.md)

*Excellence • Innovation • Développement*

</div>

---

## Le défi que nous relevons

**L'enseignement supérieur au Togo manque de visibilité et d'accessibilité numérique**

Les étudiants togolais peinent à trouver des informations claires sur les formations d'ingénierie, les procédures d'admission et les opportunités académiques. Notre solution : **un portail web moderne qui démocratise l'accès à l'éducation supérieure d'excellence créée en 2022 par la fusion de l'ENSI et du CIC**.

```
  PROBLÈME RÉSOLU
┌─────────────────────────────────────────┐
│  ❌ Information dispersée               │
│  ❌ Processus d'admission complexes     │
│  ❌ Manque de transparence              │
│  ❌ Expérience utilisateur défaillante │
└─────────────────────────────────────────┘
           ⬇️ NOTRE SOLUTION ⬇️
┌─────────────────────────────────────────┐
│  ✅ Portail unifié et intuitif         │
│  ✅ Admission simplifiée                │
│  ✅ Transparence totale                 │
│  ✅ Expérience moderne                  │
└─────────────────────────────────────────┘
```

### 🎬 Démo en 60 secondes

```bash
# 1. Cloner le projet
git clone https://github.com/Paskod121/site_epl_web.git
cd site_epl_web

# 2. Lancer le serveur de développement
python -m http.server 8000
# Puis ouvrir http://localhost:8000

# 🎉 Votre site EPL est prêt !
# ✨ Fonctionnalités disponibles :
#   - Système de thèmes (clair/sombre)
#   - Navigation responsive
#   - Composants réutilisables
#   - Architecture modulaire
```

---

## Preuve sociale

### Qui nous fait confiance

- **Étudiants** formés depuis 2022 (création de l'EPL)
- **95% de taux de réussite** aux examens
- **90% d'insertion professionnelle** 
- **50 enseignants** experts dans leurs domaines

### 💬 Témoignage marquant

> *"L'EPL m'a donné les bases solides pour réussir dans l'informatique. Les projets pratiques et l'encadrement des professeurs m'ont permis de développer mes compétences techniques et ma capacité d'innovation."*
> 
> **— KOSSI Kossivi Odette, Développeuse Full-Stack, Promotion 2023**

### 📈 Impact mesurable

```
  MÉTRIQUES CLÉS
┌─────────────────┬─────────┐
│ Étudiants       │   Actifs│
│ Formations      │     8   │
│ Niveaux         │ Licence │
│ Création        │   2022  │
│ Fusion          │ ENSI+CIC│
└─────────────────┴─────────┘
```

---

##  Votre première victoire

### Étape 1 : Découverte des formations
```bash
# Explorer nos 8 programmes d'excellence
📚 Informatique & Systèmes (IS)     => Développement & IA
🏗️ Génie Civil (GC)                 => Construction durable  
⚡ Génie Électrique (GE)            => Énergies renouvelables
🔧 Génie Mécanique (GM)             => Innovation industrielle
🤖 Intelligence Artificielle & Big Data => IA & Data Science
🚚 Logistique & Transport (LT)      => Supply Chain
💻 Génie Logiciel (GL)              => Développement avancé
🌐 Systèmes & Réseaux Informatiques => Infrastructure IT
```

### Étape 2 : Découverte interactive
```bash
# Explorer notre contenu riche
1. Parcourir les 8 formations détaillées
2. Découvrir les laboratoires spécialisés
3. Participer aux événements GAIAthon
4. Rencontrer l'équipe pédagogique
```

### Étape 3 : Accès aux ressources
```bash
# Débloquer l'accès complet
✅ Laboratoires spécialisés (Génie Civil, Électrique, Mécanique, Informatique)
✅ Événements technologiques (GAIAthon 2025)
✅ Partenariats internationaux
✅ Doubles diplômes avec partenaires
```

**🎉 Résultat garanti :** En 3 clics, vous saurez si l'EPL est faite pour vous !

###  Et maintenant ?

- **📅 Planifier une visite** => [Calendrier en ligne](pages/admission/calendrier.html)
- **💬 Poser vos questions** => [Contact direct](pages/contact.html)
- **📋 Candidater maintenant** => [Formulaire d'inscription](pages/admission/inscription.html)

---

##  Superpowers

### 🎨 Système de Thèmes Avancé
```css
/* Variables CSS dynamiques */
:root {
  --couleur-fond-primaire: #ffffff;    /* Mode clair */
  --couleur-texte-primaire: #1a1a1a;   /* Texte principal */
  --couleur-accent: #3b82f6;           /* Bleu EPL */
}

[data-theme="sombre"] {
  --couleur-fond-primaire: #0f172a;    /* Mode sombre */
  --couleur-texte-primaire: #f8fafc;   /* Texte clair */
}
```
**✨ Promesse :** Thèmes clair/sombre avec transition fluide  
[En savoir plus =>](css/base/variables.css)

### 🧩 Architecture Modulaire
```javascript
// Composants réutilisables
fetch('/components/sidebar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('sidebar-container').innerHTML = html;
  });
```
**Promesse :** Composants réutilisables, maintenance simplifiée  
[En savoir plus =>](components/)

### 📱 Responsive by Design
```html
<!-- Mobile-first avec breakpoints intelligents -->
<div class="formations-grille">
  <div class="formation-card">Génie Informatique</div>
  <div class="formation-card">Génie Civil</div>
</div>
```
**📱 Promesse :** Parfait sur mobile, tablette et desktop  
[En savoir plus =>](css/layouts/)

### ⚡ Performance Optimisée
```javascript
// Chargement intelligent et lazy loading
const formations = await loadJSONData('/assets/data/formations.json');
// Système de cache intelligent
localStorage.setItem('theme-prefere-epl', 'sombre');
```
**⚡ Promesse :** Chargement instantané, expérience fluide  
[En savoir plus =>](js/utils/)

### 🔒 Sécurité & Validation
```php
// Backend sécurisé avec validation
$data = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$sanitized = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
```
**🛡️ Promesse :** Données protégées, formulaires sécurisés  
[En savoir plus =>](api/)

---

## 🏗️ Architecture & Développement

### 📁 Structure du Projet
```
site_epl_web/
├── 📁 components/          # Composants réutilisables (HTML)
├── 📁 css/                 # Styles organisés par fonction
│   ├── base/              # Variables, reset, typography
│   ├── components/        # Styles des composants
│   ├── layouts/            # Layout principal
│   └── pages/             # Styles par page
├── 📁 js/                  # Scripts JavaScript modulaires
│   ├── components/        # Logique des composants
│   ├── utils/             # Utilitaires (thèmes, API)
│   └── pages/             # Scripts par page
├── 📁 pages/              # Pages HTML du site
├── 📁 api/                # Backend PHP
└── 📁 docs/               # Documentation
```

###  Fonctionnalités Implémentées
- ✅ **Système de thèmes** : Clair/Sombre avec persistance
- ✅ **Navigation responsive** : Sidebar + Navbar mobile + Breadcrumb
- ✅ **Composants réutilisables** : Sidebar, Footer, CTA, Navbar, Breadcrumb, Modal
- ✅ **Pages complètes** : Accueil, Dashboard, Formations, About, Contact, Actualités, Admissions
- ✅ **Architecture modulaire** : CSS et JS organisés avec gestion d'erreurs
- ✅ **Performance optimisée** : Cache, chargement parallèle, fallbacks
- ✅ **Documentation complète** : Guide de développement et composants

###  Pour les Développeurs
```bash
# Guide de développement complet
📚 docs/GUIDE-EQUIPES.md      # Guide pour les équipes
📚 docs/COMPOSANTS.md         # Documentation des composants

# Composants disponibles
📁 components/sidebar.html    # Navigation + thème
📁 components/footer.html      # Footer standardisé
📁 components/cta.html         # Call-to-action
📁 components/navbar.html      # Navbar mobile
📁 components/breadcrumb.html  # Fil d'Ariane
📁 components/modal.html       # Modales

# Scripts utilitaires
📁 js/utils/themes.js         # Gestion des thèmes
📁 js/utils/chargeur-composants.js # Chargement composants
📁 js/utils/chargeur-pages.js     # Chargement pages
📁 js/utils/gestionnaire-navigation.js # Navigation
```

### 🔧 Technologies Utilisées
- **Frontend** : HTML5, CSS3, JavaScript ES2024+
- **Architecture** : Composants modulaires, Variables CSS
- **Backend** : PHP 8+ avec validation sécurisée
- **Design** : Mobile-first, Responsive, Accessibilité

---

##  Communauté

### 💬 Où discuter
- **GitHub Discussions** => [Posez vos questions](https://github.com/Paskod121/site_epl_web/discussions)
- **Email** => [contact@epl.tg](mailto:contact@epl.tg)
- **Téléphone** => +228 90 90 90 90
- **WhatsApp groupe** => [💻 sChtt 3 | EPL Devs](https://chat.whatsapp.com/E3iAd0g6GHv8VgfrC4qWKZ)

### 🤝 Comment contribuer
```bash
# 1. Fork le projet
git clone https://github.com/Paskod121/site_epl_web.git

# 2. Créer une branche feature
git checkout -b feature/nouvelle-fonctionnalite

# 3. Développer avec les standards
# - Utiliser les composants réutilisables
# - Respecter l'architecture modulaire
# - Tester sur mobile et desktop

# 4. Soumettre une PR
git push origin feature/nouvelle-fonctionnalite
```

### 📋 Standards de Développement
- **Commentaires** : En français ou Anglais, explicatifs
- **Nommage** : camelCase pour JS, kebab-case pour fichiers
- **Architecture** : Composants réutilisables obligatoires
- **Tests** : Vérifier sur tous les thèmes et écrans

### 🏆 Hall of Fame
- **Professeur Kondo Hloindo Adjallah** - Directeur de l'EPL
- **Ousmane Any** - Responsable des admissions & relations entreprises
- **Équipe Dev EPL** - Architecture modulaire et composants réutilisables

---

## 📄 Footer

**License** • [GPL-3.0](LICENSE) • **Changelog** • [Voir les nouveautés](docs/CHANGELOG.md) • **Guide Dev** • [docs/DEVELOPPEMENT.md](docs/DEVELOPPEMENT.md) • **Contact** • [Nous écrire](pages/contact.html)

---

<div align="center">

**🎓 École Polytechnique de Lomé**  
*Excellence, Innovation, Développement*

[![Website](https://img.shields.io/badge/website-epl.tg-blue)](https://epl.tg)
[![Email](https://img.shields.io/badge/email-contact@epl.tg-red)](mailto:contact@epl.tg)
[![Architecture](https://img.shields.io/badge/architecture-modulaire-purple.svg)](docs/DEVELOPPEMENT.md)

**Prêt pour la production • 🧩 Architecture modulaire • 🎨 Thèmes avancés**

</div>