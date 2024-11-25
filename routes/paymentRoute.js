import express from "express"
import { getRechargeHistory, getRechargeOrder, recharge, submitUtr,geRecharge } from "../controllers/paymentController.js"
import { isAuthenticatedUser } from "../middelware/auth.js"

const router=express.Router()

router.post("/recharge",isAuthenticatedUser, recharge)

router.post("/get-recharge", geRecharge)

router.get("/recharge/order",isAuthenticatedUser, getRechargeOrder)
router.put("/utr-submit",isAuthenticatedUser, submitUtr)
router.get("/recharge/history",isAuthenticatedUser, getRechargeHistory)

export default router