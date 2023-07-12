import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { checkJwtMiddleware } from '../middleware/auth-jwt-middleware'

interface AnimalTypeCreateRequest {
  id?: string
  description: string
}

export const AnimalTypeCreate = async (app: FastifyInstance) => {
  app.post(
    '/animaltype',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: AnimalTypeCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { description } = request.body

      await prisma.animalType.create({
        data: {
          description,
          clinic_id: request.user.sub,
        },
      })

      return reply.status(200).send({ ok: true })
    },
  )

  app.get(
    '/animaltypes',
    app.addHook('preSerialization', checkJwtMiddleware),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const animalTypes = await prisma.animalType.findMany({
        select: {
          id: true,
          description: true,
        },
        where: {
          clinic_id: request.user.sub,
        },
      })

      return reply.status(200).send(animalTypes)
    },
  )

  app.get(
    '/animaltype',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Querystring: { editId: string } }>,
      reply: FastifyReply,
    ) => {
      const animaltype = await prisma.animalType.findUnique({
        where: {
          id: request.query.editId,
        },
      })

      return reply.status(200).send({ animaltype })
    },
  )

  app.put(
    '/animaltype',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: AnimalTypeCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { id, description } = request.body

      console.log(id, description)

      await prisma.animalType.update({
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

  app.delete(
    '/animaltype',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Querystring: { editId: string } }>,
      reply: FastifyReply,
    ) => {
      console.log(request.query)
      await prisma.animalType.delete({
        where: {
          id: request.query.editId,
        },
      })

      return reply.status(200).send({ ok: true })
    },
  )
}
