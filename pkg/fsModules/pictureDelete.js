const fs = require('fs');
const { promisify } = require('util');

const remove = promisify(fs.unlink);
