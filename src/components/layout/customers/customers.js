import React from 'react';
import superagent from 'superagent';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import CustomersList from '../../container/customer/customersList';

class Customers extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="container" style={{marginTop: 20}}>
				<div className="row">
					<div className="col s12">
						<CustomersList />
						<br/>
					</div>
				</div>
			</div>
		)
	}
}

export default Customers;