import React, { PropsWithChildren } from 'react'
import { CgSpinner } from 'react-icons/cg';

export const Spinner: React.FC<PropsWithChildren<any>> = (props) => {
    return (
        <span {...props} style={{display: 'flex', alignItems: 'center'}}>
            <CgSpinner size={props.size} />
        </span>
    )
}
