import { Button } from 'antd';
import React, { useEffect } from 'react';
import { USER_LOGIN_URL } from '../constants/url.constants';
import { useLocation } from "react-router-dom";
import './Landing.scss';
import qs from 'qs';
import history from '../history';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../redux/actions/session-actions';
import routes from '../constants/routes.json'

function Landing() {

  const dispatch = useDispatch();

  const { hash } = useLocation();

  const login = () => {
    window.location.replace(USER_LOGIN_URL);
  }

  if(hash.indexOf('access_token') > -1)  {
    let hashData: any = qs.parse(hash.slice(hash.indexOf('access_token=')));
    console.log(hashData);
    localStorage.setItem('ACCESS_TOKEN', hashData.access_token);
    dispatch(setIsLoggedIn({isLoggedIn: true}));
    history.push(routes.DASHBOARD);
  }

  useEffect(() => {
    
  })

  return (
    <div className="landing ">
      <div className="container mx-auto flex h-full align-center justify-center flex-col ">
          <div className="pl-8">
            <p className="font-bold text-white text-8xl">Chimp Auditor</p>
            <p className="text-white font-thin text-3xl pt-3"> Collaborative Conservation Planning with Decision-Makers Sign-off</p>
            <Button className="mt-8" type="primary" shape="round" size="large" onClick={login}>
                Login using DocuSign Account
            </Button>
          </div>
        </div>
      </div>
  );
}

export default Landing;
