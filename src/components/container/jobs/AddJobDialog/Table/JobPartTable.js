import React from 'react';
import superagent from 'superagent';

import FlatButton from 'material-ui/FlatButton';
import { red500 } from 'material-ui/styles/colors';
import {Table, TableBody, TableHeader, TableHeaderColumn,	TableRow,	TableRowColumn,	TableFooter} from 'material-ui/Table';  

class TableItem extends React.Component {
	constructor(props){
		super(props);
	}
	render(){		
		
	}
}

class JobPartTable extends React.Component {
	constructor(props){
		super(props);		
	}
	render(){
		const TableRows = this.props.jobParts.map((jobPart, i) => {				
			const totalPrice = jobPart.cost_per_unit * jobPart.quantity;
			return(
				<TableRow key={i}>
					<TableRowColumn>{jobPart.idpart}</TableRowColumn>
					<TableRowColumn>{jobPart.name}</TableRowColumn>
					<TableRowColumn>{jobPart.quantity}</TableRowColumn>
					<TableRowColumn>{`£${(totalPrice).toFixed(2)}`}</TableRowColumn>
					<TableRowColumn><FlatButton label="delete" labelStyle={{color: red500}} onClick={() => this.props.delete(jobPart)}/></TableRowColumn>
				</TableRow>
			)
		})
		return(
			<Table>
				<TableHeader
					displaySelectAll={false}
					adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn>ID</TableHeaderColumn>		
						<TableHeaderColumn>Name</TableHeaderColumn>
						<TableHeaderColumn>Quantity</TableHeaderColumn>
						<TableHeaderColumn>Total Price</TableHeaderColumn>
						<TableHeaderColumn>Delete</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody 
					displayRowCheckbox={false}>
					{TableRows}
				</TableBody>
			</Table>
		)
	}
}

export default JobPartTable;