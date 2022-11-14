#  GraphQL Clean architecture Boilerplate

In this project I create a todo list API with authentication and authorization using GraphQL, typescript, Sequelize.
I tried to apply my understanding of Uncle bob clean architecture style to my code. Because I do believe the combination of dependency inversion and single responsibilities can make code testable and decoupled from each layer.


## System Design 
> “If you think good architecture is expensive, try bad architecture." Robert CC martin

![](https://miro.medium.com/max/1400/1*phecRia6It8AnwlFjhjx2w.jpeg)

## src/entities
An entity can be an object with methods, or it can be a set of data structures and function.
Entity is the core layer and does not depend on any component that's why in persistence layer you can see a function named `normalizeUser` or `normalizePost` to create

## src/dto
defines communication contracts between layers.


## src/services
Business logics are here (services folder). This layer receives, validates, and processes the client data from the controller and provides the expected result. We also do not expect this layer to be affected by frameworks, Databases, or ... Therefore, this layer is isolated from such concerns and can not access to database directly. for this reason I use a library named awilix to manage dependency injection and decouple from database or any external libraries. 
these dependencies don't need to be ready when you want to work on. All you need is just an interface, and that's it. 

## src/persistence
This is the concrete layer that communicate with database and help services layer to work with Database

## src/IoC
(stand for Inversion of Control) is an implementation of the Dependency Injection, the letter D in the SOLID principal. Every time you create a new Service class, or a new repository class, or a new controller, you need to register them in this container

## src/application
Apollo web server are located here. This layer just executes the relevant controller or repo. we can easily change apollo server from these layer without having effects to the rest of the project


### Make a resilient application thanks to Clean architecture
---
This style makes software resilient to any changes. You put the codes that might barely change in the inside layers and put others in the outside layers, and these layers work with each other through dependency injection. 
In the Internal Layers, you don't see any import from the external layers, which is the beauty of this pattern. In fact It makes internal layers to be isolated from any tools. For example, if we want to add  express.js instead of graphQL, or change the Database/ DataSource, we don't need to change the whole Layers. All we need is to just change the yellow layers and make it compatible through adapters.

### Getting Started
1. Install dependencies
```
npm i
```
2. Run the application under the `dev` mode with the hot reload feature
```
npm run dev
```
3. Compile the application
```
npm run build
```
4. Run the application under the `production` mode. You need to compile the application before
```
npm run start
```
5. Generate types for GraphQL schema. This action must be done each time you update the GraphQL schema to allow the typescript compiler to understand your schema:
```
npm run generate-typedefs
```