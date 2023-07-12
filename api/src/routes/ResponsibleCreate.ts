import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { checkJwtMiddleware } from '../middleware/auth-jwt-middleware'

interface ResponsibleCreateRequest {
  name: string
  cpf: string
  phone: string
  email: string
  birthDate: string
}

export const ResponsibleCreate = async (app: FastifyInstance) => {
  app.post(
    '/responsible',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: ResponsibleCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { cpf, email, name, phone, birthDate } = request.body

      const dia = parseInt(birthDate.substr(0, 2))
      const mes = parseInt(birthDate.substr(2, 2)) - 1 // Os meses em JavaScript são baseados em zero
      const ano = parseInt(birthDate.substr(4, 4))

      const newBirthDate = new Date(ano, mes, dia)

      await prisma.responsible.create({
        data: {
          name,
          cpf,
          email,
          phone: parseInt(phone),
          birth_date: newBirthDate,
          clinic_id: request.user.sub,
        },
      })

      reply.status(200).send({ ok: true })
    },
  )

  app.get(
    '/responsibles',
    app.addHook('preSerialization', checkJwtMiddleware),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const responsibles = await prisma.responsible.findMany({
        select: {
          id: true,
          name: true,
          cpf: true,
        },
        where: {
          clinic_id: request.user.sub,
        },
      })

      return reply.status(200).send(responsibles)
    },
  )
}
