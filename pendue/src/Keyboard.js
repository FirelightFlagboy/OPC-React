import React from 'react'
// import PropTypes from 'prop-types'

import './Keyboard.css'

const Keyboard = ({name, onClick}) => (
	<button
		className="letter"
		value={name}
		name={name}
		onClick={() => (onClick(name))}
	>
	{name}
	</button>
)


export default Keyboard
