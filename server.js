const express = require("express");
// middleware
const morgan = require("morgan");
//
const fs = require("fs");
const path = require("path");
const cors = require("cors");
// to process user request
const bodyParser = require("body-parser");
// database connection
const mongoose = require("mongoose");
// to use environment variable
require("dotenv").config();

const app = express();

// mongoDB database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB could not connect."));

// importing Authentication route
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const matchRoutes = require("./routes/match");
const matchDetailRoutes = require("./routes/matchDetail");
const playerPaymentRoutes = require("./routes/playerPayment");
const sponsorRoutes = require("./routes/sponsor");
const sponsorPaymentRoutes = require("./routes/sponsorPayment");
const teamRoutes = require("./routes/team");
const tournamentRoutes = require("./routes/tournament");
const registrationRoutes = require("./routes/registration");
const squadRoutes = require("./routes/squad");

// app middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors()); // allows all origins

// if ((process.env.NODE_ENV = "development")) {
//   app.use(cors({ origin: `http://localhost:3000` }));
// }

// middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", expenseRoutes);
app.use("/api", matchRoutes);
app.use("/api", matchDetailRoutes);
app.use("/api", playerPaymentRoutes);
app.use("/api", sponsorRoutes);
app.use("/api", sponsorPaymentRoutes);
app.use("/api", teamRoutes);
app.use("/api", tournamentRoutes);
app.use("/api", registrationRoutes);
app.use("/api", squadRoutes);

// for accessing the image path
app.use("/api/uploads/images/", express.static(path.join("uploads", "images")));

// assgning port for live and localhost
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
