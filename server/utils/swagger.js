const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
   definition: {
      openapi: '3.0.0',
      info: {
         title: 'REST API Docs',
         description: 'Here we are storing our apis',
      },
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
					description: 'JWT authorization using the access token.'
				},
			},
		},
		security: [
         {
            bearerAuth: [],
         },
      ],
   },
   apis: ['./routes/**/*js'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
   // Swagger page
   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

   // Docs in JSON format
   app.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
   })

   const baseUrl = process.env.API_URL || `http://localhost:${port}`

   console.log(`Docs available at ${baseUrl}/docs`)
}

module.exports = swaggerDocs
