import Home from "../containers/home";
import Logbooks from "../containers/logbooks";
import Login from "../containers/login";
import Sync from "../containers/sync";
import Activities from "../containers/activities";

const Routes = {
    Home: { screen: Home },
    Logbooks: { screen: Logbooks },
    Activities: { screen: Activities },
    Sync: { screen: Sync },
    //Settings: { screen: Settings },


    Login: { screen: Login },
};

export default Routes;