import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { setIsLoggedIn } from './redux/actions/session-actions';
import history from './history';
import routes from './constants/routes.json';
import MainLayout from './components/MainLayout';
import { Spin } from 'antd';
import Routes from './components/Routes';

function App() {
  console.log(history);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootStateOrAny) => state?.loader?.loading);

  if(!localStorage.getItem('ACCESS_TOKEN') && window.location.pathname !== '/') {
    dispatch(setIsLoggedIn({isLoggedIn: false}));
    history.push(routes.LANDING);
  }
  if(localStorage.getItem('ACCESS_TOKEN')) {
    dispatch(setIsLoggedIn({isLoggedIn: true}));
    if( window.location.pathname === '/')
      history.push(routes.DASHBOARD);
  }

  return (
   <>
     <div className="App">
       {
         window.location.pathname === '/' ? (
           <Routes />
         ) : <MainLayout />
       }
      </div>
      {
        loading ? (
          <>
            <Spin size="large" />
            <div className="overlay"></div>
          </>
        ) : null
      }
   </>
    
  );
}

export default App;
