import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'

interface ClinicCreateRequest {
  name: string
  cnpj: bigint
  state: string
  city: string
  email: string
  password: string
  address: string
}

export const ClinicCreate = async (app: FastifyInstance) => {
  app.post(
    '/clinic',
    async (
      request: FastifyRequest<{ Body: ClinicCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { name, cnpj, state, city, email, password, address } = request.body

      const hashedPassword = await bcrypt.hash(password, 4)
      console.log(name, cnpj, state, city, email, password, address)

      await prisma.clinic.create({
        data: {
          cidade: city,
          cnpj,
          email,
          endereco: address,
          nome: name,
          uf: state,
          password: hashedPassword,
        },
      })

      reply.status(200).send({ ok: true })
    },
  )
}
