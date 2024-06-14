import { createBot, createProvider } from '@builderbot/bot';
import { adapterDB as JsonFileDB } from './json-database';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import flows from 'flows/index';

const PORT = process.env.PORT ?? 3008;

const main = async () => {
    const adapterFlow = flows;
    const adapterProvider = createProvider(Provider);
    const adapterDB = JsonFileDB

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    /*
    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            try {
                const { number, message } = req.body;

                if (!number || !message) {
                    return res.status(400).json({ error: 'Number and message are required' });
                }

                if (!bot) {
                    return res.status(500).json({ error: 'Bot not initialized' });
                }

                // Asegúrate de que el número de teléfono tenga el formato correcto
                const formattedNumber = `${number}@s.whatsapp.net`; // ajusta el dominio según sea necesario

                // Llamada a sendMessage con opciones correctamente manejadas
                await bot.sendMessage(formattedNumber, message, {});

                return res.end('sended');
            } catch (error) {
                console.error('Error sending message:', error);
                if (error.output?.statusCode === 410) {
                    return res.status(500).json({ error: 'Authentication required, please scan the QR code again' });
                }
                return res.status(500).json({ error: 'Failed to send message' });
            }
        })
    );


    adapterProvider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body;
            await bot.dispatch('REGISTER_FLOW', { from: number, name });
            return res.end('trigger');
        })
    );

    adapterProvider.server.post(
        '/v1/samples',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body;
            await bot.dispatch('SAMPLES', { from: number, name });
            return res.end('trigger');
        })
    );

    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body;
            if (intent === 'remove') bot.blacklist.remove(number);
            if (intent === 'add') bot.blacklist.add(number);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ status: 'ok', number, intent }));
        })
    );
    */
    httpServer(+PORT);
};

main();
