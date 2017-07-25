'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = require('../../utilities/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  disableSelect: _propTypes2.default.bool,
  light: _propTypes2.default.bool,
  selector: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  size: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number])
};
var defaultProps = {
  className: '',
  disableSelect: false,
  light: false,
  selector: false,
  size: false
};

var Heading = function Heading(props) {
  var disableSelect = props.disableSelect,
      light = props.light,
      selector = props.selector,
      size = props.size;


  var className = (0, _classNames2.default)('c-Heading', disableSelect && 'is-disable-select', light && 'is-light', size && 'c-Heading--' + size, props.className);

  var selectorTag = selector ? selector : 'div';

  var element = _react2.default.createElement(selectorTag, _extends({}, props, {
    className: className
  }), props.children);

  return element;
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

exports.default = Heading;