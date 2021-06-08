#!/usr/bin/env node

const fs = require('fs');
const path = require("path");
const { MongoClient } = require('mongodb');

const args = process.argv.slice(2);
const examplePath = path.resolve(__dirname, 'example.json');

switch (args[0]) {
    case '-h':
    case '--help':
    case undefined:
        console.log('\n\nRefer to https://github.com/holoitsme/mongo-json-setter/blob/main/README.md for instructions on how to use this utility.\n')
        break;
    case '--example':
        mongoSetup(examplePath);
        break;
    default:
        mongoSetup(args[0]);
}

function mongoSetup(json) {
    fs.readFile(json, 'utf8', (err, data) => {
        //Handle errors
        if(err) {
            switch (err.code) {
                case 'ENOENT':
                    console.log('\n\nNo such file or directory. Please, select a valid JSON file.\n');
                    break;
                case 'EISDIR':
                    console.log('\n\nThe specified file is a directory. Please, select a valid JSON file\n');
                    break;
                default:
                    console.error(err);
            }
            return;
        }

        //Parse JSON
        let config;
        try {
            config = JSON.parse(data);
        } catch (e) {
            if (e instanceof SyntaxError) console.error('\n\nThe specified file is not a valid JSON file.\n')
            return;
        }

        const url = `mongodb://${config.host}:${config.port}/${config.db_name}`;

        //Connect to DB
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
}