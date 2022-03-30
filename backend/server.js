const express = require('express');
const cors = require('cors');
const app = express();

require('./server/config/mongoose.config'); // This is new
app.use(cors());

app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new

require('./server/routes/user.route')(app);
require('./server/routes/child.route')(app);


app.listen(8000, () => {
    console.log("Listening at Port 8000 HELL YEAH")
})