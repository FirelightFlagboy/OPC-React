import React, { Component } from 'react';
import Keyboard from './Keyboard.js'
import './App.css';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVXYZW";
class App extends Component {

	generateAlphabet() {
		return (ALPHABET.split(''));
	}

	handlerClick(letter) {
		console.log(letter);
	}

	getMask()
	{
		const mask = [];
		const key = this.key;
		for (let i = 0; i < key.length; i++) {
			mask.push("_");
		}
	}

	state = {
		alphabet: this.generateAlphabet(),
		key: "BONJOUR".split(''),
		mask: this.getMask(),
	}

	render() {
		const { alphabet } = this.state;

		return (
			<div className="pendue">
				<div className="keyboard">
					{
						alphabet.map((letter) => (
							<Keyboard
								key={letter}
								name={letter}
								onClick={this.handlerClick}
							/>
						))
					}
				</div>
			</div>
		);
	}
}

export default App;
