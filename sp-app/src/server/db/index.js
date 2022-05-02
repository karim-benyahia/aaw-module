const pg = require('pg');
const dotenv = require("dotenv");

dotenv.config();
console.log("connecting to", process.env.POSTGRESQL_ADDON_URI);
const pgClient = new pg.Client(process.env.POSTGRESQL_ADDON_URI);
pgClient.connect();

let query = async (param, callback) => {
    try {
        pgClient.query(param, callback);
    } catch (e) {
        if (e.message === "Connection terminated unexpectedly") {
            pgClient.query(param, callback);
        }
    }
}

let persons = () => {
    return new Promise((resolve, reject) => {
        query({
                name: "read-persons",
                text: `select id, first_name, last_name, event_id
                       from person;`,
            },
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.rows);
            }
        );
    });
}

let deletePerson = (id) => {
    return new Promise((resolve, reject) => {
        query({
                name: "delete-persons-"+id,
                text: `delete person where id=$1;`,
                values: [id]
            },
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.rows);
            }
        );
    });
}

const addPerson = ({id, firstName, lastName, event}) => {
    return new Promise((resolve, reject) => {
        query({
                name: "add-person-" + id,
                text: `insert into person (id, first_name, last_name, event_id) values($1,$2,$3,$4);`,
                values: [id, firstName, lastName, event.id]
            },
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.rows);
            }
        );
    });
}

const events = () => {
    return new Promise((resolve, reject) => {
        query({
                name: "read-events",
                text: `select id, name, date
                       from event;`,
            },
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.rows);
            }
        );
    });
}

const event = (id) => {
    return new Promise((resolve, reject) => {
        query({
                name: "read-event-"+id,
                text: `select id, name, date
                       from event where id=$1;`,
                values: [id]
            },
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.rows[0]);
            }
        );
    });
}

const deleteEvent = (id) => {
    return new Promise((resolve, reject) => {
        query({
                name: "delete-event-" + id,
                text: `delete event where id=$1;`,
                values: [id]
            },
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.rows);
            }
        );
    });
}

const addEvent = ({id, name, date}) => {
    return new Promise((resolve, reject) => {
        query({
                name: "add-event-" + id,
                text: `insert into event (id, name, date) values($1,$2,$3);`,
                values: [id, name, date]
            },
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.rows);
            }
        );
    });
}

module.exports = {
    persons,
    deletePerson,
    addPerson,
    deleteEvent,
    events, event,
    addEvent
}


