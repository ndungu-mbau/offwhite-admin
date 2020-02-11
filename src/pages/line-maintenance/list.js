import React from "react"

import Table from "../../components/datatable"
import data from "../../utils/data.json"

const List = props => {
  const lmList = data.line_planning.filter(plan => {
    const ids = data.line_maintenance.map(({ lp_id }) => lp_id)
    console.log(ids)
    return ids.includes(plan.id)
  })
  return (
    <div className="container pb-8 pt-5 pt-md-8">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="card-title text-lighter">Line Maintenance Report List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5">Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={lmList}
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
                  label: "No. Of Defects",
                  key: "defect_id.length"
                },
                {
                  label: "Registration Number",
                  key: "reg_no"
                }, {
                  label: "ATA Chapter",
                  key: "ata_chapter"
                }, {
                  label: "ATA Subchapter",
                  key: "ata_subchapter"
                },
                {
                  label: "Manual",
                  key: "maintenance_manual"
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