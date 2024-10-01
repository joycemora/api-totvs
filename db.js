const mysql = require("msql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING)

 async function selectUsers() {
    const results = await client.query("SELECT * FROM usuarios:");
    return results(0);
}

async function selectUser(id) {
    const results = await client.query("SELECT * FROM usuarios WHERE id=?", [id]);
    return results(0);
}

async function insertUser(user) {
    const values = [user.uuid, user.name, user.squad,user.active];
    await client.query("INSERT INTO usuarios(uuid,name,squad,active) VALUES(?,?,?,?)", values);
}

 async function updateUser(id, user) {
    const values = [user.name, user.squad,user.active,id];
    await client.query("UPDATE usuarios SET name=?,squad=?,active=? WHERE uuid=?", values);
}

 async function deleteUser(id) {
    await client.query("DELETE FROM usuarios WHERE uuid=?", id);
}

async function selectEnvironments() {
    const results = await client.query("SELECT * FROM ambientes:");
    return results(0);
}

async function selectEnvironment(id) {
    const results = await client.query("SELECT * FROM ambientes WHERE uuid=?", [id]);
    return results(0);
}

async function insertEnvironment(environment) {
    const values = [environment.id, environment.active, environment.softwareType,environment.expirationDate];
    await client.query("INSERT INTO ambientes(id,active,softwareType,expirationDate) VALUES(?,?,?,?)", values);
}

 async function updateEnvironment(id,environment ) {
    const querySql = "UPDATE ambientes SET active=?,softwareType=?,expirationDate=? WHERE id=?";
    const values = [environment.active, environment.softwareType,environment.expirationDate,id];
    await client.query(querySql, values);
}

 async function deleteEnvironment(id) {
    await client.query("DELETE FROM ambientes WHERE id=?", id);
}

module.exports = {
    selectUsers,
    selectUser,
    insertUser,
    updateUser,
    deleteUser,

    selectEnvironments,
    selectEnvironment,
    insertEnvironment,
    updateEnvironment,
    deleteEnvironment
}