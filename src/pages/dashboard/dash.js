import React from "react"
import { useQuery } from '@apollo/react-hooks'
import { DATA_QUERY } from "./queries"

import Loader from "../../components/loader"

const Dash = props => {
  const user = JSON.parse(window.localStorage.getItem("user"))
  const { data, loading, error } = useQuery(DATA_QUERY, {
    fetchPolicy: "network-only"
  })

  if(loading) return <Loader />
  if(error){
    window.Swal.fire({
      title: "OOPS!",
      icon: "error",
      text: error.message
    })
  }

  return (
    <>
    <div className="container-fluid pb-4 pt-8 pt-md-12">
      <div className="row">
        <div className="col-12 card shadow">
          <div className="card-header">
            <div className="row d-flex justify-content-between">
              <h2>Your Profile</h2>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-4 col-lg-3">
                <img src="../assets/img/theme/default.png" alt="" className="rounded-circle" style={{ width: "200px"}} />
              </div>
              <div className="col-8 col-lg-9" style={{ borderLeft: "1px solid var(--lighter)"}}>
                <h2 className="text-uppercase text-primary"> Name: {user.name}</h2>
                <hr/>
                <h3>Contact: {user.phone}</h3>
                <h3>Department: {user.department.name}</h3>
                <h3>Role: {user.type}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid pb-4">
      <div className="row">
        <div className="col-12 card shadow">
          <div className="card-header">
            <div className="row d-flex justify-content-between">
              <h2>Defects Stats</h2>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Total No. Of Defects</h5>
                        <span className="h2 font-weight-bold mb-0">{data.defects.length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-purple text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Fixed defects</h5>
                        <span className="h2 font-weight-bold mb-0">{data.defects.filter(defect => defect.status.type === "COMPLETE").length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="ni ni-check-bold"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Defects Being Fixed</h5>
                        <span className="h2 font-weight-bold mb-0">{data.defects.filter(defect => defect.status.type === "IN_PROGRESS").length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="ni ni-user-run"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Newly Reported Defects</h5>
                        <span className="h2 font-weight-bold mb-0">{data.defects.filter(defect => defect.status.type === "NEW").length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="ni ni-tag"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 card shadow">
          <div className="card-header">
            <div className="row d-flex justify-content-between">
              <h2>User Stats</h2>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-3 col-lg-6 mt-3">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Total Users</h5>
                        <span className="h2 font-weight-bold mb-0">{data.users.length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="ni ni-single-02"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 mt-3">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Pilots</h5>
                        <span className="h2 font-weight-bold mb-0">{data.users.filter(user => user.type === "PILOT").length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="fas fa-plane-departure"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 mt-3">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Maintenance</h5>
                        <span className="h2 font-weight-bold mb-0">{data.users.filter(user => user.type === "LINE_MAINTENANCE").length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="fas fa-plane-departure"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 mt-3">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Line Planning Staff</h5>
                        <span className="h2 font-weight-bold mb-0">{data.users.filter(user => user.type === "LINE_PLANNING").length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="fas fa-plane-departure"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dash