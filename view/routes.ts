import login from './login';
import home from './home';
import auth from './auth';
const Routes = [

    {
        path: '/',
        exact: true,
        component: login,
    },

];

export default Routes;