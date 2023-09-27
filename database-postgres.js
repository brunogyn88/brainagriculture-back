import { randomUUID } from 'crypto';
import { sql } from './db.js';

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

  async update(id, ruralproducer) {
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

    await sql`update ruralproducer set producerName = ${producerName}, 
      farmName = ${farmName}, cpfCnpj = ${cpfCnpj}, city = ${city}, state = ${state}, 
      totalAreaHectaresFarm = ${totalAreaHectaresFarm}, arableAreaHectares = ${arableAreaHectares}, 
      vegetationAreaHectares = ${vegetationAreaHectares} where id = ${id}`;
  }

  async delete(id) {
    await sql`delete from ruralproducer where id = ${id}`;
  }
}
