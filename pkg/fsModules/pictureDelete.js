const fs = require('fs');

const remove = async (picture, path) => {
    return new Promise((success, fail) => {
        fs.unlink(`${__dirname}/../../public/img/${path}/${picture}`, err => {
            if (err) {
                return fail(err);
            }
            return success();
        })
    })

}

exports.unlink = async (picture) => {
    try {
        let path
        if (picture.startsWith('event')) {
            path = 'event'
        } else {
            path = 'profile'
        }
        await remove(picture, path)
    } catch (err) {
        return console.log(err);
    }
}