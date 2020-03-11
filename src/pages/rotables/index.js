import React from 'react'
import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import Footer from "../../components/footer"
import List from "./list"

const Index = ({ location }) => {
  return (
    <>
      <Sidebar location={location}/>
      <div className="main-content">
        <Navbar/>
        <List />
        <Footer />
      </div>
    </>
  )
}

export default Index