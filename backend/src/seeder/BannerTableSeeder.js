import Banner from "../models/Banner.js";

class BannerTableSeeder {
    constructor() {
        let insertData = [
            {
                title: 'Welcome to Fast House Rent',
                image: 'b1.jpg'
            },
            {
                title: 'Find your dream house',
                image: 'b2.jpg'

            },
            {
                title: 'Easy to find your house',
                image: 'b3.jpg'
            }
        ];
        insertData.map((data) => {
            Banner.find({title: data.title}, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    if (docs.length === 0) {
                        let hObj = new Banner(data);
                        hObj.save().then((res) => {
                            console.log("Banner  table seeded");
                        });
                    }
                }
            });

        });
    }

}

export default BannerTableSeeder;