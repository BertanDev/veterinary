import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { checkJwtMiddleware } from '../middleware/auth-jwt-middleware'

interface VaccineCreateRequest {
  name: string
  animalId: string
  validate: string
  ml: string
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

      console.log({ name, animalId, ml, validate })

      const dia = parseInt(validate.substr(0, 2))
      const mes = parseInt(validate.substr(2, 2)) - 1 // Os meses em JavaScript são baseados em zero
      const ano = parseInt(validate.substr(4, 4))

      const newValidate = new Date(ano, mes, dia)

      await prisma.vaccine.create({
        data: {
          name,
          ml: parseFloat(ml),
          validate: newValidate,
          animal_id: animalId,
          clinic_id: request.user.sub,
        },
      })

      return reply.status(200).send({ ok: true })
    },
  )

  app.get(
    '/vaccines',
    app.addHook('preSerialization', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Querystring: { animalId: string } }>,
      reply: FastifyReply,
    ) => {
      const vaccines = await prisma.vaccine.findMany({
        where: {
          AND: [
            { clinic_id: request.user.sub },
            { animal_id: request.query.animalId },
          ],
        },
      })

      return reply.status(200).send(vaccines)
    },
  )

  app.delete(
    '/vaccine',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Querystring: { vaccineId: string } }>,
      reply: FastifyReply,
    ) => {
      await prisma.vaccine.delete({
        where: {
          id: request.query.vaccineId,
        },
      })

      return reply.status(200).send({ ok: true })
    },
  )
}
