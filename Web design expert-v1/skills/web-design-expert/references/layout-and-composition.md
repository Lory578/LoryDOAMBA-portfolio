# Mise en page et composition

## Sommaire
1. Grille, espacement, rythme
2. Hiérarchie et alignement
3. Le hero
4. Sections et cartes
5. Navigation et pied de page
6. Responsive
7. Images et médias

## 1. Grille, espacement, rythme

- Définis une échelle d'espacement sur une base de 4 ou 8 px (4, 8, 12, 16, 24, 32, 48, 64, 96, 128) et n'utilise que ces valeurs, via des tokens.
- Conteneur : une largeur maximale de contenu (1100 à 1240 px), une marge latérale fluide (`clamp(16px, 4vw, 48px)`), et une grille de 12 colonnes pour les compositions. Les textes de lecture occupent 6 à 8 colonnes, pas la largeur entière.
- **Rythme vertical** : varie la densité d'une section à l'autre (aérée, dense, aérée). Des sections toutes séparées par le même padding de 96 px produisent une page monotone. Utilise de grands vides pour séparer les registres, de petits écarts pour relier des éléments d'un même groupe.
- La proximité groupe : l'espace entre deux éléments liés est toujours plus petit que l'espace entre deux groupes.
- Garde des marges cohérentes à gauche : une ligne d'alignement forte donne une impression de maîtrise.

## 2. Hiérarchie et alignement

- À chaque écran, un point d'entrée évident, un second niveau lisible, le reste en retrait. Teste en plissant les yeux : si tout paraît du même poids, la hiérarchie est plate.
- Les leviers de hiérarchie, du plus fort au plus faible : taille, contraste de valeur, graisse, position, espace autour, couleur.
- Choisis un alignement dominant. Le texte est aligné à gauche par défaut ; le centrage est réservé aux courts éléments (un titre de section, un appel à l'action) et jamais aux paragraphes. Justifié uniquement avec césure et sur une mesure suffisante.
- Les éléments qui se ressemblent par fonction se ressemblent par forme. Ceux qui diffèrent par fonction diffèrent clairement.

## 3. Le hero

Le hero est la première impression et il doit contenir **la chose la plus caractéristique du sujet**, sous la forme qui lui convient : un titre fort, une image, une composition, une démo, un moment interactif.
- Il répond en moins de cinq secondes à : qui est-ce, que fait-elle, que puis-je faire ici.
- Un seul message principal, une action principale. L'action secondaire est visuellement subordonnée.
- Évite le trio hero générique : grand chiffre + légende + trois statistiques + dégradé. Utilise-le seulement si c'est vraiment la meilleure forme.
- Le texte du hero doit rester lisible et bien cadré à 360 px : teste les retours à la ligne des grands titres.
- La première image visible (souvent la photo) est chargée en priorité (`priority` dans `next/image`) pour éviter un saut à l'affichage.
- Si le hero est animé, l'animation est son unique moment orchestré (voir `motion-and-interaction.md`).

## 4. Sections et cartes

- Chaque section répond à une question du visiteur ("Qu'a-t-elle construit ?", "Que fait-elle pour sa communauté ?"). Si tu ne peux pas formuler la question, supprime la section ou fusionne-la.
- **Les cartes ne sont pas le seul outil.** Selon le contenu, utilise aussi : une liste éditoriale (titre, ligne, année, une phrase), une frise chronologique, un tableau, un grand bloc de texte, une grande image avec légende. Un site entièrement en cartes identiques est un tic.
- Si tu utilises des cartes, varie leur poids : une carte principale plus grande, des secondaires plus petites. Ne mets pas le même rayon, la même ombre, le même padding partout ; module-les selon la hiérarchie.
- Les cartes cliquables s'étendent sur toute leur surface, avec un état de focus et de survol clairs, et un seul lien principal par carte.
- N'empile pas les icônes dans des pastilles par défaut. Une icône sert un repérage ou un sens ; sinon, enlève-la.

## 5. Navigation et pied de page

- Navigation : 5 à 7 entrées au plus, noms clairs et courts, état actif visible, un bouton d'action distinct. Sur mobile, un menu qui s'ouvre en plein écran ou en tiroir, avec zones tactiles ≥ 44 px, focus piégé à l'ouverture, fermeture par Échap.
- Barre collante : seulement si elle apporte un service (retour rapide, action principale). Hauteur réduite, fond opaque ou flou avec repli, et `scroll-padding-top` pour que les ancres ne soient pas masquées.
- Ajoute un lien d'évitement « Aller au contenu » en première position.
- Pied de page : utile, pas décoratif. Contacts, réseaux, mentions, langue, retour en haut. Il peut porter un dernier appel à l'action discret.

## 6. Responsive

- Conçois **mobile d'abord** : la plupart des visiteurs de ce type de site viennent d'un téléphone via un lien de réseau social. Pars de 360 px.
- Points de rupture indicatifs : 360, 640, 768, 1024, 1280, 1440. Ajuste-les au contenu plutôt qu'aux appareils.
- Ne fais pas que "empiler" : sur mobile, réorganise la hiérarchie (par exemple, l'image du hero passe sous le titre ou en arrière-plan, les bandes verticales deviennent des blocs).
- Aucun défilement horizontal du corps de page. Les tableaux et blocs de code défilent dans leur propre conteneur (`overflow-x: auto`).
- Utilise les unités relatives (`rem`, `%`, `clamp`, `min`, `max`), les `container queries` pour les composants qui s'adaptent à leur conteneur, `100dvh` plutôt que `100vh` pour les hauteurs plein écran.
- Zones tactiles ≥ 44 × 44 px, espacement suffisant entre cibles adjacentes. Pas d'information accessible uniquement au survol.

## 7. Images et médias

- `next/image` partout, avec `sizes` correct, `alt` descriptif (ou `alt=""` pour les images purement décoratives), dimensions déclarées pour éviter le décalage de mise en page.
- Un ratio par type d'image, un traitement cohérent (voir `design-direction.md`).
- Pas d'image de fond porteuse de texte sans voile de contraste vérifié.
- Les vidéos et animations lourdes sont chargées à la demande et ont une alternative statique.
