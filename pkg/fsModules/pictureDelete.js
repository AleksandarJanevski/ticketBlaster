const fs = require('fs');
const { promisify } = require('util');

const remove = promisify(fs.unlink);

exports.unlink = async (picture) => {
    try {
        let path
        if (picture.startsWith('event')) {
            path = 'event'
        } else {
            path = 'profile'
        }
        await remove(`${__dirname}/../../public/img/${path}/${picture}`)
    } catch (err) {
        return console.log(err);
    }
}