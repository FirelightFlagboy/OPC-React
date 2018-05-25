import React, { Component } from 'react';
import Keyboard from './Keyboard.js'
import './App.css';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVXYZW";
class App extends Component {

	generateAlphabet() {
		return (ALPHABET.split(''));
	}

	state = {
		alphabet: this.generateAlphabet(),
	}

	render() {
		const { alphabet } = this.state;

		return (
			<div className="pendue">
				<div class="keyboard">
					{
						alphabet.map((letter) => (
							<Keyboard
								name={letter}
								onClick={null}
							/>
						))
					}
				</div>
			</div>
		);
	}
}

export default App;
