import React from "react";
import { observer } from 'mobx-react-lite';
import { useStores } from './store/ContextProvider';

export default observer((props: any) => {

    const {loginStore} = useStores();

    const submitLogin = async () => {
        const ret = await loginStore.submit();
        
    }

    const onClickSubmit = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        await submitLogin();
    }
    return(
        <div>
            <span>Login</span>
            <form action="" method="post" className="form">
                <div>
                    <label htmlFor="username">Enter your name: </label>
                    <input type="text" name='username' id='username'/>
                </div>
                <div>
                    <label htmlFor="userpassword">Enter your password: </label>
                    <input type="text" name='userpassword' id='userpassword'/>
                </div>
                
                <button type='button' onClick={onClickSubmit}>submit</button> 
            </form>
        </div>
    );
})