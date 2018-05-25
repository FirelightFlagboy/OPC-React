import React from 'react'
// import PropTypes from 'prop-types'

import './Keyboard.css'

const Keyboard = ({name, onClick}) => (
	<button
		class="letter"
		value={name}
		name={name}
		onClick={() => (onClick(name))}
	>
	{name}
	</button>
)


export default Keyboard
