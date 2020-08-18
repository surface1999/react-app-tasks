import React, { Component } from 'react';
class WorkAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    componentDidMount(){
        if(this.props.taskForm){
            let {id} = this.props.taskForm;
            if(id){
                let {name, status} = this.props.taskForm;
                this.setState({
                    id: id,
                    name: name,
                    status: status
                })
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.taskForm){
            let {id} = nextProps.taskForm;
            if(id !== ''){
                let {name, status} = nextProps.taskForm;
                this.setState({
                    id: id,
                    name: name,
                    status: status
                })
            }
        }
        else{
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }

    }
    Close = ()=>{
        this.props.Close();
    }

    onChange = (e)=>{
        let target = e.target;
        let name = target.name;
        let value = target.value;
        if(name === 'status'){
            
            value = value === '1'? true: false;
        }
        this.setState({
            [name]: value
        })
    }

    CreateNewTask = (e)=>{
        e.preventDefault();
        if(this.props.taskForm && this.props.taskForm.id){
            this.props.UpdateTask(this.state);
        }
        else
            this.props.CreateNewTask(this.state)
    }

    Discard = (e)=>{
        e.preventDefault();
        this.setState({
            id: '',
            name: '',
            status: false 
        })
    }
  render() {
    return(
        <div className="card">
            <div className="d-flex justify-content-between align-items-center card-header bg-yellow font-weight-bold">
                <h5>{this.props.taskForm? 'Update Work': 'Add Works'}</h5>
                <span className="close" onClick={this.Close}><i className="far fa-times-circle"></i></span>
            </div>
            <div className="card-body">
                <form>
                <div className="form-group">
                    <label >Name:</label>
                    <input type="text" 
                            className="form-control" 
                            name="name" 
                            onChange={this.onChange}
                            value={this.state.name}
                    />
                </div>
                <div className="form-group">
                    <label >Status:</label>
                    <select className="form-control" 
                            name="status" 
                            onChange={this.onChange}
                            value={(this.state.status) === false? 0: 1}
                    >
                    <option value={1}>Enable</option>
                    <option value={0}>Hidden</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center my-2">
                    <button type="submit" 
                            className="btn btn-warning text-light mr-3"
                            onClick={this.CreateNewTask}
                    >
                        <i className="fas fa-plus mr-1"></i>Save
                    </button>
                    <button type="submit" 
                            className="btn btn-danger"
                            onClick={this.Discard}
                    >
                        <i className="fas fa-times mr-1"></i>Discard
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
  }
}



export default WorkAdd;
