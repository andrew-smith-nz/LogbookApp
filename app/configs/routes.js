import Home from "../containers/home";
import Logbooks from "../containers/logbooks";
import Login from "../containers/login";
import Sync from "../containers/sync";
import Activities from "../containers/activities";
import EditEntry from "../containers/editEntry";
import Reporting from "../containers/reporting";
import TrialLimitReached from "../containers/trialLimitReached";

const Routes = {
    // the first item is the default 'home' screen
    Home: { screen: Home },
    Logbooks: { screen: Logbooks },
    EditEntry: { screen: EditEntry },
    Sync: { screen: Sync },
    Reports: { screen: Reporting },
    Activities: { screen: Activities },
    Login: { screen: Login },
    TrialLimitReached: { screen: TrialLimitReached },
};

export default Routes;