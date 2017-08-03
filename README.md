# Specifications
La société MowItNow a décidé de développer une tondeuse à gazon automatique, destinée aux surfaces rectangulaires. La tondeuse peut être programmée pour parcourir l'intégralité de la surface.

La position de la tondeuse est représentée par une combinaison de coordonnées (x,y) et d'une lettre indiquant l'orientation selon la notation cardinale anglaise (N,E,W,S). La pelouse est divisée en grille pour simplifier la navigation.

Par exemple, la position de la tondeuse peut être « 0, 0, N », ce qui signifie qu'elle se situe dans le coin inférieur gauche de la pelouse, et orientée vers le Nord.
Pour contrôler la tondeuse, on lui envoie une séquence simple de lettres. Les lettres possibles sont « D », « G » et « A ». « D » et « G » font pivoter la tondeuse de 90° à droite ou à gauche respectivement, sans la déplacer. « A » signifie que l'on avance la tondeuse d'une case dans la direction à laquelle elle fait face, et sans modifier son orientation.

Si la position après mouvement est en dehors de la pelouse, la tondeuse ne bouge pas, conserve son orientation et traite la commande suivante.

On assume que la case directement au Nord de la position (x, y) a pour coordonnées (x, y+1).

Pour programmer la tondeuse, on lui fournit un fichier d'entrée construit comme suit :
* La première ligne correspond aux coordonnées du coin supérieur droit de la pelouse, celles
du coin inférieur gauche sont supposées être (0,0)
* La suite du fichier permet de piloter toutes les tondeuses qui ont été déployées. Chaque
tondeuse a deux lignes la concernant :
  * la première ligne donne la position initiale de la tondeuse, ainsi que son orientation. La position et l'orientation sont fournies sous la forme de 2 chiffres et une lettre, séparés par un espace
  * la seconde ligne est une série d'instructions ordonnant à la tondeuse d'explorer la
pelouse. Les instructions sont une suite de caractères sans espaces.

Chaque tondeuse se déplace de façon autonome, ce qui signifie que toutes les tondeuses se déplacent en même temps et de façon totalement asynchrone. Une tondeuse ne peut pas passer sur une autre, elle attend que le chemin soit libre pour avancer.

Lorsqu'une tondeuse achève une série d'instruction, elle communique sa position et son orientation.

## Objectif
Concevoir et écrire un programme s'exécutant via NodeJS ou un outil d’industrialisation.

## Test
Le fichier suivant est fourni en entrée : 
```
5 5
1 2 N
GAGAGAGAA
3 3 E
ADAADADDA
5 2 S
AGAGAADAGA
```
On attend le résultat suivant (position finale des tondeuses) :
```
1 3 N
4 1 E
5 4 N
```

# Exécution
## Installation
Afin de récupérer le code et d'installer toutes les dépendances, exécuter les commandes suivantes :
```
$ git clone https://github.com/thibaultamartin/mowitnow.git
$ cd mowitnow
$ npm install
```

## Exécution en mode nominal
L'exécution en mode nominal permet de parser le fichier de configuration `instructions.config` et d'exécuter les instructions qu'il contraint.

L'affichage se limite à l'état final du système après exécution des instructions.
```
$ npm start

> mowitnow@1.0.0 start /Path/to/repository/mowitnow
> LOG_LEVEL=info node ./app/index.js

info: Application started and ready to execute
info: Final state: 
1 3 N
4 1 E
5 4 N
```

## Exécution en mode debug
L'exécution en mode debug permet d'obtenir des informations additionnelles sur l'exécution du programme.

Ce mode d'exécution permet également de visualiser l'état du système à chaque exécution d'ordres.
```
$ npm run debug

> mowitnow@1.0.0 debug /Path/to/repository/mowitnow
> LOG_LEVEL=debug node ./app/index.js

info: Application started and ready to execute
debug: Parser trying to open file  ./instructions.conf
debug: Parsed grid size from file: (5,5)
debug: Parsed a new Mower width=5, height=5, mowers=[$ref=$], x_coordinate=1, y_coordinate=2, current_orientation=N, orders_to_come=[G, A, G, A, G, A, G, A, A]
debug: Parsed a new Mower width=5, height=5, mowers=[$ref=$["grid"], x_coordinate=1, y_coordinate=2, current_orientation=N, orders_to_come=[G, A, G, A, G, A, G, A, A], $ref=$], x_coordinate=3, y_coordinate=3, current_orientation=E, orders_to_come=[A, D, A, A, D, A, D, D, A]
debug: Parsed a new Mower width=5, height=5, mowers=[$ref=$["grid"], x_coordinate=1, y_coordinate=2, current_orientation=N, orders_to_come=[G, A, G, A, G, A, G, A, A], $ref=$["grid"], x_coordinate=3, y_coordinate=3, current_orientation=E, orders_to_come=[A, D, A, A, D, A, D, D, A], $ref=$], x_coordinate=5, y_coordinate=2, current_orientation=S, orders_to_come=[A, G, A, G, A, A, D, A, G, A]
debug: Model constructed wuth characteristics width=5, height=5, mowers=[$ref=$["grid"], x_coordinate=1, y_coordinate=2, current_orientation=N, orders_to_come=[G, A, G, A, G, A, G, A, A], $ref=$["grid"], x_coordinate=3, y_coordinate=3, current_orientation=E, orders_to_come=[A, D, A, A, D, A, D, D, A], $ref=$["grid"], x_coordinate=5, y_coordinate=2, current_orientation=S, orders_to_come=[A, G, A, G, A, A, D, A, G, A]], mowers=[$ref=$["grid"]["mowers"][0], $ref=$["grid"]["mowers"][1], $ref=$["grid"]["mowers"][2]]
debug: Watchdog set to 50 steps.
debug: Some orders left to execute
debug: Step 0
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| | | |E| | |
-------------
| |N| | | |S|
-------------
| | | | | | |
-------------
| | | | | | |
-------------
debug: Some orders left to execute
debug: Step 1
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| | | | |E| |
-------------
| |W| | | | |
-------------
| | | | | |S|
-------------
| | | | | | |
-------------
debug: Some orders left to execute
debug: Step 2
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| | | | |S| |
-------------
|W| | | | | |
-------------
| | | | | |E|
-------------
| | | | | | |
-------------
debug: Some orders left to execute
debug: Step 3
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| | | | | | |
-------------
|S| | | |S| |
-------------
| | | | | |E|
-------------
| | | | | | |
-------------
debug: Some orders left to execute
debug: Step 4
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| | | | | | |
-------------
|S| | | |S|N|
-------------
| | | | | | |
-------------
debug: Some orders left to execute
debug: Step 5
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| | | | | |N|
-------------
|E| | | |W| |
-------------
| | | | | | |
-------------
debug: Some orders left to execute
debug: Step 6
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| | | | | |N|
-------------
| | | | | | |
-------------
| |E| |W| | |
-------------
| | | | | | |
-------------
debug: Some orders left to execute
debug: Step 7
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| | | | | |E|
-------------
| | | | | | |
-------------
| |N| |N| | |
-------------
| | | | | | |
-------------
debug: Some orders left to execute
debug: Step 8
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| | | | | |E|
-------------
| |N| | | | |
-------------
| | | |E| | |
-------------
| | | | | | |
-------------
debug: Some orders left to execute
debug: Step 9
-------------
| | | | | | |
-------------
| | | | | | |
-------------
| |N| | | |N|
-------------
| | | | | | |
-------------
| | | | |E| |
-------------
| | | | | | |
-------------
debug: No orders left to execute
info: Final state: 
1 3 N
4 1 E
5 4 N
```