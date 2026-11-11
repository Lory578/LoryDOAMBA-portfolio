# Implémentation : Next.js, Tailwind, shadcn/ui, Supabase

## Sommaire
1. Avant de coder
2. Tokens de design
3. Tailwind et composants
4. Polices, images, métadonnées
5. Internationalisation FR/EN
6. Blog et administration avec Supabase
7. Design de l'interface d'administration
8. Sécurité
9. Nettoyage des traces de l'outil d'origine
10. Pièges fréquents

## 1. Avant de coder

- Lis `package.json` pour connaître la version de Next.js (App Router ou Pages Router), de React et de Tailwind (v3 avec `tailwind.config`, ou v4 avec `@theme` dans le CSS). Adapte les exemples à la version réelle.
- Repère : le fichier de layout racine, la gestion de la langue, le dossier de composants, les routes existantes (`/blog`), les variables d'environnement, la configuration Vercel.
- Vérifie que `npm run build` passe **avant** de modifier quoi que ce soit, pour savoir si les erreurs ultérieures viennent de toi.

## 2. Tokens de design

Centralise tout dans des variables CSS, déclarées une seule fois (par exemple dans `app/globals.css`), et exposées à Tailwind :
```css
:root {
  --color-bg: ...;
  --color-surface: ...;
  --color-ink: ...;
  --color-ink-muted: ...;
  --color-line: ...;
  --color-accent: ...;
  --color-accent-ink: ...;
  --font-display: var(--font-display-loaded), ui-sans-serif, system-ui;
  --font-text: var(--font-text-loaded), ui-serif, Georgia;
  --space-1: 4px; /* ... échelle 4/8 */
  --radius-1: 4px;
  --radius-2: 12px;
  --shadow-1: ...;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
[data-theme="dark"] { /* redéfinitions */ }
```
Aucun hex, aucune taille de police ou espacement en valeur brute dans les composants. Un changement de direction ne doit demander qu'une modification des tokens.

## 3. Tailwind et composants

- Étends la configuration avec les tokens (couleurs, polices, espacements, rayons) pour que les classes utilitaires reflètent le design system.
- Les composants de **shadcn/ui** sont un point de départ, pas un résultat : restyle-les via les tokens (rayons, bordures, couleurs, tailles, états de focus) pour qu'ils ne ressemblent pas à l'installation par défaut. Le thème par défaut de shadcn est lui-même un tic de design.
- Évite les sélecteurs de type qui entrent en conflit avec les classes (`.section` contre `section`). Garde la spécificité basse et prévisible ; pas de `!important`.
- Compose des composants de mise en page réutilisables (`Section`, `Container`, `Prose`) plutôt que de répéter des classes.
- Accessibilité des composants interactifs : menus, dialogues, onglets s'appuient sur Radix ou équivalent pour la gestion du focus et des attributs ARIA.

## 4. Polices, images, métadonnées

- `next/font` pour toutes les polices (voir `typography.md`), exposées en variables CSS.
- `next/image` pour toutes les images, avec `sizes`, `alt`, dimensions, et `priority` pour l'image du hero.
- API `metadata` / `generateMetadata` : `title`, `description`, `openGraph`, `twitter`, `alternates.canonical`, `alternates.languages`. Image Open Graph dédiée (`opengraph-image.tsx` ou fichier statique) à la palette du site.
- Données structurées JSON-LD de type `Person` sur la page d'accueil et `BlogPosting` sur les articles, injectées dans un `<script type="application/ld+json">`.
- `app/sitemap.ts`, `app/robots.ts`, et un flux RSS (`app/rss.xml/route.ts`) pour le blog.

## 5. Internationalisation FR/EN

- Conserve le mécanisme existant (segment `[locale]`, contexte, ou autre). Ne le remplace pas sans nécessité.
- Centralise les textes dans des fichiers de dictionnaire par langue (`fr.json`, `en.json` ou modules TypeScript typés) pour que tout texte soit traduit au même endroit.
- Les deux langues ont les mêmes sections et la même qualité de rédaction ; aucune chaîne en dur dans les composants.
- Typographie propre à chaque langue (voir `typography.md`), y compris dans les textes injectés par le code.

## 6. Blog et administration avec Supabase

Architecture recommandée :
- **Base** : tables `posts` (id, slug, status, title/excerpt/content en FR et EN, cover_image_url, tags, published_at, created_at, updated_at) et `site_settings` (cv_url, cv_updated_at).
- **Storage** : buckets `blog-images` et `documents`, lecture publique, écriture réservée à l'administratrice.
- **Auth** : Supabase Auth par email et mot de passe, inscriptions publiques désactivées, un seul compte autorisé (variable `ADMIN_EMAIL`).
- **Côté serveur** : `@supabase/ssr` pour les clients navigateur et serveur ; middleware qui protège `/admin/*` ; mutations via Server Actions qui revérifient l'identité ; clé `service_role` jamais exposée au client.
- **Publication** : à la publication, renseigne `published_at` et appelle `revalidatePath` pour `/blog`, `/blog/[slug]` et la page d'accueil, afin que l'article apparaisse tout de suite.
- **Rendu Markdown** : bibliothèque de rendu qui nettoie le HTML (par exemple `react-markdown` avec `rehype-sanitize`), ajoute des ancres de titres et la coloration de code si utile.
- **Fournir** : le SQL complet (tables, index sur `slug` et `published_at`, politiques RLS, trigger `updated_at`), la liste des variables d'environnement, les étapes de configuration de Supabase, et deux articles d'exemple supprimables.

Variables d'environnement : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (serveur uniquement), `ADMIN_EMAIL`. En local dans `.env.local` (listé dans `.gitignore`), en production dans les réglages de variables d'environnement du projet Vercel.

## 7. Design de l'interface d'administration

L'admin est un outil de travail, pas une vitrine : calme, dense, lisible, rapide.
- Elle partage les **tokens** du site (couleurs, polices, rayons) pour la cohérence, mais utilise sa propre mise en page : barre latérale étroite, zone de contenu large, moins d'ornement, texte plus petit (14-15 px) et densité plus élevée.
- Liste d'articles sous forme de tableau lisible : titre, statut, langues renseignées, date, actions. Recherche et filtre en haut.
- Éditeur : deux colonnes (écriture / aperçu) sur grand écran, onglets sur mobile ; onglets FR / EN avec indicateur de complétude ; barre d'outils Markdown claire ; sauvegarde automatique avec un état visible (« Enregistré à 14:32 », « Modifications non enregistrées »).
- États explicites : chargement, vide, erreur, succès. Confirmation nominative avant suppression.
- Statuts distingués par un libellé et une forme, pas seulement une teinte.
- Utilisable sur téléphone : l'administratrice publiera sans doute depuis son mobile.

## 8. Sécurité

- Row Level Security activée sur toutes les tables ; lecture publique de `posts` seulement si `status = 'published'` ; écriture réservée à l'utilisateur dont l'email est l'administrateur.
- Toute mutation passe par le serveur, qui revérifie la session ; la protection du middleware seule ne suffit pas.
- Validation des entrées avec `zod`, limite de type et de taille pour les fichiers (images, PDF ≤ 5 Mo), noms de fichiers générés côté serveur.
- Markdown nettoyé au rendu (pas de HTML brut non filtré).
- Aucune clé secrète dans le code, dans le dépôt ou dans une variable `NEXT_PUBLIC_*`.

## 9. Nettoyage des traces de l'outil d'origine

Si le projet a été généré par un outil tiers (par exemple v0), retire toute mention :
- Dans les métadonnées : supprime `generator` (par exemple `generator: 'v0.app'`) et toute balise `<meta name="generator">`.
- Cherche dans tout le dépôt (hors `node_modules` et `.next`) les chaînes concernées :
  ```
  grep -rniE "v0(\.app|\.dev)?|built with v0|my-v0-project" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git .
  ```
  Attention aux faux positifs (par exemple une version `v0.1.2` d'une dépendance) : ne modifie que ce qui désigne l'outil.
- Renomme le champ `name` de `package.json` avec le nom du projet, réécris le `README`, supprime les commentaires, badges et filigranes qui citent l'outil.
- Vérifie les fichiers de `/public`, le manifeste, le favicon et l'image Open Graph.
- Conserve Vercel Analytics et la configuration Vercel : seul l'outil de génération est concerné.
- Contrôle final dans le navigateur : « afficher le code source » et recherche du nom de l'outil.

## 10. Pièges fréquents

- Hydratation : évite `window`/`localStorage` pendant le rendu serveur ; utilise des effets ou des composants clients.
- Flash du thème au chargement : applique le thème via un script minimal en `<head>` avant l'hydratation.
- Hauteur plein écran sur mobile : `100dvh`, pas `100vh`.
- Débordement horizontal : cause fréquente, les grands titres, les tableaux, les éléments en `position: absolute` ou les `vw` sans compensation de la barre de défilement.
- Images non optimisées ou sans dimensions : saut de mise en page et mauvais score de performance.
- Animations de bibliothèque importées en entier : n'importe que ce que tu utilises.
- Variables d'environnement manquantes en production : documente-les et fais échouer proprement l'application avec un message clair.
