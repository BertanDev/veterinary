import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { checkJwtMiddleware } from '../middleware/auth-jwt-middleware'

interface VaccineCreateRequest {
  name: string
  animalId: string
  validate: Date | string
  ml: number
}

export const VaccineCreate = async (app: FastifyInstance) => {
  app.post(
    '/vaccine',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: VaccineCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { name, animalId, ml, validate } = request.body

      await prisma.vaccine.create({
        data: {
          name,
          ml,
          validate,
          animal_id: animalId,
          clinic_id: request.user.sub,
        },
      })

      reply.status(200).send({ ok: true })
    },
  )
}
