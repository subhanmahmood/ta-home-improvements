import React from 'react';
import superagent from 'superagent';

import ContentAdd from 'material-ui/svg-icons/content/add';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField/SelectField';
import Snackbar from 'material-ui/Snackbar';
import TimePicker from 'material-ui/TimePicker';

import appointmentHelpers from '../../../helpers/helpers.js'

/*
OBJECTIVE
10.0 - Allow the user to schedule a new 
appointment. The user will need to select 
a customer or add a new one and select a 
date and time. This will then be added to 
the MySQL database
*/

class AddAppointment extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			value: 1,
			open: false,
			snackbarOpen: false,
			snackbarMessage: '',
			customers: new Array(),
			appointments: new Array(),
			appointment: {
				date: '',
				time: '',
				idcustomer: ''
			}
		}
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);
		this.openSnackbar = this.openSnackbar.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handleCustomerChange = this.handleCustomerChange.bind(this);
	}
	componentDidMount(){
		superagent.get('/api/customer')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}
			const customers = res.body.response;
			this.setState({customers: customers})
		})
	}
	handleCustomerChange(event, index, value){
		const idcustomer = this.state.customers[index].idcustomer;
		console.log(idcustomer)
		let updatedAppointment = Object.assign({}, this.state.appointment);
		updatedAppointment.idcustomer = idcustomer;
		this.setState({appointment: updatedAppointment, value: value});
	}
	handleClose(){
		this.setState({open: false});
	}
	openSnackbar(){
		this.setState({snackbarOpen: true});
	}
	closeSnackbar(){
		this.setState({snackbarOpen: false});
	}
	handleOpen(){
		superagent.get('/api/appointment')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}else{
				const appointments = res.body.response
				this.setState({appointments: appointments});
			}
		})
		this.setState({open: true})
	}
	handleClose(){
		this.setState({open: false})
	}
	handleDateChange(a, date){
		let d = date.getDate();
		let m = date.getMonth();
		if(d < 10){
			d = ('0' + d).slice(-2)
		}
		if(m + 1 < 10){
			m = ('0' + (m + 1)).slice(-2);
		}
		const newDate = `${date.getFullYear()}-${m}-${d}`
		let updatedAppointment = Object.assign({}, this.state.appointment);
		updatedAppointment.date = newDate;
		this.setState({appointment: updatedAppointment});
	}
	handleTimeChange(a, time){
		let h = time.getHours();
		let m = time.getMinutes();
		if(h < 10){
			h = ('0' + h).slice(-2)
		}
		if(m + 1 < 10){
			m = ('0' + (m)).slice(-2);
		}
		const newTime = `${h}:${m}`
		let updatedAppointment = Object.assign({}, this.state.appointment);
		updatedAppointment.time = newTime;
		this.setState({appointment: updatedAppointment});
	}
	handleSubmit(){
		let date = appointmentHelpers.date()
		let clashExists = false;
		const appointment = this.state.appointment;
		const appointments = this.state.appointments;
		console.log(appointments)
		for(let i = 0; i < appointments.length; i++){
			console.log(appointments[i].time === appointment.time)
			console.log(appointments[i].date >= appointment.date)
			if(appointment.time === appointments[i].time && appointments[i].date >= appointment.date){
				clashExists = true
			}
		}
		if(!clashExists){
			console.log("No Clash0")
			superagent.post('/api/appointment')
			.set('Content-Type', 'application/json')
			.send(this.state.appointment)
			.end((err, res) => {
				if(err){
					alert('ERROR: ' + err)
				}
				if(res.body.status === 200){
					this.props.addAppointment(this.state.appointment);
					this.props.success()
					this.setState({snackbarMessage: 'Added appointment successfully'}, this.openSnackbar);
					this.handleClose();
				} else {
					this.setState({snackbarMessage: 'There seems to have been an error'}, this.openSnackbar);
				}
			})
		}else{
			this.setState({snackbarMessage: 'There was a clash!'}, this.openSnackbar);
		}
	}
	render(){
		const MenuItems = this.state.customers.map((customer, i) => {
			i++;
			return(<MenuItem key={i} value={i} primaryText={`${customer.first_name} ${customer.last_name}`}/>)
		})
		const actions = [
			<FlatButton 
				key={1}
				label="Submit"
				type="submit"
				onClick={this.handleSubmit}
				primary={true} />,
			<FlatButton 
				key={2}
				label="Cancel"
				primary={true}
				onClick={this.handleClose} />
		]
		return(
			<div>
				<Snackbar
					open={this.state.snackbarOpen}
					message={this.state.snackbarMessage}
					autoHideDuration={4000}
					onRequestClose={this.closeSnackbar}/>
				<Dialog
					actions={actions}
					title="Add Appointment"
					modal={true}
					open={this.state.open}
					contentStyle={{width: '40%'}}
					onRequestClose={this.handleClose}>
					<div className="row">
						<div className="col s12">                            
							<SelectField
								floatingLabelText="Customer"
								style={{width: '100%'}}
								value={this.state.value}
								name="Customer"
								onChange={this.handleCustomerChange}>
								{MenuItems}
							</SelectField>
						</div>
						<div className="col s12">                            
							<DatePicker
								style={{width: '100%'}}
								textFieldStyle={{width: '100%'}}
								autoOk={true}
								hintText="Select Date"
								onChange={this.handleDateChange}/>
						</div>
						<div className="col s12">
							<TimePicker   
								style={{width: '100%'}}
								textFieldStyle={{width: '100%'}}
								hintText="Select Time"
								onChange={this.handleTimeChange}/>
						</div>
					</div>
				</Dialog>
				<FloatingActionButton
					onClick={this.handleOpen}
					style={{position: 'fixed', bottom: 24, right: 24}}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		)
	}
}

export default AddAppointment