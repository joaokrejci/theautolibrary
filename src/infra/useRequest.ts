import { useEffect, useState } from 'react'
import Digester from './Digester'

interface UseRequestResponse<T> {
	response: Response | null
	data: T | null
	loading: boolean
	error: boolean
	errorMessage: string
}

export const useRequest = <T>(
	request: RequestInfo,
	digester?: Digester
): UseRequestResponse<T> => {
	const [response, setResponse] = useState<Response | null>(null)
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')

	const setRequestError = (errorMessage: string) => {
		setLoading(false)
		setError(true)
		setErrorMessage(errorMessage)
	}

	useEffect(() => {
		const digest = (data: T): T => {
			if ((Array.isArray(data) || typeof data === 'object') && !!digester) {
				return digester.digest(data)
			}

			return data
		}

		setLoading(true)

		fetch(request)
			.then(response => {
				setResponse(response)

				response
					.json()
					.then(responseData => {
						setLoading(false)
						setData(digest(responseData))
					})
					.catch(error => {
						setRequestError(error)
					})
			})
			.catch(error => {
				setRequestError(error)
			})
	}, [])

	return {
		response,
		data,
		loading,
		error,
		errorMessage,
	}
}

export const useLazyRequest = <T>(
	request: RequestInfo,
	digester?: Digester
): [(body?: {}) => void, UseRequestResponse<T>] => {
	const [response, setResponse] = useState<Response | null>(null)
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')

	const setRequestError = (errorMessage: string) => {
		setLoading(false)
		setError(true)
		setErrorMessage(errorMessage)
	}

	const requestCall = (body?: {}) => {
		const digest = (data: T): T => {
			if ((Array.isArray(data) || typeof data === 'object') && !!digester) {
				return digester.digest(data)
			}

			return data
		}

		setLoading(true)

		fetch(
			new Request(request, { ...(body ? { body: JSON.stringify(body) } : {}) })
		)
			.then(response => {
				setResponse(response)

				response
					.json()
					.then(responseData => {
						setLoading(false)
						setData(digest(responseData))
					})
					.catch(error => {
						setRequestError(error)
					})
			})
			.catch(error => {
				setRequestError(error)
			})
	}

	return [
		requestCall,
		{
			response,
			data,
			loading,
			error,
			errorMessage,
		},
	]
}
