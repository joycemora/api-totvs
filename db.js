const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING)

 async function selectUsers() {
    const results = await client.query("SELECT * FROM usuarios");
    return results[0];
}

async function selectUser(id) {
    const results = await client.query("SELECT * FROM usuarios WHERE uuid=?", [id]);
    return results[0][0];
}

async function insertUser(user) {
    const values = [user.name, user.squad];
    await client.query("INSERT INTO usuarios(name_,squad) VALUES(?,?)", values);
    
}

 async function updateUser(id, user) {
    const values = [user.squad,user.active,id];
    await client.query("UPDATE usuarios SET squad=?,active_=? WHERE uuid=?", values);
}

 async function deleteUser(id) {
    await client.query("DELETE FROM usuarios WHERE uuid=?", id);
}

async function selectEnvironments() {
    const results = await client.query("SELECT * FROM ambientes");
    return results[0];
}

async function selectEnvironment(id) {
    const results = await client.query("SELECT * FROM ambientes WHERE id=?", [id]);
    return results[0][0];
}

async function insertEnvironment(environment) {
    if(environment.softwareType === "erp")stype=environment.softwareType;
    else stype ="sgbd"
    await client.query("INSERT INTO ambientes(software_type) VALUES(?)", stype);
}

 async function updateEnvironment(id,environment ) {
    const atual = await client.query("SELECT * FROM ambientes WHERE id=?", [id]);
    const date1 = new Date(environment.expirationDate);
    const date2 = new Date(atual[0][0].expiration_date);
    if(date1.getTime() > date2.getTime())xpDate=environment.expirationDate;
   else xpDate = date2;

    if(environment.active == null)environment.active=true;
    const querySql = "UPDATE ambientes SET active_=?,expiration_date=? WHERE id=?";
    const values = [environment.active,xpDate,id];
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