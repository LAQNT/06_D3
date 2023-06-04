const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


// TO DEFINE EXPRESS AS APP AND DEFINE THE PORT
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


const userSchema = new mongoose.Schema({

  index: Number,
  guid: String,
  isActive: Boolean,
  balance: String,
  picture: String,
  age: Number,
  eyeColor: String,
  name: { first: String, last: String },
  company: String,
  email: String,
  phone: String,
  address: String,
  about: String,
  registered: String,
  latitude: String,
  longitude: String,

  tags: [String],
  range: [Number],
  friends: [{ id: Number, name: String }],
  greeting: String,
  favoriteFruit: String,

}
  )

  const userModel = mongoose.model('esercizio-d3', userSchema);

  app.get("/", async (req , res) => {
    const allAuthors = await userModel.find();
    return res.json(allAuthors);
  })

// TO RETURN QUERY
  app.get("/age/:age", async (req,res) => {
    let age = req.params.age;
    const allAuthors = await userModel.find({age: {$gt: age}});
    return res.json(allAuthors);
  })

app.get("/age/:age1/:age2", async (req, res) => {
    let age1 = req.params.age1
    let age2 = req.params.age2
    const allAuthors = await userModel.find({$and: [{age: {$gt: age1}}, {age:{$lte: age2}}]});
    return res.json(allAuthors);
})


async function start() {
  try {
    // ---------- 1st connect with db -----------------
    await mongoose.connect(
      "mongodb+srv://lauraquinteroa:PWa2WEXBqPqUD7bw@cluster0.nmxlgk4.mongodb.net/d3-epicode"
    );
    // ---------- 2nd I access to server -----------------
    app.listen(port, () => console.log("Server in port 3000!"));
  } catch (err) {
    console.error(err);
  }
}

start();

