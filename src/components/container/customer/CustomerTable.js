import React from 'react';
import superagent from 'superagent';

import FlatButton from 'material-ui/FlatButton';
import {
    Table, 
    TableBody,
    TableHeader, 
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter
} from 'material-ui/Table';

import Dialog from 'material-ui/Dialog'

import AddCustomerDialog from './addCustomerDialog';

class CustomersTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            customers: new Array([]),
            customer: {
                first_name: "",
                last_name: "",
                address_line_1: "",
                email: "",
                postcode: "",
                phone_number: ""
            },
            open: false
        }
        this.onCellClick = this.onCellClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
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
    addCustomer(customer){
        console.log(customer)
		let updatedCustomers = Object.assign([], this.state.customers);
		updatedCustomers.push(customer);
		this.setState({customers: updatedCustomers});
    }
    onCellClick(rowNumber, columnId){
        const customer = this.state.customers[rowNumber];
        console.log(customer)
        this.setState({customer: customer});
        this.handleOpen()
    }
    handleOpen(){
        this.setState({open:true})
    }
    handleClose(){
        this.setState({open:false})
    }
    render(){
        const TableRows = this.state.customers.map((customer, i) => {
            return(
                <TableRow key={i}>
                    <TableRowColumn>{customer.idcustomer}</TableRowColumn>
                    <TableRowColumn>{`${customer.first_name} ${customer.last_name}`}</TableRowColumn>
                    <TableRowColumn>{customer.address_line_1}</TableRowColumn>
                    <TableRowColumn>{customer.postcode}</TableRowColumn>
                    <TableRowColumn>{customer.phone_number}</TableRowColumn>
                    <TableRowColumn>{customer.email}</TableRowColumn>
                </TableRow>)
        });
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleClose}
            />,
          ];
        return(
            <div>    
                <Dialog
                    title="customer"            
                    modal={true}
                    actions={actions}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    {this.state.customer.first_name + " " + this.state.customer.last_name}
                    <br/>
                    {this.state.customer.address_line_1}
                    <br/>
                    {this.state.customer.postcode}
                    <br/>
                    {this.state.customer.phone_number}
                    <br/>
                    {this.state.customer.email}
                </Dialog>
                <Table onCellClick={this.onCellClick}>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Address</TableHeaderColumn>
                            <TableHeaderColumn>Postcode</TableHeaderColumn>
                            <TableHeaderColumn>Phone Number</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {TableRows}
                    </TableBody>
                </Table>
                <AddCustomerDialog updateList={this.addCustomer.bind(this)}/>
            </div>
        )
    }
}

export default CustomersTable;