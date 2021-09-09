import React,{Component} from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state= {
            contentSearch:"",
        }
    }
    changeContent = () =>{
        return (event) =>{
            this.setState({
                contentSearch: event.target.value,
            })
        }
    }
    onSearch =() =>{
        this.props.onSearch(this.state.contentSearch)
    }
    render() {
      return (
            <div className="col-md-9">
                <div className="input-group mb-3">
                    <input type="text" 
                            name="contentSearch" 
                            className="form-control"
                            onChange={this.changeContent()}
                            />
                    <button className="btn btn-secondary" onClick={()=>this.onSearch()}>Tìm kiếm</button>
                </div>
            </div>
      )
    }
}
export default Search;