import React, { Component } from 'react';
import './App.css';
import WorkAdd from './Components/WorkAdd'
import ButtonAddWork from './Components/ButtonAddWork';
import SearchSort from './Components/SearchSort'
import Table from './Components/Table';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskForm: null,
      key:'',
      filterBy: -1,
      searchKey: '',
      sortBy: -1
    }
  }
  componentWillMount(){
    if( localStorage && localStorage.getItem('tasks')){
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }


  Close = ()=>{
    this.setState({
      isDisplayForm: false,
      taskForm: null,
    })
  }

  DisplayForm = ()=>{
    this.setState({
      isDisplayForm: true,
      taskForm: null
    })
  }

  CreateNewTask = (task)=>{
    var random = require("randomstring");
    task.id = random.generate(10);
    let tasks = this.state.tasks;
    tasks.push(task);
    this.setState({
      tasks: tasks,
      taskFrom: null,
      isDisplayForm: false
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  sortBy = (name, value)=>{
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if(name === 'key'){
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        })
        this.setState({
          [name]: value
        })
    }
    else{
      tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(this.state.key.toLowerCase()) !== -1;
      })
    }

    if(name === 'filterBy'){
      tasks = tasks.filter((task)=>{
        if(value === -1)
          return true;
        else  
          return task.status === (value === 1? true: false);
      })  
      this.setState({
        [name]: value
      })
    }
    else{
      tasks = tasks.filter((task)=>{
        if(this.state.filterBy === -1)
          return true;
        else  
          return task.status === (this.state.filterBy === 1? true: false);
      })
    }

    if(name === 'searchKey'){
      value = value.toLowerCase();
      tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(value) !== -1;
      })
      this.setState({
        [name]: value
      })
    }
    else{
      tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(this.state.searchKey) !== -1;
      })
    }

    if(name === 'name'){
      tasks = tasks.sort( (a, b) => {
        if( a.name > b.name) return value;
        if( a.name < b.name ) return -value;
        else return 0;
      })
    }
    else{
      if(name === 'status'){
        tasks = tasks.sort( (a, b) => {
          if( a.status > b.status) return -value;
          if( a.status < b.status ) return value;
          else return 0;
        })
      }
    }
    this.setState({
      tasks: tasks
    })
  }
  onSubmit = (key)=>{
      key = key.toLowerCase();
      this.setState({
        searchKey: key
      })
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      let SearchResults = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
      })
      this.setState({
        tasks: SearchResults
      })
  }

  onEdit = (id)=>{
    let {tasks} = this.state;
    let item = tasks.find(task=>{
      return task.id === id;
    })
    let taskForm = {
      id: id,
      name: item.name,
      status: item.status
    }
    this.setState({
      isDisplayForm: true,
      taskForm: taskForm
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onDelete = (id)=>{
    let {tasks} = this.state;
    let item = tasks.find(task=>{
      return task.id === id;
    })

    let index = tasks.indexOf(item);
    tasks.splice(index, 1);
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  UpdateTask = (value)=>{
    let {tasks} = this.state;
    let item = tasks.find(task=>{
      return task.id === this.state.taskForm.id;
    });
    let index = tasks.indexOf(item);
    item.name = value.name;
    item.status  = value.status;
    tasks[index] = item;
    this.setState({
      tasks: tasks,
      taskFrom: null,
      isDisplayForm: false
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  changeStatus = (id)=>{
    let {tasks} = this.state;
    let item = tasks.find(task=>{
      return task.id === id;
    });
    let index = tasks.indexOf(item);
    item.status  = !item.status
    tasks[index] = item;
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  render() {
    return(
      <div>
        <div className="container-fluid">
          <div className="p-3 d-flex justify-content-center title">
            <h1>Work Management</h1>
          </div>
          <div className="row m-5">
            <div className={this.state.isDisplayForm? "col-md-4 col-sm-12": ""}>
              {this.state.isDisplayForm? <WorkAdd 
                                          Close = {this.Close} 
                                          CreateNewTask={this.CreateNewTask} 
                                          taskForm={this.state.taskForm}
                                          UpdateTask={this.UpdateTask}
                                          />
              : ""}
            </div>
            <div className={this.state.isDisplayForm? "col-md-8 col-sm-12": "col-md-12 col-sm-12"}>
              <ButtonAddWork AddWork={this.DisplayForm}/>
              <SearchSort sortBy={this.sortBy}/>
              <Table state={this.state} sortBy={this.sortBy} changeStatus={this.changeStatus} onEdit={this.onEdit} onDelete={this.onDelete}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default App;
