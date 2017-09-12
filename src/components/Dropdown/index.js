import React from 'react'
import Card from '../Card'
import { findFirstFocusableNode } from '@shopify/javascript-utilities/focus'
import KeypressListener from '../KeypressListener'
import PopoverWrapper from '../PopoverWrapper'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'

const defaultProps = {
  closeIcon: true,
  isOpen: false
}

const popoverWrapperOptions = {
  id: 'Dropdown',
  openOnArrowDown: true
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

  const handleArrowKeyPress = (event) => {
    if (!props.popoverNode.contains(event.target)) return
    const direction = event.keyCode === Keys.UP_ARROW ? 'up' : 'down'

    let target = direction === 'up' ? event.target.previousSibling : event.target.nextSibling
    target = target ? event.target : event.target.parentNode

    const nextNode = direction === 'up' ? target.previousSibling : target.nextSibling

    if (!nextNode) {
      props.handleFocusFirstItem()
    } else {
      const focusableNode = findFirstFocusableNode(nextNode)
      if (focusableNode) {
        focusableNode.focus()
      }
    }
  }

  return (
    <div className={componentClassName}>
      <KeypressListener keyCode={Keys.UP_ARROW} handler={handleArrowKeyPress} />
      <KeypressListener keyCode={Keys.DOWN_ARROW} handler={handleArrowKeyPress} />
      <Card>
        {children}
      </Card>
    </div>
  )
}

// Dropdown.propTypes = propTypes
Dropdown.defaultProps = defaultProps

export default PopoverWrapper(popoverWrapperOptions)(Dropdown)
