import React, { FC, PropsWithChildren } from 'react';
import { Spinner } from './Spinner';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    rounded?: boolean;
    variant?: 'primary' | 'danger';
}

const ActiveButton: FC<PropsWithChildren<IProps>> = (props) => {
    const classes = ['button'];

    props.active && classes.push('button--busy');
    props.rounded && classes.push('button--round');
    props.variant && classes.push(`button--${props.variant}`);
    props.className && classes.push(...props.className.split(' '));

    return (
        <button {...props} className={classes.join(' ')}>
            {props.active ? (
                <Spinner className="button__spinner" />
            ) : (
                props.children
            )}
        </button>
    );
};

export default ActiveButton;
