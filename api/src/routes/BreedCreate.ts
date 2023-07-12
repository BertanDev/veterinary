import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { checkJwtMiddleware } from '../middleware/auth-jwt-middleware'

interface BreedCreateRequest {
  id?: string
  description: string
}

export const BreedCreate = async (app: FastifyInstance) => {
  app.post(
    '/breed',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: BreedCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { description } = request.body

      await prisma.breed.create({
        data: {
          description,
          clinic_id: request.user.sub,
        },
      })

      return reply.status(200).send({ ok: true })
    },
  )

  app.get(
    '/breeds',
    app.addHook('preValidation', checkJwtMiddleware),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const breeds = await prisma.breed.findMany({
        select: {
          id: true,
          description: true,
        },
        where: {
          clinic_id: request.user.sub,
        },
      })

      return reply.status(200).send(breeds)
    },
  )

  app.get(
    '/breed',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Querystring: { editId: string } }>,
      reply: FastifyReply,
    ) => {
      const breed = await prisma.breed.findUnique({
        where: {
          id: request.query.editId,
        },
      })

      return reply.status(200).send({ breed })
    },
  )

  app.put(
    '/breed',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: BreedCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { id, description } = request.body

      await prisma.breed.update({
        data: {
          description,
        },
        where: {
          id,
        },
      })

      return reply.status(200).send()
    },
  )

  app.post(
    '/breed-delete',
    app.addHook('preValidation', checkJwtMiddleware),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.body as { id: string }

      await prisma.breed.delete({
        where: {
          id,
        },
      })

      reply.status(200)
    },
  )
}
