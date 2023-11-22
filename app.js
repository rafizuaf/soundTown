const express = require("express");
const router = require("./routers");
const users = require("./routers/users");
const app = express();
const port = 3005;

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use(users)

app.listen(port, () => {
    console.log(`Soundtown listening on port ${port}`);
});
