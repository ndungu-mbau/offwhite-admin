import React, { Component } from 'react'

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;

export default class Modal extends Component{
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

  render(){
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Manual Details</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input required type="text" className="form-control b-0 bg-lighter" placeholder="Name" value={this.props.manual.name} disabled />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input required type="text" className="form-control" placeholder="ATA Chapter" value={this.props.manual.ata_chapter} disabled />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input required type="text" className="form-control" placeholder="ATA Subchapter" value={this.props.manual.ata_subchapter} disabled />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.hide}>Close</button>
                <a href={this.props.manual.link} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-icon btn-primary" type="button">
                    <span className="btn-inner--icon"><i className="ni ni-archive-2"></i></span>
                    <span className="btn-inner--text">View Manual PDF</span>
                  </button>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}