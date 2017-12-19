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
		console.log(this.props.jobPart.idpart)
		superagent.get(`/api/part/${this.props.jobPart.idpart}`)
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err);
			}
			console.log(res.body.error)
			const part = res.body.response[0];
			this.setState({part: part});
		})
	}
	render(){		
		const part = this.state.part;
		const totalPrice = part.cost_per_unit * this.props.jobPart.quantity;
		return(
			<TableRow>
				<TableRowColumn>{part.idpart}</TableRowColumn>
				<TableRowColumn>{part.name}</TableRowColumn>
				<TableRowColumn>{this.props.jobPart.quantity}</TableRowColumn>
				<TableRowColumn>{`£${(totalPrice).toFixed(2)}`}</TableRowColumn>
				<TableRowColumn><RaisedButton label="delete" onClick={() => this.props.delete(this.props.jobPart)}/></TableRowColumn>
			</TableRow>
		)
	}
}

class JobPartTable extends React.Component {
	constructor(props){
		super(props);		
	}
	render(){
		console.log(this.props.jobParts)
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