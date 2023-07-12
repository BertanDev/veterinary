import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'
import { checkJwtMiddleware } from '../../middleware/auth-jwt-middleware'

interface AnimalCreateRequest {
  name: string
  height: number
  weight: number
  animalTypeId: string
  breedId: string
  responsibleId: string
}

export const AnimalCreate = async (app: FastifyInstance) => {
  app.post(
    '/animal',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: AnimalCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { name, height, weight, animalTypeId, breedId, responsibleId } =
        request.body

      await prisma.animal.create({
        data: {
          name,
          height,
          weight,
          animal_type_id: animalTypeId,
          breed_id: breedId,
          responsible_id: responsibleId,
          clinic_id: request.user.sub,
        },
      })

      reply.status(200).send({ ok: true })
    },
  )
}
