"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theme = void 0;

var _styles = require("@material-ui/core/styles");

var t = (0, _styles.createMuiTheme)({
  palette: {
    primary: {
      main: '#9777B5'
    },
    secondary: {
      light: '#FFFAF7',
      main: '#F2B880'
    }
  },
  typography: {}
});
var theme = (0, _styles.responsiveFontSizes)(t);
exports.theme = theme;