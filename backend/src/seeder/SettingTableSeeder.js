import Setting from "../models/Setting.js";

class SettingTableSeeder {

    constructor() {
        Setting.countDocuments({}, (err, count) => {
            if (err) {
                console.log(err);
            } else {
                if (count === 0) {
                    let sObj = new Setting({

                        "name": "Fast Rent Home",
                        "email": "info@fastrenthome.com",
                        "phone": "01-5555555",
                        "address": "Kathmandu, Nepal",
                        "logo": "fastrenthome.svg"
                    });
                    sObj.save().then((res) => {
                        console.log("Setting table seeded");
                    });
                }
            }
        });
    }

}

export default SettingTableSeeder;