import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import {
	TableRow,
  	TableRowColumn,
} from 'material-ui/Table';

import superagent from 'superagent';

import {red500} from 'material-ui/styles/colors';


class PartsTableRow extends React.Component {
	constructor(props){
		super(props)
		this.handleDelete = this.handleDelete.bind(this)
	}
	handleDelete(event){
		event.preventDefault();
		const queryRoute = '/api/part/' + this.props.part.idpart;
		console.log(queryRoute)
		superagent.delete(queryRoute)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err);
			}
			if(res.body.status === 200){
				this.props.delete(this.props.part.idpart);
			}
		});
	}
	render(){
		console.log(this.props.part)
		return(
			<TableRow>
				<TableRowColumn>{this.props.part.idpart}</TableRowColumn>
				<TableRowColumn>{this.props.part.name}</TableRowColumn>
				<TableRowColumn>{this.props.part.description}</TableRowColumn>
				<TableRowColumn>{this.props.part.cost_per_unit.toFixed(2)}</TableRowColumn>
				<TableRowColumn><FlatButton label="delete" onClick={this.handleDelete} labelStyle={{color: red500}}/></TableRowColumn>
			</TableRow>
		)
	}
}

export default PartsTableRow;