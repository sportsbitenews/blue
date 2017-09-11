import React from 'react'
import Card from '../Card'
import PopoverWrapper from '../PopoverWrapper'
import classNames from '../../utilities/classNames'

const defaultProps = {
  closeIcon: true,
  isOpen: false
}

const popoverWrapperOptions = {
  id: 'Dropdown'
}

const Dropdown = props => {
  const {
    children,
    className,
    isOpen
  } = props

  const componentClassName = classNames(
    'c-Dropdown',
    isOpen && 'is-open',
    className
  )

  return (
    <div className={componentClassName}>
      <Card>
        {children}
      </Card>
    </div>
  )
}

// Dropdown.propTypes = propTypes
Dropdown.defaultProps = defaultProps

export default PopoverWrapper(popoverWrapperOptions)(Dropdown)
