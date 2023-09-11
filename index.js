import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./route.js";
import { MongoClient } from "mongodb";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/", (req, res) => {
  res.send("Hello world! Please use correct route to use api.");
});
app.use("/api/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const collection = client.db("ChatDB").collection("ustalking");

async function connectToMongoDB() {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
}
connectToMongoDB();
