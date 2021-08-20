import { useRequest } from '../infra/useRequest'
import Digester from '../infra/Digester'
import { format } from 'date-fns'
import List from '../components/List'
import { Car } from '../types/Car'
import { useHistory } from 'react-router'
import {CARS, CARS_EDIT} from '../infra/RouteHelpers'
import { useState } from 'react'

import './Cars.scss'

const Cars = () => {
	const history = useHistory()

	const digester = new Digester()
	digester.setDigest<string, string>('year', value =>
		format(new Date(value), 'yyyy')
	)

	const {
		data: cars,
		loading,
		error,
	} = useRequest<Array<Car>>(CARS + window.location.search, digester)

	const [search, setSearch] = useState<string>('')

	return (
		<div className="Cars">
			<h1>Cars</h1>
			{loading && <>Loading</>}

			{error && <>Error</>}

			{!loading && !error && cars && (
				<>
					<div className="Cars-operations">
						<button
							onClick={() => history.push(CARS_EDIT)}
							className="Cars-add Button"
						>
							Add
						</button>
					</div>
					<form>
						<label>Search</label>
						<input
							type="text"
							value={search}
							onChange={({ target: { value } }) => setSearch(value)}
						/>
					</form>
					<List
						keys={['id', 'name', 'origin', 'year']}
						data={cars}
						onSelect={id => history.push(`${CARS}/${id}`)}
					/>
				</>
			)}
		</div>
	)
}

export default Cars
