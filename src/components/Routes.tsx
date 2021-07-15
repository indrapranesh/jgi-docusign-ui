import React from 'react';
import { Route } from "react-router-dom";
import Landing from "./Landing";
import { Dashboard } from "./Dashboard";


function Routes() {
  return (
    <>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />
    </>
  );
}

export default Routes;
