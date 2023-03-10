import User from "../../models/User.js";
import dotenv from "dotenv";

dotenv.config();

class AuthController {

    async login(req, res, next) {
        let {email, password} = req.body;
        let user = await User.findOne({email: email});
        if (user) {
            let isMatch = await user.comparePassword(password);
            if (isMatch) {
                let token = await user.generateToken();
                res.status(200).json({
                    success: true,
                    token: token,
                    user: user
                });
            } else {
                res.status(200).json({
                    error: "Password is not correct"
                });
            }
        } else {
            return res.status(200).json({error: "User not found"});
        }
    }

}

export default AuthController;