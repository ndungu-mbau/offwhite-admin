import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DATA_QUERY, DEFECTS_QUERY, CREATE_DEFECT, DELETE_DEFECT, UPDATE_DEFECT } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import AddModal from "./add"
import EditModal from "./edit"
import DeleteModal from "../../components/delete"
const addModalInstance = new AddModal()
const editModalInstance = new EditModal()
const deleteModalInstance = new DeleteModal()

const List = props => {
  const { history } = props
  let { loading, data: defectsData, error } = useQuery(DEFECTS_QUERY)
  const { loading: dataloading, data: dataQuery } = useQuery(DATA_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addDefect] = useMutation(CREATE_DEFECT, {
    refetchQueries: [{ query: DEFECTS_QUERY }]
  })

  const [editDefect] = useMutation(UPDATE_DEFECT, {
    refetchQueries: [{ query: DEFECTS_QUERY}]
  })

  const [removeDefect] = useMutation(DELETE_DEFECT, {
    refetchQueries: [{ query: DEFECTS_QUERY }]
  })

  const saveAdd = async data => {
    await addDefect({ variables: { defect: data }})
  }

  const saveEdit = async data => {
    await editDefect({ variables: { defect: data }})
  }

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
      {!dataloading && <AddModal users={dataQuery.users} airplanes={dataQuery.airplanes} save={saveAdd} />}
      {!dataloading && <EditModal edit={edit} users={dataQuery.users} airplanes={dataQuery.airplanes} save={saveEdit} />}
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Defects List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={defectsData.defects}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: true
                }}
                delete={defect => { setRemove(defect); deleteModalInstance.show() }}
                edit={defect => { setEdit(defect); editModalInstance.show() }}
                view={defect => history.push(`/defects/${defect.id}`)}
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