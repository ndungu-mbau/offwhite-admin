import React from 'react'
import { Switch, Route } from "react-router-dom"

import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import list from "./list"
import view from "./view"

// const ProtectedRoute = createProtectedRoute("LINE_MAINTENANCE")

const Index = ({ location }) => {
  return (
    <>
      <Sidebar location={location}/>
      <div className="main-content">
        <Navbar/>
        <Switch>
          <Route path="/maintenance" exact component={list} />
          <Route path="/maintenance/:id" component={view} />
        </Switch>
      </div>
    </>
  )
}

export default Index