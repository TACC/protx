import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dashboard from '../Dashboard';
import Allocations from '../Allocations';
import Applications from '../Applications';
import Sidebar from '../Sidebar';
import DataFiles from '../DataFiles';
import * as ROUTES from '../../constants/routes';
import './Workbench.scss';

function Workbench() {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  // Get systems and any other initial data we need from the backend
  useEffect(() => {
    dispatch({ type: 'FETCH_SYSTEMS' });
    dispatch({ type: 'FETCH_AUTHENTICATED_USER' });
    dispatch({ type: 'GET_ALLOCATIONS' });
    dispatch({ type: 'GET_APPS' });
    dispatch({ type: 'GET_APP_START' });
  }, []);

  return (
    <div className="workbench-wrapper">
      <Sidebar />
      <div className="workbench-content">
        <Switch>
          <Route path={`${path}${ROUTES.DASHBOARD}`}>
            <Dashboard />
          </Route>
          <Route path={`${path}${ROUTES.DATA}`}>
            <DataFiles />
          </Route>
          <Route
            path={`${path}${ROUTES.APPLICATIONS}`}
            component={Applications}
          />
          <Route
            path={`${path}${ROUTES.ALLOCATIONS}`}
            component={Allocations}
          />
          <Redirect from={`${path}`} to={`${path}${ROUTES.DASHBOARD}`} />
        </Switch>
      </div>
    </div>
  );
}

export default Workbench;