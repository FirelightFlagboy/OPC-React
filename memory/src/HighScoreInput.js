
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './HighScoreInput.css'

import { saveHOFEntry } from './HallOfFame'

class HighScoreInput extends Component {

	constructor () {
		super()
		this.state = {
			winner: '',
		}
	}

	handleWinnerUpdate = (event) => {
		this.setState({winner: event.target.value.toUpperCase()})
	}

	// Arrow fx for binding
	persistWinner = (event) => {
		event.preventDefault()
		const newEntry = {
			guesses: this.props.guesses,
			player: this.state.winner
		}
		saveHOFEntry(newEntry, this.props.onStored)
	}

	render() {
		return (
			<form className="highScoreInput" onSubmit={this.persistWinner}>
				<p>
					<label htmlFor="username">
						Bravo ! Entre ton prénom :
					</label>
					<input
						type="text"
						name="username"
						autoComplete="given-name"
						onChange={this.handleWinnerUpdate}
						value={this.state.winner}
						/>
					<button type="submit">J’ai gagné !</button>
				</p>
			</form>
		)
	}
}

HighScoreInput.propTypes = {
	guesses: PropTypes.number.isRequired,
	onStored: PropTypes.func.isRequired,
}

export default HighScoreInput