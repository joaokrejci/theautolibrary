import SchemaForm from '../components/SchemaForm'
import { FormSchema } from '../infra/formikSchema'
import './CarEditor.scss'
import { useLazyRequest, useRequest } from '../infra/useRequest'
import { Redirect } from 'react-router-dom'
import { CARS, CARS_API } from '../infra/RouteHelpers'
import { Car } from '../types/Car'
import { useParams } from 'react-router'

const schema = [
	{
		name: 'image',
		label: 'Image',
		type: 'image',
		defaultValue: '',
	},
	{
		name: 'name',
		label: 'Name',
		type: 'text',
		defaultValue: '',
	},
	{
		name: 'origin',
		label: 'Origin',
		type: 'text',
		defaultValue: '',
	},
	{
		name: 'year',
		type: 'date',
		label: 'Year',
		defaultValue: '',
	},
]
const CarSchema = new FormSchema(schema)

const CarEditor = () => {
	const { id } = useParams<{ id?: string }>()

	const [request, { data }] = useLazyRequest<Car>(
		new Request(`${CARS_API}${id ? '/' + id : ''}`, {
			method: id ? 'PATCH' : 'POST',
			mode: 'cors',
			cache: 'default',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
	)

	const { data: car, loading } = useRequest<Car>(`${CARS}/${id}`)

	return (
		<>
			{!!data && <Redirect to={CARS + '/' + data.id} />}
			{!loading && car && (
				<div className="CarAdd">
					<h1>Car Form</h1>
					<SchemaForm
						defaultValues={car}
						schema={CarSchema}
						onSubmit={values => {
							request(values)
						}}
					/>
				</div>
			)}
		</>
	)
}

export default CarEditor
