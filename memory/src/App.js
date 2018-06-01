import React, {
	Component
} from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'
import Card from './Card.js'
import GuessCount from './GuessCount.js'
import HallOfFame from './HallOfFame'
import HighScoreInput from './HighScoreInput.js'

const SIDE = 6;
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿';
const VISUAL_PAUSE_MSECS = 500;

class App extends Component {

	constructor () {
		super()
		this.state = {
			cards: this.generateCards(),
			currentPair: [],
			guesses: 0,
			hallOfFame: null,
			matchedCardIndices: [],
		}
	}

	generateCards() {
		const result = []
		const size = SIDE * SIDE
		const candidates = shuffle(SYMBOLS)
		while (result.length < size) {
			const card = candidates.pop()
			result.push(card, card)
		}
		return shuffle(result)
	}

	getFeedbackForCard(index) {
		const { currentPair, matchedCardIndices } = this.state
		const indexMatched = matchedCardIndices.includes(index)

		if (currentPair.length < 2) {
			return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
		}

		if (currentPair.includes(index)) {
			return indexMatched ? 'justMatched' : 'justMismatched'
		}

		return indexMatched ? 'visible' : 'hidden'
	}

	handleCardClick = index => {
		const { currentPair } = this.state

		if (currentPair.length === 2) {
			return
		}
		if (currentPair.length === 0) {
			this.setState({ currentPair: [index] })
			return
		}

		this.handleNewPairClosedBy(index)
	}

	handleNewPairClosedBy(index) {
		const { cards, currentPair, guesses, matchedCardIndices } = this.state

		if (currentPair[0] === index)
			return ;
		const newPair = [currentPair[0], index]
		const newGuesses = guesses + 1
		const matched = cards[newPair[0]] === cards[newPair[1]]
		this.setState({ currentPair: newPair, guesses: newGuesses })
		if (matched) {
			this.setState({ matchedCardIndices: matchedCardIndices.concat(newPair) })
		}
		setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
	}

	displayHallOfFame = (hallOfFame) => {
		this.setState({ hallOfFame});
	}

	render() {
		const { cards, guesses, matchedCardIndices, hallOfFame } = this.state;
		const won = matchedCardIndices.length >= cards.length;
		return (<div className="memory">
			<GuessCount guesses={guesses} /> {
				cards.map((card, index) => (
					<Card
					card={card}
					feedback={this.getFeedbackForCard(index)}
					index={index}
					key={index}
					onClick={this.handleCardClick}
					/>
				))
			}
			{
				won &&
					((hallOfFame) ?
					(<HallOfFame entries={hallOfFame} />) :
					(<HighScoreInput guesses={guesses} onStored={this.displayHallOfFame} />))
			}
		</div>
		)
	}
}

export default App
export { SYMBOLS }
