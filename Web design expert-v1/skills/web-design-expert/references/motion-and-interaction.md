# Mouvement et interactions

## Principe
Le mouvement a deux emplois légitimes :
1. **Répondre à une action** de la personne (ouvrir, déplier, valider, changer de page) en montrant ce qui a changé.
2. **Attirer l'attention une fois**, sur un moment choisi (l'ouverture de la page, une révélation).

Tout le reste est du bruit. En particulier, le fondu-glissé sur chaque section au défilement et l'animation de survol sur chaque carte sont les réflexes les plus reconnaissables d'une page générée. Évite-les par défaut.

## Règles

- **Un moment orchestré par page**, au plus : la séquence d'arrivée du hero, ou une révélation au défilement, pas les deux. Il dure moins de 1,2 s au total et ne bloque pas la lecture.
- Aucune animation en boucle qui détourne l'attention du contenu (sauf indicateur de chargement). Un arrière-plan qui bouge en continu fatigue et consomme la batterie.
- Anime `transform` et `opacity` (composités par le GPU), pas `width`, `height`, `top`, `left` ni `box-shadow` à grande échelle.
- Durées : 120-200 ms pour les micro-réponses (survol, appui), 250-400 ms pour les ouvertures et transitions, jusqu'à 700 ms pour une entrée de grand élément. Au-delà, justifie.
- Courbes : `ease-out` (ex. `cubic-bezier(0.22, 1, 0.36, 1)`) pour les entrées, `ease-in` pour les sorties, `ease-in-out` pour les déplacements. Pas de linéaire sauf pour les rotations continues.
- **`prefers-reduced-motion: reduce`** : supprime les déplacements et zooms, conserve au plus un fondu rapide. Teste-le.
- L'animation ne doit jamais cacher du contenu si le JavaScript échoue ou si l'observateur d'intersection ne se déclenche pas : le contenu est visible par défaut, l'animation est une amélioration.

## Outils

- **CSS d'abord** : transitions, `@keyframes`, `view-transition` pour les changements de page, `animation-timeline: view()` pour les effets liés au défilement (avec repli sans animation si non supporté, via `@supports`).
- Une bibliothèque (Framer Motion / Motion) seulement si le besoin le justifie (orchestration complexe, gestes, animations de présence). Elle ajoute du poids : importe uniquement les modules utilisés.
- Les composants interactifs de bibliothèques (menus, dialogues, onglets) viennent avec leurs gestions de focus : conserve-les, ne les réécris pas.

## Interactions qui font la différence

- **États de bouton complets** : repos, survol, focus, appui, désactivé, chargement. Un bouton de soumission affiche un état de chargement et confirme le résultat.
- **Formulaires** : validation en ligne claire, message d'erreur qui dit quoi corriger, focus déplacé sur le premier champ en erreur, confirmation explicite après envoi.
- **Liens** : le survol modifie le soulignement ou la position d'un trait, pas seulement la couleur. Le focus clavier est aussi visible que le survol.
- **Tactile** : pas de dépendance au survol. Les cibles ont un retour visuel à l'appui.
- **Retours d'état** (toasts, bandeaux) : annoncés aux lecteurs d'écran (`role="status"` ou `aria-live="polite"`), non bloquants, fermables, avec le même vocabulaire que l'action qui les déclenche (le bouton "Publier" produit "Article publié").
- **Défilement** : ancres avec `scroll-behavior: smooth` uniquement si `prefers-reduced-motion` n'est pas activé ; jamais de détournement du défilement natif.

## Exemples de moments uniques bien choisis (à adapter, pas à copier)
- Le nom du hero se compose lettre par lettre ou bande par bande en 800 ms, une seule fois.
- Un schéma de réseau dont les nœuds s'allument quand on survole une compétence (réponse à une action).
- Une frise de parcours qui se trace au fur et à mesure du défilement (liée à l'action de défiler, donc utile).
