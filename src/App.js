import React, { Component } from 'react';
import Calculator from './components/Calculator';
import mathOps from './math-operations';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Calculator</h1>
				</header>
				<div className="main">
					<Calculator mathOps={mathOps} />
				</div>
			</div>
		);
	}
}

export default App;
