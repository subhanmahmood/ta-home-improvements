import React from 'react';
import superagent from 'superagent';

import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, defs, linearGradient, stop, Legend, Label} from 'recharts';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import {red500, green500} from 'material-ui/styles/colors'

import FinanceObject from './financeObj';
import helpers from '../../../helpers/helpers'

class Chart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: new Array()
		}
		this.prepareData = this.prepareData.bind(this);
		this.calculateTotal = this.calculateTotal.bind(this);
	}
	calculateTotal(array, prop, n){
		n |= 0;
		if(n === array.length){
			return 0;
		} else {
			return array[n][prop] + this.calculateTotal(array, prop, n + 1);
		}
	}
	componentDidMount(){   
		this.setState({financeJobs: this.props.financeJobs}, this.prepareData);
	}
	componentWillReceiveProps(nextProps){
		this.setState({financeJobs: nextProps.financeJobs}, this.prepareData);
	}
	prepareData(){
		const months = ['january', 'februaury', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

		if(this.state.financeJobs !== undefined){
			const keys = Object.keys(this.state.financeJobs)
			let data = new Array();
			
			const length = helpers.size(this.state.financeJobs)
			for(let i = 0; i < length; i++){
				const month = keys[i];
				const index = parseInt(month, 10) - 1
				const m = months[index]
				const pushData = { 
					month: [m], 
					expenses: this.calculateTotal(this.state.financeJobs[month], 'expenses'), 
					quote_price: this.calculateTotal(this.state.financeJobs[month], 'quote_price')
				}
				data.push(pushData)
			}
			this.setState({data: data});
		}
	}
	render(){
		const data = this.state.data;
		return(     
			<div>
				<div style={{textAlign: 'center'}}>
				{this.props.year}
				</div>
				<AreaChart width={this.props.width} height={300} data={data}
					margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					<defs>
						<linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorQuotePrice" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
						</linearGradient>
					</defs>
					<XAxis dataKey="month"/>
					<Label value="Month" offset={0} position="insideBottom" />
					<YAxis label={{ value: 'Pounds (£)', angle: -90, position: 'insideLeft' }}/>
					<CartesianGrid strokeDasharray="3 3"/>
					<Tooltip/> 
					<Legend/>        
					<Area type="monotone" dataKey="expenses" stroke="#8884d8" fillOpacity={1} fill="url(#colorExpenses)" />
					<Area type="monotone" dataKey="quote_price" stroke="#82ca9d" fillOpacity={1} fill="url(#colorQuotePrice)" />
				</AreaChart>
			</div>     
		)
	}
}

/*
OBJECTIVE
8.0 - Display details of the business’ finances
8.1 - Display a table of jobs and their cost/revenue.
8.2 - Display graphs detailing profit/loss and revenue month by month
*/

class FinanceTableRow extends React.Component{
	render(){
		const paid = this.props.job.paid === 0 ? 'No' : 'Yes'
		const color = this.props.job.paid === 0 ? red500 : green500
		const expenses = this.props.job.expenses
		return(
			<TableRow>
				<TableRowColumn>{this.props.job.idjob}</TableRowColumn>
				<TableRowColumn>{this.props.job.date_added}</TableRowColumn>
				<TableRowColumn>{expenses}</TableRowColumn>
				<TableRowColumn>{this.props.job.quote_price.toFixed(2)}</TableRowColumn>
				<TableRowColumn style={{color: color}}>{paid}</TableRowColumn>
			</TableRow>
		)
	}
}

class FinanceTable extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			jobs: new Array(),
			financeJobs: new Array(),
			financeReady: false,
			expenses: new Array(),
			chartWidth: 0
		}
		this.onCellClick = this.onCellClick.bind(this);
		this.updateChartSize = this.updateChartSize.bind(this);
	}
	componentDidMount(){        
		this.updateChartSize()
		window.addEventListener('resize', this.updateChartSize)
		superagent.get('/api/job')
		.end((err, res) => {
			if(err){
				alert('ERROR: ' + err)
			}  
			const jobs = res.body.response;
			const financeObj = new FinanceObject(jobs);
			const financeJobs = financeObj.getFinanceJobs();
			this.setState({jobs: jobs, financeJobs: financeJobs});
		})
	}
	updateChartSize(){
		const chartWidth = document.getElementsByClassName('container')[0].clientWidth
		this.setState({chartWidth: chartWidth});
	}
	onCellClick(rowNumber, columnId){
		const job = this.state.jobs[rowNumber]
		window.location = `/jobs/${job.idjob}`
	}
	render(){
		const Rows = this.state.jobs.map((job, i) => {
			const paid = job.paid === 0 ? 'No' : 'Yes'
			const color = job.paid === 0 ? red500 : green500
			const expenses = job.expenses
			return(
				<TableRow key={i}>
					<TableRowColumn>{job.idjob}</TableRowColumn>
					<TableRowColumn>{job.date_added}</TableRowColumn>
					<TableRowColumn>£{expenses.toFixed(2)}</TableRowColumn>
					<TableRowColumn>£{job.quote_price.toFixed(2)}</TableRowColumn>
					<TableRowColumn style={{color: color}}>{paid}</TableRowColumn>
				</TableRow>
			)
		})

		const years = Object.keys(this.state.financeJobs)
		return(
			<div id="table">
				<Table
					onCellClick={this.onCellClick}>
					<TableHeader
					displaySelectAll={false}
					adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn>ID</TableHeaderColumn>                            
							<TableHeaderColumn>Date Added</TableHeaderColumn>
							<TableHeaderColumn>Expenses</TableHeaderColumn>
							<TableHeaderColumn>Quote Price</TableHeaderColumn>
							<TableHeaderColumn>Paid</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody
						showRowHover={true}
						displayRowCheckbox={false}>
						{Rows}
					</TableBody>
				</Table>
				<div className="row">
					{years.map((year, i) => {
						return(
							<div className={"col s12 m" + ((years.length) > 1 ? "6" : "12")}  key={i}>
								<Chart financeJobs={this.state.financeJobs[year]} year={year} width={years.length > 1 ? this.state.chartWidth / 2 : this.state.chartWidth}/>                        
							</div>
						)
					})}
				</div>
			</div>
		)	
	}
}

export default FinanceTable