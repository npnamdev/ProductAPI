const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const connection = require('./src/config/database');

const userRouter = require('./src/routes/userRouter');

const port = process.env.PORT || 8888;


//Config trình duyệt
app.use(cors({ origin: '*' }));


//Config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Config router
app.use('/v1/api/users', userRouter);


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