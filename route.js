import express from "express";
import { getMessages, postMessage } from "./controller.js";

const router = express.Router();

router.get("/getmessages/:code", getMessages);
router.post("/postmessage", postMessage);

export default router;
