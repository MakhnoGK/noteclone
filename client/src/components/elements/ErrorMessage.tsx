import React from 'react';

interface Props {
    message?: string | null;
    variant?: 'danger' | 'primary';
    className?: string;
}

export const ErrorMessage: React.FC<Props> = (props) => {
    const { message, variant, className, ...rest } = props;
    const classes = ['message'];

    variant && classes?.push(`message--${variant}`);

    return message ? (
        <div className={classes.join(' ')} {...rest}>
            {message}
        </div>
    ) : null;
};
