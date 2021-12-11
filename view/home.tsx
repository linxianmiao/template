import React from "react";
import { observer } from 'mobx-react-lite';
import { useStores } from './store/ContextProvider';
import { Link } from 'react-router-dom';
export default observer((props: any) => {
    const {loginStore} = useStores();

    if( loginStore.isLogin === false ){
        alert("Not Sign In")
        location.href = '/login'
    }
    return(
        <div>
            <span>Hello</span>
            <Link to="/login">login</Link>
        </div>
    );
})