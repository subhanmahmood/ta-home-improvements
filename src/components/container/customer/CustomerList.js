import React from 'react';
import superagent from 'superagent';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import AddCustomerDialog from '../customer/addCustomerDialog';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

import TextField from 'material-ui/TextField/TextField';
class CustomerCard extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const customer = this.props.customer
        return(
            <Card style={{marginBottom: 10}}>
                <CardHeader
                    title={`${customer.first_name} ${customer.last_name}`}
                    actAsExpander={true}
                    showExpandableButton={true}/>
                    
                <CardText expandable={true}>
                    {customer.address_line_1}
                    <br/>
                    {customer.address_line_2 + <br/> | ''}
                    {customer.address_line_3 + <br/> | ''}
                    {customer.postcode}
                    {customer.phone_number}
                    {customer.email}
                </CardText>
                <CardActions>
                    <FlatButton label="Edit Customer" href={`/customers/${customer.idcustomer}/edit`}/>
                </CardActions>
            </Card>
        )
    }
}


class CustomerList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            customers: [],
            listCustomers: []
        }
        this.addCustomer = this.addCustomer.bind(this);
        this.findCustomer = this.findCustomer.bind(this);
    }
    componentDidMount(){
        superagent.get('/api/customer')
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err);
            }
            const customers = res.body.response;
            this.setState({customers: customers, listCustomers: customers})
        })
    }
    addCustomer(customer){
        const nextId = this.state.customers[this.state.customers.length - 1].idcustomer + 1;
        customer.idcustomer = nextId
		let updatedCustomers = Object.assign([], this.state.customers);
		updatedCustomers.push(customer);
		this.setState({customers: updatedCustomers});
    }
    findCustomer(event){
        const value = event.target.value;
        const newCustomers = this.state.customers.filter((customer, i) => {
            return (customer.first_name + " " + customer.last_name).toLowerCase().indexOf(value) !== -1; 
        });
        this.setState({listCustomers: newCustomers })
    }
    render(){
        const CustomerCards = this.state.listCustomers.map((customer, i) => {
            return (<CustomerCard customer={customer} key={i}/>)
        })
        return(
            <div className="show-on-small hide-on-med-and-up">
            
                <Toolbar>
                    <ToolbarGroup firstChild={true} style={{width: '100%'}}>
                        <TextField 
                            style={{marginLeft: 15, width: '100%'}} 
                            inputStyle={{width:'100%'}}
                            hintText="Search..."
                            onChange={this.findCustomer}/>
                    </ToolbarGroup>
                </Toolbar>
                {CustomerCards}
                <AddCustomerDialog updateList={this.addCustomer}/>
            </div>
        )
    }
}

export default CustomerList