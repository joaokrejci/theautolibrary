import { useHistory } from 'react-router'
import { MdArrowBack } from 'react-icons/md'

import './Header.scss'

const Header = () => {
	const history = useHistory()

	return (
		<header className="Header">
			<button onClick={history.goBack}>
				<MdArrowBack size={25} /> Go Back
			</button>
			<h1 onClick={() => history.push('/')}>The Auto Library</h1>
		</header>
	)
}

export default Header
