import React from 'react';
import { Route } from "react-router-dom";
import Landing from "./Landing";
import { Dashboard } from "./Dashboard";
import { StakeHolders } from './StakeHolders';
import routes from '../constants/routes.json';
import Logout from './Logout';
import Audit from './Audit';
import Reviews from './Reviews';


function Routes() {
  return (
    <>
        <Route exact path="/" component={Landing} />
        <Route exact path={routes.DASHBOARD} component={Dashboard} />
        <Route exact path={routes.STAKEHOLDERS} component={StakeHolders} />
        <Route exact path={routes.AUDITS} component={Audit} />
        <Route exact path={routes.REVIEWS} component={Reviews} />
        <Route exact path={routes.LOGOUT} component={Logout} />
    </>
  );
}

export default Routes;
