import React, { Component } from 'react'
import './App.css'
import Card from './Card.js'
import GuessCount from './GuessCount.js'
import HallOfFame, { FAKE_HOF } from './HallOfFame'

class App extends Component {

	generateCards = () => {
		return [];
	}

	handleCardClick = (index) => {
		const {currentPair} = this.state;

		if (currentPair.length === 2)
			return ;
		if (currentPair.length === 0) {
			this.setState({ currentPair: [index]})
			return ;
		}
		this.handleNewPair(index);
	}

	state = {
		cards: this.generateCards(),
		currentPair: [],
		guesses: 0,
		matchedCardIndices: [],
	}

	getFeedbackForCard(index)
	{
		const { currentPair, matchedCardIndices } = this.state;
		const indexMatched = matchedCardIndices.includes(index);

		if (currentPair.length < 2)
			return (indexMatched || index === currentPair[0] ? 'visible' : 'hidden');

		if (currentPair.includes(index))
			return (indexMatched ? 'justMatched' : 'justMismatched');

		return (indexMatched ? 'visible' : 'hidden');
	}

	render() {
		const { cards, guesses, matchedCardIndices } = this.state;
		const won = matchedCardIndices.length = cards.length;
		return (
		<div className="memory">
			<GuessCount guesses={guesses} />
			{cards.map((card, index) => (
				<Card
					card={card}
					feedback={this.getFeedbackForCard(index)}
					index={index}
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
