import React from 'react';

import PartsTable from '../../container/parts/PartsTable'

class Parts extends React.Component {
	render(){
		return(
			<div className="container" style={{marginTop: 20}}>
				<div className="row">
					<div className="col s12">
						<PartsTable />	
						<br/>
					</div>
				</div>
			</div>
		)
	}
}

export default Parts;