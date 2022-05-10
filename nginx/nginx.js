const path = require('path');
const fs = require('fs');

const domain = process.env.DOMAIN;

let data = fs.readFileSync(path.resolve(__dirname, './nginx.conf'), 'utf-8');
data = data.replaceAll('{{DOMAIN}}', domain);

// eslint-disable-next-line no-console
console.log(data);
