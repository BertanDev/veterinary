import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'

import { routes } from './routes'

const app = fastify()
app.register(routes)

app.register(jwt, {
  secret: process.env.JWT_SECRET as string,
})

app.register(cors)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('HTTP Server is Running!!'))
