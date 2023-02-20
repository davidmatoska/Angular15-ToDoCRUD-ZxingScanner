# ScanApp

Projet crééé avec Angular version 15.1.5.

Créer un nouveau projet Angular:
ng new leNomQueTuVeuxCestToiQuiDecide

Importer le projet

Installer Angular Material:
ng add @angular/material

Installer JSON Server:
npm i -g json-server

Lancer JSON Server:
json-server --watch db.json

Installer Zxing Scanner:

https://github.com/zxing-js/ngx-scanner/wiki/Getting-Started

npm i @zxing/browser@latest --save
npm i @zxing/library@latest --save
npm i @zxing/ngx-scanner@latest --save

Pour visualiser:
- côté client: http://localhost:4200/
- côté serveur: http://localhost:3000/

Fonctionne en localhost avec demande permission accès webcam. 

Pour tester avec smartphone il y a des étapes supplémentaires:
- télécharger une application type Droidcam
- relier le smartphone à l'ordinateur avec câble USB
- lancer l'application permattant de remplacer la webcam par la caméra du smartphone