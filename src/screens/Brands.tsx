import {useRequest} from '../infra/useRequest'
import List from '../components/List'
import { Brand } from '../types/Brand'
import { useHistory } from 'react-router'
import { BRANDS } from '../infra/RouteHelpers'

const Brands = () => {
	const history = useHistory()

	const {
		data: brands,
		loading,
		error,
		errorMessage,
	} = useRequest<Array<Brand>>('/brands')

	return (
		<>
			<h1>Brands</h1>
			{loading && <>Loading</>}

			{error && <h1>{errorMessage}</h1>}

			{!loading && !error && brands && (
				<List
					keys={['id', 'name', 'origin']}
					data={brands}
					onSelect={id => history.push(BRANDS + '/' + id)}
				/>
			)}
		</>
	)
}

export default Brands
