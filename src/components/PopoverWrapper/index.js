import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {findFirstFocusableNode} from '@shopify/javascript-utilities/focus'
import Animate from '../Animate'
import EventListener from '../EventListener'
import Overlay from '../Overlay'
import PortalWrapper from '../PortalWrapper'
import classNames from '../../utilities/classNames'
import { propTypes as portalTypes } from '../Portal'

export const propTypes = Object.assign({}, portalTypes, {
  trigger: PropTypes.element
})

const popoverWrapperBaseZIndex = 1020

const defaultOptions = {
  id: 'PopoverWrapper',
  offset: 8,
  timeout: 200,
  zIndex: popoverWrapperBaseZIndex
}

const PopoverWrapper = (options = defaultOptions) => ComposedComponent => {
  const popoverOptions = Object.assign({}, defaultOptions, options)

  class PopoverWrapperComponent extends Component {
    constructor (props) {
      super()

      this.contentNode = null
      this.composedNode = null
      this.portal = null

      this.state = {
        position: {
          top: null,
          left: null
        },
        isOpen: false
      }
    }

    componentDidMount () {
      this.setTriggerNode()
    }

    componentWillReceiveProps (props) {
      this.setState({ isOpen: props.portalIsOpen })
      this.updatePosition()
    }

    componentDidUpdate () {
      this.setTriggerNode()
      this.updatePosition()
      // this.focusNode()
    }

    focusNode () {
      const { portalIsOpen } = this.props
      let focusableNode = this.triggerNode

      if (portalIsOpen && this.composedNode) {
        focusableNode = findFirstFocusableNode(this.composedNode) || this.triggerNode
      }

      if (focusableNode) {
        focusableNode.focus()
      }
    }

    setTriggerNode () {
      if (!this.triggerNode) {
        this.triggerNode = ReactDOM.findDOMNode(this.props.triggerNode)
      }
    }

    updatePosition () {
      const el = this.triggerNode
      if (!el) return

      const clientRect = el.getBoundingClientRect()
      const offset = popoverOptions.offset
      let reposition = false
      let popoverClientRect

      if (this.contentNode) {
        popoverClientRect = this.contentNode.getBoundingClientRect()
        if (clientRect.top + popoverClientRect.top + popoverClientRect.height > window.innerHeight) {
          reposition = true
        }
      }

      const top = reposition
        ? clientRect.top - clientRect.height - popoverClientRect.height
        : clientRect.top + clientRect.height

      const left = reposition
        ? (clientRect.left + clientRect.width) - popoverClientRect.width
        : clientRect.left

      const position = {
        top: parseInt(top + offset + window.scrollY, 10),
        left: parseInt(left + window.scrollX, 10)
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

    handleFocusFirstItem () {
      this.props.closePortal()
      this.focusNode()
    }

    handleFocusLastItem () {
      this.props.closePortal()
      this.focusNode()
    }

    render () {
      const {
        className,
        closePortal,
        exact,
        isOpen,
        openPortal,
        path,
        portalIsOpen,
        portalIsMounted,
        style,
        timeout,
        trigger,
        triggerNode,
        zIndex,
        ...rest
      } = this.props
      const { position } = this.state

      const componentClassName = classNames(
        'c-PopoverWrapper',
        className
      )

      const handleFocusFirstItem = this.handleFocusFirstItem.bind(this)
      // const handleFocusLastItem = this.handleFocusLastItem.bind(this)
      const updatePosition = this.updatePosition.bind(this)

      const popoverWrapperStyle = Object.assign({}, style, {
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex
      })

      return (
        <div>
          <EventListener event='resize' handler={updatePosition} />
          <Animate sequence='fadeIn' in={portalIsOpen} wait={60}>
            <div>
              <div
                className={componentClassName}
                style={popoverWrapperStyle}
                ref={node => { this.contentNode = node }}
                {...rest}
              >
                <div ref={node => { this.composedNode = node }}>
                  <ComposedComponent
                    ref={node => { this.composedNode = node }}
                    openPortal={openPortal}
                    closePortal={closePortal}
                    portalIsOpen={portalIsOpen}
                    handleFocusFirstItem={handleFocusFirstItem}
                    isOpen={portalIsOpen}
                    popoverWrapperNode={this.contentNode}
                    popoverNode={this.composedNode}
                    popoverPosition={position}
                    portalIsMounted={portalIsMounted}
                    triggerNode={this.triggerNode}
                    zIndex={zIndex}
                    {...rest}
                  />
                </div>
              </div>
            </div>
          </Animate>
          <Animate sequence='fadeIn' in={portalIsOpen} wait={60}>
            <Overlay onClick={closePortal} style={{cursor: 'default', position: 'fixed', opacity: 0}} />
          </Animate>
        </div>
      )
    }
  }

  PopoverWrapperComponent.propTypes = propTypes

  return PortalWrapper(popoverOptions)(PopoverWrapperComponent)
}

export default PopoverWrapper
