import React,{Component} from 'react';

import TaskListItem from './TaskListItem';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state={
            isFiltered:"All",
            isFilterName : "",
        }
    }
    onChange = () => {
       return (event) => {
           let target = event.target;
            let name= target.name;
           let value =target.value;
           this.setState({[name]: value });
       }  
    }
    render() {
        let {courses, isSearchItem,isSort} = this.props
        let {isFiltered, isFilterName}= this.state
        var courseSort;
        if(isSort==="A"){
             courseSort = courses.sort(function (firstItem, secondItem) {
                return firstItem.name.localeCompare(secondItem.name);
              });
        }
        else if(isSort==="B"){
            courseSort = courses.sort(function (firstItem, secondItem) {
               return secondItem.name.localeCompare(firstItem.name);
             });
       }
       else if(isSort==="C"){
        courseSort = courses.sort(function (firstItem, secondItem) {
            let first =firstItem.status === true ? "K" : "A"
            let second = secondItem.status === true ? "K" : "A"
           return second.localeCompare(first);
         });
        }
        else if(isSort==="D"){
            courseSort = courses.sort(function (firstItem, secondItem) {
                let first =firstItem.status === true ? "K" : "A"
                let second = secondItem.status === true ? "K" : "A"
               return first.localeCompare(second);
             });
            }
        let courseSearchItem = courseSort ? courseSort.filter(course =>{
            return course.name.trim().toLowerCase().includes(isSearchItem.trim().toLowerCase())>0
        }) : this.props.courses.filter(course =>{
            return course.name.trim().toLowerCase().includes(isSearchItem.trim().toLowerCase())>0
        })
        let courseFilter =courseSearchItem.filter(course=>{
                    if(isFiltered === "true") {
                        return course.status === true;
                    }    
                    else if(isFiltered === "false") {
                        return course.status === false;
                    }
                    else return course.status === true || course.status === false;
        })
        let courseFilterName = courseFilter.filter(course =>{
            return course.name.trim().toLowerCase().includes(isFilterName.trim().toLowerCase())>0
            })
       
        let ItemList = courseFilterName.map((course,index) => {
                    return <TaskListItem index={index} 
                            course={course} key={index}
                            onChangeStatus={this.props.onChangeStatus} 
                            onDeleteValue={this.props.onDeleteValue}
                            onUpdateValue={this.props.onUpdateValue}
                            />
                        })
      return (
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"></th>
                            <td>
                            <input className="form-control" name="isFilterName" onChange={this.onChange()}/>
                            </td>
                            <td>
                            <select className="form-select"
                                    name="isFiltered" 
                                    value={this.state.isFiltered} 
                                    onChange={this.onChange()}>
                                <option value="All">Tất Cả</option>
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            </td>
                            <td></td>
                        </tr>
                        {/* TaskList Item */}
                       {ItemList} 
                    </tbody>
            </table>
      )
    }
}
export default TaskList;
