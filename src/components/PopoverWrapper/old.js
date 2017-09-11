import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import Overlay from '../Overlay'
import Portal from '../Portal'
import classNames from '../../utilities/classNames'

export const propTypes = {
  triggerOn: PropTypes.string
}
const defaultProps = {
  triggerOn: 'click'
}

class Popover extends Component {
  constructor () {
    super()
    this.popover = null
    this.portal = null
    this.trigger = null

    this.state = {
      position: {
        top: null,
        left: null
      },
      show: false
    }
  }

  componentDidMount () {
    this.updatePosition()
  }

  forceUpdatePosition () {
    const force = true
    this.updatePosition(force)
  }

  updatePosition (force = false) {
    if (force !== true && !this.state.show) return

    const el = this.triggerNode
    const clientRect = el.getBoundingClientRect()
    const offset = 8
    let reposition = false
    let popoverClientRect

    if (this.popover) {
      popoverClientRect = this.popover.getBoundingClientRect()
      if (popoverClientRect.top + popoverClientRect.height > window.innerHeight) {
        reposition = true
      }
    }

    const top = reposition
      ? clientRect.top - clientRect.height - popoverClientRect.height
      : clientRect.top + clientRect.height

    const position = {
      top: top + offset + window.scrollY,
      left: clientRect.left + window.scrollX
    }

    if (
      this.state.position.top !== position.top ||
      this.state.position.left !== position.left
    ) {
      console.log(position)
      this.setState({
        position
      })
    }
  }

  // TEST METHOD
  handleOnTrigger (event) {
    let { triggerOn } = this.props
    const type = event.type

    if (triggerOn === 'hover') {
      triggerOn = 'mouseenter'
    }

    if (triggerOn === type) {
      this.forceUpdatePosition()
      this.handleToggleShow()
    }
  }

  handleToggleShow () {
    const { show } = this.state
    this.setState({ show: !show })
  }

  handlePortalOnOpen (openPortal, portal) {
    openPortal()
    this.popover = portal.portalContent
    this.forceUpdatePosition()
  }

  render () {
    const { className, children, trigger } = this.props
    const { position, show } = this.state

    const handleToggleShow = this.handleToggleShow.bind(this)
    const handleOnTrigger = this.handleOnTrigger.bind(this)
    const handlePortalOnOpen = this.handlePortalOnOpen.bind(this)
    const updatePosition = this.updatePosition.bind(this)

    const componentClassName = classNames(
      'c-Popover',
      className
    )

    const popoverStyle = {
      background: 'white',
      border: '1px solid #eee',
      padding: 20,
      position: 'absolute',
      top: position.top,
      left: position.left,
      zIndex: 2
    }

    const popoverMarkup = show ? (
      <Portal id='PopoverContainer' onBeforeOpen={handlePortalOnOpen}>
        <div>
          <div className={componentClassName} style={popoverStyle}>
            {children}
          </div>
          <Overlay style={{cursor: 'default', opacity: 0, position: 'fixed'}} onClick={handleToggleShow} />
        </div>
      </Portal>
    ) : null

    const triggerMarkup = trigger
    ? React.cloneElement(trigger, {
      ref: node => { this.triggerNode = node },
      onMouseEnter: e => handleOnTrigger(e),
      onClick: e => handleOnTrigger(e),
      className: 'trigger',
      style: {
        cursor: 'pointer'
      },
      ...trigger.props
    })
    : null

    console.log('rerender')

    return (
      <div style={{padding: 50, position: 'relative', top: 100, left: '20%'}}>
        <EventListener event='resize' handler={updatePosition} />
        {triggerMarkup}
        {popoverMarkup}
      </div>
    )
  }
}

Popover.propTypes = propTypes
Popover.defaultProps = defaultProps

export default Popover
