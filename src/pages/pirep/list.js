import React from "react"

import Table from "../../components/datatable"

const data = [{
  id: 1,
  reg_no: "ABC1230",
  defects: [1,2,3]
}, {
  id: 2,
  reg_no: "ABC4560",
  defects: [2,3,4]
}]

const List = props => {
  return (
    <div className="container pb-8 pt-5 pt-md-8">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Pilot Report List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5">Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={data}
                options={{
                  deleteable: false,
                  editable: false,
                  viewable: false
                }}
                headers={[
                {
                  label: "ID",
                  key: "id"
                },
                {
                  label: "Registration Number",
                  key: "reg_no"
                },
                {
                  label: "No.of Defects",
                  key: "defects.length"
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