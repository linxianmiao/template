import login from './login';
import home from './home';
import auth from './auth';
const Routes = [

    {
        path: '/',
        exact: true,
        component: home,
    },
    {
        path: '/login',
        exact: true,
        component: login,
    },
    {
        path: '/auth',
        exact: true,
        component: auth,
    },
];

export default Routes;