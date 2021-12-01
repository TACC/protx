import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Redirect } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardDisplay from './DashboardDisplay';
import '../shared/Variables.css';
import './Dashboard.css';
import * as ROUTES from '../../../../constants/routes';

/**
 * TODO: find a way to set this value based on some external configuration value so it changes based on the hosts settings.
 * false for PROD
 * true for PPRD, DEV, etc.
 */
const showHeader = false;
const hostName = "COOK CHILDREN'S PRE-PRODUCTION PORTAL";
const messageString =
  'Geospatial data analytics dashboard using demonstration data.';

function Dashboard() {
  const { path } = useRouteMatch();
  const setupComplete = useSelector(state => state.workbench.setupComplete);

  if (showHeader) {
    return (
      <div className="dashboard-root-header">
        <DashboardHeader hostName={hostName} messageString={messageString} />
        <DashboardDisplay />
      </div>
    );
  }

  return (
    <div className="dashboard-root">
      {setupComplete ? (
        <DashboardDisplay />
      ) : (
        <Redirect
          from={`${path}`}
          to={`${ROUTES.WORKBENCH}${ROUTES.ONBOARDING}/setup/`}
        />
      )}
    </div>
  );
}

export default Dashboard;
