import React from 'react';
import superagent from 'superagent';

import AddAppointment from './AddAppointment';
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import {cyan500, grey500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import radio from 'material-ui/svg-icons/av/radio';
import appointmentHelpers from './helpers';

class AppointmentCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            customer: new Array(),
            color: ''
        }
        this.deleteAppointment = this.deleteAppointment.bind(this);
    }
    componentDidMount(){
        superagent.get(`/api/customer/${this.props.appointment.idcustomer}`)
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err)
            }
            const customer = res.body.response[0];

            this.setState({customer: customer});
        })      
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
        const customer = this.state.customer
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
                            borderTopRightRadius: 5}}>{apt.time}</span> - {this.state.customer.first_name + " " + this.state.customer.last_name}</p>
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
        this.sortAllAppointments = this.sortAllAppointments.bind(this);
        this.sortCurrentAppointments = this.sortCurrentAppointments.bind(this);
        this.sortPastAppointments = this.sortPastAppointments.bind(this);
        this.sortFutureAppointments = this.sortFutureAppointments.bind(this);
        this.updateAppointments = this.updateAppointments.bind(this);
        this.addAppointment = this.addAppointment.bind(this);
        this.deleteAppointment = this.deleteAppointment.bind(this);
    }
    componentDidMount(){
        superagent.get('/api/appointment')
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err)
            }
            const appointments = res.body.response;
            this.setState({appointments: appointments}, this.sortAllAppointments);
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
            console.log({sd, date});
            console.log(apt.date < date)
            return apt.date < date;
        });
        const futureAppointments = this.state.appointments.filter((apt) => {
            return apt.date > date;
        })
        this.setState({currentAppointments: currentAppointments}, this.sortCurrentAppointments);
        this.setState({futureAppointments: futureAppointments}, this.sortFutureAppointments);
        this.setState({pastAppointments: pastAppointments}, this.sortPastAppointments);
    }
    sortAllAppointments(){
        let updatedAppointments = Object.assign([], this.state.appointments);
        for(let j = 0; j < this.state.appointments.length; j++){
            for(let i = 0; i < updatedAppointments.length; i++){
                if(i !== updatedAppointments.length - 1){
                    const current = updatedAppointments[i];
                    const next = updatedAppointments[i + 1];
                    if((current.date + current.time) < (next.date + next.time)){
                        updatedAppointments[i] = next;
                        updatedAppointments[i + 1] = current;
                    }
                }
            }
        }
        this.setState({appointments: updatedAppointments})
    }
    sortFutureAppointments(){
        let updatedAppointments = Object.assign([], this.state.futureAppointments);
        for(let j = 0; j < this.state.appointments.length; j++){
            for(let i = 0; i < updatedAppointments.length; i++){
                if(i !== updatedAppointments.length - 1){
                    const current = updatedAppointments[i];
                    const next = updatedAppointments[i + 1];
                    if((current.date + current.time) > (next.date + next.time)){
                        updatedAppointments[i] = next;
                        updatedAppointments[i + 1] = current;
                    }
                }
            }
        }
        this.setState({futureAppointments: updatedAppointments})
    }
    sortCurrentAppointments(){
        let updatedAppointments = Object.assign([], this.state.currentAppointments);
        for(let j = 0; j < this.state.appointments.length; j++){
            for(let i = 0; i < updatedAppointments.length; i++){
                if(i !== updatedAppointments.length - 1){
                    const current = updatedAppointments[i];
                    const next = updatedAppointments[i + 1];
                    if((current.date + current.time) > (next.date + next.time)){
                        updatedAppointments[i] = next;
                        updatedAppointments[i + 1] = current;
                    }
                }
            }
        }
        this.setState({currentAppointments: updatedAppointments})
    }
    sortPastAppointments(){
        let updatedAppointments = Object.assign([], this.state.pastAppointments);
        for(let j = 0; j < this.state.appointments.length; j++){
            for(let i = 0; i < updatedAppointments.length; i++){
                if(i !== updatedAppointments.length - 1){
                    const current = updatedAppointments[i];
                    const next = updatedAppointments[i + 1];
                    if((current.date + current.time) > (next.date + next.time)){
                        updatedAppointments[i] = next;
                        updatedAppointments[i + 1] = current;
                    }
                }
            }
        }
        this.setState({pastAppointments: updatedAppointments})
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
                                {CurrentAppointments}
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <h1 style={{fontWeight: 300}} onClick={this.sortAppointments}>Appointments Coming up</h1>
                            <div className="row">
                                {FutureAppointments}
                            </div>
                            <div className="row">
                                <h1 style={{fontWeight: 300}}>Past Appointments</h1>
                                {PastAppointments}
                            </div>
                        </div>
                    </div>
                </div>
                <AddAppointment addAppointment={this.addAppointment}/>
            </div>
        )
    }
}

export {AppointmentCard};
export default AppointmentList;