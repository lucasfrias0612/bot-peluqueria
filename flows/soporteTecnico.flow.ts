import { addKeyword, EVENTS } from "@builderbot/bot";
import { keywords } from "../utils/keywords";
import { searchKeyword } from "../utils/searchKeyword";
import { createSupportTicket } from '../services/problemTicket/supportService';
import { BotContext } from "@builderbot/bot/dist/types";
import { exitFlow } from "./exit.flow";
import { isAffirmative } from "../utils/validators";

const detectProblem = (text: string) => {
    if (searchKeyword(keywords.problemWebDevelopment, text)) return 'problemWebDevelopment';
    if (searchKeyword(keywords.problemCrm, text)) return 'problemCrm';
    if (searchKeyword(keywords.problemSocialMedia, text)) return 'problemSocialMedia';
    if (searchKeyword(keywords.problemGmb, text)) return 'problemGmb';
    return null;
};

const soporteTecnicoFlow = addKeyword(EVENTS.ACTION)
    .addAnswer('Hola, ¿cómo podemos ayudarte hoy? Por favor, describe brevemente el problema que estás experimentando.', { capture: true }, async (ctx: BotContext, { flowDynamic, fallBack, state }) => {
        const detectedProblem = detectProblem(ctx.body);
        if (!detectedProblem) {
            return fallBack('Lo siento, no he podido clasificar tu problema. ¿Podrías describirlo de nuevo con más detalles?');
        }
        const problemMessages = {
            problemWebDevelopment: "Parece que estás teniendo problemas con tu sitio web. Aquí hay algunas cosas que podrías intentar: \n- Revisa si tienes una buena conexión a internet. \n- Asegúrate de que tu servicio de alojamiento web esté activo. \n- Intenta recargar la página o limpiar la caché del navegador. Si el problema continúa, estamos aquí para ayudarte.",
            problemCrm: "Parece que estás teniendo problemas con nuestro sistema CRM. Te sugerimos: \n- Cerrar y volver a abrir la aplicación. \n- Verificar que tienes acceso a internet. \n- Asegurarte de que estás usando las credenciales correctas. Si esto no resuelve tu problema, estamos aquí para asistirte.",
            problemSocialMedia: "Veo que estás teniendo problemas con la gestión de redes sociales. Aquí hay algunas recomendaciones: \n- Revisa tu conexión a internet. \n- Asegúrate de que tus cuentas de redes sociales estén correctamente configuradas. \n- Verifica que las publicaciones estén programadas correctamente. Si necesitas más ayuda, no dudes en contactarnos.",
            problemGmb: "Parece que tienes problemas con Google My Business. Puedes intentar lo siguiente: \n- Asegúrate de que tu cuenta de GMB esté verificada. \n- Revisa que toda la información de tu negocio esté actualizada. \n- Consulta las políticas de GMB para asegurarte de cumplir con todas las directrices. Si el problema persiste, estamos aquí para ayudarte."
        };
        await flowDynamic(problemMessages[detectedProblem], { delay: 5000 });
        await state.update({ detectedProblem });
    })
    .addAnswer("¿Se ha solucionado el problema?", { capture: true }, async (ctx: BotContext, { flowDynamic, gotoFlow, state }) => {
        if (isAffirmative(ctx.body)) {
            await flowDynamic("¡Excelente! Me alegra saber que el problema se ha solucionado. Si necesitas más ayuda, no dudes en contactarnos. 😊");
            return gotoFlow(exitFlow);
        } else {
            const detectedProblem = state.get("detectedProblem");
            const ticket = await createSupportTicket(ctx.body, detectedProblem, state.get("contactId"));
            await flowDynamic(`No te preocupes, hemos creado un ticket de soporte con ID: ${ticket.id}. Un experto se pondrá en contacto contigo a la brevedad para ayudarte a resolver el problema. 🙌`);
            return gotoFlow(exitFlow);
        }
    });

export { soporteTecnicoFlow };
