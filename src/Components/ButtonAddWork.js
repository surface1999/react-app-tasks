import React, { Component } from 'react';

class ButtonAddWork extends Component {
  AddWork = ()=>{
    this.props.AddWork();
  }
  render() {
    return(
        <div className="row mb-3 ml-3">
            <button type="submit" 
            className="btn btn-info"
            onClick={this.AddWork}>
            <i className="fas fa-plus mr-1"></i>Add work</button>
        </div>
    )
  }
}

export default ButtonAddWork;
