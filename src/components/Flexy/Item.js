import React from 'react'
import classNames from '../../utilities/classNames'
import PropTypes from 'prop-types'

export const propTypes = {
  inline: PropTypes.bool
}

const Item = props => {
  const {
    children,
    className,
    inline,
    ...rest
  } = props

  const componentClassName = classNames(
    inline ? 'o-flexy__inline-item' : 'o-flexy__item',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Item.propTypes = propTypes

export default Item
