webpackHotUpdate(0,{

/***/ 1847:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Store = __webpack_require__(625);\n\nvar _Store2 = _interopRequireDefault(_Store);\n\nvar _Api = __webpack_require__(627);\n\nvar _Api2 = _interopRequireDefault(_Api);\n\nvar _reactRouter = __webpack_require__(553);\n\nvar _ResourceUtils = __webpack_require__(779);\n\nvar _ResourceUtils2 = _interopRequireDefault(_ResourceUtils);\n\nvar _ResourcesStore = __webpack_require__(626);\n\nvar _ResourcesStore2 = _interopRequireDefault(_ResourcesStore);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ResourceStore = function () {\n\t/*------------------------------------------------------\n \tSet initial state in the Store.\n ------------------------------------------------------*/\n\n\tfunction ResourceStore() {\n\t\t_classCallCheck(this, ResourceStore);\n\n\t\t_Store2.default.initialize({\n\t\t\tresource: {}\n\t\t});\n\t\tthis.canSaveResource = true;\n\t}\n\n\t/*------------------------------------------------------\n \tGet the resource from the store\n ------------------------------------------------------*/\n\n\n\t_createClass(ResourceStore, [{\n\t\tkey: 'getResource',\n\t\tvalue: function getResource(_ref) {\n\t\t\tvar resourceId = _ref.resourceId;\n\n\t\t\tvar resource = _Store2.default.get().resources.find(function (_resource) {\n\t\t\t\treturn _resource.id === parseInt(resourceId, 10);\n\t\t\t}).toJS();\n\n\t\t\tresource.model = resource.model.map(function (model) {\n\t\t\t\tif (model.fakerSubcategory === 'arrayElement' || model.fakerSubcategory === 'objectElement') {\n\t\t\t\t\tmodel.fakerParams.json = JSON.stringify(model.fakerParams.json, null, 2);\n\t\t\t\t}\n\n\t\t\t\treturn model;\n\t\t\t});\n\n\t\t\t_Store2.default.get().resource.reset(resource);\n\t\t}\n\t}, {\n\t\tkey: 'updateResource',\n\t\tvalue: function updateResource(resource) {\n\t\t\tvar updatedResource = _Store2.default.get().resource.reset(resource);\n\t\t\tthis.saveResource(updatedResource);\n\t\t}\n\n\t\t/*------------------------------------------------------\n  \tSave a resource to the server\n  ------------------------------------------------------*/\n\n\t}, {\n\t\tkey: 'saveResource',\n\t\tvalue: function saveResource(resourceFromStore) {\n\t\t\tvar _this = this;\n\n\t\t\tif (this.canSaveResource) {\n\t\t\t\t(function () {\n\t\t\t\t\tconsole.log('Called');\n\t\t\t\t\t_this.canSaveResource = false;\n\t\t\t\t\t_Store2.default.get().set({ resourceSaving: true });\n\n\t\t\t\t\tvar resource = resourceFromStore.toJS();\n\t\t\t\t\tresource.model = resource.model.map(function (model) {\n\t\t\t\t\t\tif (model.fakerSubcategory === 'arrayElement' || model.fakerSubcategory === 'objectElement') {\n\t\t\t\t\t\t\tmodel.fakerParams.json = JSON.parse(model.fakerParams.json);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn model;\n\t\t\t\t\t});\n\n\t\t\t\t\tresource.validationConfig = _ResourceUtils2.default.generateValidationConfigForResource(resource);\n\n\t\t\t\t\t_Api2.default.put({\n\t\t\t\t\t\turl: {\n\t\t\t\t\t\t\tname: 'resource',\n\t\t\t\t\t\t\tresourceId: resource.id\n\t\t\t\t\t\t},\n\t\t\t\t\t\tpayload: resource\n\t\t\t\t\t}).then(function (resp) {\n\t\t\t\t\t\t_this.canSaveResource = true;\n\t\t\t\t\t\tresource.model = resp.body.model.map(function (model) {\n\t\t\t\t\t\t\tif (model.fakerSubcategory === 'arrayElement' || model.fakerSubcategory === 'objectElement') {\n\t\t\t\t\t\t\t\tmodel.fakerParams.json = JSON.stringify(model.fakerParams.json, null, 2);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\treturn model;\n\t\t\t\t\t\t});\n\n\t\t\t\t\t\t_Store2.default.get().set({\n\t\t\t\t\t\t\tresourceSaving: false,\n\t\t\t\t\t\t\tresource: resource\n\t\t\t\t\t\t});\n\t\t\t\t\t\t_ResourcesStore2.default.updateResource(resource);\n\t\t\t\t\t});\n\t\t\t\t})();\n\t\t\t}\n\t\t\treturn;\n\t\t}\n\n\t\t/*------------------------------------------------------\n  \tDelete a resource from the server\n  ------------------------------------------------------*/\n\n\t}, {\n\t\tkey: 'deleteResource',\n\t\tvalue: function deleteResource(resource) {\n\t\t\t_Store2.default.get().set({ resourceSaving: true });\n\n\t\t\t_Api2.default.destroy({\n\t\t\t\turl: {\n\t\t\t\t\tname: 'resource',\n\t\t\t\t\tresourceId: resource.id\n\t\t\t\t}\n\t\t\t}).then(function () {\n\t\t\t\t_reactRouter.browserHistory.push('/');\n\t\t\t\t_Store2.default.get().set({ resourceSaving: false });\n\t\t\t\t_ResourcesStore2.default.removeResource(resource.id);\n\t\t\t});\n\t\t}\n\n\t\t/*------------------------------------------------------\n  \tAdd a new model key to a resource\n  ------------------------------------------------------*/\n\n\t}, {\n\t\tkey: 'addAnotherKey',\n\t\tvalue: function addAnotherKey() {\n\t\t\t_Store2.default.get().resource.model.unshift({\n\t\t\t\tuuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {\n\t\t\t\t\tvar r = Math.random() * 16 | 0;\n\t\t\t\t\tvar v = c === 'x' ? r : r & 0x3 | 0x8;\n\t\t\t\t\treturn v.toString(16);\n\t\t\t\t}),\n\t\t\t\ttype: 'predefined',\n\t\t\t\tfakerSubCategory: '',\n\t\t\t\tfakerCategory: '',\n\t\t\t\tfakerParams: {},\n\t\t\t\tresource: {},\n\t\t\t\tpredefinedType: 'string',\n\t\t\t\tpredefinedValue: '',\n\t\t\t\trequired: false\n\t\t\t});\n\t\t}\n\n\t\t/*------------------------------------------------------\n  \tRemove a model key from the resource\n  ------------------------------------------------------*/\n\n\t}, {\n\t\tkey: 'removeModelKey',\n\t\tvalue: function removeModelKey(model, index) {\n\t\t\t_Store2.default.get().resource.model.splice(index, 1);\n\t\t}\n\t}]);\n\n\treturn ResourceStore;\n}();\n\nexports.default = new ResourceStore();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmVzL1Jlc291cmNlU3RvcmUuanM/Nzk3NyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7OztJQUVNLGE7Ozs7O0FBSUwsMEJBQWM7QUFBQTs7QUFDYixrQkFBTSxVQUFOLENBQWlCO0FBQ2hCLGFBQVU7QUFETSxHQUFqQjtBQUdBLE9BQUssZUFBTCxHQUF1QixJQUF2QjtBQUNBOzs7Ozs7Ozs7b0NBT0U7QUFBQSxPQURGLFVBQ0UsUUFERixVQUNFOztBQUNGLE9BQUksV0FBVyxnQkFBTSxHQUFOLEdBQVksU0FBWixDQUFzQixJQUF0QixDQUEyQixVQUFDLFNBQUQsRUFBZTtBQUN4RCxXQUFPLFVBQVUsRUFBVixLQUFpQixTQUFTLFVBQVQsRUFBcUIsRUFBckIsQ0FBeEI7QUFDQSxJQUZjLEVBRVosSUFGWSxFQUFmOztBQUlBLFlBQVMsS0FBVCxHQUFpQixTQUFTLEtBQVQsQ0FBZSxHQUFmLENBQW1CLFVBQUMsS0FBRCxFQUFXO0FBQzlDLFFBQUksTUFBTSxnQkFBTixLQUEyQixjQUEzQixJQUE2QyxNQUFNLGdCQUFOLEtBQTJCLGVBQTVFLEVBQTZGO0FBQzVGLFdBQU0sV0FBTixDQUFrQixJQUFsQixHQUF5QixLQUFLLFNBQUwsQ0FBZSxNQUFNLFdBQU4sQ0FBa0IsSUFBakMsRUFBdUMsSUFBdkMsRUFBNkMsQ0FBN0MsQ0FBekI7QUFDQTs7QUFFRCxXQUFPLEtBQVA7QUFDQSxJQU5nQixDQUFqQjs7QUFRQSxtQkFBTSxHQUFOLEdBQVksUUFBWixDQUFxQixLQUFyQixDQUEyQixRQUEzQjtBQUNBOzs7aUNBRWMsUSxFQUFVO0FBQ3hCLE9BQUksa0JBQWtCLGdCQUFNLEdBQU4sR0FBWSxRQUFaLENBQXFCLEtBQXJCLENBQTJCLFFBQTNCLENBQXRCO0FBQ0EsUUFBSyxZQUFMLENBQWtCLGVBQWxCO0FBQ0E7Ozs7Ozs7OytCQUtZLGlCLEVB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aUNBS2MsSyxFQUFPLEssRUFBTztBQUM1QixtQkFBTSxHQUFOLEdBQVksUUFBWixDQUFxQixLQUFyQixDQUEyQixNQUEzQixDQUFrQyxLQUFsQyxFQUF5QyxDQUF6QztBQUNBOzs7Ozs7a0JBR2EsSUFBSSxhQUFKLEUiLCJmaWxlIjoiMTg0Ny5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdG9yZSBmcm9tICdzdG9yZXMvU3RvcmUnO1xuaW1wb3J0IEFwaSBmcm9tICd1dGlscy9BcGknO1xuaW1wb3J0IHticm93c2VySGlzdG9yeX0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBSZXNvdXJjZVV0aWxzIGZyb20gJy4uLy4uL2JhY2tlbmQvUmVzb3VyY2VVdGlscy5qcyc7XG5cbmltcG9ydCBSZXNvdXJjZXNTdG9yZSBmcm9tICdzdG9yZXMvUmVzb3VyY2VzU3RvcmUnO1xuXG5jbGFzcyBSZXNvdXJjZVN0b3JlIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRTZXQgaW5pdGlhbCBzdGF0ZSBpbiB0aGUgU3RvcmUuXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdFN0b3JlLmluaXRpYWxpemUoe1xuXHRcdFx0cmVzb3VyY2U6IHt9XG5cdFx0fSk7XG5cdFx0dGhpcy5jYW5TYXZlUmVzb3VyY2UgPSB0cnVlO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRHZXQgdGhlIHJlc291cmNlIGZyb20gdGhlIHN0b3JlXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdGdldFJlc291cmNlKHtcblx0XHRyZXNvdXJjZUlkXG5cdH0pIHtcblx0XHRsZXQgcmVzb3VyY2UgPSBTdG9yZS5nZXQoKS5yZXNvdXJjZXMuZmluZCgoX3Jlc291cmNlKSA9PiB7XG5cdFx0XHRyZXR1cm4gX3Jlc291cmNlLmlkID09PSBwYXJzZUludChyZXNvdXJjZUlkLCAxMCk7XG5cdFx0fSkudG9KUygpO1xuXG5cdFx0cmVzb3VyY2UubW9kZWwgPSByZXNvdXJjZS5tb2RlbC5tYXAoKG1vZGVsKSA9PiB7XG5cdFx0XHRpZiAobW9kZWwuZmFrZXJTdWJjYXRlZ29yeSA9PT0gJ2FycmF5RWxlbWVudCcgfHwgbW9kZWwuZmFrZXJTdWJjYXRlZ29yeSA9PT0gJ29iamVjdEVsZW1lbnQnKSB7XG5cdFx0XHRcdG1vZGVsLmZha2VyUGFyYW1zLmpzb24gPSBKU09OLnN0cmluZ2lmeShtb2RlbC5mYWtlclBhcmFtcy5qc29uLCBudWxsLCAyKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG1vZGVsO1xuXHRcdH0pO1xuXG5cdFx0U3RvcmUuZ2V0KCkucmVzb3VyY2UucmVzZXQocmVzb3VyY2UpO1xuXHR9XG5cblx0dXBkYXRlUmVzb3VyY2UocmVzb3VyY2UpIHtcblx0XHRsZXQgdXBkYXRlZFJlc291cmNlID0gU3RvcmUuZ2V0KCkucmVzb3VyY2UucmVzZXQocmVzb3VyY2UpO1xuXHRcdHRoaXMuc2F2ZVJlc291cmNlKHVwZGF0ZWRSZXNvdXJjZSk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFNhdmUgYSByZXNvdXJjZSB0byB0aGUgc2VydmVyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdHNhdmVSZXNvdXJjZShyZXNvdXJjZUZyb21TdG9yZSkge1xuXHRcdGlmICh0aGlzLmNhblNhdmVSZXNvdXJjZSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ0NhbGxlZCcpO1xuXHRcdFx0dGhpcy5jYW5TYXZlUmVzb3VyY2UgPSBmYWxzZTtcblx0XHRcdFN0b3JlLmdldCgpLnNldCh7cmVzb3VyY2VTYXZpbmc6IHRydWV9KTtcblxuXHRcdFx0bGV0IHJlc291cmNlID0gcmVzb3VyY2VGcm9tU3RvcmUudG9KUygpO1xuXHRcdFx0cmVzb3VyY2UubW9kZWwgPSByZXNvdXJjZS5tb2RlbC5tYXAoKG1vZGVsKSA9PiB7XG5cdFx0XHRcdGlmIChtb2RlbC5mYWtlclN1YmNhdGVnb3J5ID09PSAnYXJyYXlFbGVtZW50JyB8fCBtb2RlbC5mYWtlclN1YmNhdGVnb3J5ID09PSAnb2JqZWN0RWxlbWVudCcpIHtcblx0XHRcdFx0XHRtb2RlbC5mYWtlclBhcmFtcy5qc29uID0gSlNPTi5wYXJzZShtb2RlbC5mYWtlclBhcmFtcy5qc29uKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBtb2RlbDtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXNvdXJjZS52YWxpZGF0aW9uQ29uZmlnID0gUmVzb3VyY2VVdGlscy5nZW5lcmF0ZVZhbGlkYXRpb25Db25maWdGb3JSZXNvdXJjZShyZXNvdXJjZSk7XG5cblx0XHRcdEFwaS5wdXQoe1xuXHRcdFx0XHR1cmw6IHtcblx0XHRcdFx0XHRuYW1lOiAncmVzb3VyY2UnLFxuXHRcdFx0XHRcdHJlc291cmNlSWQ6IHJlc291cmNlLmlkXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHBheWxvYWQ6IHJlc291cmNlXG5cdFx0XHR9KS50aGVuKChyZXNwKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2FuU2F2ZVJlc291cmNlID0gdHJ1ZTtcblx0XHRcdFx0cmVzb3VyY2UubW9kZWwgPSByZXNwLmJvZHkubW9kZWwubWFwKChtb2RlbCkgPT4ge1xuXHRcdFx0XHRcdGlmIChtb2RlbC5mYWtlclN1YmNhdGVnb3J5ID09PSAnYXJyYXlFbGVtZW50JyB8fCBtb2RlbC5mYWtlclN1YmNhdGVnb3J5ID09PSAnb2JqZWN0RWxlbWVudCcpIHtcblx0XHRcdFx0XHRcdG1vZGVsLmZha2VyUGFyYW1zLmpzb24gPSBKU09OLnN0cmluZ2lmeShtb2RlbC5mYWtlclBhcmFtcy5qc29uLCBudWxsLCAyKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gbW9kZWw7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFN0b3JlLmdldCgpLnNldCh7XG5cdFx0XHRcdFx0cmVzb3VyY2VTYXZpbmc6IGZhbHNlLFxuXHRcdFx0XHRcdHJlc291cmNlOiByZXNvdXJjZVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0UmVzb3VyY2VzU3RvcmUudXBkYXRlUmVzb3VyY2UocmVzb3VyY2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybjtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0RGVsZXRlIGEgcmVzb3VyY2UgZnJvbSB0aGUgc2VydmVyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdGRlbGV0ZVJlc291cmNlKHJlc291cmNlKSB7XG5cdFx0U3RvcmUuZ2V0KCkuc2V0KHtyZXNvdXJjZVNhdmluZzogdHJ1ZX0pO1xuXG5cdFx0QXBpLmRlc3Ryb3koe1xuXHRcdFx0dXJsOiB7XG5cdFx0XHRcdG5hbWU6ICdyZXNvdXJjZScsXG5cdFx0XHRcdHJlc291cmNlSWQ6IHJlc291cmNlLmlkXG5cdFx0XHR9XG5cdFx0fSkudGhlbigoKSA9PiB7XG5cdFx0XHRicm93c2VySGlzdG9yeS5wdXNoKGAvYCk7XG5cdFx0XHRTdG9yZS5nZXQoKS5zZXQoe3Jlc291cmNlU2F2aW5nOiBmYWxzZX0pO1xuXHRcdFx0UmVzb3VyY2VzU3RvcmUucmVtb3ZlUmVzb3VyY2UocmVzb3VyY2UuaWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRBZGQgYSBuZXcgbW9kZWwga2V5IHRvIGEgcmVzb3VyY2Vcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0YWRkQW5vdGhlcktleSgpIHtcblx0XHRTdG9yZS5nZXQoKS5yZXNvdXJjZS5tb2RlbC51bnNoaWZ0KHtcblx0XHRcdHV1aWQ6ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcblx0XHRcdFx0bGV0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwO1xuXHRcdFx0XHRsZXQgdiA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCk7XG5cdFx0XHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcblx0XHRcdH0pLFxuXHRcdFx0dHlwZTogJ3ByZWRlZmluZWQnLFxuXHRcdFx0ZmFrZXJTdWJDYXRlZ29yeTogJycsXG5cdFx0XHRmYWtlckNhdGVnb3J5OiAnJyxcblx0XHRcdGZha2VyUGFyYW1zOiB7fSxcblx0XHRcdHJlc291cmNlOiB7fSxcblx0XHRcdHByZWRlZmluZWRUeXBlOiAnc3RyaW5nJyxcblx0XHRcdHByZWRlZmluZWRWYWx1ZTogJycsXG5cdFx0XHRyZXF1aXJlZDogZmFsc2Vcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0UmVtb3ZlIGEgbW9kZWwga2V5IGZyb20gdGhlIHJlc291cmNlXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdHJlbW92ZU1vZGVsS2V5KG1vZGVsLCBpbmRleCkge1xuXHRcdFN0b3JlLmdldCgpLnJlc291cmNlLm1vZGVsLnNwbGljZShpbmRleCwgMSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFJlc291cmNlU3RvcmUoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3N0b3Jlcy9SZXNvdXJjZVN0b3JlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }

})