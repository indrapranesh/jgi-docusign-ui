import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './Landing.scss';
import qs from 'qs';
import history from '../history';
import { LOGIN_URL } from '../constants/url.constants';

function Landing() {

  if(localStorage.getItem('ACCESS_TOKEN')) {
    history.push('/dashboard');
  }

  const { hash } = useLocation();

  const login = () => {
    window.location.replace(LOGIN_URL);
  }

  useEffect(() => {
    if(hash.indexOf('access_token') > -1)  {
      let hashData: any = qs.parse(hash.slice(hash.indexOf('access_token=')));
      console.log(hashData);
      localStorage.setItem('ACCESS_TOKEN', hashData.access_token);
      history.push('/dashboard')
    }
  })

  return (
    <div className="landing ">
      <div className="container h-full w-full mx-auto flex items-center">
        <Button type="primary" shape="round" size="large" onClick={login}>
            Login using ArcGIS Account
        </Button>
      </div>
    </div>
  );
}

export default Landing;
