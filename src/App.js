import React,{Component} from 'react';

import classNames from 'classnames';
import TaskForm from './component/TaskForm';
import Control from './component/Control';
import TaskList from './component/TaskList';
import _ from 'lodash';

class App extends Component {
    constructor(props) {
      super(props);
      this.state={
        courses:[], //id, name, status
        isDisplayForm: false,
        isCourseEditing: null,
        isSearchItem:"",
        isSort:"",
      }
    }
    gender =()=>{
      var courses = [
          {
            id:this.getIDRandom(),
            name:"HTML Căn Bản",
            status: true
          }, 
          {
            id:this.getIDRandom(),
            name:"CSS Căn Bản",
            status: false
          },
          {
            id:this.getIDRandom(),
            name:"JavaScript Căn Bản",
            status: false
          },
          {
            id:this.getIDRandom(),
            name:"JavaScript Nâng Cao",
            status: true
          },
          {
            id:this.getIDRandom(),
            name:"ReactJS Căn Bản",
            status: false
          }
      ];
      this.setState({
         courses:courses,
      })
      localStorage.setItem('courses',JSON.stringify(courses)); // luu vao localStorage
    }
    //hàm này được gọi khi load lại giao diện
    componentDidMount(){
      // this.gender() //hàm này chỉ được phép gọi 1 lần để load giao diện lần đầu, nếu gọi nhiều sẽ bị sai
      if(localStorage && localStorage.getItem('courses')){
        this.setState({
          courses : JSON.parse(localStorage.getItem('courses'))
        })
      }
    }
    getIDRandom(){
      return Math.floor(Math.random() * 0x10000)
    }
    SetDisplayForm = () =>{
        this.setState({
          isDisplayForm: !this.state.isDisplayForm,
          isCourseEditing: null,
        })
    }
    onReciveValue = (name, status) =>{
      if(name.trim()!==" "){
        var {courses} = this.state
        let data ={
          id : this.getIDRandom(),
          name: name, 
          status: status,
        }
        courses.push(data);
        this.setState({
          courses: courses,
        })
        localStorage.setItem('courses',JSON.stringify(courses));
        this.setState({
          courses: JSON.parse(localStorage.getItem('courses')),
          isDisplayForm: false,
        })
      }   
    }
  
    onChangeStatus =(data) => {
      let {courses} = this.state
      let index = _.indexOf(courses, data);  // dùng thư viện lodash
      courses[index].status =!courses[index].status
      console.log(courses)
      this.setState({
        courses:[
          ...this.state.courses.slice(0, index),
          data,
          ...this.state.courses.slice(index+1)
        ]
      })
      localStorage.setItem('courses',JSON.stringify(courses)); // dùng courses ở trên, ko được dùng courses ở dưới vì chưa xong
      this.setState({
        courses: JSON.parse(localStorage.getItem('courses')),
      })
  }
  onDeleteValue = (data) => {
     let {courses} = this.state
     let index = courses.indexOf(data)
     if(index===0){
        courses.shift()
        this.setState({
          courses: courses
        })
        localStorage.setItem('courses',JSON.stringify(courses)); // dùng courses ở trên, ko được dùng courses ở dưới vì chưa xong
        this.setState({
          courses: JSON.parse(localStorage.getItem('courses')),
        })
     }
     else{
        courses.splice(index,1) // từ vị trí index, cắt 1, ko tính index, index bắt đầu từ 0, như splice chỉ tính index=1
        this.setState({
          courses: courses
        })
        localStorage.setItem('courses',JSON.stringify(courses)); // dùng courses ở trên, ko được dùng courses ở dưới vì chưa xong
        this.setState({
          courses: JSON.parse(localStorage.getItem('courses')),
        })
     }
  }
  onUpdateValue = (data) =>{
    this.setState({
      isDisplayForm: true,
      isCourseEditing: {
        id: data.id,
        name: data.name,
        status: data.status,
      }
    })
  }
  onUpdateValueItem =(id, name, status)=>{
     let {courses} = this.state
     let course = courses.filter(item=>{
         return item.id === id
      }) 
     let index = courses.indexOf(...course)
      courses[index] = {
        id: id,
        name: name,
        status: status,
      }
      this.setState({
        courses: [
          ...courses.slice(0, index),
         {id: id, name: name, status: status},
          ...courses.slice(index+1) 
        ],
        isDisplayForm: false,
        isCourseEditing: null,
      })
      localStorage.setItem('courses',JSON.stringify(courses));
      this.setState({
        courses: JSON.parse(localStorage.getItem('courses')),
      })
   }
   onSearch =(data) =>{
     this.setState({
       isSearchItem : data,
       
     })
   }
   onSort =(data) =>{
      this.setState({
        isSort: data,
      })
   }
  // ClearALL =()=>{
  //   localStorage.removeItem('courses')
  // }
    render() {
      const {courses,isDisplayForm,isSearchItem, isSort} = this.state 
      return (
          <nav>
              <h2 className="text-center container-fluid">Quản Lý Công Việc</h2>
              <nav className="row container-fluid p-5">
              {/* TaskList */}
                {isDisplayForm === true ? <TaskForm 
                                                onUpdateValueItem ={this.onUpdateValueItem}
                                                isCourseEditing={this.state.isCourseEditing}
                                                DisplayForm={()=> this.SetDisplayForm()} 
                                                onReciveValue={this.onReciveValue}/> :" "}
                {/* Right */}
                <div className={classNames(isDisplayForm === true ? "col-md-7": "col-md-12")}>
                    {/* Buton thêm */}
                    <div className="col-md-12">
                      <button className="btn btn-primary" onClick={()=>this.SetDisplayForm()}>Thêm Công Việc</button>
                    </div>
                    {/* Control*/}
                    <Control 
                          onSearch={this.onSearch}
                          onSort={this.onSort}
                          />
                    {/* TaskList */}
                    <TaskList courses={courses}
                              isSearchItem={isSearchItem}
                              onUpdateValue={this.onUpdateValue}
                              onChangeStatus={this.onChangeStatus}
                              onDeleteValue={this.onDeleteValue}
                              isSort={isSort}
                              />
                </div>
              </nav>
                {/* <button type="button" className="btn btn-danger" onClick={()=>this.ClearALL()}>Clear ALL</button> */}
          </nav>
      )
    }
}
export default App;
