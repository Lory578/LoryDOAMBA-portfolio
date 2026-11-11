# Typographie

La typographie porte la personnalité de la page. Quand un titre est un élément visuel, traite la forme des lettres comme un matériau actif et non comme un simple vecteur du texte.

## Sommaire
1. Choisir les polices
2. Échelle et rythme
3. Longueur de ligne et interlignage
4. Détails qui font la différence
5. Typographie française
6. Chargement avec next/font

## 1. Choisir les polices

- Une ou deux familles suffisent. Si deux, elles doivent être **nettement** distinctes (un grotesque et un serif, une large et une étroite), jamais deux voisines.
- Choisis en fonction de l'idée directrice : une police dit quelque chose (éditoriale, technique, humaniste, géométrique, institutionnelle).
- Ne prends pas par réflexe les familles que tout le monde prend : Inter, Roboto, Poppins, Montserrat, Space Grotesk, Playfair Display, et le duo Fraunces + Inter reviennent dans la majorité des pages générées. Elles restent légitimes si le brief l'impose, mais ne les choisis pas par défaut.
- Piste de polices disponibles dans `next/font/google` (vérifie le nom exact et les axes disponibles dans la documentation de Next.js avant de l'utiliser) :
  - Titres expressifs : Bricolage Grotesque, Syne, Unbounded, Anybody, Familjen Grotesk, Instrument Serif, DM Serif Display, Young Serif, Gloock, Archivo (axe de largeur)
  - Texte de lecture : Newsreader, Literata, Source Serif 4, Spectral, Hanken Grotesk, Schibsted Grotesk, Red Hat Text, Public Sans, Work Sans
  - Technique, avec parcimonie : JetBrains Mono, IBM Plex Mono, DM Mono
- Exemples de duos aux voix claires : Bricolage Grotesque (titres) + Newsreader (texte) ; Instrument Serif (titres) + Hanken Grotesk (texte) ; Archivo expanded (titres) + Source Serif 4 (texte).
- Privilégie les polices variables : une seule requête, un jeu de graisses et de largeurs complet.
- Vérifie que la police couvre le français complet (accents capitaux, œ, guillemets « »). Charge les sous-ensembles `latin` et `latin-ext` si besoin.

## 2. Échelle et rythme

- Définis une échelle modulaire (rapport 1.2 à 1.333 pour le texte courant, plus large pour les titres d'affichage) et utilise-la partout. Pas de tailles inventées au fil de l'eau.
- Utilise des tailles fluides : `font-size: clamp(min, calc(...vw), max)`. Le hero peut monter à 80-120 px sur grand écran si la composition le justifie, mais doit rester lisible à 360 px (retours à la ligne maîtrisés).
- Limite-toi à 3 niveaux de hiérarchie visibles par écran : titre, sous-titre, texte. Au-delà, c'est du bruit.
- Graisses : deux ou trois utilisées, avec intention. Un contraste de graisse marqué (400 et 700, ou 300 et 800) fait plus d'effet qu'un contraste de taille seul.
- Interlettrage : resserre légèrement les grands titres (`letter-spacing: -0.01em` à `-0.03em`), élargis les petites capitales (`0.04em` à `0.08em`) si tu en utilises.

## 3. Longueur de ligne et interlignage

- Texte courant : 45 à 75 caractères par ligne (`max-width: 65ch` est un bon départ). Reste sous 80.
- Interlignage : 1.5 à 1.65 pour un sans-serif de texte, un peu plus (1.6 à 1.7) pour un serif de lecture ; 1.0 à 1.15 pour les grands titres.
- Taille de texte courant : 17 à 19 px sur écran, jamais moins de 16 px sur mobile.
- Applique `text-wrap: balance` aux titres et `text-wrap: pretty` aux paragraphes pour éviter les veuves.

## 4. Détails qui font la différence

- Chiffres : activer `font-variant-numeric: tabular-nums` dans les tableaux et statistiques, `oldstyle-nums` dans les textes longs si la police les propose.
- Liens : soulignement net avec `text-underline-offset` et épaisseur contrôlée, pas seulement un changement de couleur.
- Citations en exergue : réservées à une vraie citation ou à une phrase de position, pas à du remplissage.
- Capitales : réserve-les à de très courts éléments, et seulement si l'idée directrice les appelle. Un portfolio où chaque titre est précédé d'une étiquette en capitales espacées est un tic (voir `SKILL.md`).
- Ne mets pas en valeur un seul mot d'un titre par la couleur ou l'italique comme effet de style : c'est l'un des signes les plus reconnaissables d'une page générée.

## 5. Typographie française

À appliquer dans tout le texte français, y compris les textes injectés par le code :
- **Espace insécable** avant `:`, `;`, `?`, `!`, `»` et après `«` (utiliser `&nbsp;` ou, mieux, l'espace fine insécable `&#8239;` avant `;`, `?`, `!`).
- **Guillemets français** « … » pour les citations, jamais "…" droits. Guillemets anglais “ ” pour le contenu anglais.
- **Apostrophe typographique** ’ et non '. Exception : le code HTML, CSS, JS et JSON garde les apostrophes droites.
- **Capitales accentuées** : À, É, È, Ç, Œ (« École », « À propos »). Ne mets jamais « Ecole » ou « A propos ».
- **Ligature œ** : cœur, œuvre, sœur.
- **Points de suspension** : le caractère `…`.
- **Tirets** : tiret demi-cadratin ou cadratin avec espaces pour les incises, trait d'union pour les mots composés, pas de double trait d'union.
- **Abréviations** : « 1er », « 2e » (pas « 2ème »), « n° ».
- **Dates** : « 30 mai 2026 », mois en minuscules.
- **Nombres** : espace insécable comme séparateur de milliers (« 2 000 membres »), virgule décimale.
- **Langue du document** : `<html lang="fr">`, et `lang="en"` sur les blocs anglais. Active `hyphens: auto` pour les paragraphes longs.
- **Formes féminines** : pour la personne qui est le sujet du site, accorde partout au féminin (ingénieure, formatrice, fondatrice, présidente). Pour les publics mixtes, préfère « celles et ceux » ou une tournure neutre ; n'impose pas le point médian si le client ne l'a pas demandé.

## 6. Chargement avec next/font

- Utilise `next/font/google` (ou `next/font/local` pour une police fournie), avec `display: 'swap'`, les sous-ensembles nécessaires et les axes variables utiles.
- Expose chaque police via une variable CSS (`variable: '--font-display'`) et référence-la dans les tokens, pas directement dans les composants.
- Limite le nombre de fichiers de police (2 familles, 3 à 4 graisses ou une police variable chacune) pour préserver le score de performance.
- Prévois un `fallback` système cohérent (`ui-serif`, `ui-sans-serif`) pour limiter le saut de mise en page.
