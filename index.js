require("dotenv").config();

const db = require("./db");

const express = require("express");

const app = express();

app.use(express.json());

app.delete("/usuarios/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    await db.deleteUser(id);
    response.sendStatus(204);
});

app.patch("/usuarios/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const user = request.body;
    await db.updateUser(id, user);
    response.sendStatus(200);
});

app.post("/usuarios/", async (request, response) => {
    const user = request.body;
    await db.insertUser(user);
    response.sendStatus(201);
});

app.get("/usuarios/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const results = await db.selectUser(id)
    response.json(results)
});

app.get("/usuarios", async (request, response) => {
    const results = await db.selectUsers()
    response.json(results);
});

app.delete("/ambientes/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    await db.deleteEnvironment(id);
    response.sendStatus(204);
});

app.patch("/ambientes/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const environment= request.body;
    await db.updateEnvironment(id, environment);
    response.sendStatus(200);
});

app.post("/ambientes/", async (request, response) => {
    const environment = request.body;
    await db.insertEnvironment(environment);
    response.sendStatus(201);
});

app.get("/ambientes/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const results = await db.selectEnvironment(id)
    response.json(results)
});

app.get("/ambientes", async (request, response) => {
    const results = await db.selectEnvironments()
    response.json(results);
});

app.get("/", (request, response) => {
    response.json({
        message: "It's alive"
    })
});

app.listen(process.env.PORT, () => {
    console.log("App  now is running!");
});