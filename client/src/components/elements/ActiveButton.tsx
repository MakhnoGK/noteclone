import React, { FC, PropsWithChildren } from 'react';
import { Spinner } from './Spinner';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    rounded?: boolean;
    variant?: 'primary' | 'danger';
}

const ActiveButton: FC<PropsWithChildren<IProps>> = (props) => {
    const classes = ['button'];

    const { active, rounded, variant, className, ...rest } = props;

    active && classes.push('button--busy');
    rounded && classes.push('button--round');
    variant && classes.push(`button--${props.variant}`);
    className && classes.push(...className.split(' '));

    return (
        <button {...rest} className={classes.join(' ')}>
            {active ? (
                <Spinner className="button__spinner" />
            ) : (
                props.children
            )}
        </button>
    );
};

export default ActiveButton;
