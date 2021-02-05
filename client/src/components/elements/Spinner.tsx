import React from 'react'
import { CgSpinner } from 'react-icons/cg';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
}

export const Spinner: React.FC<Props> = (props) => {
    const { size, ...rest } = props;

    return (
        <span {...rest} style={{display: 'inline-flex', alignItems: 'center'}}>
            <CgSpinner size={size ?? 16} />
        </span>
    )
}
