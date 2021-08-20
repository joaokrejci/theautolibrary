import { Field } from 'formik'

import { FieldEvaluatedProps } from './FieldEvaluate'

import './FormField.scss'

const FormField = ({ element }: FieldEvaluatedProps) => {
	return (
		<div className="FormField">
			<label>{element.label}</label>
			<Field {...element} />
		</div>
	)
}

export default FormField
