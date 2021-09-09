const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Bootcamp = require("./models/Bootcamp");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    // .green.inverse is simply to make the console log green,
    // based on our colors module. This is not necessary.
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    // If we don't pass anything to .deleteMany() then
    // it will delete all of the data
    await Bootcamp.deleteMany();

    // .red.inverse is simply to make the console log red,
    // based on our colors module. This is not necessary.
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// We have two different functions in this file: importData and deleteData
// When we call this in our terminal with node seeder.js (to run the file), we want to be
// able to add an argument on to it that will let it know whether we want to
// import or delete data.
// E.g. in our terminal, if we run node seeder -i, whatever is in the position
// of -i is found via the process.argv[2] method.
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
