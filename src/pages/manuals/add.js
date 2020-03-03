import React, { Component } from 'react'

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;

export default class Modal extends Component{
  state = {
    name:"",
    ata_chapter:"",
    ata_subchapter:"",
    link: ""
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
      name:"",
      ata_chapter:"",
      ata_subchapter:"",
      link: ""
    })
  }

  render(){
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`} onSubmit={this.save}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Create Manual</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input required type="text" className="form-control form-control-alternative" placeholder="Name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input required type="text" className="form-control form-control-alternative" placeholder="ATA Chapter" value={this.state.ata_chapter} onChange={e => this.setState({ ata_chapter: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input required type="text" className="form-control form-control-alternative" placeholder="ATA Subchapter" value={this.state.ata_subchapter} onChange={e => this.setState({ ata_subchapter: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input required type="text" className="form-control form-control-alternative" placeholder="Link" value={this.state.link} onChange={e => this.setState({ link: e.target.value })} />
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