import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { checkJwtMiddleware } from '../middleware/auth-jwt-middleware'

interface VetCreateRequest {
  name: string
  cpf: string
  phone: string
  email: string
  birthDate: string
}

export const VetCreate = async (app: FastifyInstance) => {
  app.post(
    '/vet',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: VetCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { name, cpf, birthDate, email, phone } = request.body

      const dia = parseInt(birthDate.substr(0, 2))
      const mes = parseInt(birthDate.substr(2, 2)) - 1 // Os meses em JavaScript são baseados em zero
      const ano = parseInt(birthDate.substr(4, 4))

      const newBirthDate = new Date(ano, mes, dia)

      await prisma.vet.create({
        data: {
          name,
          birth_date: newBirthDate,
          cpf,
          email,
          phone: parseInt(phone),
          clinic_id: request.user.sub,
        },
      })

      reply.status(200).send({ ok: true })
    },
  )
}
