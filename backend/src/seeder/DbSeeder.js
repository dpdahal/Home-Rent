import SettingTableSeeder from "./SettingTableSeeder.js";
import UserTableSeeder from "./UserTableSeeder.js";
import BannerTableSeeder from "./BannerTableSeeder.js";

class DbSeeder {

    run() {
        new SettingTableSeeder();
        new UserTableSeeder();
        new BannerTableSeeder();
    }

}

export default DbSeeder;
