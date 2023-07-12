import { FastifyReply, FastifyRequest } from 'fastify'

export const checkJwtMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.code(401).send('Invalid token')
  }
}
