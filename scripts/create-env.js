const fs = require('fs');

fs.writeFileSync('./.env', `KEY=${process.env.KEY}`);