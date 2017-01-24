/* eslint-disable */
/* to do lint this file */
import React, {Component} from 'react';
import { connect } from 'react-redux';

class EditibleCell extends Component {

  constructor(props){
    super(props);
    console.log("Landing - constructor props: ", props);
    this.handleChange = this.handleChange.bind(this);

    this.sematable = this.props.sematable;
    this.row = this.props.row;
    this.state = {value: (this.row.confirmed) ? "You're on the list" : "Who are you?!" }; 
    console.log("EditibleCell props: ", props);
    console.log("EditibleCell state: ", this.state);
  }

  handleChange(event){
    event.preventDefault(); 
    console.log("EditibleUsersTable handleChange event.target: ", event.target.value);
    this.setState( {
      value: event.target.value
    });

    // possibly dispatch cell state change
  }

  render(){

    const {value} = this.state; 

    return(
      <input type="text" value={value} onChange={this.handleChange} />
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