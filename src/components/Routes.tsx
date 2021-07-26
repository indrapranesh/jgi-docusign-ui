import React from 'react';
import { Route } from "react-router-dom";
import Landing from "./Landing";
import { Dashboard } from "./Dashboard";
import { StakeHolders } from './StakeHolders';
import routes from '../constants/routes.json';
import { Reviews } from './Reviews';


function Routes() {
  return (
    <>
        <Route exact path="/" component={Landing} />
        <Route exact path={routes.DASHBOARD} component={Dashboard} />
        <Route exact path={routes.STAKEHOLDERS} component={StakeHolders} />
        <Route exact path={routes.REVIEWS} component={Reviews} />
    </>
  );
}

export default Routes;
