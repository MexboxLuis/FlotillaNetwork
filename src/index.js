const express = require("express");
const morgan = require("morgan");
const app = express();
const jwt = require("jsonwebtoken");
process.env.SECRET = "n)Puh#=,tD;w}$5Fh72E4%hhf1MEU$a!";
//Settings
app.set("port", process.env.PORT || 8000);
//Middlewares
app.use(express.json());
//Morgan
app.use(morgan("dev"));
//Routes
app.use(require("./routes/user"));
app.use(require("./routes/token"));
app.use(require("./routes/vehicle"));
app.use(require("./routes/documents"));
app.use(require("./routes/maintenance"));
app.use(require("./routes/notifications"))
app.use(require("./routes/deliveries"))
//Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});