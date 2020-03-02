import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ROTABLES_QUERY, CREATE_ROTABLE, DELETE_ROTABLE, UPDATE_ROTABLE } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import AddModal from "./add"
import EditModal from "./edit"
import DeleteModal from "../../components/delete"
const addModalInstance = new AddModal()
const editModalInstance = new EditModal()
const deleteModalInstance = new DeleteModal()

const List = props => {
  let { loading, data: rotablesData, error } = useQuery(ROTABLES_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addRotable] = useMutation(CREATE_ROTABLE, {
    refetchQueries: [{ query: ROTABLES_QUERY }]
  })

  const [editRotable] = useMutation(UPDATE_ROTABLE, {
    refetchQueries: [{ query: ROTABLES_QUERY}]
  })

  const [removeRotable] = useMutation(DELETE_ROTABLE, {
    refetchQueries: [{ query: ROTABLES_QUERY }]
  })

  const saveAdd = async data => {
    await addRotable({ variables: { rotable: data }})
  }

  const saveEdit = async data => {
    await editRotable({ variables: { rotable: data }})
  }

  const saveRemove = async ({ id }) => {
    await removeRotable({ variables: { rotable: { id }}})
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
                  <h3 className="text-lighter">Rotables List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={rotablesData.rotables}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: false
                }}
                delete={rotable => { setRemove(rotable); deleteModalInstance.show() }}
                edit={rotable => { setEdit(rotable); editModalInstance.show() }}
                headers={[{
                  label: "Name",
                  key: "name"
                }, {
                  label: "Part Number",
                  key: "part_no"
                }, {
                  label: "Serial Number",
                  key: "serial_no"
                }, {
                  label: "Airplane",
                  view: (rotable) => <td>{rotable.airplane?.reg_no}</td>
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