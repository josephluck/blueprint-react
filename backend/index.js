'use strict';
// Declare letiables here for global use

// F deployment, the two admin server will serve
// the bundle.js front-end app from build/bundle.js
// so that this application can be deployed as a simple node
// application.

// We need to work out how the two json servers can be
// slimmed down into one json server handling both the admin
// and public apis

// Refactor server code in to separate files, making
// good use of ES2016 import / export code.

// Remove references to Faker.js since this is an implementation
// detail.

// Implement testing

const http = require('request');
const JsonServer = require('json-server');
const BodyParser = require('body-parser');
const ResourceUtils = require('./ResourceUtils');

// Path to adminDb.json relative to the root folder
const pathToAdminPersistentStorage = './backend/adminDb.json';

class Server {
	/*=============================================================================
		Run the admin database (to store resource descriptions)
	=============================================================================*/
	startAdminServer() {
		this.adminServer = JsonServer.create();
		this.adminRouter = JsonServer.router(pathToAdminPersistentStorage);
		let jsonServerMiddleware = JsonServer.defaults();

		this.adminServer.use(jsonServerMiddleware);
		this.adminServer.use(this.databaseServerUpdaterMiddleware.bind(this));
		this.adminServer.use(this.adminRouter);

		this.adminServer.listen(1401, () => {
			console.log('Admin database running at: http://localhost:1401');
			this.startDatabaseServer();
		});
	}

	/*=============================================================================
		Start up the database API (one that will be consumed by client's
		front-end projects).
		Uses JSON server (see docs for more info)
	=============================================================================*/
	startDatabaseServer() {
		http('http://localhost:1401/resources', (error, response, body) => {
			let resources = JSON.parse(body);
			let database = ResourceUtils.generateDatabase(resources);
			this.dataServer = JsonServer.create();
			this.dataRouter = JsonServer.router(database);

			this.dataServer.use(BodyParser.json());
			this.dataServer.use(JsonServer.defaults());
			this.dataServer.use(this.resourceMethodHelperMiddleware.bind(resources));
			this.dataServer.use(this.dataRouter);

			this.dataServer.listen(1400, function () {
				console.log('Database running at: http://localhost:1400');
			});
		});
	}

	resourceMethodHelperMiddleware(req, res, next, resources) {
		// Check that the method is supported by the configuration
		// first get the resource description in question and then
		// check that the method is supported before passing it to
		// json server. Otherwise throw a 405 method not allowed
		let requestedResourceName = req.originalUrl.split('/')[1];
		let requestedResourceDescription = resources.find((resource) => {
			return resource.name === requestedResourceName;
		});

		if (requestedResourceDescription) {
			if (req.method === 'GET' && requestedResourceDescription.supportedMethods.get) {
				next();
			} else if (req.method === 'POST' && requestedResourceDescription.supportedMethods.post) {
				let validationErrors = ResourceUtils.validateRequest(requestedResourceDescription, req.body);
				if (validationErrors) {
					res.status(400).send(validationErrors);
				} else {
					next();
				}
			} else if (req.method === 'PUT' && requestedResourceDescription.supportedMethods.put) {
				next();
			} else if (req.method === 'DELETE' && requestedResourceDescription.supportedMethods.destroy) {
				next();
			} else {
				res.status(405).send(`Method isn't supported for this resource`);
			}
		} else {
			// The resource doesn't exist but JSON server will handle the response for us
			next();
		}
	}

	/*=============================================================================
		When resources are updated, restart the database server
	=============================================================================*/
	databaseServerUpdaterMiddleware(req, res, next) {
		// Pass immediately on to JSON server
		next();

		// Stop and start the JSON server
		if (req.method === 'POST' ||
				req.method === 'PUT' ||
				req.method === 'DELETE') {
			setTimeout(() => {
				http('http://localhost:1401/resources', (error, response, body) => {
					console.log('Database updated at: http://localhost:1400');
					let resources = JSON.parse(body);
					let database = ResourceUtils.generateDatabase(resources);
					this.dataRouter.db.setState(database);
				});
			}, 2000);
		}
	}

	start() {
		this.startAdminServer();
	}
}

const server = new Server();
server.start();
