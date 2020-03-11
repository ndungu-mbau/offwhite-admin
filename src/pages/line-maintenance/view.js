import React, { useState, useRef } from "react"
import JoditEditor from "jodit-react"
import { useParams, useHistory } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DEFECT_QUERY, UPDATE_DEFECT, UPDATE_STATUS, DELETE_DEFECT } from "./queries"

import Loader from "../../components/loader"

import DeleteModal from "../../components/delete"
import ViewManualModal from "./manual"
const deleteModalInstance = new DeleteModal()
const viewManualModalInstance = new ViewManualModal()

const List = props => {
  const { id } = useParams()
  const { type } = JSON.parse(localStorage.getItem("user"))
  const history = useHistory()
  let { loading, data, error: queryError } = useQuery(DEFECT_QUERY, {
    variables:{
      defect:{
        id
      }
    }
  })

  const [removeDefect, { error: mutationError }] = useMutation(DELETE_DEFECT)
  const [updateStatus] = useMutation(UPDATE_STATUS)
  const [updateDefect] = useMutation(UPDATE_DEFECT)

  const [remove, setRemove] = useState({})
  const [manual, setManual] = useState({})
  const [maintenance_description, setMaintenanceDscription] = useState(data?.defect?.full_description)
  const editor = useRef(null)

  const saveRemove = async ({ id }) => {
    await removeDefect({ variables: { defect: { id }}})
    deleteModalInstance.hide()
    history.push("/maintenance")
  }

  const saveUpdate = async () => {
    const status_res = await updateStatus({ variables: {
      status: {
        id: data.defect.status.id,
        type: "COMPLETE"
      }
    }})
    const defect_res = await updateDefect({ variables: { defect: {
      id,
      maintenance_description
    }}})

    console.log({ status_res, defect_res })
    history.goBack()
  }

  const error = queryError || mutationError

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
    <div className="container-fluid pt-8 pt-md-12">
      <DeleteModal remove={remove} save={saveRemove} />
      <ViewManualModal manual={manual} />
      <div className="row">
        <div className="col-12 card shadow">
          <div className="card-header">
            <div className="row d-flex justify-content-between">
              <h2>Defect Details</h2>
              <div className="ml-auto">
                <button className="btn btn-outline-secondary">
                  <i className="far fa-edit"></i>
                </button>
                <button className="btn btn-outline-secondary" onClick={() => {setRemove(data.defect); deleteModalInstance.show()}}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div class="card shadow card-stats mb-4 mb-lg-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-2 justify-content-center align-content-center">
                        <div class="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i class="ni ni-single-02"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">Pilot</h5>
                        <span class="h2 font-weight-bold">{data.defect.pilot.name}</span><br/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="card shadow card-stats mb-4 mb-lg-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-2 justify-content-center align-content-center">
                        <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i class="fas fa-plane-departure"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">Airplane</h5>
                        <span class="h2 font-weight-bold">{data.defect.airplane.reg_no}</span><br/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <button className="btn btn-primary p-0" disabled={!data.defect.manual} onClick={() => { setManual(data.defect.manual); viewManualModalInstance.show() }}>
                  <div class="card shadow card-stats mb-4 mb-lg-0">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-2 justify-content-center align-content-center">
                          <div class="icon icon-shape bg-purple text-white rounded-circle shadow">
                            <i class="ni ni-books"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0">Manual</h5>
                          <span class="h2 font-weight-bold">{data.defect.manual?.name}</span><br/>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Pilot Description</h4>
                  </div>
                </div>
                <div className="card-body">
                  <p>{data.defect.description}</p>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Line Planning Description</h4>
                  </div>
                </div>
                <div className="card-body" dangerouslySetInnerHTML={{ __html: data.defect.full_description }}></div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Line Maintenance Description</h4>
                  </div>
                </div>
                <div className="card-body" dangerouslySetInnerHTML={{ __html: data.defect.maintenance_description }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {(type === "LINE_MAINTENANCE" || type === "SYSADMIN") && data.defect.status.type !== "COMPLETE" ? <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header">
              <h4 className="card-title">Create Line Maintenance Report</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <JoditEditor
                    ref={editor}
                    value={maintenance_description}
                    config={{ readonly: false }}
                    tabIndex={1}
                    onBlur={newContent => setMaintenanceDscription(newContent)}
                    onChange={newContent => {}}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row d-flex flex-row-reverse">
                <div className="col-3">
                  <button className="btn btn-icon btn-success btn-lg" type="button" onClick={saveUpdate}>
                    <span className="btn-inner--icon"><i className="ni ni-check-bold"></i></span>
                    <span className="btn-inner--text">Mark Complete</span>
                    </button>
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>: null}
  </>
  )
}

export default List