const path = require('path');
const fs = require('fs');

const domain = process.env.DOMAIN;

let data = fs.readFileSync(path.resolve(__dirname, './nginx.conf'), 'utf-8');
data = data.replaceAll('{{DOMAIN}}', domain);

// Do not remove. console.log is needed to push data into pipe later.
console.log(data); // eslint-disable-line no-console
