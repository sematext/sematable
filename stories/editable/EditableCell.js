/* eslint-disable */
/* to do lint this file */
import React, {Component} from 'react';
import { connect } from 'react-redux';

require ('./EditableCell.css');

class EditibleCell extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.sematable = this.props.sematable;
    this.row = this.props.row;
    this.state = {value: (this.row.confirmed) ? "You're on the list" : "Who are you?!" }; 
  }

  handleChange(event){
    event.preventDefault(); 
    this.setState( {
      value: event.target.value
    });

    // possibly dispatch cell state change
  }

  render(){

    const {value} = this.state; 
    const statusClass = (this.row.confirmed) ? "confirmed" : "denied";
    const classNames = "editableCellContainer " + statusClass;

    return(
      <div className={classNames}>
        <input className="editableCell" type="text" value={value} onChange={this.handleChange} />
      </div>
    )
  }

}

function mapStateToProps(state) {  
  return {
    sematable: state.sematable
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch:dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditibleCell);