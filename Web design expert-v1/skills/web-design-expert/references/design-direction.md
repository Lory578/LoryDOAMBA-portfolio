# Direction artistique : de l'idée directrice aux trois directions

## Sommaire
1. Trouver l'idée directrice
2. Traduire l'idée en choix concrets
3. Banque de squelettes de page
4. Traitement des images
5. Concevoir trois directions vraiment différentes
6. Revue anti-défauts

## 1. Trouver l'idée directrice

L'idée directrice est une phrase qui relie le sujet à une forme. Elle n'est pas un adjectif ("moderne", "élégant") mais une image ou une logique.

Méthode :
1. Liste dix éléments concrets du monde du sujet : matériaux, outils, lieux, gestes, objets, vocabulaire, couleurs réelles, formes récurrentes. Pour une ingénieure data et IA qui forme des femmes et organise des événements : tableaux et jeux de données, nœuds et graphes, agents qui s'enchaînent, métier à tisser, textiles en bandes, scène et estrade, affiches d'événement, carnet de notes de formation, tableau blanc d'atelier, lumière d'une salle de cours.
2. Cherche la **relation** entre deux éléments, pas l'élément seul. Exemple : un textile se fabrique en bandes étroites cousues côte à côte, une page peut être composée de bandes verticales ; un tissage est aussi un réseau, donc un graphe.
3. Écris l'idée : "Une page tissée : des bandes verticales de contenu dont l'épaisseur et la couleur codent le type d'information."
4. Teste-la : si on remplace le sujet par un autre, l'idée devient-elle absurde ? Si elle marche pour n'importe qui, elle est trop générale.

Évite le folklore : un motif traditionnel posé en filigrane est de la décoration. Utilise la **logique** de l'objet (modularité, répétition, bande, trame) plutôt que son apparence.

## 2. Traduire l'idée en choix concrets

Remplis cette grille. Chaque case doit découler de l'idée, pas d'une habitude.

| Axe | Question | Exemple de réponse |
|---|---|---|
| Structure | Comment la page est-elle découpée ? | Bandes verticales de largeurs inégales, index fixe à gauche |
| Matière | Quelle texture, quel traitement d'image ? | Photo en bichromie, grain fin, papier mat |
| Voix typographique | Quelle voix pour les titres, quelle voix pour le texte ? | Grotesque large pour les titres, serif de lecture pour le texte |
| Couleur | Quelle couleur domine, laquelle ponctue ? | Un fond de base, une encre, un accent rare |
| Mouvement | Quel est l'unique moment animé ? | Les bandes se tissent à l'ouverture, puis plus rien |
| Signature | Quel est l'élément qu'on retient ? | Le hero en bandes avec le nom coupé sur trois colonnes |

## 3. Banque de squelettes de page

Choisis un squelette parce qu'il sert le contenu, pas parce qu'il est joli.

**A. Index fixe + contenu défilant** (convient aux portfolios denses)
```
+--------+--------------------------------------+
| Nom    |  Hero : phrase + photo               |
| ------ |                                      |
| Profil |  Projets (liste éditoriale)          |
| Projets|  ...                                 |
| Impact |                                      |
| Blog   |                                      |
| Contact|                                      |
+--------+--------------------------------------+
```

**B. Bandes verticales** (idée tissage, modularité, colonnes de contenu)
```
+----+------+--+--------+----+
|    |      |  |        |    |
| 01 |  Nom |  | photo  |    |
|    |      |  |        |    |
+----+------+--+--------+----+
```
Les bandes se réorganisent en blocs empilés sur mobile.

**C. Affiche** (convient à une personne qui organise des événements)
Hero pleine hauteur en composition d'affiche : un très grand mot, une photo découpée, des informations disposées autour comme sur un programme. Les sections suivantes passent à une lecture plus calme.

**D. Dossier d'études de cas** (convient quand les projets sont la preuve)
Page d'accueil courte, projets en grand format alternés texte/capture, chaque projet mène à une page détaillée.

**E. Colonne éditoriale asymétrique**
Une colonne de lecture étroite à gauche (texte), une colonne large à droite qui montre des visuels sticky pendant le défilement.

**F. Journal de bord**
Page organisée par dates, comme un carnet : événements, publications, projets sur une même frise. Convient si la preuve est l'activité continue.

## 4. Traitement des images

- Une seule photo bien traitée vaut mieux que cinq banales. Fixe un traitement et applique-le partout : recadrage serré, bichromie, découpe, noir et blanc avec un accent, ou photo pleine couleur avec un cadre très simple.
- Pas de photos de banque d'images. Pas d'illustrations vectorielles génériques de personnages.
- Pour les projets : de vraies captures d'écran, dans un cadre sobre, plutôt que des maquettes d'appareil clichés.
- Définis un ratio d'image pour chaque type (portrait 4:5, capture 16:10, couverture d'article 3:2) et tiens-t'y.
- Si aucune image n'est disponible, assume la typographie et les formes comme seule matière plutôt que de combler avec du décor.

## 5. Concevoir trois directions vraiment différentes

Les trois directions doivent différer sur **au moins trois axes** parmi : squelette, voix typographique, température de couleur, traitement d'image, niveau de densité. Une bonne triade couvre par exemple :
- une direction **expressive** (grande échelle, couleur marquée, composition d'affiche),
- une direction **éditoriale calme** (texte, espace, un seul accent),
- une direction **structurelle** (grille visible, données, bandes ou tableaux comme langage).

Pour chaque direction, rédige une fiche de 8 à 10 lignes : idée directrice, squelette (wireframe ASCII), palette (4 à 6 couleurs nommées avec hex), polices, traitement d'image, élément signature, risque principal et comment le limiter. Présente-les côte à côte, puis recommande-en une avec deux phrases de justification.

## 6. Revue anti-défauts

Avant de figer la direction :
- Mets la direction à l'épreuve de la section "Les tics à éviter" de `SKILL.md`.
- Imagine que dix autres designers reçoivent le même brief : en quoi ta direction se distingue-t-elle de la moyenne ?
- Vérifie que l'élément signature est unique et que tout le reste le laisse respirer.
- Vérifie que la direction reste lisible sans la couleur (en niveaux de gris) : si la hiérarchie s'effondre, elle reposait sur la couleur plutôt que sur la structure.
