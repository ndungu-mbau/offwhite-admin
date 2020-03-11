import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DEFECTS_QUERY, DELETE_DEFECT } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import DeleteModal from "../../components/delete"
const deleteModalInstance = new DeleteModal()

const List = props => {
  const { history } = props
  let { loading, data: defectsData, error } = useQuery(DEFECTS_QUERY, {
    fetchPolicy: "network-only"
  })
  const [remove, setRemove] = useState({})
  const { type } = JSON.parse(localStorage.getItem("user"))

  const [removeDefect] = useMutation(DELETE_DEFECT, {
    refetchQueries: [{ query: DEFECTS_QUERY }]
  })

  const saveRemove = async ({ id }) => {
    await removeDefect({ variables: { defect: { id }}})
  }

  if(loading) return <Loader />
  if(error){
    window.Swal.fire({
      title: "OOPS!",
      icon: "error",
      text: error.message
    })
  }

  return (
    <div className="container pb-8 pt-5 pt-md-8">
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Defects List</h3>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={defectsData.defects.filter(defect => defect.status.type !== "NEW")}
                options={{
                  deleteable: type === "SYSADMIN",
                  editable: false,
                  viewable: type === "LINE_MAINTENANCE" || type === "SYSADMIN"
                }}
                delete={defect => { setRemove(defect); deleteModalInstance.show() }}
                view={defect => history.push(`/maintenance/${defect.id}`)}
                headers={[
                {
                  label: "Airplane Reg. No.",
                  key: "airplane.reg_no"
                },
                {
                  label: "Description",
                  key: "description"
                },
                {
                  label: "Pilot Name",
                  key: "pilot.name"
                },
                {
                  label: "Status",
                  key: "status.type"
                }]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List