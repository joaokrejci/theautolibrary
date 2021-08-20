import React, { Fragment } from 'react'
import { FieldAttributes, useFormikContext } from 'formik'
import ImageInput from './ImageInput'
import FormField from './FormField'

export interface FieldEvaluatedProps {
	element: FieldAttributes<any>
}

const FieldEvaluated = ({
	element: { defaultValue, ...element },
}: FieldEvaluatedProps) => {
	const { setFieldValue, initialValues } = useFormikContext<any[]>()

	switch (element.type) {
		case 'image':
			return (
				<>
					<input {...element} type="hidden" />
					<ImageInput
						onComplete={data => {
							setFieldValue(element.name, data)
						}}
						defaultValue={initialValues[element.name]}
						{...element}
					/>
				</>
			)
		default:
			return <FormField element={element} />
	}
}

export default FieldEvaluated
