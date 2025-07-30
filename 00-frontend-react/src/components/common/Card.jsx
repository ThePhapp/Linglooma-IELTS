import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '', 
  bordered = false, 
  shadow = false, 
  rounded = 'md',
  padding = 'p-4',
  ...props 
}) => {
  const baseClasses = 'bg-white';
  const borderClasses = bordered ? 'border border-gray-200' : '';
  const shadowClasses = shadow ? 'shadow-md' : '';
  
  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  };
  
  const roundedClasses = roundedMap[rounded] || 'rounded-md';
  
  const cardClasses = `${baseClasses} ${borderClasses} ${shadowClasses} ${roundedClasses} ${padding} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  bordered: PropTypes.bool,
  shadow: PropTypes.bool,
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']),
  padding: PropTypes.string,
};

export default Card;