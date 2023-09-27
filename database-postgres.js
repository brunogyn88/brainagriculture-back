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
      plantedCrops,
    } = ruralproducer;

    try {
      await sql`INSERT INTO ruralproducer (id, producerName, farmName, cpfCnpj, city, state, 
        totalAreaHectaresFarm, arableAreaHectares, vegetationAreaHectares) VALUES 
        (${ruralProducerId}, ${producerName}, ${farmName}, ${cpfCnpj}, ${city}, ${state}, 
        ${totalAreaHectaresFarm}, ${arableAreaHectares}, ${vegetationAreaHectares})`;

      for (const element of plantedCrops) {
        await sql`INSERT INTO ruralproducer_plantedcrop (ruralproducerid, plantedcropid) VALUES 
          (${ruralProducerId}, ${element})`;
      }

      console.log('Dados inseridos com sucesso.');
    } catch (error) {
      console.error('Erro ao inserir dados:', error);
    }
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

  async listPlantedcrop() {
    return await sql`select * from plantedcrop`;
  }
}
