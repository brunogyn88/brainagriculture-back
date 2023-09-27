import { randomUUID } from 'crypto';
import { sql } from './db';

export class DatabasePostgres {
  async list() {
    return await sql`select * from ruralproducer`;
  }

  async create(ruralproducer) {
    const ruralProducerId = randomUUID();
    const {
      producerName,
      farmName,
      cpfCnpj,
      city,
      state,
      totalAreaHectaresFarm,
      arableAreaHectares,
      vegetationAreaHectares,
    } = ruralproducer;
    await sql`insert into ruralproducer (id, producerName, farmName, cpfCnpj, city, state, 
        totalAreaHectaresFarm, arableAreaHectares, vegetationAreaHectares) VALUES 
        (${ruralProducerId}, ${producerName}, ${farmName}, ${cpfCnpj}, ${city}, ${state}, 
        ${totalAreaHectaresFarm}, ${arableAreaHectares}, ${vegetationAreaHectares})`;
  }

  update(id, ruralproducer) {}

  delete(id) {}
}
