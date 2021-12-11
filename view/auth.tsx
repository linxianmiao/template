import React from "react";
import { observer } from 'mobx-react-lite';
import { useStores } from './store/ContextProvider';
import { Link } from 'react-router-dom';


export default observer((props: any) => {
    const {loginStore} = useStores();

    const params = new URLSearchParams(location.search);
    console.log(params.get('code'))
    return(
        <div>
            <span>Auth</span>
            <Link to="/login">login</Link>
        </div>
    );
})