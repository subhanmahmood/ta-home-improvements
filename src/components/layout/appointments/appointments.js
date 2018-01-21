import React from 'react';
import superagent from 'superagent';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField/SelectField';
import { Card, CardTitle } from 'material-ui/Card';

import AppointmentList from '../../container/appointments/AppointmentList'

class Appointments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            appointments: new Array(),
            customers: [],
            
        }
        
    }
    render(){          
        return(
            <div>
                <AppointmentList/>
            </div>
        )   
    }
}

export default Appointments;