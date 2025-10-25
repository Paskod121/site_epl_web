# Composant CTA Réutilisable

## 📋 Description

Le composant CTA (Call to Action) est un composant réutilisable qui permet d'afficher une section d'appel à l'action avec un design moderne et des animations fluides.

## Fonctionnalités

- **Design moderne** : Gradient bleu-vert avec effets visuels
- **Animations fluides** : Apparition en cascade et effets de survol
- **Responsive** : Adaptation automatique à tous les écrans
- **Thèmes** : Compatible avec les modes clair et sombre
- **Accessibilité** : Support complet du clavier et des lecteurs d'écran
- **Interactions** : Effets de ripple et animations avancées

## 📁 Fichiers

```
components/
├── cta.html          # Structure HTML du composant
css/components/
├── cta.css           # Styles CSS du composant
js/components/
├── cta.js            # Logique JavaScript du composant
```

##  Utilisation

### HTML de base

```html
<!-- Section CTA -->
<section class="cta-section" role="region">
    <div class="container">
        <div class="cta-contenu">
            <h2 class="cta-titre">Prêt à rejoindre l'excellence ?</h2>
            <p class="cta-description">
                Découvrez nos formations et commencez votre parcours d'ingénieur dès maintenant.
            </p>
            <div class="cta-actions">
                <a href="/pages/formations/index.html" class="bouton bouton-primaire bouton-large">
                    <svg class="icone-cta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <!-- Icône SVG -->
                    </svg>
                    <span>Découvrir nos formations</span>
                </a>
                <a href="/pages/contact.html" class="bouton bouton-secondaire bouton-large">
                    <svg class="icone-cta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <!-- Icône SVG -->
                    </svg>
                    <span>Nous contacter</span>
                </a>
            </div>
        </div>
    </div>
</section>
```

### Imports nécessaires

```html
<!-- CSS -->
<link rel="stylesheet" href="/css/components/cta.css">

<!-- JavaScript -->
<script src="/js/components/cta.js"></script>
```

### JavaScript

```javascript
// Auto-initialisation (automatique)
// Ou initialisation manuelle
const cta = new CTAComponent('.cta-section');

// Mise à jour du contenu
cta.updateContent({
    titre: 'Nouveau titre',
    description: 'Nouvelle description',
    boutonPrimaire: {
        texte: 'Nouveau bouton',
        url: '/nouvelle-url'
    }
});
```

## 🎨 Personnalisation

### Classes CSS disponibles

```css
/* Variations du CTA */
.cta-section.cta-sombre     /* Fond sombre */
.cta-section.cta-colore     /* Fond coloré */
.cta-section.cta-compact    /* Version compacte */
```

### Variables CSS personnalisables

```css
:root {
    --cta-gradient-start: #3b82f6;
    --cta-gradient-end: #10b981;
    --cta-text-color: #ffffff;
    --cta-button-padding: 1rem 2rem;
}
```

## 📱 Responsive

- **Desktop** : Layout horizontal avec boutons côte à côte
- **Tablet** : Layout adaptatif avec boutons empilés
- **Mobile** : Layout vertical optimisé pour le tactile

## ♿ Accessibilité

- **Navigation clavier** : Support complet des touches Tab, Enter, Espace
- **Lecteurs d'écran** : Attributs ARIA et rôles appropriés
- **Contraste** : Respect des standards WCAG 2.1
- **Focus** : Indicateurs visuels clairs pour la navigation

## 🎭 Animations

- **Apparition** : Animation en cascade des éléments
- **Survol** : Effets de translation et rotation
- **Clic** : Effet de ripple et feedback visuel
- **Thème** : Transitions fluides entre les modes

## 🔧 API JavaScript

### Méthodes disponibles

```javascript
// Initialisation
const cta = new CTAComponent(selector);

// Mise à jour du contenu
cta.updateContent(options);

// Destruction du composant
cta.destroy();

// Initialisation de tous les CTA
initAllCTAs();
```

### Événements

```javascript
// Écouter les changements de thème
document.addEventListener('themeChanged', (event) => {
    console.log('Nouveau thème:', event.detail.theme);
});
```

## 📊 Performance

- **Lazy loading** : Initialisation uniquement quand visible
- **Animations optimisées** : Utilisation de `transform` et `opacity`
- **Memory management** : Nettoyage automatique des événements
- **Bundle size** : ~2KB minifié

## 🐛 Dépannage

### Problèmes courants

1. **CTA ne s'affiche pas** : Vérifier les imports CSS et JS
2. **Animations cassées** : Vérifier la compatibilité navigateur
3. **Thème ne change pas** : Vérifier l'initialisation du gestionnaire de thèmes

### Debug

```javascript
// Activer les logs de debug
localStorage.setItem('debug', 'cta');

// Vérifier l'état du composant
console.log(cta.isInitialized);
```

## 📈 Évolutions futures

- [ ] Support des animations personnalisées
- [ ] Intégration avec les analytics
- [ ] A/B testing intégré
- [ ] Thèmes personnalisés
- [ ] Support des micro-interactions avancées
