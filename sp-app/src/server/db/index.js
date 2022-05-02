const pg = require('pg');

const pgClient = new pg.Client(process.env.POSTGRESQL_ADDON_URI);
pgClient.connect();


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

module.eports = {
    persons,
    deletePerson
}
