
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

export class KafkaProducer {

    private producer: Producer;

    constructor(brokers: string[], clientId: string) {
        const kafka = new Kafka({
            clientId,
            brokers,
        });

        this.producer = kafka.producer();
    }

    async connect() {
        await this.producer.connect();
    }

    async disconnect() {
        await this.producer.disconnect();
    }

    async sendMessage(topic: string, key: string, value: string) {
        const message: ProducerRecord = {
            topic,
            messages: [{ key, value }],
        };

        await this.producer.send(message);
        console.log('Mensaje enviado con éxito:', { topic, key, value });
    }
}  