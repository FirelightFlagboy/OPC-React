import React, { Component } from 'react';
import Keyboard from './Keyboard.js'
import './App.css';
import data from './liste_francais.json';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVXYZW";
class App extends Component {

	constructor() {
		super();

		this.getKey = this.getKey.bind(this);
		this.getMask = this.getMask.bind(this);

		this.state = {
			alphabet: this.generateAlphabet(),
			key: this.getKey(),
			guesse: 0,
			won: true
		}
		this.state.mask = this.getMask(null);
	}


	handlerClick = (usedLetter) => {
		// get value form state
		const {key, mask, guesse} = this.state;
		let nMask = [];
		// create new array
		for (let i = 0; i < key.length; i++) {
			if (usedLetter === key[i])
			nMask.push(usedLetter);
			else
			nMask.push(mask[i]);
		}
		let won = nMask.indexOf('_') === -1;
		console.log(won);
		// change state
		this.setState({mask: nMask, guesse: guesse + 1, won: won});
	}

	handleReset = () => {
		console.log("here");
		let nKey = this.getKey();
		console.log(nKey);
		this.setState((state) => ({
			key: nKey
		}));
		let nMask = this.getMask(nKey);
		console.log(nMask);
		this.setState({won: false, key: nKey, mask: nMask, guesse: 0});
	}

	generateAlphabet() {
		return (ALPHABET.split(''));
	}

	getKey() {
		return (data.data[Math.floor(Math.random() * data.data.length)].toUpperCase());
	}

	getMask = (word) => {
		const mask = [];
		let key = this.state.key;
		if (word != null) {
			key = word;
		}
		console.log("mask", key);
		for (let i = 0; i < key.length; i++) {
			mask.push("_");
		}
		return (mask);
	};

	createKeyboard = (alphabet) => (
		// create the keyboard
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
	)
	createFlied = (mask) => (
		// create the field for the word to determine
		<div className="word">
			{
				mask.map((letter, index) => (
					<p
						key={index}
					>{letter}
					</p>
				))
			}
		</div>
	)

	createWin = () => (
		<div className="win">
			<h1>Win!</h1>
			<button
				onClick={this.handleReset}
			>
			Retry
			</button>
		</div>
	)
	render() {
		const { alphabet, mask, guesse, won } = this.state;
		return (
			<div className="pendue">
				<div className="guesse">guesse : {guesse}</div>
				{
					won ?
					this.createWin() :
					this.createFlied(mask)
				}
				{this.createKeyboard(alphabet)}
			</div>
		);
	}
}

export default App;
