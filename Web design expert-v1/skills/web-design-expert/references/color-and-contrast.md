# Couleur et contraste

## Sommaire
1. Construire une palette par rôles
2. Règles d'équilibre
3. Contraste et accessibilité
4. Mode sombre
5. Dégradés, ombres, transparences
6. Couleurs fonctionnelles (admin, formulaires)

## 1. Construire une palette par rôles

Pars des **rôles**, puis choisis les valeurs. Une palette tient en 4 à 6 couleurs de base nommées, plus leurs variantes.

| Rôle | Usage |
|---|---|
| `bg` | Fond principal de la page |
| `surface` | Cartes, panneaux, champs |
| `ink` | Texte principal |
| `ink-muted` | Texte secondaire, légendes |
| `line` | Filets, bordures |
| `accent` | Actions, liens, une couleur qui signe |
| `accent-ink` | Texte posé sur l'accent |
| `signal` | Optionnel : seconde couleur rare (détail, alerte, mise en avant) |

- Nomme les couleurs par leur rôle ou par un nom imagé propre au sujet (`indigo-nuit`, `latérite`), pas `primary-500`.
- Travaille dans un espace perceptuel (OKLCH) pour générer des variantes cohérentes : même clarté pour des teintes différentes, échelles régulières. `oklch(L C H)` est supporté par les navigateurs actuels ; garde un repli hex pour les cas limites.
- **Teinte tes neutres** vers la couleur dominante (un gris très légèrement violet, bleu ou chaud) au lieu de gris purs : la page paraît d'une seule pièce.
- Évite le blanc pur et le noir pur pour les grandes surfaces sauf si c'est un choix de direction explicite ; mais évite aussi les "noirs teintés" génériques (#0B0B0B, #111) posés par réflexe.

## 2. Règles d'équilibre

- Proportion indicative : 60 % de fond et de neutres, 30 % de surfaces et de texte, 10 % d'accent. L'accent perd sa force s'il est partout.
- Une couleur d'accent principale. Une seconde couleur seulement si elle a un rôle distinct (par exemple signaler la catégorie "communauté" par opposition à "technique").
- Fais jouer la **valeur** (clair/foncé) avant la teinte : une hiérarchie qui survit en niveaux de gris est solide.
- Alterner sections claires et sombres est un outil de rythme, pas une obligation. Chaque bascule doit marquer un changement de registre dans le contenu.
- Vérifie la palette sur de vraies surfaces (hero, carte, bouton, lien dans un paragraphe), pas sur un nuancier.

## 3. Contraste et accessibilité

- Texte courant : ratio **≥ 4,5:1** (WCAG AA). Grand texte (≥ 24 px, ou ≥ 19 px en gras) et éléments d'interface (bordures de champs, icônes porteuses de sens) : **≥ 3:1**.
- Texte sur image ou sur dégradé : mesure le contraste sur la zone la plus claire sous le texte, ou ajoute un voile, ne devine pas.
- N'encode jamais une information par la couleur seule : ajoute une icône, un libellé, un motif.
- Les états de focus doivent être visibles (contour de 2 à 3 px, contraste ≥ 3:1 avec les fonds voisins). Ne retire jamais `outline` sans le remplacer.
- Utilise `scripts/contrast_check.py` pour vérifier les paires clés :
  ```
  python3 scripts/contrast_check.py "#1B1226:#FAF6F1" "#FFFFFF:#D6246E"
  ```
  Chaque paire s'écrit `texte:fond`. Le script affiche le ratio et la conformité AA/AAA, texte normal et grand.
- Teste aussi les états : survol, désactivé, visité, sélectionné.

## 4. Mode sombre

- Conçois-le, ne l'inverse pas. Un mode sombre réussi réduit la saturation de l'accent, relève légèrement la clarté, et utilise des surfaces à plusieurs niveaux d'élévation (du plus sombre au moins sombre) plutôt que des ombres.
- Évite le blanc pur sur noir pur (éblouissement) : une encre à 90-95 % de clarté sur un fond très sombre teinté est plus confortable.
- Si le site a une direction à fond sombre par nature (hero sombre), ne propose le mode clair que si le contenu s'y prête ; sinon, un seul thème bien fait vaut mieux que deux médiocres.
- Implémente via des variables CSS redéfinies sous `[data-theme="dark"]` ou `@media (prefers-color-scheme: dark)`, avec une bascule manuelle qui mémorise le choix et évite le flash au chargement.

## 5. Dégradés, ombres, transparences

- Dégradé : seulement s'il décrit quelque chose (une lumière, une profondeur, une transition de registre). Pas de lavis décoratif arc-en-ciel derrière le hero.
- Ombres : définis 2 ou 3 niveaux cohérents, teintés par la couleur du fond (pas un gris neutre universel). Une interface sans ombre, qui joue sur les filets et les surfaces, est tout à fait valable.
- Transparences et flou (`backdrop-filter`) : réservés à des éléments flottants comme la barre de navigation, avec un repli opaque.

## 6. Couleurs fonctionnelles (admin, formulaires)

- Succès, erreur, avertissement, information : choisis-les pour être **distinctes de l'accent de marque** et conformes AA. Si l'accent est un rose ou un rouge, l'erreur ne peut pas être la même teinte.
- Chaque message d'erreur contient une icône ou un mot en plus de la couleur.
- Les badges de statut dans l'admin (Brouillon, Publié) se distinguent aussi par la forme ou le libellé, pas seulement par la teinte.
