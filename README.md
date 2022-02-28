# Objectif
Réaliser une application Headless avec Symfony / Api Platform et un front en React ou Vuejs  

* Analyse du projet
* Choisir l'API qui sera utilisée pour le projet => J'ai choisi une API de Decathlon qui propose des fiches de sports. Voici le lien: https://sports-decathlon.herokuapp.com/api/v1/sports. A partir de là, on obtient une grande liste que j'ai ensuite trié pour en garder 20.
* Rédaction précises des tâches à réaliser
* Création du projet
    - Mise en place Symfony  
    - Mise en place React  
    - Mise en place de API Platform  
    - Ajout de Tailwindcss => Histoire d'ajouter un peu de design  
* Création de l'entité Sport  
    - Champ name  
    - Champ image url  
    - Champ thumbnail  
    - Champ description  
    - Champ slug  
    - Champ date d'ajout  
    - Faire la migration  
* Ajouter une commande php pour importer le flux de data    
    - Récupérer la donnée  
    - Choisir 20 sports  
    - Entrer les sports en BDD  
* Faire un point d'accès pour afficher les données  
    - Tous les sports  
    - Un sport  
* Front : Créer un router  
    - Ajouter un lien home  
    - Ajouter un lien détails  
    - Vérifier la présence des liens API nécessaires sur: /api/sports et /api/sports/:id  
* Intégration des pages
    - home: requêter et afficher les sports avec thumbail, name
    - Details: requête et afficher un sport avec image, name, description
* Déploiement sur Netlify
    - Création d'un compte sur Netlify
    - Importation du projet => Pas réussi malgré l'interface simple au départ.
* Rédaction de la synthèse (readme.md)



# Mise en oeuvre du projet :
Dans un terminal, executer:
1. git clone https://github.com/Turfu88/dernier-cri.git
2. composer install
3. yarn install
4. php bin/console doctrine:database:create
5. php bin/console doctrine:migrations:migrate
6. php bin/console import:data   => Commande pour importer les data et les mettre en BDD
7. yarn dev => pour compiler React
8. symfony server:start (pour lancer Symfony, qui indiquera le port à ouvrir sur un navigateur)

# Retours :
Pas de problème majeur, notamment pour Api Platform et React.  
J'ai eu quelques difficultés sur 2 points en particulier :  
* Le parsing de l'api que j'ai choisi. En effet, la data s'est révélée plutôt irrégulière ce qui a nécessité de nettoyer la data avant de l'ajouter en BDD. J'aurai du la tester avant plus en profondeur.
* La mise en oeuvre sur Netlify. Je n'avais jamais utilisé leur plateforme et j'ai voulu la tester en créant un compte chez eux. J'ai essayé de mettre en ligne le projet mais il doit manquer une chose qui m'échappe. Je regarderai ça dans la semaine.  

En chemin, j'ai aussi voulu inclure un service pour alléger le fichier contenant la commande d'importation du flux. La création d'un service a pris du temps et j'ai fini par l'enlever.

# Améliorations possibles :
Il est possible d'améliorer le projet sur plusieurs points :
* Ajouter une page 404 est le plus urgent.
* Ajouter une condition pour faire fonctionner l'import de données qu'une seule fois et ainsi éviter des doublons en BDD.
* Quelques tests automatisés.
* En BDD, l'ajout d'un slug pour chaque entrée était faisable et je l'ai ajouté. Il manquerait plus qu'à configurer l'api et React pour avoir des liens plus lisibles.
* Dans ce projet, on y ajoute que 20 entrées. Au cas où il en aurait plus, inclure une pagination peut être envisageable.
* Du coup, ne plus limiter qu'à 20 entrées et récupérer le plus d'entrées possibles. Cette opération reste limitée dans la mesure où il faudrait optimiser l'API d'origine. Cette dernière s'est avérée assez mal structurée, notamment pour récupérer les images.
* Lancer Lighthouse pour optimiser davantage le code.
* Trier un peu plus les entrées en utilisant les tags fournis par l'API d'origine.
