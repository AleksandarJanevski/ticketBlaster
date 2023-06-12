const fs = require('fs');
const { promisify } = require('util');

const read = promisify(fs.readFile);

const readMail = async (template) => {
    try {
        const mail = await read(`${__dirname}/html/${template}.html`, 'utf-8');
        return mail
    } catch (err) {
        return console.log(err);
    }
}
exports.mail = async (template, text, link) => {
    try {
        let document = await readMail(template);
        document = await document.replace('TEXTAREA', text).replace('LINK', link)
        return document
    } catch (err) {
        return console.log(err);
    }
}
