"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecondaryButton = SecondaryButton;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      borderRadius: '0',
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  };
});

function SecondaryButton(props) {
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: classes.root,
    variant: "contained",
    color: "secondary"
  }, props.children);
}