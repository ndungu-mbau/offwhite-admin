import React from "react"

import Table from "../../components/datatable"
import data from "../../utils/data.json"

const List = props => {
  return (
    <div className="container pb-8 pt-5 pt-md-8">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Technical Records List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5">Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={data.tech_records}
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
                  label: "No. Of Components",
                  key: "components.length"
                },
                {
                  label: "Package Status",
                  key: "package_status"
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