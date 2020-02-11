import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import dash from "./pages/dashboard"
import maintenance from "./pages/line-maintenance"
import planning from "./pages/line-planning"
import pirep from "./pages/pirep"
import records from "./pages/technical-records"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={dash} />
        <Route path="/pirep" component={pirep} />
        <Route path="/line-planning" component={planning} />
        <Route path="/line-maintenance" component={maintenance} />
        <Route path="/records" component={records} />
      </Switch>
    </Router>
  )
}

export default App;
