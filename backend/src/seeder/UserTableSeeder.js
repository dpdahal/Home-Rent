import User from "../models/User.js";

class UserTableSeeder {
    constructor() {
        let userData = [
            {
                "name": "sophia",
                "email": "sophia@gmail.com",
                "password": "sophia",
                "role": "admin",
                "gender": "female",
                "address": "kathmandu",
                "phone": "9843363725",
                "image": ''
            },
            {
                "name": "ram",
                "email": "ram@gmail.com",
                "password": "ram",
                "role": "owner",
                "gender": "male",
                "address": "kathmandu",
                "phone": "9860462164",
                "image": ''
            },
            {
                "name": "dp",
                "email": "dp48dahal@gmail.com",
                "password": "admin002",
                "role": "tenant",
                "gender": "male",
                "address": "kathmandu",
                "phone": "9843363725",
                "image": ''
            }
        ];
        userData.map((data) => {
            User.find({role: data.role}, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    if (docs.length === 0) {
                        let hObj = new User(data);
                        hObj.save().then((res) => {
                            console.log("UserTableSeeder: " + data.role + " created");
                        });
                    }
                }
            });

        });
    }
}

export default UserTableSeeder;