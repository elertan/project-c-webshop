# Project 5 Webshop
Hogeschool Rotterdam INF2B Project 5 Webshop project

Het idee is om als Backend met .NET Core te werken, en vervolgens te praten met een GraphQL instance.

Zie [https://graphql-dotnet.github.io/](https://graphql-dotnet.github.io/)

Voor de Frontend ReactJS + TypeScript + Apollo (voor het makkelijk gebruik maken van GraphQL) + e.v.t. Redux en als styling niet perse custom  hoeft te zijn iets van Material UI te gebruiken?

ReactJS + TypeScript [https://github.com/wmonk/create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)
Apollo Client React [https://www.apollographql.com/docs/react/](https://www.apollographql.com/docs/react/)
ReactRouter

Frontend structure is:

components/

	containers/ <-- THIS ONLY CONTAINS COMPONENTS THAT CONTAIN STATE, COMPONENTS BELOW SHOULDNT CONTAIN STATE

	views/ <-- THESE COMPONENTS ARE ALL "Stateless Functional Component"'s AKA React.SFC do not introduce state in these components

routes/ <-- Contains all routes for the app

utils/ <-- Utility functions for easy reuse : )

GraphQL Playground (Start backend and use this url in your browser)
![https://i.imgur.com/m1g9tSn.png](https://i.imgur.com/m1g9tSn.png)
