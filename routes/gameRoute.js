import express from "express"
import { acceptBet, acceptBetList, betHistory, createBet, DeletBet, listBets, playBet, setRoom, updateStatus } from "../controllers/betController.js";
import { isAuthenticatedUser } from "../middelware/auth.js";
import { upload } from "../utils/multer.js";

const router = express.Router()


// admin
router.post("/create-bet",isAuthenticatedUser, createBet);
router.get("/list-bet",isAuthenticatedUser, listBets);
router.post("/accept-bet",isAuthenticatedUser, acceptBet);
router.get("/accept-bet-list", isAuthenticatedUser, acceptBetList);
router.delete("/delet-bet/:id", isAuthenticatedUser, DeletBet);
router.get("/play-bet/:id", isAuthenticatedUser, playBet);
router.put("/set-room/:id", isAuthenticatedUser, setRoom);

router.put("/update-status/:id",upload.single("description"), isAuthenticatedUser, updateStatus);

router.get("/bet-history",isAuthenticatedUser, betHistory);




export default router