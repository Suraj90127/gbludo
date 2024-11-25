import express from "express"
import { getKyc, getReferralCommission, getUserDetails, kyc, loginUser, referralCommissionTransfer, sendOtp, transactionHistorys, updateUserProfile, withdrawal, withdrawalHistory } from "../controllers/userController.js"
import { isAuthenticatedUser } from "../middelware/auth.js";
const router = express.Router()
import cookieParser from "cookie-parser";
import { upload } from "../utils/multer.js";

const app=express()

app.use(cookieParser());





router.post("/send-otp", sendOtp);

router.post("/login", loginUser);
router.get("/user-auth",  isAuthenticatedUser, (req, res) => {
    res.status(200).send({ ok: true })
})
router.get("/me",isAuthenticatedUser,  getUserDetails);
router.put("/update-profile",isAuthenticatedUser,  updateUserProfile);

router.post("/withdrawal",isAuthenticatedUser,  withdrawal);
router.get("/withdrawal/history",isAuthenticatedUser,  withdrawalHistory);
router.get("/transaction-history",isAuthenticatedUser,  transactionHistorys);
router.post("/kyc", isAuthenticatedUser, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), kyc);
router.get("/get-kyc", isAuthenticatedUser, getKyc);
router.get("/get-referral-commission", isAuthenticatedUser, getReferralCommission);
router.post("/transfer-referral-commission", isAuthenticatedUser, referralCommissionTransfer);





export default router