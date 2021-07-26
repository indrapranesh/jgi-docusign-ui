import React from 'react';
import { Route } from "react-router-dom";
import Landing from "./Landing";
import { Dashboard } from "./Dashboard";
import { StakeHolders } from './StakeHolders';


function Routes() {
  return (
    <>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/stakeholders" component={StakeHolders} />
    </>
  );
}

export default Routes;
