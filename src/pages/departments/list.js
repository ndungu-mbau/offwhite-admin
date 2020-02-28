import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DATA_QUERY, DEPARTMENTS_QUERY, CREATE_DEPARTMENT, DELETE_DEPARTMENT, UPDATE_DEPARTMENT, CREATE_HOD } from "./queries"

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
  let { loading, data: departmentsData, error } = useQuery(DEPARTMENTS_QUERY)
  const { loading: dataloading, data: dataQuery } = useQuery(DATA_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addDepartment] = useMutation(CREATE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS_QUERY }]
  })

  const [addHod] = useMutation(CREATE_HOD, {
    refetchQueries: [{ query: DATA_QUERY}]
  })

  const [editDepartment] = useMutation(UPDATE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS_QUERY}]
  })

  const [removeDepartment] = useMutation(DELETE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS_QUERY }]
  })

  const saveAdd = async data => {
    await addDepartment({ variables: { department: data }})
  }

  const saveEdit = async data => {
    await editDepartment({ variables: { department: data }})
  }

  const saveRemove = async ({ id }) => {
    await removeDepartment({ variables: { department: { id }}})
  }

  const saveAddHod = async data => {
    console.log(data)
    const res = await addHod({ variables: { user: data }})
    return res
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
      {!dataloading && <AddModal users={dataQuery.users} save={saveAdd} saveAddHod={saveAddHod} />}
      {!dataloading && <EditModal edit={edit} users={dataQuery.users} save={saveEdit} />}
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Departments List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={departmentsData.departments}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: true
                }}
                delete={department => { setRemove(department); deleteModalInstance.show() }}
                edit={department => { setEdit(department); editModalInstance.show() }}
                view={department => history.push(`/departments/${department.id}`)}
                headers={[
                {
                  label: "Name",
                  key: "name"
                },
                {
                  label: "Description",
                  key: "description"
                },
                {
                  label: "Head of Department Name",
                  key: "hod.name"
                },
                {
                  label: "No.of Users",
                  key: "users.length"
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