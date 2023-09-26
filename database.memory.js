import { randomUUID } from 'crypto';

export class DatabaseMemory {
  #ruralProducer = new Map();

  list() {
    return Array.from(this.#ruralProducer.entries()).map(
      (ruralProducerArray) => {
        const id = ruralProducerArray[0];
        const data = ruralProducerArray[1];

        return { id, ...data };
      }
    );
  }

  create(ruralproducer) {
    const ruralProducerId = randomUUID();
    this.#ruralProducer.set(ruralProducerId, ruralproducer);
  }

  update(id, ruralproducer) {
    this.#ruralProducer.set(id, ruralproducer);
  }

  delete(id) {
    this.#ruralProducer.delete(id);
  }
}
