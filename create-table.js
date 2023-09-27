import { sql } from './db.js';

async function createTables() {
  try {
    await sql`
      CREATE TABLE ruralproducer (
          id SERIAL PRIMARY KEY,
          producerName VARCHAR(255) NOT NULL,
          farmName VARCHAR(255) NOT NULL,
          cpfCnpj VARCHAR(14) NOT NULL,
          city VARCHAR(255) NOT NULL,
          state VARCHAR(255) NOT NULL,
          totalAreaHectaresFarm FLOAT NOT NULL,
          arableAreaHectares FLOAT NOT NULL,
          vegetationAreaHectares FLOAT NOT NULL
      );
    `;

    await sql`
      CREATE TABLE plantedCrop (
          id SERIAL PRIMARY KEY,
          cropName VARCHAR(255) NOT NULL,
          areaHectares FLOAT NOT NULL
      );
    `;

    await sql`
      CREATE TABLE ruralproducer_plantedcrop (
          ruralproducerId INTEGER NOT NULL REFERENCES ruralproducer(id),
          plantedCropId INTEGER NOT NULL REFERENCES plantedCrop(id),
          PRIMARY KEY (ruralproducerId, plantedCropId)
      );
    `;

    console.log('Tabelas criadas com sucesso.');
  } catch (err) {
    console.error('Erro: ' + err);
  }
}

createTables();
