import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<div>
		<CoolComponent adj="awesome"/>
		<CoolComponent />
	</div>
	, document.getElementById('root')
);
registerServiceWorker();

function CoolComponent({adj = 'Cool'})
{
	return <p>Youpi So {adj}!</p>;
}
