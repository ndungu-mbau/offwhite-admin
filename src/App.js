import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import { ApolloProvider } from "@apollo/react-hooks"
import client from "./utils/client"
import { PrivateRoute } from "./components/routes"

import departments from "./pages/departments"
import users from "./pages/users"
import airplanes from "./pages/airplanes"
import defects from "./pages/defects"
import rotables from "./pages/rotables"
import manuals from "./pages/manuals"
import maintenance from "./pages/line-maintenance"

import login from "./pages/login"
import reset from "./pages/reset"
import verify from "./pages/verify"

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <PrivateRoute path="/departments" component={departments} />
          <PrivateRoute path="/users" component={users} />
          <PrivateRoute path="/airplanes" component={airplanes} />
          <PrivateRoute path="/defects" component={defects} />
          <PrivateRoute path="/rotables" component={rotables} />
          <PrivateRoute path="/manuals" component={manuals} />
          <PrivateRoute path="/maintenance" component={maintenance} />
          <Route path="/login" component={login} />
          <Route path="/reset" component={reset} />
          <Route path="/verify" component={verify} />
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App;
