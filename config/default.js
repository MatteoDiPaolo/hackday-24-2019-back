module.exports = {
	server: {
		host: '0.0.0.0',
		port: process.env.PORT || 4000,
	},
	store: {
		mongodbConnectionString: process.env.MONGODB_CONNECTION_STRING,
	},
	routes: {
		api: {
			googleClientId: process.env.GOOGLE_CLIENT_ID,
		},
		admin: {
			swaggerOptions: {
				swaggerDefinition: {
					info: {
						description: 'Documentation for TorralPoll Back API',
						title: 'TorralPoll Back API',
						version: '1.0.0',
						contact: { email: 'matteo.dipaolantonio@guidesmiths.com' },
					},
					host: process.env.SERVICE_ENV !== 'local' ? 'https://torralbot-back.herokuapp.com' : `localhost:${process.env.PORT || 4000}`,
					basePath: '/',
					produces: ['application/json'],
					schemes: ['http'],
					securityDefinitions: {
						JWT: {
							type: 'apiKey',
							in: 'header',
							name: 'Authorization',
							description: '',
						},
					},
				},
			},
		},
	},
	logger: {
		transport: 'console',
		include: [
			'tracer',
			'timestamp',
			'level',
			'message',
			'error.message',
			'error.code',
			'error.stack',
			'request.url',
			'request.headers',
			'request.params',
			'request.method',
			'response.statusCode',
			'response.headers',
			'response.time',
			'process',
			'system',
			'package.name',
			'service',
		],
		exclude: ['password', 'secret', 'token', 'request.headers.cookie', 'dependencies', 'devDependencies'],
	},
};
