const fs = require('fs');

const read = async (template) => {
    return new Promise((success, fail) => {
        fs.readFile(`${__dirname}/../../public/html/${template}.html`, 'utf-8', (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data)
        });

    })
}

const readMail = async (template) => {
    try {
        const mail = await read(template);
        return mail
    } catch (err) {
        return console.log(err);
    }
}
exports.mail = async (template, text, link, button) => {
    try {
        let document = await readMail(template);
        document = await document.replace('TEXTAREA', text).replace('LINK', link).replace('BUTTON', button)
        return document;
    } catch (err) {
        return console.log(err);
    }
}
