const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: `../../config.env` })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('NAME', 'TicketBlaster')

exports.init = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database Connected');
    } catch (err) {
        return console.log(err);
    }
}