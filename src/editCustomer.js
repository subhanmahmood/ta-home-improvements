import React from 'react';
import ReactDOM from 'react-dom';

import EditCustomer from './components/layout/customers/editCustomer';
import MuiWrapper from './components/layout/MuiWrapper';

ReactDOM.render(<MuiWrapper content={<EditCustomer />} />, document.getElementById('root'))