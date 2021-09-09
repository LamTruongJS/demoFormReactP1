import React,{Component} from 'react';

import Search from './Search'
import Sort from './Sort'

class Control extends Component {
    render() {
      return (
            <div className="col-md-12 row mt-3">
                <Search onSearch={this.props.onSearch}/>
                <Sort onSort={this.props.onSort}/>
            </div>
      )
    }
}
export default Control;
