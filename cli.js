#!/usr/bin/env node

const [,, ...args] = process.argv;
const fs = require('fs');
const { MongoClient } = require('mongodb');



fs.readFile(args[0], 'utf8', (err, data) => {
    if(err) {
        console.error(err);
        return;
    }

    //Parse JSON
    let config;
    try {
        config = JSON.parse(data);
    } catch (e) {
        if (e instanceof SyntaxError) console.error('The specified file is not a valid JSON file')
        return;
    }

    const url = `mongodb://${config.host}:${config.port}/${config.db_name}`;

    MongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        const dbo = db.db(config.db_name);
        console.log("Database created");
        for (const [i, collection] of config.collections.entries()) {
            dbo.createCollection(collection.name, (err, coll) => {
                if (err) throw err;
                console.log("Collection created!");
                coll.insertOne(collection.fields, (err, res) => {
                    if (err) throw err;
                    console.log("1 document inserted");
                    if (i === config.collections.length - 1)
                        db.close();
                });
            });
        }
    });
});