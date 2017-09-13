import PropTypes from 'prop-types'

export const triggerOnTypes = PropTypes.oneOf([
  'click',
  'focus',
  'hover',
  ''
])

export const portalWrapperTypes = {
  triggerOn: triggerOnTypes
}
