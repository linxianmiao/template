import React from "react";
import { observer } from 'mobx-react-lite';
import { useStores } from './store/ContextProvider';
import  Grid from '@mui/material/Grid'
export default observer((props: any) => {

    const {loginStore} = useStores();

    const renderForm = () => {
        return (
            <>
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
            </>
        );
    }
    const submitLogin = async () => {
        const ret = await loginStore.submit();
        
    }

    const onClickSubmit = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        await submitLogin();
    }
    return(
        <div className="page">

            <Grid container spacing={4} xs={8} className="test-container">

                <Grid item xs={8} className="test-div">
                    <div>A</div>
                </Grid>

                <Grid container item xs={8} spacing={4}>

                    <Grid item xs={4} className="test-div">
                        <div>B</div>
                    </Grid>

                    <Grid container item xs={6} spacing={4}>
                        <Grid item xs={6} className="test-div">
                            <div>C</div>
                        </Grid>
                        <Grid container item xs={6} spacing={4}>
                            <Grid item xs={4} className="test-div">
                                <div>E</div>
                            </Grid>   
                            <Grid item xs={8} className="test-div">
                                <div>G</div>
                            </Grid>                            
                        </Grid>

                    </Grid>   
                    <Grid item xs={2} className="test-div">
                        <div>F</div>
                    </Grid>
                    <Grid item xs={4} className="test-div">
                        <div>D</div>
                    </Grid>

                </Grid>
            </Grid>

        </div>
    );
})