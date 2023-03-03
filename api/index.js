const express = require('express');
const app = express();
const dotenv = require("dotenv");
var cors = require('cors')
const dbConnect = require("./dbConnection/dbConnection");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const eventRoute = require("./routes/events");
const categoryRoute = require("./routes/categories");
const uploadRoute = require("./routes/upload");



dotenv.config();
//so as to make req/resp use json
app.use(express.json());
app.use(cors());

//route
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/events",eventRoute);
app.use("/api/categories",categoryRoute);
app.use("/api/upload",uploadRoute);
app.listen("5000");

