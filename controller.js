import { collection } from "./index.js";
import { dateTime } from "./util.js";

export const getMessages = async (req, res) => {
  try {
    const code = req.params.code;
    if (code !== "panda" && code !== "cat") {
      res.status(400).json({ message: "Please enter correct code" });
      return;
    }
    let person = code === "panda" ? process.env.PERSON1 : process.env.PERSON2;
    let items = await collection.find({}).toArray();
    items = items.map((item) => item.message);
    res.status(200).json({ person: `Hi ${person}`, chat: items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postMessage = async (req, res) => {
  try {
    const { code, message } = req.body;
    let person;
    if (message === undefined || message.trim() === "") {
      res.status(400).json({ message: "Enter something in message , stupid." });
      return;
    }
    if (code !== "panda" && code !== "cat") {
      res.status(400).json({ message: "Please enter correct code" });
      return;
    }

    person = code === "panda" ? process.env.PERSON1 : process.env.PERSON2;

    const resultMessage = `${person} : ${dateTime()} >>> ${message}`;

    const result = await collection.insertOne({
      message: resultMessage,
    });
    res.status(200).json({
      message: `Hi ${person}, your message is updated in database.`,
      sent_message: resultMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
