# Smart Search - Farid

## Les étapes du rendu de la liste

Le composant `TableRecords` récupère les 10 000 records accessibles. Il 10 766 records mais on ne peut pas récupérer les données au-delà de 10 000.

Toutes ces données sont stockées dans le context `RecordsContext`.

J'ai préféré récupérer toutes les données au lancement de l'application pour pouvoir gérer le filtre plus facilement et plus rapidement. Surtout que la requête est très rapide.

### `Search`

Le composant `Search` affiche le text input et réagit à la recherche de l'utilisateur grâce au hook `useEffect`. Le timeout permet d'attendre que l'utilisateur ait fini de taper sa recherche pour filtrer les résultats.

### `Table`

Les résultats sont affichés dans une table parce que la lecture des données est plus rapide et plus simple. L'utilisateur peut aussi ouvrir Google Maps directement depuis la table pour situer l'emplacement du tournage.

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Le context `RecordsContext`

`RecordsContext` utilise le hook `useReducer` pour manipuler les données. Grâce au context, on peut séparer les composants `Search` et `Table` et éviter d'utiliser les props.

Avec autant de données reçue, l'application serait très lente si les données étaient manipulées avec le state des composants.

## Filtrer les données

Le text input accepte 1 à N mots-clés. Exemple: 2016 2017 75018 75016.

Le filtre se fait en plusieurs étapes:

1. L'extraction et le trie : les années, lieux et type de tournage sont séparées dans trois Array différents.
2. Une action est dispatchée au reducer du context
3. Appel de la fonction `filterRecords` qui filtre toutes les données par étapes : filtre par année, puis par lieu et enfin par type.
