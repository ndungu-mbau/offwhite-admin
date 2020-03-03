import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { MANUALS_QUERY, CREATE_MANUAL, DELETE_MANUAL, UPDATE_MANUAL } from "./queries"

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
  let { loading, data: manualsData, error } = useQuery(MANUALS_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addManual] = useMutation(CREATE_MANUAL, {
    refetchQueries: [{ query: MANUALS_QUERY }]
  })

  const [editManual] = useMutation(UPDATE_MANUAL, {
    refetchQueries: [{ query: MANUALS_QUERY}]
  })

  const [removeManual] = useMutation(DELETE_MANUAL, {
    refetchQueries: [{ query: MANUALS_QUERY }]
  })

  const saveAdd = async data => {
    await addManual({ variables: { manual: data }})
  }

  const saveEdit = async data => {
    await editManual({ variables: { manual: data }})
  }

  const saveRemove = async ({ id }) => {
    await removeManual({ variables: { manual: { id }}})
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
                  <h3 className="text-lighter">Manuals List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={manualsData.manuals}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: false
                }}
                delete={manual => { setRemove(manual); deleteModalInstance.show() }}
                edit={manual => { setEdit(manual); editModalInstance.show() }}
                view={manual => history.push(`/manuals/${manual.id}`)}
                headers={[
                {
                  label: "Name",
                  key: "name"
                },
                {
                  label: "ATA Chapter",
                  key: "ata_chapter"
                },
                {
                  label: "ATA Subchapter",
                  key: "ata_subchapter"
                },
                {
                  label: "Link",
                  key: "link"
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