import { fastify } from 'fastify';
// import { DatabaseMemory } from './database.memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

// const database = new DatabaseMemory();
const database = new DatabasePostgres();

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
  });

  return reply.status(204).send();
});

server.delete('/ruralproducer/:id', (request, reply) => {
  const { id } = request.params;
  database.delete(id);

  return reply.status(204).send();
});

server.listen({ port: 3333 });
