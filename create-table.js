import { randomUUID } from 'crypto';
import { sql } from './db.js';

async function createTables() {
  try {
    await sql`
      CREATE TABLE ruralproducer (
          id TEXT PRIMARY KEY,
          producerName VARCHAR(255) NOT NULL,
          farmName VARCHAR(255) NOT NULL,
          cpfCnpj VARCHAR(18) NOT NULL,
          city VARCHAR(255) NOT NULL,
          state VARCHAR(255) NOT NULL,
          totalAreaHectaresFarm FLOAT NOT NULL,
          arableAreaHectares FLOAT NOT NULL,
          vegetationAreaHectares FLOAT NOT NULL,
          CONSTRAINT unique_cpfCnpj UNIQUE (cpfCnpj)
      );
    `;

    await sql`
      CREATE TABLE plantedCrop (
          id TEXT PRIMARY KEY,
          cropName VARCHAR(255) NOT NULL
      );
    `;

    await sql`
      CREATE TABLE ruralproducer_plantedcrop (
          ruralproducerId TEXT NOT NULL REFERENCES ruralproducer(id),
          plantedCropId TEXT NOT NULL REFERENCES plantedCrop(id),
          PRIMARY KEY (ruralproducerId, plantedCropId)
      );
    `;

    ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar'].forEach(
      async (item) => {
        await sql`
            insert into plantedCrop (id, cropName) values (${randomUUID()}, ${item});
    `;
      }
    );

    console.log('Created tables.');
  } catch (err) {
    console.error('Erro: ' + err);
  }
}

createTables();
