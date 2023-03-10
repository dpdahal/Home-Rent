import SettingTableSeeder from "./SettingTableSeeder.js";
import UserTableSeeder from "./UserTableSeeder.js";

class DbSeeder {

    run() {
        new SettingTableSeeder();
        new UserTableSeeder();
    }

}

export default DbSeeder;
