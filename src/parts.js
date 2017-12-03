import React from 'react';
import ReactDOM from 'react-dom';

import Parts from './components/layout/parts/parts';
import MuiWrapper from './components/layout/MuiWrapper';

ReactDOM.render(<MuiWrapper content={<Parts />}/>, document.getElementById('root'))
