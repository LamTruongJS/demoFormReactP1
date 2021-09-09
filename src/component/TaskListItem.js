import React,{Component} from 'react';

import classNames from 'classnames';

class TaskListItem extends Component {
    onUpdateValue = (data) =>{
        this.props.onUpdateValue(data);       
    }
    onChangeStatus = (data) =>{
        this.props.onChangeStatus(data)
    }
    onDeleteValue = (data) =>{
        this.props.onDeleteValue(data)
    }
    render() {
        const {index,course} = this.props;
      return (
         
            <tr>
                <th scope="row">{index +1}</th>
                    <td>{course.name}</td>
                    <td className="text-center">
                        <span 
                        onClick={()=>this.onChangeStatus(course)}
                        className={classNames(course.status === true ? 'badge bg-warning' :'badge bg-success')}>
                        {course.status === true ? 'Kích Hoạt' : 'Ẩn'}
                        </span>
                    </td>
                    <td>
                        <button className="btn btn-warning" onClick={()=>this.onUpdateValue(course)}>Sửa</button>
                         &nbsp;
                        <button className="btn btn-danger ml-2" onClick={()=>this.onDeleteValue(course)}>Xóa</button>
                    </td>
            </tr>
      )
    }
}
export default TaskListItem;
