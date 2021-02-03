import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

export const ErrorMessage = () => {
    const { requestError } = useSelector((state: RootState) => state.users);

    return (
        <div className="form-error">
            {requestError}
        </div>
    )
}
