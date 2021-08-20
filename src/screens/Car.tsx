import { useParams } from 'react-router'
import { useLazyRequest, useRequest } from '../infra/useRequest'
import { CARS, CARS_API, CARS_EDIT } from '../infra/RouteHelpers'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Car as CarType } from '../types/Car'

import './Car.scss'
import Digester from '../infra/Digester'
import { format } from 'date-fns'
import { useHistory } from 'react-router-dom'

const Car = () => {
	const history = useHistory()

	const { id } = useParams<{ id?: string }>()

	const digester = new Digester()
	digester.setDigest<string, string>('year', year =>
		format(new Date(year), 'yyyy')
	)

	const {
		data: car,
		error,
		loading,
		errorMessage,
	} = useRequest<CarType>(`${CARS_API}/${id}`, digester)

	const [deleteCar] = useLazyRequest(
		new Request(`${CARS}/${id}`, {
			method: 'DELETE',
		})
	)

	return (
		<div className="Car">
			{loading && <Loading />}

			{error && <Error error={errorMessage} />}

			{!loading && car && (
				<>
					<div className="Car-image">
						<img src={car.image} alt="" />
					</div>
					<div className="Car-description">
						<h1>
							<span className="Car-id">{car.id}.</span> {car.name}
						</h1>
						<h2>{car.origin}</h2>
						<h2>{car.year}</h2>

						<div className="Car-operations">
							<button
								className="Button"
								onClick={() => history.push(`${CARS_EDIT}/${car.id}`)}
							>
								Edit
							</button>
							<button
								className="Button"
								onClick={() => {
									deleteCar()
									history.goBack()
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Car
