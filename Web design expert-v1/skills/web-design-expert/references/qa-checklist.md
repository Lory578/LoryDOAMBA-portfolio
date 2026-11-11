# Contrôle qualité et critique visuelle

## Sommaire
1. Prendre des captures
2. Critique visuelle
3. Accessibilité
4. Performance
5. Contenu et liens
6. Build et déploiement
7. Compte rendu final

## 1. Prendre des captures

Regarde le résultat réel, à plusieurs tailles. Si Playwright est disponible ou installable :

```bash
npx playwright install chromium   # une seule fois
```

Script minimal (`scripts/shots.mjs` à créer dans le projet, hors du code livré si tu préfères) :
```js
import { chromium } from 'playwright';
const url = process.argv[2] ?? 'http://localhost:3000';
const sizes = [[360, 800], [768, 1024], [1024, 768], [1440, 900]];
const browser = await chromium.launch();
for (const [w, h] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `shots/home-${w}.png`, fullPage: true });
  await page.close();
}
await browser.close();
```
Lance le serveur local (`npm run dev` ou `npm run build && npm start`), exécute le script, puis **ouvre chaque image** et regarde-la. Prends aussi les pages secondaires (blog, article, admin, 404) et le mode sombre s'il existe.

Si tu ne peux pas exécuter de navigateur, dis-le explicitement dans ton compte rendu et décris ce qui n'a pas pu être vérifié visuellement.

## 2. Critique visuelle

Pour chaque capture, note au moins trois défauts concrets avant de corriger. Grille de questions :
- **Hiérarchie** : le regard va-t-il au bon endroit en premier ? Tout a-t-il le même poids ?
- **Espacement** : rythme cohérent ? Groupes bien séparés ? Vides ou entassements accidentels ?
- **Alignement** : lignes d'alignement nettes ? Éléments qui flottent sans raison ?
- **Typographie** : tailles de l'échelle respectées ? Lignes trop longues ? Retours à la ligne laids dans les titres ? Veuves ?
- **Couleur** : l'accent est-il rare ? Contraste suffisant ? Fonctionne-t-il en niveaux de gris ?
- **Cohérence** : mêmes rayons, mêmes bordures, mêmes états sur des éléments de même nature ?
- **Identité** : si on masque le nom, reconnaît-on le design comme propre à ce sujet ? Ressemble-t-il à n'importe quel template ?
- **Le miroir de Chanel** : quel est l'élément à retirer ?

Corrige, reprends des captures, compare. Une passe ne suffit presque jamais.

## 3. Accessibilité

Vérifications systématiques :
- Navigation entièrement au clavier : Tab parcourt tout dans un ordre logique, focus toujours visible, lien d'évitement présent, aucun piège de focus (sauf dans un dialogue, avec sortie par Échap).
- Contrastes : AA pour tous les textes et éléments d'interface, y compris états de survol et désactivés (`scripts/contrast_check.py`).
- Structure : un `h1`, hiérarchie de titres sans saut, repères (`header`, `nav`, `main`, `footer`), listes en vraies listes.
- Images : `alt` pertinents, `alt=""` pour le décor. Icônes seules : `aria-label`.
- Formulaires : libellés associés, erreurs annoncées (`aria-describedby`, `aria-invalid`), focus sur le premier champ en erreur.
- Mouvement : `prefers-reduced-motion` respecté (teste-le).
- Zoom : lisible à 200 % sans perte de contenu ni défilement horizontal ; tailles en unités relatives.
- Langue : `lang` sur `html` et sur les blocs de langue différente.
- Outils : `npx @axe-core/cli http://localhost:3000` ou l'extension axe, ainsi que Lighthouse.

## 4. Performance

Objectif : Lighthouse ≥ 90 sur mobile pour Performance, Accessibilité, Bonnes pratiques et SEO.
```bash
npx lighthouse http://localhost:3000 --preset=desktop --view   # ou en mode mobile par défaut
```
Points de contrôle : LCP (< 2,5 s, souvent l'image du hero : `priority`), CLS (< 0,1 : dimensions déclarées, polices avec repli), INP, poids de JavaScript initial, nombre de requêtes, tailles d'images (`next/image`, formats modernes), polices limitées. Teste sur réseau lent simulé : le site est consulté en grande partie depuis des téléphones et des connexions variables.

## 5. Contenu et liens

- Aucun lien mort ni lien `#` : ajoute le vrai lien ou retire l'élément.
- Aucun texte de remplissage. Tous les placeholders restants sont **listés** dans le compte rendu.
- Cohérence des informations de contact (une seule adresse email, un seul numéro) ; signale les contradictions entre sources au lieu de trancher.
- Les deux langues sont complètes et équivalentes.
- Typographie française appliquée (espaces insécables, guillemets, apostrophes, accents sur les majuscules).
- Le nom de l'outil d'origine n'apparaît nulle part (voir `nextjs-implementation.md`).

## 6. Build et déploiement

- `npm run lint` et `npm run build` passent sans erreur ni avertissement bloquant.
- Variables d'environnement documentées, `.env.local` ignoré par Git.
- Test de bout en bout en local des parcours critiques : navigation, bascule de langue, bascule de thème, formulaire de contact, connexion admin, création, publication et dépublication d'un article, téléversement du CV, affichage de l'article sur le site public.
- Pages 404 et erreur conçues et testées.
- Rien de secret dans le dépôt (`git grep` des clés) et aucun fichier de capture ou temporaire commité par erreur.

## 7. Compte rendu final

Format, court et en français :
1. **Ce qui a été fait** (5 lignes maximum)
2. **Les choix de design et leur raison** (3 lignes : idée directrice, palette et polices, élément signature)
3. **Ce qui n'a pas pu être vérifié** (captures, tests, outils indisponibles)
4. **Placeholders et informations à confirmer** (liste précise)
5. **Prochaines étapes pour l'utilisatrice** (par exemple : créer le compte admin, renseigner les variables d'environnement dans Vercel, téléverser le CV)
