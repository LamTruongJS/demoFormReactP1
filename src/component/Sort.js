/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from 'react';

class Sort extends Component {
    constructor(props) {
      super(props);
      this.category =["A","B","C","D"]
    }
    onSort = (data)=>{
      this.props.onSort(data)
    }
    render() {
      return (
            <div className="col-md-3">
              <div className="btn-group">
                 <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Sắp xếp
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={()=>this.onSort(this.category[0])}>Sắp xếp A&rarr;Z</a></li>
                    <li><a className="dropdown-item" href="#" onClick={()=>this.onSort(this.category[1])}>Sắp xếp Z&rarr;A</a></li>         
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#" onClick={()=>this.onSort(this.category[2])}>Sắp xếp kích hoạt</a></li>
                    <li><a className="dropdown-item" href="#" onClick={()=>this.onSort(this.category[3])}>Sắp xếp ẩn</a></li>
                  </ul>
              </div>
            </div>
      )
    }
}
export default Sort;
