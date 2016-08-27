webpackHotUpdate(0,{

/***/ 1847:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Store = __webpack_require__(625);\n\nvar _Store2 = _interopRequireDefault(_Store);\n\nvar _Api = __webpack_require__(627);\n\nvar _Api2 = _interopRequireDefault(_Api);\n\nvar _reactRouter = __webpack_require__(553);\n\nvar _ResourceUtils = __webpack_require__(779);\n\nvar _ResourceUtils2 = _interopRequireDefault(_ResourceUtils);\n\nvar _ResourcesStore = __webpack_require__(626);\n\nvar _ResourcesStore2 = _interopRequireDefault(_ResourcesStore);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ResourceStore = function () {\n\t/*------------------------------------------------------\n \tSet initial state in the Store.\n ------------------------------------------------------*/\n\n\tfunction ResourceStore() {\n\t\t_classCallCheck(this, ResourceStore);\n\n\t\t_Store2.default.initialize({\n\t\t\tresource: {}\n\t\t});\n\t\tthis.canSaveResource = true;\n\t}\n\n\t/*------------------------------------------------------\n \tGet the resource from the store\n ------------------------------------------------------*/\n\n\n\t_createClass(ResourceStore, [{\n\t\tkey: 'getResource',\n\t\tvalue: function getResource(_ref) {\n\t\t\tvar resourceId = _ref.resourceId;\n\n\t\t\tvar resource = _Store2.default.get().resources.find(function (_resource) {\n\t\t\t\treturn _resource.id === parseInt(resourceId, 10);\n\t\t\t}).toJS();\n\n\t\t\tresource.model = resource.model.map(function (model) {\n\t\t\t\tif (model.fakerSubcategory === 'arrayElement' || model.fakerSubcategory === 'objectElement') {\n\t\t\t\t\tmodel.fakerParams.json = JSON.stringify(model.fakerParams.json, null, 2);\n\t\t\t\t}\n\n\t\t\t\treturn model;\n\t\t\t});\n\n\t\t\t_Store2.default.get().resource.reset(resource);\n\t\t}\n\t}, {\n\t\tkey: 'updateResource',\n\t\tvalue: function updateResource(resource) {\n\t\t\tvar updatedResource = _Store2.default.get().resource.reset(resource);\n\t\t\tthis.saveResource(updatedResource);\n\t\t}\n\t}, {\n\t\tkey: 'throttle',\n\t\tvalue: function throttle(callback, limit) {\n\t\t\tvar wait = false;\n\t\t\treturn function () {\n\t\t\t\tif (!wait) {\n\t\t\t\t\tcallback.call();\n\t\t\t\t\twait = true;\n\t\t\t\t\tsetTimeout(function () {\n\t\t\t\t\t\twait = false;\n\t\t\t\t\t}, limit);\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\n\t\t/*------------------------------------------------------\n  \tSave a resource to the server\n  ------------------------------------------------------*/\n\n\t}, {\n\t\tkey: 'saveResource',\n\t\tvalue: function saveResource(resourceToUpdate) {\n\t\t\tvar _this = this;\n\n\t\t\tvar saveResource = this.throttle(function (resourceFromStore) {\n\t\t\t\tconsole.log('Called');\n\t\t\t\t_Store2.default.get().set({ resourceSaving: true });\n\n\t\t\t\tvar resource = resourceFromStore.toJS();\n\t\t\t\tresource.model = resource.model.map(function (model) {\n\t\t\t\t\tif (model.fakerSubcategory === 'arrayElement' || model.fakerSubcategory === 'objectElement') {\n\t\t\t\t\t\tmodel.fakerParams.json = JSON.parse(model.fakerParams.json);\n\t\t\t\t\t}\n\n\t\t\t\t\treturn model;\n\t\t\t\t});\n\n\t\t\t\tresource.validationConfig = _ResourceUtils2.default.generateValidationConfigForResource(resource);\n\n\t\t\t\t_Api2.default.put({\n\t\t\t\t\turl: {\n\t\t\t\t\t\tname: 'resource',\n\t\t\t\t\t\tresourceId: resource.id\n\t\t\t\t\t},\n\t\t\t\t\tpayload: resource\n\t\t\t\t}).then(function (resp) {\n\t\t\t\t\t_this.canSaveResource = true;\n\t\t\t\t\tresource.model = resp.body.model.map(function (model) {\n\t\t\t\t\t\tif (model.fakerSubcategory === 'arrayElement' || model.fakerSubcategory === 'objectElement') {\n\t\t\t\t\t\t\tmodel.fakerParams.json = JSON.stringify(model.fakerParams.json, null, 2);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn model;\n\t\t\t\t\t});\n\n\t\t\t\t\t_Store2.default.get().set({\n\t\t\t\t\t\tresourceSaving: false,\n\t\t\t\t\t\tresource: resource\n\t\t\t\t\t});\n\t\t\t\t\t_ResourcesStore2.default.updateResource(resource);\n\t\t\t\t});\n\t\t\t}, 1000);\n\t\t\tsaveResource(resourceToUpdate);\n\t\t}\n\n\t\t/*------------------------------------------------------\n  \tDelete a resource from the server\n  ------------------------------------------------------*/\n\n\t}, {\n\t\tkey: 'deleteResource',\n\t\tvalue: function deleteResource(resource) {\n\t\t\t_Store2.default.get().set({ resourceSaving: true });\n\n\t\t\t_Api2.default.destroy({\n\t\t\t\turl: {\n\t\t\t\t\tname: 'resource',\n\t\t\t\t\tresourceId: resource.id\n\t\t\t\t}\n\t\t\t}).then(function () {\n\t\t\t\t_reactRouter.browserHistory.push('/');\n\t\t\t\t_Store2.default.get().set({ resourceSaving: false });\n\t\t\t\t_ResourcesStore2.default.removeResource(resource.id);\n\t\t\t});\n\t\t}\n\n\t\t/*------------------------------------------------------\n  \tAdd a new model key to a resource\n  ------------------------------------------------------*/\n\n\t}, {\n\t\tkey: 'addAnotherKey',\n\t\tvalue: function addAnotherKey() {\n\t\t\t_Store2.default.get().resource.model.unshift({\n\t\t\t\tuuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {\n\t\t\t\t\tvar r = Math.random() * 16 | 0;\n\t\t\t\t\tvar v = c === 'x' ? r : r & 0x3 | 0x8;\n\t\t\t\t\treturn v.toString(16);\n\t\t\t\t}),\n\t\t\t\ttype: 'predefined',\n\t\t\t\tfakerSubCategory: '',\n\t\t\t\tfakerCategory: '',\n\t\t\t\tfakerParams: {},\n\t\t\t\tresource: {},\n\t\t\t\tpredefinedType: 'string',\n\t\t\t\tpredefinedValue: '',\n\t\t\t\trequired: false\n\t\t\t});\n\t\t}\n\n\t\t/*------------------------------------------------------\n  \tRemove a model key from the resource\n  ------------------------------------------------------*/\n\n\t}, {\n\t\tkey: 'removeModelKey',\n\t\tvalue: function removeModelKey(model, index) {\n\t\t\t_Store2.default.get().resource.model.splice(index, 1);\n\t\t}\n\t}]);\n\n\treturn ResourceStore;\n}();\n\nexports.default = new ResourceStore();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmVzL1Jlc291cmNlU3RvcmUuanM/Nzk3NyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7OztJQUVNLGE7Ozs7O0FBSUwsMEJBQWM7QUFBQTs7QUFDYixrQkFBTSxVQUFOLENBQWlCO0FBQ2hCLGFBQVU7QUFETSxHQUFqQjtBQUdBLE9BQUssZUFBTCxHQUF1QixJQUF2QjtBQUNBOzs7Ozs7Ozs7b0NBT0U7QUFBQSxPQURGLFVBQ0UsUUFERixVQUNFOztBQUNGLE9BQUksV0FBVyxnQkFBTSxHQUFOLEdBQVksU0FBWixDQUFzQixJQUF0QixDQUEyQixVQUFDLFNBQUQsRUFBZTtBQUN4RCxXQUFPLFVBQVUsRUFBVixLQUFpQixTQUFTLFVBQVQsRUFBcUIsRUFBckIsQ0FBeEI7QUFDQSxJQUZjLEVBRVosSUFGWSxFQUFmOztBQUlBLFlBQVMsS0FBVCxHQUFpQixTQUFTLEtBQVQsQ0FBZSxHQUFmLENBQW1CLFVBQUMsS0FBRCxFQUFXO0FBQzlDLFFBQUksTUFBTSxnQkFBTixLQUEyQixjQUEzQixJQUE2QyxNQUFNLGdCQUFOLEtBQTJCLGVBQTVFLEVBQTZGO0FBQzVGLFdBQU0sV0FBTixDQUFrQixJQUFsQixHQUF5QixLQUFLLFNBQUwsQ0FBZSxNQUFNLFdBQU4sQ0FBa0IsSUFBakMsRUFBdUMsSUFBdkMsRUFBNkMsQ0FBN0MsQ0FBekI7QUFDQTs7QUFFRCxXQUFPLEtBQVA7QUFDQSxJQU5nQixDQUFqQjs7QUFRQSxtQkFBTSxHQUFOLEdBQVksUUFBWixDQUFxQixLQUFyQixDQUEyQixRQUEzQjtBQUNBOzs7aUNBRWMsUSxFQUFVO0FBQ3hCLE9BQUksa0JBQWtCLGdCQUFNLEdBQU4sR0FBWSxRQUFaLENBQXFCLEtBQXJCLENBQTJCLFFBQTNCLENBQXRCO0FBQ0EsUUFBSyxZQUFMLENBQWtCLGVBQWxCO0FBQ0E7OzsyQkFFUSxRLEVBQVUsSyxF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QU8sRUFBRSxRQUFGLENBQVcsRUFBWCxDQUFQO0FBQ0EsS0FKSyxDQUQ0QjtBQU1sQyxVQUFNLFlBTjRCO0FBT2xDLHNCQUFrQixFQVBnQjtBQVFsQyxtQkFBZSxFQVJtQjtBQVNsQyxpQkFBYSxFQVRxQjtBQVVsQyxjQUFVLEVBVndCO0FBV2xDLG9CQUFnQixRQVhrQjtBQVlsQyxxQkFBaUIsRUFaaUI7QUFhbEMsY0FBVTtBQWJ3QixJQUFuQztBQWVBOzs7Ozs7OztpQ0FLYyxLLEVBQU8sSyxFQUFPO0FBQzVCLG1CQUFNLEdBQU4sR0FBWSxRQUFaLENBQXFCLEtBQXJCLENBQTJCLE1BQTNCLENBQWtDLEtBQWxDLEVBQXlDLENBQXpDO0FBQ0E7Ozs7OztrQkFHYSxJQUFJLGFBQUosRSIsImZpbGUiOiIxODQ3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3Jlcy9TdG9yZSc7XG5pbXBvcnQgQXBpIGZyb20gJ3V0aWxzL0FwaSc7XG5pbXBvcnQge2Jyb3dzZXJIaXN0b3J5fSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IFJlc291cmNlVXRpbHMgZnJvbSAnLi4vLi4vYmFja2VuZC9SZXNvdXJjZVV0aWxzLmpzJztcblxuaW1wb3J0IFJlc291cmNlc1N0b3JlIGZyb20gJ3N0b3Jlcy9SZXNvdXJjZXNTdG9yZSc7XG5cbmNsYXNzIFJlc291cmNlU3RvcmUge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFNldCBpbml0aWFsIHN0YXRlIGluIHRoZSBTdG9yZS5cblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0U3RvcmUuaW5pdGlhbGl6ZSh7XG5cdFx0XHRyZXNvdXJjZToge31cblx0XHR9KTtcblx0XHR0aGlzLmNhblNhdmVSZXNvdXJjZSA9IHRydWU7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdEdldCB0aGUgcmVzb3VyY2UgZnJvbSB0aGUgc3RvcmVcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Z2V0UmVzb3VyY2Uoe1xuXHRcdHJlc291cmNlSWRcblx0fSkge1xuXHRcdGxldCByZXNvdXJjZSA9IFN0b3JlLmdldCgpLnJlc291cmNlcy5maW5kKChfcmVzb3VyY2UpID0+IHtcblx0XHRcdHJldHVybiBfcmVzb3VyY2UuaWQgPT09IHBhcnNlSW50KHJlc291cmNlSWQsIDEwKTtcblx0XHR9KS50b0pTKCk7XG5cblx0XHRyZXNvdXJjZS5tb2RlbCA9IHJlc291cmNlLm1vZGVsLm1hcCgobW9kZWwpID0+IHtcblx0XHRcdGlmIChtb2RlbC5mYWtlclN1YmNhdGVnb3J5ID09PSAnYXJyYXlFbGVtZW50JyB8fCBtb2RlbC5mYWtlclN1YmNhdGVnb3J5ID09PSAnb2JqZWN0RWxlbWVudCcpIHtcblx0XHRcdFx0bW9kZWwuZmFrZXJQYXJhbXMuanNvbiA9IEpTT04uc3RyaW5naWZ5KG1vZGVsLmZha2VyUGFyYW1zLmpzb24sIG51bGwsIDIpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbW9kZWw7XG5cdFx0fSk7XG5cblx0XHRTdG9yZS5nZXQoKS5yZXNvdXJjZS5yZXNldChyZXNvdXJjZSk7XG5cdH1cblxuXHR1cGRhdGVSZXNvdXJjZShyZXNvdXJjZSkge1xuXHRcdGxldCB1cGRhdGVkUmVzb3VyY2UgPSBTdG9yZS5nZXQoKS5yZXNvdXJjZS5yZXNldChyZXNvdXJjZSk7XG5cdFx0dGhpcy5zYXZlUmVzb3VyY2UodXBkYXRlZFJlc291cmNlKTtcblx0fVxuXG5cdHRocm90dGxlKGNhbGxiYWNrLCBsaW1pdCkge1xuXHRcdGxldCB3YWl0ID0gZmFsc2U7XG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdGlmICghd2FpdCkge1xuXHRcdFx0XHRjYWxsYmFjay5jYWxsKCk7XG5cdFx0XHRcdHdhaXQgPSB0cnVlO1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHR3YWl0ID0gZmFsc2U7XG5cdFx0XHRcdH0sIGxpbWl0KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRTYXZlIGEgcmVzb3VyY2UgdG8gdGhlIHNlcnZlclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRzYXZlUmVzb3VyY2UocmVzb3VyY2VUb1VwZGF0ZSkge1xuXHRcdGNvbnN0IHNhdmVSZXNvdXJjZSA9IHRoaXMudGhyb3R0bGUoKHJlc291cmNlRnJvbVN0b3JlKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZygnQ2FsbGVkJyk7XG5cdFx0XHRTdG9yZS5nZXQoKS5zZXQoe3Jlc291cmNlU2F2aW5nOiB0cnVlfSk7XG5cblx0XHRcdGxldCByZXNvdXJjZSA9IHJlc291cmNlRnJvbVN0b3JlLnRvSlMoKTtcblx0XHRcdHJlc291cmNlLm1vZGVsID0gcmVzb3VyY2UubW9kZWwubWFwKChtb2RlbCkgPT4ge1xuXHRcdFx0XHRpZiAobW9kZWwuZmFrZXJTdWJjYXRlZ29yeSA9PT0gJ2FycmF5RWxlbWVudCcgfHwgbW9kZWwuZmFrZXJTdWJjYXRlZ29yeSA9PT0gJ29iamVjdEVsZW1lbnQnKSB7XG5cdFx0XHRcdFx0bW9kZWwuZmFrZXJQYXJhbXMuanNvbiA9IEpTT04ucGFyc2UobW9kZWwuZmFrZXJQYXJhbXMuanNvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbW9kZWw7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzb3VyY2UudmFsaWRhdGlvbkNvbmZpZyA9IFJlc291cmNlVXRpbHMuZ2VuZXJhdGVWYWxpZGF0aW9uQ29uZmlnRm9yUmVzb3VyY2UocmVzb3VyY2UpO1xuXG5cdFx0XHRBcGkucHV0KHtcblx0XHRcdFx0dXJsOiB7XG5cdFx0XHRcdFx0bmFtZTogJ3Jlc291cmNlJyxcblx0XHRcdFx0XHRyZXNvdXJjZUlkOiByZXNvdXJjZS5pZFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRwYXlsb2FkOiByZXNvdXJjZVxuXHRcdFx0fSkudGhlbigocmVzcCkgPT4ge1xuXHRcdFx0XHR0aGlzLmNhblNhdmVSZXNvdXJjZSA9IHRydWU7XG5cdFx0XHRcdHJlc291cmNlLm1vZGVsID0gcmVzcC5ib2R5Lm1vZGVsLm1hcCgobW9kZWwpID0+IHtcblx0XHRcdFx0XHRpZiAobW9kZWwuZmFrZXJTdWJjYXRlZ29yeSA9PT0gJ2FycmF5RWxlbWVudCcgfHwgbW9kZWwuZmFrZXJTdWJjYXRlZ29yeSA9PT0gJ29iamVjdEVsZW1lbnQnKSB7XG5cdFx0XHRcdFx0XHRtb2RlbC5mYWtlclBhcmFtcy5qc29uID0gSlNPTi5zdHJpbmdpZnkobW9kZWwuZmFrZXJQYXJhbXMuanNvbiwgbnVsbCwgMik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIG1vZGVsO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRTdG9yZS5nZXQoKS5zZXQoe1xuXHRcdFx0XHRcdHJlc291cmNlU2F2aW5nOiBmYWxzZSxcblx0XHRcdFx0XHRyZXNvdXJjZTogcmVzb3VyY2Vcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFJlc291cmNlc1N0b3JlLnVwZGF0ZVJlc291cmNlKHJlc291cmNlKTtcblx0XHRcdH0pO1xuXHRcdH0sIDEwMDApO1xuXHRcdHNhdmVSZXNvdXJjZShyZXNvdXJjZVRvVXBkYXRlKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0RGVsZXRlIGEgcmVzb3VyY2UgZnJvbSB0aGUgc2VydmVyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdGRlbGV0ZVJlc291cmNlKHJlc291cmNlKSB7XG5cdFx0U3RvcmUuZ2V0KCkuc2V0KHtyZXNvdXJjZVNhdmluZzogdHJ1ZX0pO1xuXG5cdFx0QXBpLmRlc3Ryb3koe1xuXHRcdFx0dXJsOiB7XG5cdFx0XHRcdG5hbWU6ICdyZXNvdXJjZScsXG5cdFx0XHRcdHJlc291cmNlSWQ6IHJlc291cmNlLmlkXG5cdFx0XHR9XG5cdFx0fSkudGhlbigoKSA9PiB7XG5cdFx0XHRicm93c2VySGlzdG9yeS5wdXNoKGAvYCk7XG5cdFx0XHRTdG9yZS5nZXQoKS5zZXQoe3Jlc291cmNlU2F2aW5nOiBmYWxzZX0pO1xuXHRcdFx0UmVzb3VyY2VzU3RvcmUucmVtb3ZlUmVzb3VyY2UocmVzb3VyY2UuaWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRBZGQgYSBuZXcgbW9kZWwga2V5IHRvIGEgcmVzb3VyY2Vcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0YWRkQW5vdGhlcktleSgpIHtcblx0XHRTdG9yZS5nZXQoKS5yZXNvdXJjZS5tb2RlbC51bnNoaWZ0KHtcblx0XHRcdHV1aWQ6ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcblx0XHRcdFx0bGV0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwO1xuXHRcdFx0XHRsZXQgdiA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCk7XG5cdFx0XHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcblx0XHRcdH0pLFxuXHRcdFx0dHlwZTogJ3ByZWRlZmluZWQnLFxuXHRcdFx0ZmFrZXJTdWJDYXRlZ29yeTogJycsXG5cdFx0XHRmYWtlckNhdGVnb3J5OiAnJyxcblx0XHRcdGZha2VyUGFyYW1zOiB7fSxcblx0XHRcdHJlc291cmNlOiB7fSxcblx0XHRcdHByZWRlZmluZWRUeXBlOiAnc3RyaW5nJyxcblx0XHRcdHByZWRlZmluZWRWYWx1ZTogJycsXG5cdFx0XHRyZXF1aXJlZDogZmFsc2Vcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0UmVtb3ZlIGEgbW9kZWwga2V5IGZyb20gdGhlIHJlc291cmNlXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdHJlbW92ZU1vZGVsS2V5KG1vZGVsLCBpbmRleCkge1xuXHRcdFN0b3JlLmdldCgpLnJlc291cmNlLm1vZGVsLnNwbGljZShpbmRleCwgMSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFJlc291cmNlU3RvcmUoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3N0b3Jlcy9SZXNvdXJjZVN0b3JlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }

})