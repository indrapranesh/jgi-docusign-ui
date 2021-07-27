import React, { useEffect } from 'react';
import routes from '../constants/routes.json';
import history from '../history';


function Logout() {
    useEffect(() => {
        localStorage.clear();
        history.push(routes.LANDING);
    })

  return (
    <>
    </>
  );
}

export default Logout;
