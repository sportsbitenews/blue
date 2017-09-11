import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
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
  timeout: 200,
  zIndex: popoverWrapperBaseZIndex
}

const PopoverWrapper = (options = defaultOptions) => ComposedComponent => {
  const portalOptions = Object.assign({}, defaultOptions, options)

  class PopoverWrapperComponent extends Component {
    constructor(props) {
      super()

      this.popover = null
      this.portal = null
      this.triggerNode = props.triggerNode

      this.state = {
        position: {
          top: null,
          left: null
        },
        isOpen: props.protalIsOpen
      }
    }

    componentWillReceiveProps (props) {
      this.updatePosition()
    }

    updatePosition (force = false) {
      // if (force !== true && !this.state.isOpen) return

      const el = this.props.triggerNode
      const clientRect = el.getBoundingClientRect()
      const offset = 8
      let reposition = false
      let popoverClientRect

      if (this.popover) {
        popoverClientRect = this.popover.getBoundingClientRect()
        if (clientRect.top + popoverClientRect.top + popoverClientRect.height > window.innerHeight) {
          reposition = true
        }
      }

      const top = reposition ?
        clientRect.top - clientRect.height - popoverClientRect.height
        :
        clientRect.top + clientRect.height

      const left = reposition ?
        (clientRect.left + clientRect.width) - popoverClientRect.width
        :
        clientRect.left

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

    render() {
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

      const componentClassName = classNames(
        'c-PopoverWrapper',
        className
      )

      const { position } = this.state
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
                ref={node => this.popover = node}
                {...rest}
              >
                <ComposedComponent
                  openPortal={openPortal}
                  closePortal={closePortal}
                  portalIsOpen={portalIsOpen}
                  isOpen={portalIsOpen}
                  portalIsMounted={portalIsMounted}
                  zIndex={zIndex}
                  {...rest}
                />
              </div>
            </div>
          </Animate>
          <Animate sequence='fadeIn' in={portalIsOpen} wait={60}>
            <Overlay onClick={closePortal} style={{position: 'fixed', opacity: 0}} />
          </Animate>
        </div>
      )
    }
  }

  PopoverWrapperComponent.propTypes = propTypes

  return PortalWrapper(portalOptions)(PopoverWrapperComponent)
}

export default PopoverWrapper
