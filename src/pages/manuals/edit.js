import React, { Component } from 'react'

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;

export default class Modal extends Component{
  state = {
    edit:{
      id: "",
      name:"",
      ata_chapter:"",
      ata_subchapter:"",
      link: ""
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.edit)
      if (props.edit.id !== state.edit.id) {
        return {
          edit: props.edit
        }
      }
    return null
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
    const { edit: { id, name, ata_chapter, ata_subchapter, link }} = this.state
    await this.props.save({ id, name, ata_chapter, ata_subchapter, link })
    this.hide()
    this.setState({
      edit:{
        id:"",
        name:"",
        ata_chapter:"",
        ata_subchapter:"",
        link: ""
      },
    })
  }

  render(){
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`} onSubmit={this.save}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Edit Manual</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input required type="text" className="form-control form-control-alternative" placeholder="Name" value={this.state.edit.name} onChange={e => this.setState(Object.assign(this.state.edit, { name: e.target.value }))} />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input required type="text" className="form-control form-control-alternative" placeholder="ATA Chapter" value={this.state.edit.ata_chapter} onChange={e => this.setState(Object.assign(this.state.edit, { ata_chapter: e.target.value }))} />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input required type="text" className="form-control form-control-alternative" placeholder="ATA Subchapter" value={this.state.edit.ata_subchapter} onChange={e => this.setState(Object.assign(this.state.edit, { ata_subchapter: e.target.value }))} />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input required type="text" className="form-control form-control-alternative" placeholder="Link" value={this.state.edit.link} onChange={e => this.setState(Object.assign(this.state.edit, { link: e.target.value }))} />
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