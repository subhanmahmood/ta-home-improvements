import React from 'react';
import superagent from 'superagent';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Select from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField/SelectField';

class Appointments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            value: 1,
            customers: [],
            appointment: {
                year: 0,
                date: 0
            }
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
    }
    componentDidMount(){
        superagent.get('/api/customer')
        .end((err, res) => {
            if(err){
                alert(err)
            }
            const customers = res.body.response;
            this.setState({customers: customers})
        })
    }
    handleCustomerChange(event, index, value){
        const idcustomer = this.state.customers[index].idcustomer;
        let updatedAppointment = Object.assign({}, this.state.appointment);
        updatedAppointment.idcustomer = idcustomer;
        this.setState({appointment: updatedAppointment});
    }
    handleOpen(){
        this.setState({open: true});
    }
    handleClose(){
        this.setState({open: false});
    }
    handleChange(a, date){
        console.log(date.getDate())
    }
    render(){
        const actions = [
			<FlatButton 
				key={1}
				label="Submit"
				type="submit"
				onClick={this.handleClose}
				primary={true} />,
			<FlatButton 
				key={2}
				label="Cancel"
				primary={true}
                onClick={this.handleClose} />
            ]
        const MenuItems = this.state.customers.map((customer, i) => {
            i++;
            return(<MenuItem key={i} value={i} primaryText={`${customer.first_name} ${customer.last_name}`}/>)
        })
        return(
            <div>
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
                                onChange={this.handleChange}/>
                        </div>
                        <div className="col s12">
                            <TimePicker   
                                style={{width: '100%'}}
                                textFieldStyle={{width: '100%'}}
                                hintText="Select Time"/>
                        </div>
                    </div>
                </Dialog>
                <div className="container">
                    <FlatButton label="Open" onClick={this.handleOpen} />
                </div>
            </div>
        )
    }
}

export default Appointments;