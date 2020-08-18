import React, { Component } from 'react';

class Sort extends Component {
    sortBy = (e)=>{
        e.preventDefault();
        let name = e.target.name;
        switch(name){
            case "nameIn":{
                this.props.sortBy('name', 1);
                break;
            }
            case "nameDe":{
                this.props.sortBy('name', -1);
                break;
            }
            case "statusEn":{
                this.props.sortBy('status', 1);
                break;
            }
            default:{
                this.props.sortBy('status', -1);
            }
        }
    }
  render() {
    return(
        <div className="col-md-6">
            <div className="btn-group">
                <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Arrangement
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" name="nameIn" value={1} onClick={this.sortBy} href="#">A-Z<i className="fas fa-sort-alpha-up ml-5"></i></a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" name="nameDe" value={-1} onClick={this.sortBy} href="#">Z-A<i className="fas fa-sort-alpha-down-alt ml-5"></i></a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" name="statusEn" value={1} onClick={this.sortBy} href="#">Enable<i className="fas fa-toggle-on ml-4"></i></a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" name="statusHi" value={-1} onClick={this.sortBy} href="#">Hidden<i className="fas fa-toggle-off ml-4"></i></a>
                </div>
            </div>
        </div> 
    )
  }
}



export default Sort;
