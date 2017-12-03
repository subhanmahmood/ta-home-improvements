import React from 'react';
import ReactDOM from 'react-dom';

import Jobs from './components/layout/jobs/jobs';
import MuiWrapper from './components/layout/MuiWrapper';

ReactDOM.render(<MuiWrapper content={<Jobs />}/>, document.getElementById('root'))
