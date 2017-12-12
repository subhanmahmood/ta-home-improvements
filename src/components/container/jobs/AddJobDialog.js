import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter
  } from 'material-ui/Table';

import superagent from 'superagent';
import { AutoComplete } from 'material-ui';

class JobPartItem extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="row">
				<div className="col s6">
					<p>{this.props.part.name}</p>
				</div>
				<div className="col s3">
					<TextField 
						hintText="Quantity"
						type="number"
						style={{width: '100%'}}
					/>
				</div>
				<div className="col s3">
					<RaisedButton
						style={{width: '100%'}}
						label="delete"
					/>
				</div>
			</div>
		)
	}
}

class AddJobDialog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			searchText: '',
			open: false,
			openCustomers: false,
			valueCustomers: 1,
			value: 1,
			customers: [],
			allParts: [],
			jobParts: []
		}
		this.handleAutocompleteRequest = this.handleAutocompleteRequest.bind(this);
		this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
	}
	componentDidMount(){
		superagent.get('/api/customer')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + error);
			}
			let newCustomers = [];
			const customers = res.body.response;
			customers.map((customer) => {
				const id = customer.idcustomer;
				const first_name = customer.first_name;
				const last_name = customer.last_name;
				newCustomers.push({id, first_name, last_name});
			});
			this.setState({customers: newCustomers});
		})

		superagent.get('/api/part')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const parts = res.body.response;
			this.setState({allParts: parts})
		})
	}
	handleOpen(){
		this.setState({open: true})
	}
	handleClose(){
		this.setState({open: false})
	}
	handleChange(event, index,  value){
	    this.setState({
	      value: value,
	    });
	}
	handleChangeCustomer(event, index, value){
		this.setState({valueCustomers: value});
	}
	handleAutocompleteChange(searchText){
		this.setState({searchText: searchText})
	}
	handleAutocompleteRequest(chosenRequest, index){
		const part = this.state.allParts[index];
		let updatedJobParts = Object.assign([], this.state.jobParts);
		updatedJobParts.push(part);
		this.setState({
			jobParts: updatedJobParts,
			searchText: ''
		});
	}
	render(){
		const actions = [
			<FlatButton 
				key={1}
				label="Submit"
				type="submit"
				primary={true} />,
			<FlatButton 
				key={2}
				label="Cancel"
				primary={true}
				onClick={this.handleClose.bind(this)} />
		]
		const styles = {
			input: {
				width: '100%'
			},
			addButton: {
				position: 'absolute',
				right: 24,
				bottom: 24
			},
			dialog: {
				width: '50%',
				maxWidth: 'none'
			}
		} 
		const MenuItemCustomers = this.state.customers.map((customer, i) => {
			i++
			return(<MenuItem key={i} value={i} primaryText={customer.first_name + " " + customer.last_name} />)
		});
		const partNames = this.state.allParts.map((part) => {
			return part.name;
		})
		return(
			<div>
				<FloatingActionButton style={styles.addButton} onClick={this.handleOpen.bind(this)}>
					<FontIcon className="material-icons">add</FontIcon>
				</FloatingActionButton>				
				<Dialog
		          title="Add Job"
		          modal={true}
		          open={this.state.open}
		          contentStyle={styles.dialog}
		          onRequestClose={this.handleClose.bind(this)}
		        >
					<div className="row">
						<div className="col s12 m6">
							<SelectField
								style={{width: '100%'}}
								floatingLabelText="Job type"
								value={this.state.value}
								onChange={this.handleChange.bind(this)}
							>
								<MenuItem value={1} primaryText="Conservatory" />
								<MenuItem value={2} primaryText="Doors/Windows" />
								<MenuItem value={3} primaryText="General" />
							</SelectField>
						</div>
						<div className="col s12 m6">
							<SelectField
								style={{width: '100%'}}
								floatingLabelText="Customer"
								value={this.state.valueCustomers}
								onChange={this.handleChangeCustomer.bind(this)}
							>
								{MenuItemCustomers}
							</SelectField>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<TextField 
								style={{width:'100%'}}
								textareaStyle={{width: '100%'}}
								hintText="Description"
								multiLine={true}
								rows={1}
								rowsMax={4} 
							/>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<Table>
								<TableHeader
									displaySelectAll={false}
									adjustForCheckbox={false}
								>
									<TableRow>
										<TableHeaderColumn>Name</TableHeaderColumn>
										<TableHeaderColumn>Quantity</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableRowColumn>svdsdf</TableRowColumn>
										<TableRowColumn>sdfsdf</TableRowColumn>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</div>
					<div className="row">				
							
						<div className="col s12">
							<AutoComplete
								dataSource={partNames}
								name="part_name"
								hintText="Part"
								fullWidth={true}
								onNewRequest={this.handleAutocompleteRequest}
								/>
						</div>
					</div>	
					<div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
						{actions}
					</div>
		        </Dialog>
			</div>
		)
	}
}

export default AddJobDialog;