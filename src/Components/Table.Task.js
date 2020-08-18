import React, { Component } from 'react';

class Task extends Component {
  onEdit = (e)=>{
    e.preventDefault();
    let id = this.props.id;
    this.props.onEdit(id);
  }

  onDelete = (e)=>{
    e.preventDefault();
    this.props.onDelete(this.props.id);
  }
  changeStatus = ()=>{
    this.props.changeStatus(this.props.id);
  }
  render() {
    return(
        <tr>
            <th scope="row">{this.props.order}</th>
            <td>{this.props.name}</td>
            <td className="text-center">
            <span className={this.props.status?"bg-danger status":"bg-success status"} onClick={this.changeStatus}>
              {this.props.status?"Enable":"Hidden"}
            </span>
            </td>
            <td className="text-center">
            <button type="submit" className="btn btn-warning mr-1" onClick={this.onEdit}><i className="far fa-edit mr-1"></i>Edit</button>&nbsp;
            <button type="submit" className="btn btn-danger" onClick={this.onDelete}><i className="fas fa-trash-alt mr-1"></i>Delete</button>
            </td>
        </tr>
    )
  }
}



export default Task;
