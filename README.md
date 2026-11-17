# Site vitrine : votre informaticien à distance

Site statique (HTML, CSS, un peu de JavaScript), sans framework et sans étape de construction.
Vous modifiez un fichier, vous l'enregistrez, c'est prêt.

---

## 1. Contenu du dossier

```
website_IT/
├── index.html              ← page principale (accueil, offres, étapes, réalisations, FAQ, contact)
├── mentions-legales.html   ← mentions légales et données personnelles
├── merci.html              ← page affichée après l'envoi du formulaire
├── 404.html                ← page « introuvable »
├── sitemap.xml             ← plan du site pour Google
├── robots.txt              ← consignes pour les moteurs de recherche
├── .nojekyll               ← nécessaire pour GitHub Pages (ne pas supprimer)
├── _headers, _redirects, netlify.toml, .well-known/  ← sécurité (voir partie 6)
├── BRIEF.md                ← votre cahier des charges d'origine (vous pouvez le supprimer)
└── assets/
    ├── css/style.css       ← mise en forme (couleurs en haut du fichier)
    ├── js/config.js        ← ★ VOS INFORMATIONS : nom, email, prix, formulaire
    ├── js/main.js          ← fonctionnement (menu mobile, formulaire) : à ne pas modifier
    └── img/                ← favicon, image de partage, futures captures de projets
```

---

## 2. Voir le site sur votre ordinateur

Le plus simple : **double-cliquez sur `index.html`**, il s'ouvre dans votre navigateur.

Pour un aperçu plus fidèle (recommandé avant la mise en ligne), ouvrez le Terminal dans le dossier puis tapez :

```bash
python3 -m http.server 8000
```

Ouvrez ensuite http://localhost:8000 dans votre navigateur. Faites `Ctrl + C` dans le Terminal pour arrêter.

---

## 3. Modifier vos informations

Utilisez un éditeur de texte simple : VS Code (gratuit), TextEdit en mode « texte brut », ou Notepad++.

### 3.1 Nom, email, prix : `assets/js/config.js`

Tout est regroupé dans ce fichier. Modifiez seulement ce qui est **entre guillemets** :

```js
nom: "Jean Dupont",
email: "contact@jeandupont.fr",
prix: {
  site: 690,
  maintenance: 29,
  support: 49,
  pack: 69
},
modificationsIncluses: "3",
supportCreneaux: "2 créneaux de 1 h par mois",
```

Enregistrez, rechargez la page : le nom, l'email et les prix sont mis à jour partout.

### 3.2 Les éléments à remplacer directement dans les fichiers

> **Déjà fait** : le site utilise le nom **Razitic** (logo : `assets/img/logo-razitic.png`, version blanche pour le pied de page : `logo-razitic-blanc.png`), le domaine **https://www.razitic.com** et l'adresse
> **contact@razitic.com**. Si vous changez l'un d'eux, faites un « Rechercher / Remplacer » de l'ancienne valeur
> vers la nouvelle, comme expliqué ci-dessous.

Certaines informations sont lues par Google et les réseaux sociaux **avant** que le JavaScript ne s'exécute.
Elles doivent donc être écrites directement dans les fichiers. Faites un **« Rechercher / Remplacer dans tous les fichiers »**
(dans VS Code : `Cmd + Maj + H` sur Mac, `Ctrl + Maj + H` sur Windows) :

| Rechercher                       | Remplacer par (exemple)           |
|----------------------------------|-----------------------------------|
| `[VOTRE NOM]`                    | `Jean Dupont`                     |
| `[VOTRE EMAIL]`                  | `contact@jeandupont.fr`           |
| `https://www.votre-domaine.fr`   | `https://www.jeandupont.fr`       |

Ce remplacement met aussi à jour `config.js`. Rien n'est cassé si vous le faites en une fois.

### 3.3 Les textes des offres et des pages

Ouvrez `index.html`. Chaque partie est signalée par un grand commentaire, par exemple :

```html
<!-- ===== OFFRE 1 : Site vitrine ===== -->
```

Modifiez le texte entre les balises, par exemple ce qui est entre `<li>` et `</li>`. Ne touchez pas aux balises elles-mêmes.

- **Ajouter une ligne à une offre** : copiez une ligne `<li>…</li>` et collez-la juste en dessous.
- **Ajouter une question à la FAQ** : copiez un bloc complet `<details> … </details>`.
- **Titre et description pour Google** : en haut de `index.html`, balises `<title>` et `<meta name="description">`.

### 3.4 Ajouter une réalisation

La section affiche pour l'instant **3 exemples types** illustrés (cabinet de kinésithérapie, artisan, agence de 6 personnes),
clairement signalés « Exemple ». Les images `assets/img/projet-kine.webp`, `projet-menuisier.webp` et `projet-bureau.webp`
sont des maquettes originales. Remplacez-les par vos vrais projets dès que possible, avec l'accord de vos clients.

1. Faites une capture d'écran du site réalisé, au format paysage (idéalement 1600 × 1000 pixels).
2. Convertissez-la en **WebP** pour qu'elle soit légère (gratuitement sur https://squoosh.app, qualité 75).
   Visez moins de 150 Ko.
3. Placez le fichier dans `assets/img/`, par exemple `projet-1.webp`.
4. Dans `index.html`, section « RÉALISATIONS », remplacez tout le bloc `<svg …> … </svg>` du projet par :

   ```html
   <img src="assets/img/projet-1.webp" alt="Site du cabinet de kinésithérapie Martin, page d'accueil" width="1600" height="1000" loading="lazy">
   ```

5. Remplacez « Projet à venir » par le nom du client, et le paragraphe par une phrase sur le besoin et le résultat.
   L'étiquette (« Site vitrine », etc.) se modifie juste au-dessus.

### 3.5 Changer la couleur principale

En haut de `assets/css/style.css`, dans le bloc `:root`, modifiez les 3 lignes `--c-primaire…`.
Un vert profond est proposé en commentaire. Les icônes dessinées dans `index.html` utilisent aussi
le code `#0070b5`. Pour les mettre à jour, remplacez-le partout par votre nouvelle couleur.

### 3.6 Mentions légales

Ouvrez `mentions-legales.html` et complétez les éléments `[ENTRE CROCHETS]`, surlignés en jaune sur la page.

---

## 4. Formulaire de contact et WhatsApp

### Le formulaire (déjà configuré)

Les demandes envoyées depuis le formulaire arrivent **directement dans votre boîte professionnelle**
(`contact@razitic.com`), grâce au service gratuit FormSubmit. Aucun compte n'est nécessaire.

**Adresse professionnelle** : `contact@razitic.com` ne fonctionne qu'une fois le domaine `razitic.com` acheté
et une boîte email créée (chez le registraire, Zoho Mail, Google Workspace…). Une redirection gratuite vers
votre Gmail suffit (ex. ImprovMX, ou le transfert d'email inclus chez la plupart des registraires).

**Une seule action à faire, une fois le site en ligne :**

1. Envoyez-vous une demande de test depuis le formulaire du site.
2. Vous recevez un email de FormSubmit intitulé « Action required: Activate FormSubmit ». Pensez à regarder
   dans les courriers indésirables.
3. Cliquez sur **Activate Form**. Toutes les demandes suivantes arriveront directement dans Gmail.

**Recommandé ensuite** : FormSubmit vous envoie un identifiant aléatoire (une suite de lettres et de chiffres).
Collez-le dans `assets/js/config.js` :

```js
formsubmitAlias: "a1b2c3d4e5f6...",
```

Votre adresse n'apparaîtra plus dans le code du formulaire, ce qui limite le spam.

**Changer l'adresse qui reçoit les demandes** : modifiez `email` dans `config.js`, ainsi que l'adresse écrite
dans la balise `<form action="https://formsubmit.co/...">` de `index.html`. Celle-ci sert uniquement si le visiteur a
désactivé JavaScript.

### WhatsApp

Le numéro se modifie dans `config.js` :

```js
whatsapp: "261342042286",            // chiffres uniquement, avec l'indicatif du pays, sans +
whatsappAffiche: "+261 34 20 422 86", // tel qu'il s'affiche sur le site
whatsappMessage: "Bonjour, je vous contacte depuis votre site...", // message pré-rempli
```

Il est utilisé par le bouton vert flottant en bas à droite, par le bouton de la section Contact et par le
pied de page.

## 5. Mettre le site en ligne (gratuitement)

Choisissez **une** des trois solutions. Netlify est la plus simple si vous débutez.

### Option A : Netlify (le plus simple, sans compte GitHub)

1. Créez un compte gratuit sur https://app.netlify.com.
2. Dans **« Sites »**, cliquez sur **« Add new site » → « Deploy manually »**.
3. Glissez-déposez **le dossier `website_IT` entier** dans la zone indiquée.
4. Après quelques secondes, votre site est en ligne à une adresse du type `https://nom-aleatoire.netlify.app`.
5. Pour le renommer : **Site configuration → Change site name**.
6. **Mettre à jour le site plus tard** : onglet **Deploys**, glissez-déposez à nouveau le dossier.

### Option B : Cloudflare Pages

1. Créez un compte gratuit sur https://dash.cloudflare.com.
2. Menu **Workers & Pages → Create → Pages → Upload assets** (« Déposer des fichiers »).
3. Donnez un nom au projet, puis glissez-déposez le dossier `website_IT`.
4. Cliquez sur **Deploy site**. L'adresse sera du type `https://nom-du-projet.pages.dev`.
5. Pour mettre à jour : ouvrez le projet → **Create new deployment** → déposez à nouveau le dossier.

### Option C : GitHub Pages

1. Créez un compte sur https://github.com, puis un **nouveau dépôt public** (ex. `mon-site`).
2. Sur la page du dépôt : **« uploading an existing file »**, puis glissez **le contenu** du dossier
   (les fichiers et le dossier `assets`, pas le dossier `website_IT` lui-même). Cliquez sur **Commit changes**.
3. **Settings → Pages** : dans « Branch », choisissez `main` et `/ (root)`, puis **Save**.
4. Après une à deux minutes, le site est en ligne à l'adresse `https://votre-pseudo.github.io/mon-site/`.

> Remarque : sur GitHub Pages **sans nom de domaine personnalisé**, la page 404 s'affiche sans mise en forme,
> parce que le site est dans un sous-dossier. Tout le reste fonctionne. Avec votre propre domaine, ou sur Netlify
> ou Cloudflare, tout s'affiche correctement.

### Utiliser votre propre nom de domaine (ex. `www.jeandupont.fr`)

1. Achetez le domaine chez un registraire (OVHcloud, Gandi, Infomaniak, Namecheap, Cloudflare…).
2. Dans votre hébergeur (Netlify : **Domain management** ; Cloudflare Pages : **Custom domains** ;
   GitHub : **Settings → Pages → Custom domain**), ajoutez le domaine et suivez les instructions DNS affichées.
3. Le certificat HTTPS (le cadenas) est fourni automatiquement et gratuitement.
4. N'oubliez pas le remplacement de `https://www.votre-domaine.fr` (voir 3.2).

### Après la mise en ligne : Google

1. Rendez-vous sur https://search.google.com/search-console et ajoutez votre site.
2. Dans **Sitemaps**, déclarez `sitemap.xml`.
3. Testez l'aperçu de partage de votre site sur https://www.opengraph.xyz.
4. Testez les données structurées sur https://search.google.com/test/rich-results.

---

## 6. Sécurité

Le site est statique : pas de base de données, pas de mot de passe, pas de cookie. Il est donc peu exposé.
Protections déjà en place :

- **Politique de sécurité du contenu (CSP)** dans chaque page : le navigateur refuse tout script, style ou envoi
  qui ne vient pas du site ou du service de formulaire. Si vous ajoutez un outil externe (statistiques, vidéo,
  police Google…), il faudra l'autoriser dans la balise `Content-Security-Policy` de chaque page **et** dans `_headers`.
- **En-têtes de sécurité** (`_headers`, lu par Netlify et Cloudflare Pages) : HTTPS obligatoire (HSTS), interdiction
  d'afficher le site dans un cadre d'un autre site, blocage de la caméra, du micro, etc.
- **Fichiers internes masqués** (`netlify.toml`, `_redirects`) : `README.md`, `BRIEF.md` et les fichiers Git
  ne sont pas consultables en ligne.
- **Formulaire anti-spam** : deux champs pièges invisibles, refus des envois en moins de 3 secondes, longueur des
  champs limitée.
- **Liens externes** ouverts avec `noopener noreferrer`.
- **`.well-known/security.txt`** : indique comment signaler une faille.

À faire de votre côté :

1. Activez la **double authentification** sur vos comptes GitHub, Netlify, Gmail, PayPal et chez votre registraire de domaine.
2. Après l'activation FormSubmit, collez l'identifiant aléatoire dans `formsubmitAlias` (voir partie 4) :
   votre adresse disparaît du code et le spam diminue.
3. Activez le **verrouillage du domaine** (« transfer lock ») chez votre registraire.
4. Une fois en ligne, vérifiez la note de sécurité sur https://securityheaders.com (objectif : A).
5. Mettez à jour la date `Expires` de `.well-known/security.txt` avant novembre 2027.

> Sur **GitHub Pages**, le fichier `_headers` n'est pas pris en compte. La protection CSP des pages reste active,
> mais Netlify ou Cloudflare Pages offrent une meilleure sécurité.

---

## 7. Bon à savoir

- **Aucun cookie, aucun traceur** : pas de bandeau cookies nécessaire. Si vous ajoutez un outil de statistiques,
  mettez à jour les mentions légales.
- **Mettre à jour la date du sitemap** : dans `sitemap.xml`, changez la date `<lastmod>` lorsque vous modifiez
  significativement le site (facultatif).
- **Image de partage** : `assets/img/og-image.png` (1200 × 630 px) s'affiche quand votre site est partagé
  sur LinkedIn, WhatsApp, Facebook… Vous pouvez la remplacer par la vôtre, aux mêmes dimensions.
