import adminReducer from "./reducer/adminReducer";
import authReducer from "./reducer/authReducer";
import gameReducer from "./reducer/gameReducer";
import paymentReducer from "./reducer/paymentReducer";
const rootReducer = {
    auth: authReducer,
    bet: gameReducer,
    payment: paymentReducer,
    admin:adminReducer
};
export default rootReducer;