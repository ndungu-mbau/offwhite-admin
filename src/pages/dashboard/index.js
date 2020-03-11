import React from 'react';
import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import Footer from "../../components/footer"

import Dash from "./dash"

function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Navbar/>
        <Dash />
        <Footer/>
      </div>
    </>
  );
}

export default Dashboard;
