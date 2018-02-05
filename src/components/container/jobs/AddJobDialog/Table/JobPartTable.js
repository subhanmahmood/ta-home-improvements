import React from 'react';
import superagent from 'superagent';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter
  } from 'material-ui/Table';  
import FlatButton from 'material-ui/FlatButton';
import { red500 } from 'material-ui/styles/colors';

class TableItem extends React.Component {
	constructor(props){
		super(props);
	}
	render(){		
		const totalPrice = this.props.jobPart.cost_per_unit * this.props.jobPart.quantity;
		return(
			<TableRow>
				<TableRowColumn>{this.props.jobPart.idpart}</TableRowColumn>
				<TableRowColumn>{this.props.jobPart.name}</TableRowColumn>
				<TableRowColumn>{this.props.jobPart.quantity}</TableRowColumn>
				<TableRowColumn>{`£${(totalPrice).toFixed(2)}`}</TableRowColumn>
				<TableRowColumn><FlatButton label="delete" labelStyle={{color: red500}} onClick={() => this.props.delete(this.props.jobPart)}/></TableRowColumn>
			</TableRow>
		)
	}
}

class JobPartTable extends React.Component {
	constructor(props){
		super(props);		
	}
	render(){
		const TableRows = this.props.jobParts.map((jobPart, i) => {				
			return(<TableItem jobPart={jobPart} key={i} delete={this.props.delete} />)
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