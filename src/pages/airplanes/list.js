import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AIRPLANES_QUERY, CREATE_AIRPLANE, DELETE_AIRPLANE, UPDATE_AIRPLANE } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import AddModal from "./add"
import EditModal from "./edit"
import DeleteModal from "../../components/delete"
const addModalInstance = new AddModal()
const editModalInstance = new EditModal()
const deleteModalInstance = new DeleteModal()

const List = props => {
  let { loading, data: airplanesData, error } = useQuery(AIRPLANES_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addAirplane] = useMutation(CREATE_AIRPLANE, {
    refetchQueries: [{ query: AIRPLANES_QUERY }]
  })

  const [editAirplane] = useMutation(UPDATE_AIRPLANE, {
    refetchQueries: [{ query: AIRPLANES_QUERY}]
  })

  const [removeAirplane] = useMutation(DELETE_AIRPLANE, {
    refetchQueries: [{ query: AIRPLANES_QUERY }]
  })

  const saveAdd = async data => {
    await addAirplane({ variables: { airplane: data }})
  }

  const saveEdit = async data => {
    await editAirplane({ variables: { airplane: data }})
  }

  const saveRemove = async ({ id }) => {
    await removeAirplane({ variables: { airplane: { id }}})
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
      <AddModal save={saveAdd} />
      <EditModal edit={edit} save={saveEdit} />
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Airplanes List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={airplanesData.airplanes}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: false
                }}
                delete={airplane => { setRemove(airplane); deleteModalInstance.show() }}
                edit={airplane => { setEdit(airplane); editModalInstance.show() }}
                headers={[{
                  label: "Reg. No.",
                  key: "reg_no"
                }, {
                  label: "Fleet",
                  key: "fleet"
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