"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidebarItem = SidebarItem;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  };
});

function SidebarItem(props) {
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("li", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "body2"
  }, props.children));
}