# Lory Doamba — Portfolio

Portfolio personnel de Lory Doamba, ingénieure Data & IA, formatrice Tech et
fondatrice de communautés tech basées à Ouagadougou, Burkina Faso.

## Prérequis

- Node.js 20 ou une version ultérieure
- npm ou pnpm

## Installation locale

```bash
npm install
npm run dev
```

Le site est ensuite disponible à l'adresse `http://localhost:3000`.

## Variables d'environnement

Les variables nécessaires au blog et à l'administration seront définies dans
`.env.local` (ce fichier ne doit jamais être commité) :

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=
```

Les valeurs Supabase sont à renseigner lorsque la base de données, l'authentification
et le stockage du blog seront configurés.

## Configuration Supabase

1. Créer un projet Supabase et copier son URL et sa clé `anon`.
2. Remplacer `ADMIN_EMAIL_PLACEHOLDER` par l'adresse que tu choisis dans
   [`supabase/schema.sql`](./supabase/schema.sql), puis exécuter le fichier dans
   **SQL Editor**. Cette adresse doit correspondre à `ADMIN_EMAIL` dans `.env.local`.
3. Dans **Authentication > Users**, créer le seul compte administrateur avec
   la même adresse que `ADMIN_EMAIL` et un mot de passe initial fort. Désactiver **Allow new users to sign up**
   dans **Authentication > Settings > User Signups**.
4. Renseigner les quatre variables dans `.env.local`, puis les mêmes variables dans
   Vercel > Settings > Environment Variables.
5. Tester `/espace-personnel/login`, puis vérifier que `/espace-personnel` redirige les autres comptes.

Le mot de passe initial n'est jamais stocké dans le code. Après connexion,
ouvre `/espace-personnel/settings` puis utilise la section **Sécurité** pour
le remplacer.

La clé `SUPABASE_SERVICE_ROLE_KEY` reste strictement côté serveur et ne doit jamais
être préfixée par `NEXT_PUBLIC_` ni exposée au navigateur.

Le schéma ne contient aucun article, projet ou publication fictif : les tables
sont créées vides afin que seuls tes contenus réels soient ajoutés depuis
l'espace personnel.

## Gestion des projets et publications

Après l'exécution du schéma, l'espace personnel permet de gérer les contenus de
la page d'accueil :

- `/espace-personnel/projects` : projets IA et produits, avec titres et
  descriptions FR/EN, tags, groupe, ordre et visibilité ;
- `/espace-personnel/publications` : publications « à propos de moi » ou
  « par moi », avec titres et descriptions FR/EN, média, date, lien et visibilité.

Les contenus Supabase visibles remplacent les données statiques de la page
d'accueil. Tant que Supabase n'est pas configuré, le site conserve le fallback
local existant. Les tables `projects` et `publications` ainsi que leurs règles
RLS sont incluses dans [`supabase/schema.sql`](./supabase/schema.sql).

## Commandes utiles

```bash
`npm run dev`
npm run lint
npm run build
npm run start
```

## Déploiement sur Vercel

1. Importer le dépôt dans Vercel.
2. Ajouter les variables d'environnement dans **Settings > Environment Variables**
   pour les environnements nécessaires.
3. Utiliser `npm run build` comme commande de build.
4. Déployer, puis vérifier la version de production.

Le site utilise Next.js et Vercel Analytics. Les contenus bilingues français et
anglais ainsi que la route `/blog` sont conservés.
