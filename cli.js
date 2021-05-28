#!/usr/bin/env node

const [,, ...args] = process.argv;
const fs = require('fs');

console.log(args);

fs.readFile(args[0], 'utf8', (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    console.log(data);

});