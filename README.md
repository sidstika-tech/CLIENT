# GALAXY — Landing page montres (mobile)

Page de vente mobile pour les montres GALAXY, avec carrousel produit et
formulaire de commande envoyé directement sur Telegram.

## Structure

```
index.html      → toute la page (hero, carrousel, formulaire)
style.css       → tous les styles
script.js       → carrousel + validation + envoi du formulaire
images/         → les 5 photos produit (déjà incluses, chemins relatifs)
api/send.js     → fonction serverless Vercel qui envoie la commande à Telegram
package.json    → nécessaire pour que Vercel exécute api/send.js en module ES
```

## 1. Créer le bot Telegram

1. Ouvrez Telegram et parlez à **@BotFather**.
2. Envoyez `/newbot`, choisissez un nom, récupérez le **token** (ressemble à
   `123456789:AAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`).
3. Démarrez une conversation avec votre bot (ou ajoutez-le à un groupe) et
   envoyez un message quelconque.
4. Récupérez votre **chat_id** :
   - Ouvrez dans le navigateur :
     `https://api.telegram.org/bot<VOTRE_TOKEN>/getUpdates`
   - Cherchez `"chat":{"id": ...}` dans la réponse JSON → c'est votre chat_id.
   - Pour un groupe, le chat_id commence généralement par un signe `-`.

## 2. Déployer sur Vercel (sans fichier .env)

1. Poussez ce dossier sur un dépôt GitHub.
2. Sur [vercel.com](https://vercel.com), cliquez **Add New → Project** et
   importez le dépôt.
3. Avant (ou après) le déploiement, allez dans
   **Project Settings → Environment Variables** et ajoutez :

   | Name                 | Value                                  |
   |----------------------|-----------------------------------------|
   | `TELEGRAM_BOT_TOKEN` | le token donné par @BotFather           |
   | `TELEGRAM_CHAT_ID`   | l'identifiant du chat/groupe récupéré   |

4. Cliquez **Deploy** (ou **Redeploy** si les variables ont été ajoutées
   après le premier déploiement — les fonctions serverless doivent être
   redéployées pour lire les nouvelles variables).

C'est tout : aucun fichier `.env` n'est nécessaire, Vercel injecte les
variables d'environnement directement dans `api/send.js` au moment de
l'exécution.

## 3. Tester en local (optionnel)

```bash
npm i -g vercel
vercel dev
```
Puis définissez temporairement les variables dans le terminal avant de lancer :
```bash
TELEGRAM_BOT_TOKEN=xxx TELEGRAM_CHAT_ID=xxx vercel dev
```

## Personnalisation rapide

- **Prix / textes** : modifiez directement le texte dans `index.html`
  (section `.hero-copy`) — il est déjà à l'identique de la demande, en
  français puis en arabe.
- **Wilayas** : la liste des 58 wilayas est générée par `script.js`
  (tableau `WILAYAS`).
- **Produits / images** : chaque `<div class="slide">` dans `index.html`
  correspond à une photo dans `images/` — le nom affiché vient de
  l'attribut `data-name` et alimente aussi le menu déroulant "Modèle choisi".
