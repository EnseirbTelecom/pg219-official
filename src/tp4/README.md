# TP4: utilisation d'un framework pour SPA

## Sujet

Nous développer une appli mobile pour l’API développée dans le TP précédent, en utilisant Cordova et Framework7, présentés en cours.

L’application devra présenter les produits dans une liste directement au démarrage. On devra pouvoir éditer les produits, supprimer les produits et ajouter de nouveau produits.

## Documentation et ressources

* [Framework7 Core Documentation](https://framework7.io/docs/)
* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Correction

Vous devez lancer `npm install` après avoir récupérer le code. Il faut aussi démarrer MongoDB et démarrer le serveur développé dans le TP3. Enfin vous pouvez lancer l'application à l'aide de `npm run serve`. Le code  principal se trouve dans le répertoire `www` de la racine du dossier.

### NPM Scripts

* 🔥 `start` - run development server
* 🔧 `serve` - run development server
* 📱 `build-cordova` - build cordova app

### Cordova

Cordova project located in `cordova` folder. You shouldn't modify content of `cordova/www` folder. Its content will be correctly generated when you call `npm run cordova-build-prod`.

### Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 generate-assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 generate-assets --ui
```