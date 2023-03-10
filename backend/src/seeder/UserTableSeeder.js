import User from "../models/User.js";

class UserTableSeeder {

    constructor() {
        User.countDocuments({}, (err, count) => {
            if (err) {
                console.log(err);
            } else {
                if (count === 0) {
                    let uObj = new User({
                        "name": "sophia",
                        "email": "sophia@gmail.com",
                        "password": "sophia",
                        "role": "admin",
                        "gender": "male",
                        "address": "kathmandu",
                        "phone": "01700000000",
                        "image":''
                    });
                    uObj.save().then((res) => {
                        console.log("User table seeded");
                    });
                }
            }
        });
    }
}

export default UserTableSeeder;