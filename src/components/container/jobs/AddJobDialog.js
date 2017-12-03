import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import superagent from 'superagent';

class AddJobDialog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open: false,
			openCustomers: false,
			valueCustomers: 1,
			value: 1,
			customers: []
		}
	}
	componentDidMount(){
		superagent.get('/api/customer')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + error);
			}
			let newCustomers = [];
			const customers = res.body.response;
			console.log(customers)
			customers.map((customer) => {
				const id = customer.idcustomer;
				const first_name = customer.first_name;
				const last_name = customer.last_name;
				console.log(customer)
				newCustomers.push({id, first_name, last_name});
			});
			this.setState({customers: newCustomers});
		})
	}
	handleOpen(){
		this.setState({open: true})
	}
	handleClose(){
		this.setState({open: false})
	}
	handleChange(event, index,  value){
		console.log(event);
	    this.setState({
	      value: value,
	    });
	  }
	  handleChangeCustomer(event, index, value){
	  	this.setState({valueCustomers: value});
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
			addButton: {
				position: 'absolute',
				right: 24,
				bottom: 24
			}
		}
		const customStyle = {
			width: '50%',
			maxWidth: 'none'
		}
		const MenuItemCustomers = this.state.customers.map((customer, i) => {
			i++;
			return(<MenuItem key={i} value={i} primaryText={customer.first_name + " " + customer.last_name} />)
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
		          contentStyle={customStyle}
		          onRequestClose={this.handleClose.bind(this)}
		        >
					<form action="/api/customer" method="POST">
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
						<div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
							{actions}
						</div>
					</form>
		        </Dialog>
			</div>
		)
	}
}

export default AddJobDialog;