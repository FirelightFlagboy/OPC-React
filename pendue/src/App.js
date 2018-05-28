import React, { Component } from 'react';
import Keyboard from './Keyboard.js'
import './App.css';
import data from './liste_francais.json';

class App extends Component {

	constructor() {
		super();

		this.getKey = this.getKey.bind(this);
		this.getMask = this.getMask.bind(this);

		this.state = {
			alphabet: this.generateAlphabet(),
			key: this.getKey(),
			guesse: 0,
			won: false,
			letter: [],
			score: 0,
		}
		this.state.mask = this.getMask(null);
	}


	handlerClick = (usedLetter) => {
		// get value form state
		let { won, letter, key, mask, score, guesse } = this.state;
		if (won)
			return ;
		let nMask = [];
		let found = false;
		// create new array
		for (let i = 0; i < key.length; i++) {
			if (usedLetter === key[i]) {
				nMask.push(usedLetter);
				found = true;
			}
			else
				nMask.push(mask[i]);
		}
		// if letter already tested
		if (letter.indexOf(usedLetter) !== -1) {
			score -= 2;
		}
		else {
			// add letter to the array
			letter.push(usedLetter);
			// if letter in word
			if (found) {
				score += 2;
			} else {
				score -= 1;
			}
		}
		won = nMask.indexOf('_') === -1;
		// change state
		this.setState({
			letter: letter,
			mask: nMask,
			guesse: guesse + 1,
			won: won,
			score: score
		});
	}

	handleReset = () => {
		let nKey = this.getKey();
		this.setState((state) => ({
			key: nKey
		}));
		let nMask = this.getMask(nKey);
		this.setState({ won: false, key: nKey, mask: nMask, guesse: 0, letter: [] });
	}

	generateAlphabet() {
		let table = [];
		for (let a = 65; a <= 90; a++) {
			table.push(String.fromCharCode(a));
		}
		return (table);
	}

	getKey() {
		const index = Math.floor(Math.random() * data.data.length)
		let word = data.data[index].toUpperCase()
		console.log(word);
		return (word);
	}

	getMask = (word) => {
		const mask = [];
		let key = this.state.key;
		if (word != null) {
			key = word;
		}
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
			{this.createFlied(this.state.mask)}
			<button
				onClick={this.handleReset}
			>
				Retry
			</button>
		</div>
	)

	createScore = (guesse, score) => (
		<div className="guesse">
			<table>
				<thead>
					<tr>
						<th>Guesse</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{guesse}</td>
						<td>{score}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)

	render() {
		const { alphabet, mask, guesse, won, score } = this.state;
		return (
			<div className="pendue">
				{this.createScore(guesse, score)}
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
