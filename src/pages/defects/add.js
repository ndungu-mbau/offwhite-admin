import React, { Component } from 'react'

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;

export default class Modal extends Component{
  state = {
    pilot:"",
    airplane:"",
    description: ""
  }

  show() {
    $("#" + modalNumber).modal({
      show: true,
      backdrop: "static",
      keyboard: false
    });
  }
  hide() {
    $("#" + modalNumber).modal("hide");
  }

  save = async e => {
    e.preventDefault()
    await this.props.save(this.state)
    this.hide()
    this.setState({
      pilot:"",
      airplane:"",
      description: ""
    })
  }

  render(){
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`} onSubmit={this.save}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Report Defect</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <select
                        name="airplane"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.airplane}
                        onChange={(e) => this.setState({
                          airplane: e.target.value
                        })}
                      >
                        <option value="">Select Airplane</option>
                        {this.props.airplanes.map(airplane => (
                          <option key={airplane.id} value={airplane.id}>{airplane.reg_no}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <select
                        name="pilot"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.pilot}
                        onChange={(e) => this.setState({
                          pilot: e.target.value
                        })}
                      >
                        <option value="">Select Pilot</option>
                        {this.props.users.filter(user => user.type === "PILOT").map(pilot => (
                          <option key={pilot.id} value={pilot.id}>{pilot.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                        <textarea class="form-control form-control-alternative" onChange={e => this.setState({ description: e.target.value})} rows="3">{this.state.description}</textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.hide}>Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}