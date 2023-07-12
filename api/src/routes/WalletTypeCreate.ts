import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { checkJwtMiddleware } from '../middleware/auth-jwt-middleware'

interface WalletTypeCreateRequest {
  description: string
}

export const WalletTypeCreate = async (app: FastifyInstance) => {
  app.post(
    '/wallettype',
    app.addHook('preValidation', checkJwtMiddleware),
    async (
      request: FastifyRequest<{ Body: WalletTypeCreateRequest }>,
      reply: FastifyReply,
    ) => {
      const { description } = request.body

      await prisma.walletType.create({
        data: {
          description,
          clinic_id: request.user.sub,
        },
      })

      reply.status(200).send({ ok: true })
    },
  )
}
