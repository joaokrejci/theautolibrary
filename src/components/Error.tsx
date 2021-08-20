import React from 'react'

import './Error.scss'
import { useHistory } from 'react-router-dom'

import carImage from '../assets/error.svg'

interface ErrorProps {
    error?: string
}

const Error = ({ error }: ErrorProps) => {
    console.error(error)

    const history = useHistory()

    return (
        <div className="Error">
            <div>
                <img src={carImage} alt="something went wrong" />
                <h1>An error has occurred</h1>
                <button onClick={() => history.push('/')}>
                    Go back to main page
                </button>
            </div>
        </div>
    )
}

export default Error
