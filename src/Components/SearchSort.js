import React, { Component } from 'react';
import Search from './Search.SearchSort';
import Sort from './Sort.SearchSort'

class SearchSort extends Component {
  sortBy = (name, value)=>{
    this.props.sortBy(name, value);
  }
  render() {
    return(
        <div className="row ml-1">
            <Search sortBy={this.sortBy}/>
            <Sort sortBy={this.sortBy}/>
        </div>
    )
  }
}



export default SearchSort;
