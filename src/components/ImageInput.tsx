import React, { useEffect, useMemo, useState } from 'react'
import Uppy, { UploadResult } from '@uppy/core'
import { Dashboard } from '@uppy/react'

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import { FieldAttributes } from 'formik'

import './ImageInput.scss'

interface ImageInputParams extends FieldAttributes<any> {
	onComplete?: (data?: string | ArrayBuffer | null) => void
	defaultValue: string
}

const ImageInput = ({
	onComplete = () => {},
	defaultValue,
}: ImageInputParams) => {
	const [isEditing, setIsEditing] = useState<boolean>(!defaultValue)

	const uppy = useMemo(() => {
		return Uppy({
			restrictions: { maxNumberOfFiles: 1 },
			autoProceed: true,
		}).on('complete', (result: UploadResult<{}>) => {
			const reader = new FileReader()
			reader.addEventListener('load', event => {
				onComplete(event.target?.result)
			})

			reader.readAsDataURL(result.successful[0].data)
		})
	}, [])

	useEffect(() => () => uppy.close(), [])

	return (
		<>
			{isEditing ? (
				<>
					<Dashboard uppy={uppy} />
					{!!defaultValue && (
						<button className="Button" onClick={() => {
							setIsEditing(false)
							onComplete(defaultValue)
						}}>Cancel</button>
					)}
				</>
			) : (
				<div className="DefaultImage">
					<img src={defaultValue} alt="" />
					<button className="Button" onClick={() => setIsEditing(true)}>
						Change image
					</button>
				</div>
			)}
		</>
	)
}

export default ImageInput
