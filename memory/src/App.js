import React, { Component } from 'react'
import './App.css'
import Card from './Card.js'
import GuessCount from './GuessCount.js'
import HallOfFame, { FAKE_HOF } from './HallOfFame'

class App extends Component {
	handleCardClick(card) {
		console.log(card, 'clicked');
	}
	render() {
		const won = new Date().getSeconds() % 2 === 0;
		return (
		<div className="memory">
			<GuessCount guesses={0} />
			{this.cards.map((card, index) => (
				<Card
					card={card}
					feedback="visible"
					key={index}
					onClick={this.handleCardClick}
				/>
			))}
			{won && <HallOfFame entries={FAKE_HOF} />}
		</div>
		)
	}
}

export default App
