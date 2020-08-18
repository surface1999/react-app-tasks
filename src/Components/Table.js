import React, { Component } from 'react';
import Task from './Table.Task'

class Table extends Component {
    onChange = (e)=>{
        let target = e.target;
        let name = target.name;
        let value = name === 'filterBy'? parseInt(target.value): target.value;
        this.props.sortBy(name, value);
    }

    onEdit = (id)=>{
        this.props.onEdit(id);
    }

    onDelete = (id)=>{
        this.props.onDelete(id);
    }

    changeStatus = (id)=>{
        this.props.changeStatus(id);
      }
  render() {
    const {state} = this.props;
    let htmlTasks = state.tasks.map((task, index)=>{
        return <Task order={index+1} key={index} name={task.name} id={task.id} status={task.status} changeStatus={this.changeStatus} onDelete={this.onDelete} onEdit={this.onEdit}/>
    })

    return(
        <div className="row mt-3 ml-3">
        <table className="table table-bordered">
            <thead>
            <tr>
                <th scope="col">Order</th>
                <th scope="col">Name</th>
                <th scope="col">Status of Activity</th>
                <th scope="col" className="activity">Activity</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row"></th>
                <td>
                <input type="text" className="form-control" onChange={this.onChange}  name="key"/>
                </td>
                <td>
                <select className="form-control" name="filterBy" onChange={this.onChange}>
                    <option value={-1}>All</option>
                    <option value={1}>Enable</option>
                    <option value={0}>Hidden</option>
                </select>
                </td>
                <td></td>
            </tr>
            {htmlTasks}
            </tbody>
        </table>
        </div>
    )
  }
}



export default Table;
