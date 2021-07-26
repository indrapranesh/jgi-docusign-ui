import React from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import { setIsLoggedIn } from './redux/actions/session-actions';
import history from './history';
import routes from './constants/routes.json';
import MainLayout from './components/MainLayout';

function App() {
  const dispatch = useDispatch();

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
    <div className="App">
      <MainLayout />
    </div>
  );
}

export default App;
