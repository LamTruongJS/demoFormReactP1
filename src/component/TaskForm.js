import React,{Component} from 'react';


class TaskForm extends Component {
    constructor(props) {
            super(props);
            this.state= {
                id:"",
               name:"",
               status: true,
            }
        }
    onChangeValue =() =>{
        return (event)=>{
                let target = event.target;
                let name = target.name;
                let value = target.value;
                this.setState({
                    [name] : value,
                })
            }
        } 
        onSendValue = () =>{
           return (event) =>{
                event.preventDefault();
                this.props.onReciveValue(this.state.name, this.state.status ==="true" ? true : false )
                this.setState({
                    name:"",
                    status: true
                }) 
           }
        }
        resetValue = () =>{
            this.setState({
                name:"",
                status: true
            })
        }
       componentDidMount(){
          if(this.props.isCourseEditing){
            this.setState({
                id: this.props.isCourseEditing.id,
                name: this.props.isCourseEditing.name,
                status: this.props.isCourseEditing.status
            })         
          }
       } 
       componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.isCourseEditing) {
         this.setState({
             id: nextProps.isCourseEditing.id,
             name: nextProps.isCourseEditing.name,
             status: nextProps.isCourseEditing.status
         })    
        }
    }
      
       onUpdateValueItem =() =>{
            return (event) =>{
                 event.preventDefault();
                 this.props.onUpdateValueItem(this.state.id,this.state.name,this.state.status ==="true" ? true : false )
            }
       }
    render() { 

      return (
            <div className="col-md-4">
                <form className="form-group border border-1 rounded-3 pb-2" onSubmit={this.props.isCourseEditing ? this.onUpdateValueItem(): this.onSendValue()}>
                    <label className="w-100 bg-info p-2">{this.props.isCourseEditing ? "Cập nhật Công Việc" : "Thêm Công Việc"}
                    <button className="btn btn-info  float-end btn-close" onClick={this.props.DisplayForm}></button></label>
                    <div className="p-3 pt-2">
                        <label className="form-label">Tên:</label>
                        <input type="text" 
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeValue()}
                                />
                        <label className="form-label">Trạng thái:</label>
                        <select className="form-select" 
                                name="status"
                                onChange={this.onChangeValue()}
                                value={this.state.status}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                    </div>     
                    <div className="text-center w-100">
                            <button type="submit" className="btn btn-warning m-1">Lưu lại</button>
                            <button type="button" className="btn btn-danger m-1" onClick={()=>this.resetValue()}>Hủy bỏ</button>
                    </div>
                </form>
            </div>
      )
    }
}
export default TaskForm;
