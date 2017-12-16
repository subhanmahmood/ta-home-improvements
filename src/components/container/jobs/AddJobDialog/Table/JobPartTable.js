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
  
import RaisedButton from 'material-ui/RaisedButton';

class TableItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			part: new Array({})
		}
	}
	componentDidMount(){
		superagent.get(`/api/part/${this.props.jobPart.idpart}`)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err);
			}
			const part = res.body.response;
			this.setState({part: part});
		})
	}
	render(){
		
		const part = this.state.part[0];
		const totalPrice = part.cost_per_unit * this.props.jobPart.quantity;
		return(
			<TableRow>
				<TableRowColumn>{part.name}</TableRowColumn>
				<TableRowColumn>{this.props.jobPart.quantity}</TableRowColumn>
				<TableRowColumn>{`£${totalPrice}`}</TableRowColumn>
				<TableRowColumn><RaisedButton label="delete" /></TableRowColumn>
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
			return(<TableItem jobPart={jobPart} key={i} />)
		})
		return(
			<Table>
				<TableHeader
					displaySelectAll={false}
					adjustForCheckbox={false}>
					<TableRow>
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