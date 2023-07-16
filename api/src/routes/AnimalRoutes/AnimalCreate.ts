import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'
import { checkJwtMiddleware } from '../../middleware/auth-jwt-middleware'

interface AnimalCreateRequest {
  id?: string
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

      return reply.status(200).send({ ok: true })
    },
  )

  app.get(
    '/animals',
    app.addHook('preSerialization', checkJwtMiddleware),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const animals = await prisma.animal.findMany({
        select: {
          id: true,
          name: true,
          responsible: {
            select: {
              name: true,
            },
          },
        },
        where: {
          clinic_id: request.user.sub,
        },
      })

      console.log(animals)

      return reply.status(200).send(animals)
    },
  )

  app.put(
    '/animal',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: AnimalCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { animalTypeId, breedId, height, name, responsibleId, weight, id } =
        request.body

      console.log({
        animalTypeId,
        breedId,
        height,
        name,
        responsibleId,
        weight,
        id,
      })

      await prisma.animal.update({
        data: {
          animal_type_id: animalTypeId,
          breed_id: breedId,
          height,
          name,
          responsible_id: responsibleId,
          weight,
        },
        where: {
          id,
        },
      })

      return reply.status(200).send()
    },
  )

  app.get(
    '/animal',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Querystring: { editId: string } }>,
      reply: FastifyReply,
    ) => {
      const animal = await prisma.animal.findUnique({
        select: {
          name: true,
          height: true,
          weight: true,
          responsible: {
            select: {
              id: true,
              name: true,
              cpf: true,
            },
          },
          breed: {
            select: {
              id: true,
              description: true,
            },
          },
          type: {
            select: {
              id: true,
              description: true,
            },
          },
        },
        where: {
          id: request.query.editId,
        },
      })

      return reply.status(200).send({ animal })
    },
  )

  app.delete(
    '/animal',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Querystring: { editId: string } }>,
      reply: FastifyReply,
    ) => {
      await prisma.animal.delete({
        where: {
          id: request.query.editId,
        },
      })

      return reply.status(200).send({ ok: true })
    },
  )
}
