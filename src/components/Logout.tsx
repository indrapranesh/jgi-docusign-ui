import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import routes from '../constants/routes.json';
import history from '../history';
import { setIsLoggedIn } from '../redux/actions/session-actions';


function Logout() {
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoggedIn(false));
        localStorage.clear();
        history.push(routes.LANDING);
    })

  return (
    <>
    </>
  );
}

export default Logout;
