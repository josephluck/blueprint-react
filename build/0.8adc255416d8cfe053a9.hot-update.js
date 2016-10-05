webpackHotUpdate(0,{

/***/ 630:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Store = __webpack_require__(629);\n\nvar _Store2 = _interopRequireDefault(_Store);\n\nvar _Api = __webpack_require__(631);\n\nvar _Api2 = _interopRequireDefault(_Api);\n\nvar _reactRouter = __webpack_require__(556);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ResourcesStore = function () {\n\t/*=============================================================================\n \tSet initial state in the Store.\n =============================================================================*/\n\n\tfunction ResourcesStore() {\n\t\t_classCallCheck(this, ResourcesStore);\n\n\t\t_Store2.default.initialize({\n\t\t\tresources: [],\n\t\t\tresourcesLoading: true,\n\t\t\trightBarOpen: false\n\t\t});\n\t}\n\n\t_createClass(ResourcesStore, [{\n\t\tkey: 'toggleRightBar',\n\t\tvalue: function toggleRightBar() {\n\t\t\t_Store2.default.get().set({\n\t\t\t\trightBarOpen: !_Store2.default.get().rightBarOpen\n\t\t\t});\n\t\t}\n\t}, {\n\t\tkey: 'getResources',\n\t\tvalue: function getResources() {\n\t\t\t_Store2.default.get().set({ resourcesLoading: true });\n\t\t\t_Api2.default.get({\n\t\t\t\turl: {\n\t\t\t\t\tname: 'resources',\n\t\t\t\t\tparams: '?_sort=name&_order=ASC'\n\t\t\t\t}\n\t\t\t}).then(function (res) {\n\t\t\t\t_Store2.default.get().resources.reset(res.body);\n\t\t\t});\n\t\t\t_Store2.default.get().set({ resourcesLoading: false });\n\t\t}\n\t}, {\n\t\tkey: 'createNewResource',\n\t\tvalue: function createNewResource() {\n\t\t\t_Api2.default.post({\n\t\t\t\turl: {\n\t\t\t\t\tname: 'resources'\n\t\t\t\t},\n\t\t\t\tpayload: {\n\t\t\t\t\ttype: 'array',\n\t\t\t\t\tlength: 5,\n\t\t\t\t\tname: 'newResource',\n\t\t\t\t\tsupportedMethods: {\n\t\t\t\t\t\tget: true,\n\t\t\t\t\t\tpost: true,\n\t\t\t\t\t\tput: true,\n\t\t\t\t\t\tdestroy: true\n\t\t\t\t\t},\n\t\t\t\t\tsupportedUtils: {\n\t\t\t\t\t\tfilter: true,\n\t\t\t\t\t\tpagination: true,\n\t\t\t\t\t\tsort: true\n\t\t\t\t\t},\n\t\t\t\t\tmodel: [{\n\t\t\t\t\t\tuuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {\n\t\t\t\t\t\t\tvar r = Math.random() * 16 | 0;\n\t\t\t\t\t\t\tvar v = c === 'x' ? r : r & 0x3 | 0x8;\n\t\t\t\t\t\t\treturn v.toString(16);\n\t\t\t\t\t\t}),\n\t\t\t\t\t\ttype: 'predefined',\n\t\t\t\t\t\tfakerSubCategory: '',\n\t\t\t\t\t\tfakerCategory: '',\n\t\t\t\t\t\tfakerParams: {},\n\t\t\t\t\t\tresource: {},\n\t\t\t\t\t\tpredefinedType: 'string',\n\t\t\t\t\t\tpredefinedValue: '',\n\t\t\t\t\t\trequired: true\n\t\t\t\t\t}]\n\t\t\t\t}\n\t\t\t}).then(function (response) {\n\t\t\t\tvar resource = response.body;\n\t\t\t\t_Store2.default.get().resources.push(resource);\n\t\t\t\t_reactRouter.browserHistory.push('/' + resource.id);\n\t\t\t});\n\t\t}\n\t}, {\n\t\tkey: 'removeResource',\n\t\tvalue: function removeResource(resourceId) {\n\t\t\tvar index = _Store2.default.get().resources.findIndex(function (resource) {\n\t\t\t\treturn resource.id === resourceId;\n\t\t\t});\n\n\t\t\t_Store2.default.get().resources.splice(index, 1);\n\t\t}\n\t}, {\n\t\tkey: 'updateResource',\n\t\tvalue: function updateResource(resource) {\n\t\t\tvar resourceToUpdate = _Store2.default.get().resources.find(function (_resource) {\n\t\t\t\treturn _resource.id === resource.id;\n\t\t\t});\n\n\t\t\tresourceToUpdate.reset(resource);\n\t\t}\n\t}]);\n\n\treturn ResourcesStore;\n}();\n\nexports.default = new ResourcesStore();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmVzL1Jlc291cmNlc1N0b3JlLmpzPzc5ODAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNLGM7Ozs7O0FBSUwsMkJBQWM7QUFBQTs7QUFDYixrQkFBTSxVQUFOLENBQWlCO0FBQ2hCLGNBQVcsRUFESztBQUVoQixxQkFBa0IsSUFGRjtBQUdoQixpQkFBYztBQUhFLEdBQWpCO0FBS0E7Ozs7bUNBRWdCO0FBQ2hCLG1CQUFNLEdBQU4sR0FBWSxHQUFaLENBQWdCO0FBQ2Ysa0JBQWMsQ0FBQyxnQkFBTSxHQUFOLEdBQVk7QUFEWixJQUFoQjtBQUdBOzs7aUNBRWM7QUFDZCxtQkFBTSxHQUFOLEdBQVksR0FBWixDQUFnQixFQUFDLGtCQUFrQixJQUFuQixFQUFoQjtBQUNBLGlCQUFJLEdBQUosQ0FBUTtBQUNQLFNBQUs7QUFDSixXQUFNLFdBREY7QUFFSixhQUFRO0FBRko7QUFERSxJQUFSLEVBS0csSUFMSCxDQUtRLFVBQUMsR0FBRCxFQUFTO0FBQ2hCLG9CQUFNLEdBQU4sR0FBWSxTQUFaLENBQXNCLEtBQXRCLENBQTRCLElBQUksSUFBaEM7QUFDQSxJQVBEO0FBUUEsbUJBQU0sR0FBTixHQUFZLEdBQVosQ0FBZ0IsRUFBQyxrQkFBa0IsS0FBbkIsRUFBaEI7QUFDQTs7O3NDQUVtQjtBQUNuQixpQkFBSSxJQUFKLENBQVM7QUFDUixTQUFLO0FBQ0osV0FBTTtBQURGLEtBREc7QUFJUixhQUFTO0FBQ1IsV0FBTSxPQURFO0FBRVIsYUFBUSxDQUZBO0FBR1IsV0FBTSxhQUhFO0FBSVIsdUJBQWtCO0FBQ2pCLFdBQUssSUFEWTtBQUVqQixZQUFNLElBRlc7QUFHakIsV0FBSyxJQUhZO0FBSWpCLGVBQVM7QUFKUSxNQUpWO0FBVVIscUJBQWdCO0FBQ2YsY0FBUSxJQURPO0FBRWYsa0JBQVksSUFGRztBQUdmLFlBQU07QUFIUyxNQVZSO0FBZVIsWUFBTyxDQUNOO0FBQ0MsWUFBTSx1Q0FBdUMsT0FBdkMsQ0FBK0MsT0FBL0MsRUFBd0QsVUFBQyxDQUFELEVBQU87QUFDcEUsV0FBSSxJQUFJLEtBQUssTUFBTCxLQUFnQixFQUFoQixHQUFxQixDQUE3QjtBQUNBLFdBQUksSUFBSSxNQUFNLEdBQU4sR0FBWSxDQUFaLEdBQWlCLElBQUksR0FBSixHQUFVLEdBQW5DO0FBQ0EsY0FBTyxFQUFFLFFBQUYsQ0FBVyxFQUFYLENBQVA7QUFDQSxPQUpLLENBRFA7QUFNQyxZQUFNLFlBTlA7QUFPQyx3QkFBa0IsRUFQbkI7QUFRQyxxQkFBZSxFQVJoQjtBQVNDLG1CQUFhLEVBVGQ7QUFVQyxnQkFBVSxFQVZYO0FBV0Msc0JBQWdCLFFBWGpCO0FBWUMsdUJBQWlCLEVBWmxCO0FBYUMsZ0JBQVU7QUFiWCxNQURNO0FBZkM7QUFKRCxJQUFULEVBcUNHLElBckNILENBcUNRLFVBQUMsUUFBRCxFQUFjO0FBQ3JCLFFBQU0sV0FBVyxTQUFTLElBQTFCO0FBQ0Esb0JBQU0sR0FBTixHQUFZLFNBQVosQ0FBc0IsSUFBdEIsQ0FBMkIsUUFBM0I7QUFDQSxnQ0FBZSxJQUFmLE9BQXdCLFNBQVMsRUFBakM7QUFDQSxJQXpDRDtBQTBDQTs7O2lDQUVjLFUsRUFBWTtBQUMxQixPQUFNLFFBQVEsZ0JBQU0sR0FBTixHQUFZLFNBQVosQ0FBc0IsU0FBdEIsQ0FBZ0MsVUFBQyxRQUFELEVBQWM7QUFDM0QsV0FBTyxTQUFTLEVBQVQsS0FBZ0IsVUFBdkI7QUFDQSxJQUZhLENBQWQ7O0FBSUEsbUJBQU0sR0FBTixHQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsS0FBN0IsRUFBb0MsQ0FBcEM7QUFDQTs7O2lDQUVjLFEsRUFBVTtBQUN4QixPQUFJLG1CQUFtQixnQkFBTSxHQUFOLEdBQVksU0FBWixDQUFzQixJQUF0QixDQUEyQixVQUFDLFNBQUQsRUFBZTtBQUNoRSxXQUFPLFVBQVUsRUFBVixLQUFpQixTQUFTLEVBQWpDO0FBQ0EsSUFGc0IsQ0FBdkI7O0FBSUEsb0JBQWlCLEtBQWpCLENBQXVCLFFBQXZCO0FBQ0E7Ozs7OztrQkFHYSxJQUFJLGNBQUosRSIsImZpbGUiOiI2MzAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmVzL1N0b3JlJztcbmltcG9ydCBBcGkgZnJvbSAndXRpbHMvQXBpJztcbmltcG9ydCB7YnJvd3Nlckhpc3Rvcnl9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cbmNsYXNzIFJlc291cmNlc1N0b3JlIHtcbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0U2V0IGluaXRpYWwgc3RhdGUgaW4gdGhlIFN0b3JlLlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRTdG9yZS5pbml0aWFsaXplKHtcblx0XHRcdHJlc291cmNlczogW10sXG5cdFx0XHRyZXNvdXJjZXNMb2FkaW5nOiB0cnVlLFxuXHRcdFx0cmlnaHRCYXJPcGVuOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cblx0dG9nZ2xlUmlnaHRCYXIoKSB7XG5cdFx0U3RvcmUuZ2V0KCkuc2V0KHtcblx0XHRcdHJpZ2h0QmFyT3BlbjogIVN0b3JlLmdldCgpLnJpZ2h0QmFyT3BlblxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0UmVzb3VyY2VzKCkge1xuXHRcdFN0b3JlLmdldCgpLnNldCh7cmVzb3VyY2VzTG9hZGluZzogdHJ1ZX0pO1xuXHRcdEFwaS5nZXQoe1xuXHRcdFx0dXJsOiB7XG5cdFx0XHRcdG5hbWU6ICdyZXNvdXJjZXMnLFxuXHRcdFx0XHRwYXJhbXM6ICc/X3NvcnQ9bmFtZSZfb3JkZXI9QVNDJ1xuXHRcdFx0fVxuXHRcdH0pLnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0U3RvcmUuZ2V0KCkucmVzb3VyY2VzLnJlc2V0KHJlcy5ib2R5KTtcblx0XHR9KTtcblx0XHRTdG9yZS5nZXQoKS5zZXQoe3Jlc291cmNlc0xvYWRpbmc6IGZhbHNlfSk7XG5cdH1cblxuXHRjcmVhdGVOZXdSZXNvdXJjZSgpIHtcblx0XHRBcGkucG9zdCh7XG5cdFx0XHR1cmw6IHtcblx0XHRcdFx0bmFtZTogJ3Jlc291cmNlcydcblx0XHRcdH0sXG5cdFx0XHRwYXlsb2FkOiB7XG5cdFx0XHRcdHR5cGU6ICdhcnJheScsXG5cdFx0XHRcdGxlbmd0aDogNSxcblx0XHRcdFx0bmFtZTogJ25ld1Jlc291cmNlJyxcblx0XHRcdFx0c3VwcG9ydGVkTWV0aG9kczoge1xuXHRcdFx0XHRcdGdldDogdHJ1ZSxcblx0XHRcdFx0XHRwb3N0OiB0cnVlLFxuXHRcdFx0XHRcdHB1dDogdHJ1ZSxcblx0XHRcdFx0XHRkZXN0cm95OiB0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN1cHBvcnRlZFV0aWxzOiB7XG5cdFx0XHRcdFx0ZmlsdGVyOiB0cnVlLFxuXHRcdFx0XHRcdHBhZ2luYXRpb246IHRydWUsXG5cdFx0XHRcdFx0c29ydDogdHJ1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRtb2RlbDogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHV1aWQ6ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcblx0XHRcdFx0XHRcdFx0bGV0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwO1xuXHRcdFx0XHRcdFx0XHRsZXQgdiA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcblx0XHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3ByZWRlZmluZWQnLFxuXHRcdFx0XHRcdFx0ZmFrZXJTdWJDYXRlZ29yeTogJycsXG5cdFx0XHRcdFx0XHRmYWtlckNhdGVnb3J5OiAnJyxcblx0XHRcdFx0XHRcdGZha2VyUGFyYW1zOiB7fSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiB7fSxcblx0XHRcdFx0XHRcdHByZWRlZmluZWRUeXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0XHRcdHByZWRlZmluZWRWYWx1ZTogJycsXG5cdFx0XHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRjb25zdCByZXNvdXJjZSA9IHJlc3BvbnNlLmJvZHk7XG5cdFx0XHRTdG9yZS5nZXQoKS5yZXNvdXJjZXMucHVzaChyZXNvdXJjZSk7XG5cdFx0XHRicm93c2VySGlzdG9yeS5wdXNoKGAvJHtyZXNvdXJjZS5pZH1gKTtcblx0XHR9KTtcblx0fVxuXG5cdHJlbW92ZVJlc291cmNlKHJlc291cmNlSWQpIHtcblx0XHRjb25zdCBpbmRleCA9IFN0b3JlLmdldCgpLnJlc291cmNlcy5maW5kSW5kZXgoKHJlc291cmNlKSA9PiB7XG5cdFx0XHRyZXR1cm4gcmVzb3VyY2UuaWQgPT09IHJlc291cmNlSWQ7XG5cdFx0fSk7XG5cblx0XHRTdG9yZS5nZXQoKS5yZXNvdXJjZXMuc3BsaWNlKGluZGV4LCAxKTtcblx0fVxuXG5cdHVwZGF0ZVJlc291cmNlKHJlc291cmNlKSB7XG5cdFx0bGV0IHJlc291cmNlVG9VcGRhdGUgPSBTdG9yZS5nZXQoKS5yZXNvdXJjZXMuZmluZCgoX3Jlc291cmNlKSA9PiB7XG5cdFx0XHRyZXR1cm4gX3Jlc291cmNlLmlkID09PSByZXNvdXJjZS5pZDtcblx0XHR9KTtcblxuXHRcdHJlc291cmNlVG9VcGRhdGUucmVzZXQocmVzb3VyY2UpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBSZXNvdXJjZXNTdG9yZSgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc3RvcmVzL1Jlc291cmNlc1N0b3JlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }

})