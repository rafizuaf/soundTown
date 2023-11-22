const express = require("express");
const Controller = require("./controllers/controller");
const router = require("./routers");
const app = express();
const port = 3005;

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
    console.log(`Soundtown listening on port ${port}`);
});
