TEST STREAMROOT

Le projet n'est pas fonctionnel du à une erreur de header CORS que je n'ai pas su
régler en temps et en heure.

J'ai opté pour la libraire PeerJS pour les transfert de données pair à pair,
pour sa simplicité d'utilisation apparente.

STRUCTURE :

Le serveur est en NodeJS, et se charge de fournir la liste d'ID aux clients, ou envoie directement l'image
selon le contexte.

Le client contacte le serveur, et suivant la réponse à sa requete, télécharge l'image directement depuis le serveur,
ou auprès de ses pairs.

AMELIORATION :

Etant donné mes diffcultés de mise en place, ce qui suit est purement théorique :

Dans son état actuel, les clients ne peuvent se connecter qu'à un seul autre pair pour télécharger l'image.

Il n'y a pas de contingence prévue au cas où la connection p2p est interrompue.

TODO :

client: -> téléchargement sur plusieurs pairs.
	-> gestion de l'interruption des connections p2p
	-> connexion au serveur autrement qu'en dur dans le script (formulaire web)

serveur: -> vérification des données client sur requete
	 -> vérification de la validité des arguments (serveur)