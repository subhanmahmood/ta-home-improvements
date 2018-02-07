import React from 'react';
import superagent from 'superagent';

import {Card, CardTitle, CardText, CardHeader} from 'material-ui/Card';
import {cyan500, grey500, grey300} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import radio from 'material-ui/svg-icons/av/radio';

import AddAppointment from './AddAppointment';
import appointmentHelpers from '../../../helpers/helpers';

class AppointmentCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            color: ''
        }
        this.deleteAppointment = this.deleteAppointment.bind(this);
    }
    deleteAppointment(){
        superagent.delete(`/api/appointment/${this.props.appointment.idappointment}`)
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err)
            }
            if(res.body.status === 200){
                this.props.deleteAppointment(this.props.appointment);
            }
        })
    }
    render(){
        const date = appointmentHelpers.date();
        let color = ''
        if(this.props.appointment.date < date){
            color = grey500
        }else {
            color = cyan500;
        }

        const apt = this.props.appointment;
        const customer = this.props.appointment
        const title = <p style={{margin: 0}}>
                        <span style={{
                            backgroundColor: color,
                            color: '#fff',
                            paddingLeft: 8,
                            paddingRight: 8,
                            paddingTop: 2,
                            paddingBottom: 2, 
                            display: 'inline-block', 
                            fontWeight: 600, 
                            borderBottomLeftRadius: 5, 
                            borderBottomRightRadius: 5, 
                            borderTopLeftRadius: 5, 
                            borderTopRightRadius: 5}}>{apt.time}</span> - {customer.first_name + " " + customer.last_name}</p>
        return(
            <div className="col s12" style={{marginBottom: 20, paddingBottom: -8}}>
                <Card containerStyle={{ paddingBottom: 0 }}>
                    <CardHeader 
                        title={title}
                        subtitle={apt.date}
                        actAsExpander={true}
                        showExpandableButton={true}/>
                    <CardText expandable={true} style={{paddingTop:0}}>
                        {customer.address_line_1}
                        <br/>
                        {customer.address_line_2 + <br/> | ''}
                        {customer.address_line_3 + <br/> | ''}
                        {customer.postcode}
                        <RaisedButton style={{width: '100%', marginTop: 5}} primary={true} label="Go to maps" href={`https://maps.google.com/?q=${customer.address_line_1}, ${customer.postcode}`} target="_blank"/>
                        <RaisedButton style={{width: '100%', marginTop: 5}} primary={false} label="delete" onClick={this.deleteAppointment}/>

                    </CardText>
                </Card>
            </div>
        )
    }
}

/*
OBJECTIVE
9 - Display a list of scheduled appointment, 
sorting them by date. When the user clicks on 
an appointment, they will be taken to a page 
displaying the appointment date and the customer 
and job details.
*/

class NoAppointments extends React.Component {
    render(){
        return(
            <div style={{textAlign: 'center'}}>
                <h3 style={{color: grey300, fontWeight: 200}}>No appointments&nbsp;{this.props.section}</h3>
            </div>
        )
    }
}

class AppointmentList extends React.Component{
    constructor(props){
        super(props)
        this.state = {            
            open: false,
            value: 1,
            appointments: new Array(),
            currentAppointments: new Array(),
            pastAppointments: new Array(),
            futureAppointments: new Array()
        }
        this.sortAppointments = this.sortAppointments.bind(this);
        this.updateAppointments = this.updateAppointments.bind(this);
        this.addAppointment = this.addAppointment.bind(this);
        this.getAppointments = this.getAppointments.bind(this);
        this.deleteAppointment = this.deleteAppointment.bind(this);
    }
    componentDidMount(){// [ 1, 2, 2, 3, 3, 3, 5, 6, 7, 8 ]
        this.getAppointments()
    }
    getAppointments(){
        superagent.get('/api/appointment?customer=true')
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err)
            }
            const appointments = res.body.response;
            this.setState({appointments: appointments});
            this.sortAppointments('appointments', this.state.appointments, 'date')
            this.updateAppointments();
        })
    }
    updateAppointments(){
        const date = appointmentHelpers.date();
        const currentAppointments = this.state.appointments.filter((apt) => {
            return apt.date === date
        });
        const pastAppointments = this.state.appointments.filter((apt) => {
            const sd = apt.date;
            return apt.date < date;
        });
        const futureAppointments = this.state.appointments.filter((apt) => {
            return apt.date > date;
        })
        this.setState({currentAppointments: currentAppointments}/*, this.sortAppointments('currentAppointments', this.state.currentAppointments, 'date', 'time')*/);
        this.setState({futureAppointments: futureAppointments}/*, this.sortAppointments('futureAppointments', this.state.futureAppointments, 'date', 'time')*/);
        this.setState({pastAppointments: pastAppointments}/*, this.sortAppointments('pastAppointments', this.state.pastAppointments, 'date', 'time')*/);
    }
    sortAppointments(name, arr, attr1, attr2){
        console.log(arr)
        const newArr = appointmentHelpers.mergeSort(arr, attr1, attr2);
        let updatedState = Object.assign({}, this.state)
        updatedState[name] = newArr;
        console.log(updatedState)
        this.setState({updatedState});
    }
    sortAppointments(name, arr, attr1){
        console.log(arr)
        const newArr = appointmentHelpers.mergeSort(arr, attr1);
        let updatedState = Object.assign({}, this.state)
        updatedState[name] = newArr;
        console.log(updatedState)
        this.setState({updatedState});
    }
    addAppointment(apt){
        let updatedAppointments = Object.assign([], this.state.appointments);
        updatedAppointments.push(apt);
        this.setState({appointments: updatedAppointments}, this.updateAppointments);
    }
    deleteAppointment(apt){
        let updateAppointments = this.state.appointments.filter((appt) => {
            return (apt.idappointment !== appt.idappointment)
        });
        this.setState({appointments: updateAppointments}, this.updateAppointments)
        
    }
    render(){
        
        const CurrentAppointments = this.state.currentAppointments.map((apt, i) => {
            return(
                <AppointmentCard appointment={apt} key={i} deleteAppointment={this.deleteAppointment} />
            )
        })
        const PastAppointments = this.state.pastAppointments.map((apt, i) => {
            return(
                <AppointmentCard appointment={apt} key={i} deleteAppointment={this.deleteAppointment} />
            )
        })
        const FutureAppointments = this.state.futureAppointments .map((apt, i) => {
            return(
                <AppointmentCard appointment={apt} key={i} deleteAppointment={this.deleteAppointment} />
            )
        });
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6">
                            <h1 style={{fontWeight: 300}} onClick={this.sortAppointments}>Appointments Today</h1>
                            <div className="row">
                                {this.state.currentAppointments.length === 0 ? <NoAppointments section="today"/> : CurrentAppointments}
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <h1 style={{fontWeight: 300}} onClick={this.sortAppointments}>Appointments Coming up</h1>
                            <div className="row">
                                {this.state.futureAppointments.length === 0 ? <NoAppointments section="coming up"/> : FutureAppointments}
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <h1 style={{fontWeight: 300}}>Past Appointments</h1>
                                    {this.state.pastAppointments.length === 0 ? <NoAppointments section="yet"/> : PastAppointments}
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
                <AddAppointment addAppointment={this.addAppointment} success={this.getAppointments}/>
            </div>
        )
    }
}

export {AppointmentCard};
export default AppointmentList;