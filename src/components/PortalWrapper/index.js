import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import Animate from '../Animate'
import KeypressListener from '../KeypressListener'
import { default as Portal, propTypes as portalTypes } from '../Portal'
import { portalWrapperTypes } from './propTypes'
import Keys from '../../constants/Keys'
import { createUniqueIDFactory } from '../../utilities/id'

const ANIMATION_TIMEOUT = 200

const defaultOptions = {
  id: 'PortalWrapper',
  openOnArrowDown: false
}

const PortalWrapper = (options = defaultOptions) => ComposedComponent => {
  const propTypes = Object.assign({}, portalTypes, portalWrapperTypes)

  const defaultProps = {
    isOpen: false,
    triggerOn: 'click',
    timeout: 0
  }

  const uniqueID = createUniqueIDFactory(options.id)

  class PortalWrapper extends Component {
    constructor (props) {
      super()
      this.state = Object.assign({}, props, options, {
        id: uniqueID(),
        isMounted: props.isOpen
      })
      this.triggerNode = null
    }

    componentDidMount () {
      if (this.props.path) {
        this.openPortal()
      }
    }

    componentWillReceiveProps (nextProps) {
      /* istanbul ignore next */
      if (nextProps.path) {
        this.openPortal()
      }
    }

    /* istanbul ignore next */
    openPortal () {
      this.setState({
        isOpen: true,
        isMounted: true
      })
    }

    closePortal () {
      this.setState({
        isOpen: false,
        isMounted: false
      })
    }

    sequenceClosePortal (onClose) {
      setTimeout(() => {
        onClose()
      }, ANIMATION_TIMEOUT)
    }

    handleOnClose (onClose) {
      const { onBeforeClose } = this.props

      if (onClose && typeof onClose === 'function') {
        if (onBeforeClose) {
          onBeforeClose(() => this.sequenceClosePortal(onClose))
        } else {
          this.sequenceClosePortal(onClose)
        }
      } else {
        this.closePortal()
      }
    }

    handleOnDownArrow (event) {
      if (event.keyCode === Keys.DOWN_ARROW) {
        const triggerNode = ReactDOM.findDOMNode(this.triggerNode)
        const { isOpen, openOnArrowDown } = this.state
        if (event.target === triggerNode && !isOpen && openOnArrowDown) {
          this.openPortal()
        }
      }
    }

    handleTriggerOnEvent (event) {
      const { triggerOn } = this.props
      const { isOpen } = this.state
      const remappedTriggerOn = {
        click: triggerOn === 'click',
        onfocus: triggerOn === 'focus',
        mouseenter: triggerOn === 'hover'
      }

      if (!isOpen && remappedTriggerOn[event.type]) {
        this.openPortal()
      }
    }

    render () {
      const {
        exact,
        isOpenProps,
        onBeforeClose,
        onBeforeOpen,
        onClose,
        onOpen,
        path,
        renderTo,
        trigger,
        triggerOn,
        timeout,
        ...rest
      } = this.props
      // Remapping open/mount state for ComposedComponent
      const { id, isOpen: portalIsMounted, isMounted: portalIsOpen } = this.state

      const openPortal = this.openPortal.bind(this)
      const handleOnClose = this.handleOnClose.bind(this)
      const handleOnDownArrow = this.handleOnDownArrow.bind(this)
      const handleTriggerOnEvent = this.handleTriggerOnEvent.bind(this)

      const uniqueIndex = parseInt(id.replace(options.id, ''), 10)
      const zIndex = options.zIndex ? options.zIndex + uniqueIndex : null

      const portalMarkup = (
        <Animate
          animateOnMount={false}
          in={portalIsMounted}
          unmountOnExit
          wait={ANIMATION_TIMEOUT}
        >
          <Portal
            onBeforeClose={handleOnClose}
            onClose={onClose}
            onBeforeOpen={onBeforeOpen}
            onOpen={onOpen}
            id={id}
            renderTo={renderTo}
            portalIsMounted={portalIsMounted}
            timeout={timeout}
            {...rest}
          >
            <ComposedComponent
              openPortal={openPortal}
              closePortal={handleOnClose}
              portalIsOpen={portalIsOpen}
              portalIsMounted={portalIsMounted}
              triggerNode={this.triggerNode}
              zIndex={zIndex}
              {...rest}
            />
          </Portal>
        </Animate>
      )

      const portalContainerMarkup = path ? (
        <Route exact={exact} path={path} render={props => portalMarkup} />
      ) : portalMarkup

      const triggerMarkup = trigger
        ? React.cloneElement(trigger, {
          onClick: handleTriggerOnEvent,
          onMouseEnter: handleTriggerOnEvent,
          onFocus: handleTriggerOnEvent,
          ref: node => { this.triggerNode = node },
          onKeyUp: handleOnDownArrow
        })
        : null

      return (
        <div>
          <KeypressListener keyCode={Keys.ESCAPE} handler={handleOnClose} />
          {triggerMarkup}
          {portalContainerMarkup}
        </div>
      )
    }
  }

  PortalWrapper.propTypes = propTypes
  PortalWrapper.defaultProps = defaultProps

  return PortalWrapper
}

export default PortalWrapper
