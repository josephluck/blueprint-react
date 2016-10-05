webpackHotUpdate(0,{

/***/ 641:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(383);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactHighlight = __webpack_require__(642);\n\nvar _reactHighlight2 = _interopRequireDefault(_reactHighlight);\n\nvar _ResourceUtils = __webpack_require__(783);\n\nvar _ResourceUtils2 = _interopRequireDefault(_ResourceUtils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ResourceDocumentation = function (_Component) {\n\t_inherits(ResourceDocumentation, _Component);\n\n\tfunction ResourceDocumentation(props) {\n\t\t_classCallCheck(this, ResourceDocumentation);\n\n\t\treturn _possibleConstructorReturn(this, Object.getPrototypeOf(ResourceDocumentation).call(this, props));\n\t}\n\n\t_createClass(ResourceDocumentation, [{\n\t\tkey: 'truncateArrayOfRecords',\n\t\tvalue: function truncateArrayOfRecords(records) {\n\t\t\treturn records.slice(0, 2);\n\t\t}\n\t}, {\n\t\tkey: 'getSingleRecordFromResponse',\n\t\tvalue: function getSingleRecordFromResponse(model) {\n\t\t\tif (this.props.resource.type === 'array') {\n\t\t\t\treturn model[0];\n\t\t\t}\n\t\t\treturn model;\n\t\t}\n\t}, {\n\t\tkey: 'getRequestExample',\n\t\tvalue: function getRequestExample() {\n\t\t\tvar models = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];\n\n\t\t\treturn _ResourceUtils2.default.generateModel(models);\n\t\t}\n\t}, {\n\t\tkey: 'getModelParameterType',\n\t\tvalue: function getModelParameterType(parameter) {\n\t\t\treturn _typeof(_ResourceUtils2.default.generatePropertyValue(parameter));\n\t\t}\n\t}, {\n\t\tkey: 'getModelParameterConstraints',\n\t\tvalue: function getModelParameterConstraints(parameter) {\n\t\t\tvar constraints = parameter.required ? 'Required ' : 'Optional ';\n\t\t\tvar validation = _ResourceUtils2.default.getSingleRequestParameterValidationRequirements(parameter);\n\n\t\t\tconstraints = constraints + this.getModelParameterType(parameter) + '. ';\n\n\t\t\tif (validation.numericality) {\n\t\t\t\tconstraints = constraints + 'Must be a number. ';\n\t\t\t}\n\t\t\tif (validation.email) {\n\t\t\t\tconstraints = constraints + 'Must be a valid e-mail address. ';\n\t\t\t}\n\t\t\tif (validation.datetime) {\n\t\t\t\tconstraints = constraints + 'Must be a valid date';\n\t\t\t\tif (validation.datetime.earliest && validation.datetime.latest) {\n\t\t\t\t\tconstraints = constraints + (' between ' + validation.datetime.earliest + ' and ' + validation.datetime.latest + '. ');\n\t\t\t\t} else if (validation.datetime.earliest) {\n\t\t\t\t\tconstraints = constraints + (' later than ' + validation.datetime.earliest + '. ');\n\t\t\t\t} else if (validation.datetime.latest) {\n\t\t\t\t\tconstraints = constraints + (' before ' + validation.datetime.latest + '. ');\n\t\t\t\t} else {\n\t\t\t\t\tconstraints = constraints + '. ';\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (validation.inclusion) {\n\t\t\t\tconstraints = constraints + 'Must be a valid list item. ';\n\t\t\t}\n\t\t\tif (validation.boolean) {\n\t\t\t\tconstraints = constraints + 'Must be either true or false. ';\n\t\t\t}\n\n\t\t\treturn constraints;\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _this2 = this;\n\n\t\t\tvar requestExample = this.getRequestExample(this.props.resource.model);\n\t\t\tvar responseExample = requestExample;\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'flex' },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'flex-1 overflow-hidden flex-column' },\n\t\t\t\t\tthis.props.resource.supportedMethods.post ? _react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'flex-1 flex' },\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: 'flex-1 pb6' },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t{ className: 'section-title' },\n\t\t\t\t\t\t\t\t'Create ' + this.props.resource.name\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t{ className: 'pa3' },\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\tthis.props.resource.model.map(function (parameter, i) {\n\t\t\t\t\t\t\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t\t\t{ key: i,\n\t\t\t\t\t\t\t\t\t\t\t\tclassName: 'flex flex-1 mb3' },\n\t\t\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t\t\t\t{ className: 'flex-2 overflow-hidden tr' },\n\t\t\t\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t\t\t\t\t{ className: 'ww-break-word monospace mb3' },\n\t\t\t\t\t\t\t\t\t\t\t\t\tparameter.key\n\t\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t\t\t\t{ className: 'flex-3 ml3' },\n\t\t\t\t\t\t\t\t\t\t\t\t_this2.getModelParameterConstraints(parameter),\n\t\t\t\t\t\t\t\t\t\t\t\t\" \",\n\t\t\t\t\t\t\t\t\t\t\t\tparameter.documentationDescription\n\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t);\n\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: 'flex-1 overflow-hidden documentation-code-examples pb6' },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t{ className: 'section-title invisible' },\n\t\t\t\t\t\t\t\t'Create ' + this.props.resource.name\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t{ className: 'pa3' },\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: 'pb2' },\n\t\t\t\t\t\t\t\t\t\"Request method & url\"\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: 'mb3' },\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t'code',\n\t\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t\t'POST /' + this.props.resource.name\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: 'pb2' },\n\t\t\t\t\t\t\t\t\t\"Request body\"\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: 'mb3' },\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t_reactHighlight2.default,\n\t\t\t\t\t\t\t\t\t\t{ className: 'javascript' },\n\t\t\t\t\t\t\t\t\t\tJSON.stringify(requestExample, null, 2)\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: 'pb2' },\n\t\t\t\t\t\t\t\t\t\"Response body\"\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: 'mb3' },\n\t\t\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t\t\t_reactHighlight2.default,\n\t\t\t\t\t\t\t\t\t\t{ className: 'javascript' },\n\t\t\t\t\t\t\t\t\t\tJSON.stringify(responseExample, null, 2)\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t) : null\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn ResourceDocumentation;\n}(_react.Component);\n\nResourceDocumentation.propTypes = {\n\tresource: _react2.default.PropTypes.object,\n\tresources: _react2.default.PropTypes.array\n};\n\nexports.default = ResourceDocumentation;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZXNvdXJjZURvY3VtZW50YXRpb24uanM/NGE2OSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTSxxQjs7O0FBQ0wsZ0NBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLGtHQUNaLEtBRFk7QUFFbEI7Ozs7eUNBRXNCLE8sRUFBUztBQUMvQixVQUFPLFFBQVEsS0FBUixDQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FBUDtBQUNBOzs7OENBRTJCLEssRUFBTztBQUNsQyxPQUFJLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsSUFBcEIsS0FBNkIsT0FBakMsRUFBMEM7QUFDekMsV0FBTyxNQUFNLENBQU4sQ0FBUDtBQUNBO0FBQ0QsVUFBTyxLQUFQO0FBQ0E7OztzQ0FFOEI7QUFBQSxPQUFiLE1BQWEseURBQUosRUFBSTs7QUFDOUIsVUFBTyx3QkFBYyxhQUFkLENBQTRCLE1BQTVCLENBQVA7QUFDQTs7O3dDQUVxQixTLEVBQVc7QUFDaEMsa0JBQWUsd0JBQWMscUJBQWQsQ0FBb0MsU0FBcEMsQ0FBZjtBQUNBOzs7K0NBRTRCLFMsRUFBVztBQUN2QyxPQUFJLGNBQWMsVUFBVSxRQUFWLEdBQXFCLFdBQXJCLEdBQW1DLFdBQXJEO0FBQ0EsT0FBSSxhQUFhLHdCQUFjLCtDQUFkLENBQThELFNBQTlELENBQWpCOztBQUVBLGlCQUFjLGNBQWMsS0FBSyxxQkFBTCxDQUEyQixTQUEzQixDQUFkLEdBQXNELElBQXBFOztBQUVBLE9BQUksV0FBVyxZQUFmLEVBQTZCO0FBQzVCLGtCQUFjLGNBQWMsb0JBQTVCO0FBQ0E7QUFDRCxPQUFJLFdBQVcsS0FBZixFQUFzQjtBQUNyQixrQkFBYyxjQUFjLGtDQUE1QjtBQUNBO0FBQ0QsT0FBSSxXQUFXLFFBQWYsRUFBeUI7QUFDeEIsa0JBQWMsY0FBYyxzQkFBNUI7QUFDQSxRQUFJLFdBQVcsUUFBWCxD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V0FBVSxZQUFyQjtBQUNFLGVBQUssU0FBTCxDQUFlLGVBQWYsRUFBZ0MsSUFBaEMsRUFBc0MsQ0FBdEM7QUFERjtBQUREO0FBdEJEO0FBSkQ7QUEzQkQsTUFEQSxHQThERTtBQS9ESjtBQURELElBREQ7QUFzRUE7Ozs7OztBQUdGLHNCQUFzQixTQUF0QixHQUFrQztBQUNqQyxXQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsTUFETztBQUVqQyxZQUFXLGdCQUFNLFNBQU4sQ0FBZ0I7QUFGTSxDQUFsQzs7a0JBS2UscUIiLCJmaWxlIjoiNjQxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGlnaGxpZ2h0IGZyb20gJ3JlYWN0LWhpZ2hsaWdodCc7XG5pbXBvcnQgUmVzb3VyY2VVdGlscyBmcm9tICcuLi8uLi9iYWNrZW5kL1Jlc291cmNlVXRpbHMuanMnO1xuXG5jbGFzcyBSZXNvdXJjZURvY3VtZW50YXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXG5cdHRydW5jYXRlQXJyYXlPZlJlY29yZHMocmVjb3Jkcykge1xuXHRcdHJldHVybiByZWNvcmRzLnNsaWNlKDAsIDIpO1xuXHR9XG5cblx0Z2V0U2luZ2xlUmVjb3JkRnJvbVJlc3BvbnNlKG1vZGVsKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMucmVzb3VyY2UudHlwZSA9PT0gJ2FycmF5Jykge1xuXHRcdFx0cmV0dXJuIG1vZGVsWzBdO1xuXHRcdH1cblx0XHRyZXR1cm4gbW9kZWw7XG5cdH1cblxuXHRnZXRSZXF1ZXN0RXhhbXBsZShtb2RlbHMgPSB7fSkge1xuXHRcdHJldHVybiBSZXNvdXJjZVV0aWxzLmdlbmVyYXRlTW9kZWwobW9kZWxzKTtcblx0fVxuXG5cdGdldE1vZGVsUGFyYW1ldGVyVHlwZShwYXJhbWV0ZXIpIHtcblx0XHRyZXR1cm4gdHlwZW9mIChSZXNvdXJjZVV0aWxzLmdlbmVyYXRlUHJvcGVydHlWYWx1ZShwYXJhbWV0ZXIpKTtcblx0fVxuXG5cdGdldE1vZGVsUGFyYW1ldGVyQ29uc3RyYWludHMocGFyYW1ldGVyKSB7XG5cdFx0bGV0IGNvbnN0cmFpbnRzID0gcGFyYW1ldGVyLnJlcXVpcmVkID8gJ1JlcXVpcmVkICcgOiAnT3B0aW9uYWwgJztcblx0XHRsZXQgdmFsaWRhdGlvbiA9IFJlc291cmNlVXRpbHMuZ2V0U2luZ2xlUmVxdWVzdFBhcmFtZXRlclZhbGlkYXRpb25SZXF1aXJlbWVudHMocGFyYW1ldGVyKTtcblxuXHRcdGNvbnN0cmFpbnRzID0gY29uc3RyYWludHMgKyB0aGlzLmdldE1vZGVsUGFyYW1ldGVyVHlwZShwYXJhbWV0ZXIpICsgJy4gJztcblxuXHRcdGlmICh2YWxpZGF0aW9uLm51bWVyaWNhbGl0eSkge1xuXHRcdFx0Y29uc3RyYWludHMgPSBjb25zdHJhaW50cyArICdNdXN0IGJlIGEgbnVtYmVyLiAnO1xuXHRcdH1cblx0XHRpZiAodmFsaWRhdGlvbi5lbWFpbCkge1xuXHRcdFx0Y29uc3RyYWludHMgPSBjb25zdHJhaW50cyArICdNdXN0IGJlIGEgdmFsaWQgZS1tYWlsIGFkZHJlc3MuICc7XG5cdFx0fVxuXHRcdGlmICh2YWxpZGF0aW9uLmRhdGV0aW1lKSB7XG5cdFx0XHRjb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzICsgJ011c3QgYmUgYSB2YWxpZCBkYXRlJztcblx0XHRcdGlmICh2YWxpZGF0aW9uLmRhdGV0aW1lLmVhcmxpZXN0ICYmIHZhbGlkYXRpb24uZGF0ZXRpbWUubGF0ZXN0KSB7XG5cdFx0XHRcdGNvbnN0cmFpbnRzID0gY29uc3RyYWludHMgKyBgIGJldHdlZW4gJHt2YWxpZGF0aW9uLmRhdGV0aW1lLmVhcmxpZXN0fSBhbmQgJHt2YWxpZGF0aW9uLmRhdGV0aW1lLmxhdGVzdH0uIGA7XG5cdFx0XHR9IGVsc2UgaWYgKHZhbGlkYXRpb24uZGF0ZXRpbWUuZWFybGllc3QpIHtcblx0XHRcdFx0Y29uc3RyYWludHMgPSBjb25zdHJhaW50cyArIGAgbGF0ZXIgdGhhbiAke3ZhbGlkYXRpb24uZGF0ZXRpbWUuZWFybGllc3R9LiBgO1xuXHRcdFx0fSBlbHNlIGlmICh2YWxpZGF0aW9uLmRhdGV0aW1lLmxhdGVzdCkge1xuXHRcdFx0XHRjb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzICsgYCBiZWZvcmUgJHt2YWxpZGF0aW9uLmRhdGV0aW1lLmxhdGVzdH0uIGA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzICsgJy4gJztcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHZhbGlkYXRpb24uaW5jbHVzaW9uKSB7XG5cdFx0XHRjb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzICsgJ011c3QgYmUgYSB2YWxpZCBsaXN0IGl0ZW0uICc7XG5cdFx0fVxuXHRcdGlmICh2YWxpZGF0aW9uLmJvb2xlYW4pIHtcblx0XHRcdGNvbnN0cmFpbnRzID0gY29uc3RyYWludHMgKyAnTXVzdCBiZSBlaXRoZXIgdHJ1ZSBvciBmYWxzZS4gJztcblx0XHR9XG5cblx0XHRyZXR1cm4gY29uc3RyYWludHM7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHJlcXVlc3RFeGFtcGxlID0gdGhpcy5nZXRSZXF1ZXN0RXhhbXBsZSh0aGlzLnByb3BzLnJlc291cmNlLm1vZGVsKTtcblx0XHRsZXQgcmVzcG9uc2VFeGFtcGxlID0gcmVxdWVzdEV4YW1wbGU7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LWhpZGRlbiBmbGV4LWNvbHVtblwiPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLnJlc291cmNlLnN1cHBvcnRlZE1ldGhvZHMucG9zdCA/XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4XCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIHBiNlwiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvbi10aXRsZVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0e2BDcmVhdGUgJHt0aGlzLnByb3BzLnJlc291cmNlLm5hbWV9YH1cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhM1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0e3RoaXMucHJvcHMucmVzb3VyY2UubW9kZWwubWFwKChwYXJhbWV0ZXIsIGkpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBrZXk9e2l9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImZsZXggZmxleC0xIG1iM1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMiBvdmVyZmxvdy1oaWRkZW4gdHJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInd3LWJyZWFrLXdvcmQgbW9ub3NwYWNlIG1iM1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e3BhcmFtZXRlci5rZXl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMyBtbDNcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7dGhpcy5nZXRNb2RlbFBhcmFtZXRlckNvbnN0cmFpbnRzKHBhcmFtZXRlcil9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1wiIFwifVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtwYXJhbWV0ZXIuZG9jdW1lbnRhdGlvbkRlc2NyaXB0aW9ufVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pfVxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy1oaWRkZW4gZG9jdW1lbnRhdGlvbi1jb2RlLWV4YW1wbGVzIHBiNlwiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvbi10aXRsZSBpbnZpc2libGVcIj5cblx0XHRcdFx0XHRcdFx0XHRcdHtgQ3JlYXRlICR7dGhpcy5wcm9wcy5yZXNvdXJjZS5uYW1lfWB9XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYTNcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGIyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtcIlJlcXVlc3QgbWV0aG9kICYgdXJsXCJ9XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWIzXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxjb2RlPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtgUE9TVCAvJHt0aGlzLnByb3BzLnJlc291cmNlLm5hbWV9YH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9jb2RlPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGIyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtcIlJlcXVlc3QgYm9keVwifVxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1iM1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8SGlnaGxpZ2h0IGNsYXNzTmFtZT1cImphdmFzY3JpcHRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdEV4YW1wbGUsIG51bGwsIDIpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0hpZ2hsaWdodD5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBiMlwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7XCJSZXNwb25zZSBib2R5XCJ9XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWIzXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxIaWdobGlnaHQgY2xhc3NOYW1lPVwiamF2YXNjcmlwdFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtKU09OLnN0cmluZ2lmeShyZXNwb25zZUV4YW1wbGUsIG51bGwsIDIpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0hpZ2hsaWdodD5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0OiBudWxsXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuUmVzb3VyY2VEb2N1bWVudGF0aW9uLnByb3BUeXBlcyA9IHtcblx0cmVzb3VyY2U6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdHJlc291cmNlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXNvdXJjZURvY3VtZW50YXRpb247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb21wb25lbnRzL1Jlc291cmNlRG9jdW1lbnRhdGlvbi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }

})