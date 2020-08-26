const express = require('express')
const { connect } = require("mongoose")
const cors = require('cors')
const bodyParser = require("body-parser")
const { PORT, MONGODB_URL } = require("./Config");



/*==============================initialize app=================================================*/
const app = express();
/*================Body parser==============*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
/*=======================================load Routs===========================================*/
app.use("/api/posts", require("./Routes/Posts"))

/*=====================================Database connection=====================================*/
let startApp = async () => {
    try {
        await connect(
            MONGODB_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,

        },
            (err) => {
                if (err) throw err;
                console.log("DATABASE CONNECTED");
            }
        );
        //Listen port
        app.listen(PORT, (err) => {
            if (err) throw err;
            console.log("Server connected at port number " + PORT);
        })

    } catch (err) {
        console.log(err)
    }
}

module.exports = startApp();
