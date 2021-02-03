import React from 'react'
import { CgSpinner } from 'react-icons/cg'

export const AppPreloader = () => {
    return (
        <div className="app-preloader">
            <CgSpinner size={128} className="app-preloader__icon" />
            <p>Processing request...</p>
        </div>
    )
}
