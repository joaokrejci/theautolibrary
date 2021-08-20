import {Form, Formik} from 'formik'
import React from 'react'
import {FormSchema} from '../infra/formikSchema'
import FieldEvaluated from './FieldEvaluate'
import Digester from '../infra/Digester'

interface SchemaFormParams {
	schema: FormSchema
	onSubmit: (values: Object) => void
	submitLabel?: string
	defaultValues: {} | null
}

const SchemaForm = ({
	schema,
	onSubmit,
	submitLabel = 'Submit',
	defaultValues = null,
}: SchemaFormParams) => {
	const handleSubmit = (values: { [index: string]: any }) => {
		const digester = new Digester()
		digester.setDigest<Date, string>('year', year =>
			new Date(year).toISOString()
		)

		onSubmit(digester.digest(values))
	}

	return (
		<Formik
			initialValues={defaultValues || schema.getDefaultValues()}
			onSubmit={handleSubmit}
		>
			{() => (
				<Form>
					{schema.schema.map(element => {
						return <FieldEvaluated key={element.name} element={element} />
					})}
					<button type="submit">{submitLabel}</button>
				</Form>
			)}
		</Formik>
	)
}

export default SchemaForm
