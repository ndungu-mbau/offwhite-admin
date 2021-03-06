import React from "react"
import { Link } from "react-router-dom"

export default ({ location : { pathname = "/" } = {} }) => {
  const { canView } = {
    get canView(){
      const { type  } = JSON.parse(localStorage.getItem("user"))
      return type === "SYSADMIN"
    }
  }

  return (
    <nav className="navbar navbar-vertical fixed-left navbar-expand-lg navbar-light bg-white" id="sidenav-main">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand pt-0" to="/">
        <img src="./assets/img/brand/blue.png" className="navbar-brand-img"alt="..."/>
      </Link>
      <div className="collapse navbar-collapse" id="sidenav-collapse-main">
        <div className="navbar-collapse-header d-md-none">
          <div className="row">
            <div className="col-6 collapse-brand">
              <Link to="/">
                <img src="./assets/img/brand/blue.png" className="navbar-brand-img"alt="..."/>
              </Link>
            </div>
            <div className="col-6 collapse-close">
              <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <form className="mt-4 mb-3 d-md-none">
          <div className="input-group input-group-rounded input-group-merge">
            <input type="search" className="form-control form-control-rounded form-control-prepended" placeholder="Search" aria-label="Search"/>
            <div className="input-group-prepend">
              <div className="input-group-text">
                <span className="fa fa-search"></span>
              </div>
            </div>
          </div>
        </form>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={`nav-link ${pathname === "/" && "active"}`} to="/">
              <i className="ni ni-tv-2 text-primary"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${pathname.startsWith("/defects") && "active"}`}to="/defects">
              <i className="fas fa-dumpster-fire text-danger"></i> Defects
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${pathname.startsWith("/maintenance") && "active"}`}to="/maintenance">
              <i className="fas fa-tools text-dark"></i> Line Maintenance
            </Link>
          </li>
          { canView && <>
          <li className="nav-item">
            <Link className={`nav-link ${pathname.startsWith("/users") && "active"}`} to="/users">
              <i className="ni ni-single-02 text-yellow"></i> Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${pathname.startsWith("/departments") && "active"}`}to="/departments">
              <i className="ni ni-building text-orange"></i> Departments
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${pathname.startsWith("/airplanes") && "active"}`}to="/airplanes">
              <i className="fas fa-plane-departure text-purple"></i> Airplanes
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${pathname.startsWith("/manuals") && "active"}`}to="/manuals">
              <i className="ni ni-books text-info"></i> Manuals
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${pathname.startsWith("/rotables") && "active"}`}to="/rotables">
              <i className="fas fa-cogs text-success"></i> Rotables
            </Link>
          </li>
          </>}
        </ul>
      </div>
    </div>
  </nav>
  )
}