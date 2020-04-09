"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpanAlert = SpanAlert;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      borderRadius: '0',
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    }
  };
});

function SpanAlert(props) {
  var classes = useStyles();
  var theme = (0, _styles.useTheme)();
  var msgColor = 'inherit';

  if (props.message === 'error') {
    msgColor = theme.palette.error.light;
  } else if (props.message === 'warning') {
    msgColor = theme.palette.warning.light;
  } else if (props.message === 'success') {
    msgColor = theme.palette.success.light;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root,
    style: {
      backgroundColor: msgColor
    }
  }, props.children);
}