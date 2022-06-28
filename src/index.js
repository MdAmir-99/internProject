const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://MdAmir_Db:admin1234@cluster0.oag5gb9.mongodb.net/group38Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected 👍"))
.catch ( err => console.log(err) )


// app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port 🎧 ' + (process.env.PORT || 3000))
});