const mongoose = require("mongoose");

const dbHandler = () => {

    mongoose.connect(
        process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => { console.log('DB connected') })

    mongoose.set('debug', true);

    mongoose.connection.on("error", err => {
        console.log(`DB connection error: ${err.message}`);
    })

}

module.exports = dbHandler;