import Home from "../containers/home";
import Logbooks from "../containers/logbooks";
import Login from "../containers/login";
import Sync from "../containers/sync";
import Activities from "../containers/activities";
import EditEntry from "../containers/editEntry";
import Reporting from "../containers/reporting";

const Routes = {
    // the first item is the default 'home' screen
    Reports: { screen: Reporting },
    Home: { screen: Home },
    EditEntry: { screen: EditEntry },
    Logbooks: { screen: Logbooks },
    Activities: { screen: Activities },
    Sync: { screen: Sync },
    Login: { screen: Login },
};

export default Routes;