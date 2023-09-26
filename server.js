import { fastify } from 'fastify';
import { DatabaseMemory } from './database.memory.js';

const server = fastify();

const database = new DatabaseMemory();

server.get('/ruralproducer', () => {
  const ruralproducers = database.list();
  return ruralproducers;
});

server.post('/ruralproducer', (request, reply) => {
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

  database.create({
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

  console.log(database.list());

  return reply.status(201).send();
});

server.put('/ruralproducer/:id', (request, reply) => {
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
    plantedCrops,
  } = request.body;

  const ruralproducer = database.update(id, {
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

  return reply.status(204).send();
});

server.delete('/ruralproducer/:id', (request, reply) => {
  const { id } = request.params;
  database.delete(id);

  return reply.status(204).send();
});

server.listen({ port: 3333 });
