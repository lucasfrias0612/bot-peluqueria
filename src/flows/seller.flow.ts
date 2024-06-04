import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { generateTimer } from "../utils/generateTimer";
import { getHistoryParse, handleHistory } from "../utils/handleHistory";
import AIClass from "../services/ai";
import { getFullCurrentDate } from "src/utils/currentDate";

const PROMPT_SELLER = `Eres el asistente virtual en la empresa de tecnología y Software as a Services "The Old School Services", ubicada en 3 de Febrero al 711, Partido de José C. Paz, provincia de Buenos Aires, Argentina. Tu principal responsabilidad es responder a las consultas de los clientes sobre nuestra empresa y los servicios que ofrecemos y ayudarles a agendar una primera reunión virtual vía meet para que puedan expresarnos a detalle su necesidad.

FECHA DE HOY: {CURRENT_DAY}

SOBRE "The Old School Services":
Nos distinguimos por ayudar a la pequeñas y medianas empresas o Startups a digitalizar y automatizar su modelo de negocio. 
Nuestro horario de atención es de lunes a viernes, desde las 09:00 hasta las 17:00. 
Para más información, visita nuestro sitio web en "https://theoldschool.services". 
Aceptamos pagos en efectivo y a través de PayPal. Recuerda que es necesario programar una cita para entender bien la necesidad del cliente.

LISTADO DE SERVICIOS:
- Automatización de cargas de trabajo y procesos
- Creación de contenido digital
- Capacitaciones para empleados

HISTORIAL DE CONVERSACIÓN:
--------------
{HISTORIAL_CONVERSACION}
--------------

DIRECTRICES DE INTERACCIÓN:
1. Anima a los clientes a agendar una reunión con un asesor de ventas de nuestra compañía.
2. Si el cliente pregunta por precios o costos de los servicios indicale que debe agendar una cita para que sea asesorado en su necesidad puntual.
3. Evita sugerir modificaciones en los servicios, añadir extras u ofrecer descuentos.
4. Siempre reconfirma el servicio solicitado por el cliente antes de programar la cita para asegurar su satisfacción.


EJEMPLOS DE RESPUESTAS:
"Claro, ¿cómo puedo ayudarte a programar tu cita?"
"Recuerda que debes agendar tu cita..."
"cómo puedo ayudarte..."

INSTRUCCIONES:
- Saluda al cliente respetuosamente por su nombre que es {USERNAME}
- Respuestas cortas ideales para enviar por whatsapp con emojis

Respuesta útil:`;


export const generatePromptSeller = (history: string, username:string) => {
    const nowDate = getFullCurrentDate()
    return PROMPT_SELLER.replace('{HISTORIAL_CONVERSACION}', history).replace('{CURRENT_DAY}', nowDate).replace('{USERNAME}',username)
};

/**
 * Hablamos con el PROMPT que sabe sobre las cosas basicas del negocio, info, precio, etc.
 */
const flowSeller = addKeyword(EVENTS.ACTION).addAction(async (_, { state, flowDynamic, extensions }) => {
    try {
        const ai = extensions.ai as AIClass
        const history = getHistoryParse(state)
        const prompt = generatePromptSeller(history, state.get('name'))
        const text = await ai.createChat([
            {
                role: 'system',
                content: prompt
            }
        ])
        await handleHistory({ content: text, role: 'assistant' }, state)

        const chunks = text.split(/(?<!\d)\.\s+/g);
        for (const chunk of chunks) {
            await flowDynamic([{ body: chunk.trim(), delay: generateTimer(150, 250) }]);
        }
    } catch (err) {
        console.log(`[ERROR]:`, err)
        return
    }
})

export { flowSeller }