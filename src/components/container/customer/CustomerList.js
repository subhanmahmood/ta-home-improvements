import React from 'react';
import superagent from 'superagent';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton/FlatButton';

import AddCustomerDialog from '../customer/addCustomerDialog';

class CustomerCard extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const customer = this.props.customer
        console.log(this.props.customer)
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
            customers: []
        }
        this.addCustomer = this.addCustomer.bind(this)
    }
    componentDidMount(){
        superagent.get('/api/customer')
        .end((err, res) => {
            if(err){
                alert('ERROR: ' + err);
            }
            const customers = res.body.response;
            this.setState({customers: customers})
        })
    }
    addCustomer(customer){
        const nextId = this.state.customers[this.state.customers.length - 1].idcustomer + 1;
        customer.idcustomer = nextId
		let updatedCustomers = Object.assign([], this.state.customers);
		updatedCustomers.push(customer);
		this.setState({customers: updatedCustomers});
    }
    render(){
        console.log(this.state.customers)
        const CustomerCards = this.state.customers.map((customer, i) => {
            return (<CustomerCard customer={customer} key={i}/>)
        })
        return(
            <div className="show-on-small hide-on-med-and-up">
                {CustomerCards}
                <AddCustomerDialog updateList={this.addCustomer}/>
            </div>
        )
    }
}

export default CustomerList