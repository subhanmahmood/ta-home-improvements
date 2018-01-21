import React from 'react';
import ReactDOM from 'react-dom';

import Invoice from './components/layout/jobs/invoice';
import MuiWrapper from './components/layout/MuiWrapper';

ReactDOM.render(<MuiWrapper content={<Invoice />} />, document.getElementById('root'))
