import React, { Component } from 'react';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchKey: ''
    }
  }

  onChange = (e)=>{
    let target = e.target;  
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    })
  }

  sortBy = (e)=>{
    e.preventDefault();
    this.props.sortBy('searchKey', this.state.searchKey);
  }
  render() {
    return(
        <div className="col-md-6">
          <form  onSubmit={this.sortBy}>
            <div className="input-group mb-3">
              <input type="text" className="form-control" onChange={this.onChange} placeholder="Input key to search..." name="searchKey"/>
              <button type="submit" className="bg-info text-light search-btn" id="basic-addon2"><i className="fas fa-search mr-1"></i>Search</button>
            </div>
          </form>
        </div>
    )
  }
}
export default Search;

