import { fastify } from 'fastify';
// import { DatabaseMemory } from './database.memory.js';
import { DatabasePostgres } from './database-postgres.js';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import cors from '@fastify/cors';

const server = fastify();

await server.register(cors, {
  origin: '*',
});

// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.get('/ruralproducer', async () => {
  return await database.list();
});

server.post('/ruralproducer', async (request, reply) => {
  const {
    producerName,
    farmName,
    cpfCnpj,
    city,
    state,
    totalAreaHectaresFarm,
    arableAreaHectares,
    vegetationAreaHectares,
    plantedCrops,
  } = request.body;

  const cpfCnpjValid =
    cpfCnpj.length > 14
      ? cnpjValidator.isValidCnpj(cpfCnpj)
      : cpfValidator.isValid(cpfCnpj);

  if (!cpfCnpjValid) return reply.status(400).send('invalid cpf or cnpj');
  await database.create({
    producerName,
    farmName,
    cpfCnpj,
    city,
    state,
    totalAreaHectaresFarm,
    arableAreaHectares,
    vegetationAreaHectares,
    plantedCrops,
  });

  return reply.status(201).send();
});

server.put('/ruralproducer/:id', async (request, reply) => {
  const { id } = request.params;
  const {
    producerName,
    farmName,
    cpfCnpj,
    city,
    state,
    totalAreaHectaresFarm,
    arableAreaHectares,
    vegetationAreaHectares,
  } = request.body;

  await database.update(id, {
    producerName,
    farmName,
    cpfCnpj,
    city,
    state,
    totalAreaHectaresFarm,
    arableAreaHectares,
    vegetationAreaHectares,
  });

  return reply.status(204).send();
});

server.delete('/ruralproducer/:id', async (request, reply) => {
  const { id } = request.params;
  await database.delete(id);
  return reply.status(204).send();
});

server.get('/ruralproducer/plantedcrop', async () => {
  return await database.listPlantedcrop();
});

server.listen({ port: 3333 });
