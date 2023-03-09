const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const path = require('path')
const connection = require('./src/config/database');

const fileUpload = require('express-fileupload');

const userRouter = require('./src/routes/userRouter');

const port = process.env.PORT || 8888;


//Config static file
app.use(express.static(path.join('./src', 'public')));


//Config trình duyệt
app.use(cors({ origin: '*' }));

// Config file upload
app.use(fileUpload());



//Config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Config router
app.use('/v1/api/', userRouter);


(async () => {
    try {
        //Connect DB mongoose
        await connection();

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        })
    } catch (error) {
        console.log("Error connect to DB: ", error);
    }
})();