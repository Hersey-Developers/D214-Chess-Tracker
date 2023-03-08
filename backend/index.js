const mongoose = require("mongoose");

require("dotenv").config();

const dbUrl = `mongodb+srv://admin:ex3QyRRoukTOREBM@d214chesstracker.leloucw.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false,
})
  .then(() => {
    console.log("Connected to MongoDB. Server started.")
    const app = require("./app");
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
