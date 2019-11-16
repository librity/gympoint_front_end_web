import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import ManageStudents from '~/pages/Students/ManageStudents';
import NewStudent from '~/pages/Students/NewStudent';
import EditStudent from '~/pages/Students/EditStudent';

import ManagePlans from '~/pages/Plans/ManagePlans';
import NewPlan from '~/pages/Plans/NewPlan';
import EditPlan from '~/pages/Plans/EditPlan';

import ManageMemberships from '~/pages/Memberships/ManageMemberships';
import NewMembership from '~/pages/Memberships/NewMembership';
import EditMembership from '~/pages/Memberships/EditMembership';

import ManageHelpOrders from '~/pages/HelpOrders/ManageHelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={ManageStudents} isPrivate />
      <Route path="/students/new" exact component={NewStudent} isPrivate />
      <Route path="/students/edit" exact component={EditStudent} isPrivate />

      <Route path="/plans" exact component={ManagePlans} isPrivate />
      <Route path="/plans/new" exact component={NewPlan} isPrivate />
      <Route path="/plans/edit" exact component={EditPlan} isPrivate />

      <Route
        path="/memberships"
        exact
        component={ManageMemberships}
        isPrivate
      />
      <Route
        path="/memberships/new"
        exact
        component={NewMembership}
        isPrivate
      />
      <Route
        path="/memberships/edit"
        exact
        component={EditMembership}
        isPrivate
      />

      <Route path="/help_orders" exact component={ManageHelpOrders} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
