import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import authContext from '../utils/authContext';

function Twitter({match}) {
    const {refreshToken} = React.useContext(authContext);
useEffect(() => {
    fetchLink();
}, [])

async function fetchLink(){
    try{
        console.log(match.params.token);
        const {token} = match.params;
        if(token){
            localStorage.setItem("key", token);
      setTimeout(() => {
        refreshToken();
        window.location.href = "/";
        this.setState({ loading: false });
      }, 1500);
        }else{
            window.location.href = '/login';
        }
        
    }catch(e){
        console.log(e.response.data)
    }
}

    return (
        <div className='text-center mt-5'>
            <h5>Wait while we verify your data....</h5>
        </div>
    );
}

export default Twitter;