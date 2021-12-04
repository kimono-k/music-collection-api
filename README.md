# REST API - CRUD

- POST = CREATE
- GET = READ
- PATCH = UPDATE
- DELETE = DELETE

# Tables

- Albums = id, name, tracks, year
- Artists = id, name
- Genre = id, name

# GET

- When you do a request to an URL

# CREATE

- Creates data

# PATCH AND DELETE

- Are not available by default

# POSTMAN

- A REST Client to check your requests.

# Mongoose

- A tool for communication with MongoDB.

# MongoDB Compass

- Mongo standalone

# Web Framework

- Express.js

# How do clients make requests?

# GET: http://localhost:8000/albums

- Fetches all the albums from the database

# Details page: http://localhost:9000/album<id>

- Fetches the individual album by it's id.

# POST: http://localhost:8000/albums

- To create data in the database

# PATCH: http://localhost:8000/albums/<id>

- To update the data of a specific item

# Routes

- For the functions to handle our requests from the client by our server.
- We have multiple entities artist, album, and genre.
- Entities should be stored in separate routes.

# MVC

- M = Model = SCHEMA = DATABASE MODEL
- V = View = UI = FRONT-END
- C = Controller = ROUTER = CONTROLS ALL THE ROUTING FOR SEPARATE ENTITIES

# RDBMS - MONGODB

- Database -> Database
- Tables -> Collections
- Rows -> Documents
- Columns -> Fields

# View the albums collection resource

- localhost:8000/albums

# View the albums detail resource

- http://localhost:8000/albums/61aa635a195207ffdc9f2bce
