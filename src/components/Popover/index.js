import React from 'react'
import Card from '../Card'
import PopoverWrapper from '../PopoverWrapper'
import classNames from '../../utilities/classNames'

const defaultProps = {
  closeIcon: true,
  isOpen: false
}

const popoverWrapperOptions = {
  id: 'Popover',
  openOnArrowDown: true
}

const Popover = props => {
  const {
    children,
    className,
    isOpen
  } = props

  const calculateArrowPosition = () => {
    // if triggerNode.offset.left is
  }

  const componentClassName = classNames(
    'c-Popover',
    isOpen && 'is-open',
    className
  )

  calculateArrowPosition()

  return (
    <div className={componentClassName}>
      <div className='c-Popover__arrow' />
      <Card>
        {children}
      </Card>
    </div>
  )
}

// Popover.propTypes = propTypes
Popover.defaultProps = defaultProps

export default PopoverWrapper(popoverWrapperOptions)(Popover)
