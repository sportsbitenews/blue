import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import CardBlock from '../CardBlock'
import CloseButton from '../CloseButton'
import Overlay from '../Overlay'
import Scrollable from '../Scrollable'
import { PortalWrapper } from '../Portal'

const propTypes = {
  closeIcon: PropTypes.bool,
  isOpen: PropTypes.bool,
  trigger: PropTypes.element.isRequired
}

const defaultProps = {
  closeIcon: true,
  isOpen: false
}

const portalOptions = {
  id: 'Modal'
}

const Modal = props => {
  const {
    children,
    closeIcon,
    closePortal
  } = props

  const closeMarkup = closeIcon ? (
    <div className='c-Modal__close'>
      <CloseButton onClick={closePortal} />
    </div>
  ) : null

  return (
    <div className='c-Modal'>
      <div className='c-Modal__content'>
        <Card seamless>
          {closeMarkup}
          <Scrollable fade rounded>
            <CardBlock>
              {children}
            </CardBlock>
          </Scrollable>
        </Card>
      </div>
      <Overlay onClick={closePortal} />
    </div>
  )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default PortalWrapper(portalOptions)(Modal)