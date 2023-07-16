import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { checkJwtMiddleware } from '../middleware/auth-jwt-middleware'

interface InfoRequest {}

export const Info = async (app: FastifyInstance) => {
  app.get(
    '/animal-cad',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: InfoRequest }>,
      reply: FastifyReply,
    ) => {
      const quantity = await prisma.animal.count({
        where: {
          clinic_id: request.user.sub,
        },
      })

      return reply.status(200).send({ quantity })
    },
  )

  app.get(
    '/responsible-cad',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: InfoRequest }>,
      reply: FastifyReply,
    ) => {
      const quantity = await prisma.responsible.count({
        where: {
          clinic_id: request.user.sub,
        },
      })

      return reply.status(200).send({ quantity })
    },
  )

  app.get(
    '/vet-cad',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: InfoRequest }>,
      reply: FastifyReply,
    ) => {
      const quantity = await prisma.vet.count({
        where: {
          clinic_id: request.user.sub,
        },
      })

      return reply.status(200).send({ quantity })
    },
  )
}
