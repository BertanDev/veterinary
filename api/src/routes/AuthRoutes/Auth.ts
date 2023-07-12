import { FastifyInstance, FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'
import { prisma } from '../../lib/prisma'

interface AuthProps {
  email: string
  password: string
}

export async function Auth(app: FastifyInstance) {
  app.post(
    '/auth',
    async (request: FastifyRequest<{ Body: AuthProps }>, reply) => {
      const { email, password } = request.body

      const clinic = await prisma.clinic.findUnique({
        where: {
          email,
        },
      })

      if (!clinic) {
        return reply.status(400).send('Not found')
      }

      const checkedPassword = await bcrypt.compare(password, clinic.password)

      if (!checkedPassword) {
        return reply.status(400).send('Not allowed')
      }

      const token = app.jwt.sign(
        {
          name: clinic.nome,
        },
        {
          sub: clinic.id,
          expiresIn: '30 days',
        },
      )

      return reply.status(200).send({
        token,
      })
    },
  )
}
