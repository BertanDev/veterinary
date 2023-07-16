import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { checkJwtMiddleware } from '../middleware/auth-jwt-middleware'

interface VetCreateRequest {
  id?: string
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

      return reply.status(200).send({ ok: true })
    },
  )

  app.get(
    '/vets',
    app.addHook('preSerialization', checkJwtMiddleware),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const responsibles = await prisma.vet.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          clinic_id: request.user.sub,
        },
      })

      return reply.status(200).send(responsibles)
    },
  )

  app.put(
    '/vet',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: VetCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { birthDate, cpf, email, name, phone, id } = request.body

      console.log({ birthDate, cpf, email, name, phone, id })

      const dia = parseInt(birthDate.substr(0, 2))
      const mes = parseInt(birthDate.substr(2, 2)) - 1 // Os meses em JavaScript são baseados em zero
      const ano = parseInt(birthDate.substr(4, 4))

      const newBirthDate = new Date(ano, mes, dia)

      console.log(newBirthDate)

      await prisma.vet.update({
        data: {
          cpf,
          email,
          name,
          phone: parseInt(phone),
          birth_date: newBirthDate,
        },
        where: {
          id,
        },
      })

      return reply.status(200).send()
    },
  )

  app.get(
    '/vet',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Querystring: { editId: string } }>,
      reply: FastifyReply,
    ) => {
      const getVet = await prisma.vet.findUnique({
        where: {
          id: request.query.editId,
        },
      })

      const vet = {
        ...getVet,
        phone: Number(getVet?.phone),
      }

      return reply.status(200).send({ vet })
    },
  )

  app.delete(
    '/vet',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Querystring: { editId: string } }>,
      reply: FastifyReply,
    ) => {
      console.log(request.query.editId)
      await prisma.vet.delete({
        where: {
          id: request.query.editId,
        },
      })

      return reply.status(200).send({ ok: true })
    },
  )
}
