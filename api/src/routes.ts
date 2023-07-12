import { FastifyInstance } from 'fastify'
import { ClinicCreate } from './routes/ClinicCreate'
import { BreedCreate } from './routes/BreedCreate'
import { AnimalTypeCreate } from './routes/AnimalTypeCreate'
import { WalletTypeCreate } from './routes/WalletTypeCreate'
import { ResponsibleCreate } from './routes/ResponsibleCreate'
import { VetCreate } from './routes/VetCreate'
import { VaccineCreate } from './routes/VaccineCreate'
import { AnimalCreate } from './routes/AnimalRoutes/AnimalCreate'
import { Auth } from './routes/AuthRoutes/Auth'

export async function routes(app: FastifyInstance) {
  app.register(ClinicCreate)
  app.register(BreedCreate)
  app.register(AnimalTypeCreate)
  app.register(WalletTypeCreate)
  app.register(ResponsibleCreate)
  app.register(AnimalCreate)
  app.register(VetCreate)
  app.register(VaccineCreate)
  app.register(Auth)
}
