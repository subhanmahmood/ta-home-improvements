import React from 'react';
import ReactDOM from 'react-dom';

import Job from './components/layout/jobs/job';
import MuiWrapper from './components/layout/MuiWrapper';

ReactDOM.render(<MuiWrapper content={<Job />} />, document.getElementById('root'))
