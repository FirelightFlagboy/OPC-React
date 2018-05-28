import React from 'react'
import propTypes from 'prop-types'

import './Card.css'

const HIDDEN_SYMBOL = '❓'

const Card = ({card, feedback, onClick, index}) => (
	<div className={`card ${feedback}`} onClick={() => (onClick(index))}>
		<span className="symbol">
			{feedback === 'hidden' ? HIDDEN_SYMBOL : card}
		</span>
	</div>
)

Card.propTypes = {
	card: propTypes.string.isRequired,
	feedback: propTypes.oneOf([
		'hidden',
		'justMatched',
		'justMismatched',
		'visible'
	]).isRequired,
	index: propTypes.number.isRequired,
	onClick: propTypes.func.isRequired,
}

export default Card
