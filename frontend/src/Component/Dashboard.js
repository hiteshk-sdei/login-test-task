import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../Redux/Action/action';

class Dashboard extends React.Component{
    render(){
        return(
            <>
            <h1>Welcome to Dashboard</h1>
            <button onClick={()=>this.props.dispatch(logout())}>logout</button>
            </>
        )
    }
}


function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({ logout });
    return { ...actions, dispatch };
  }

export default connect(mapDispatchToProps) (Dashboard);