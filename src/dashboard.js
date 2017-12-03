import React from 'react';
import ReactDOM from 'react-dom';

import Dashboard from './components/layout/dashboard/dashboard';
import MuiWrapper from './components/layout/MuiWrapper';

ReactDOM.render(<MuiWrapper content={<Dashboard />} />, document.getElementById('root'))