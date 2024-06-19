import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";
import { meetingFlow } from "./meeting.flow";
import { searchKeyword } from "../utils/searchKeyword";
import { keywords } from "../utils/keywords";

const detectService = (text: string) => {
    if (searchKeyword(keywords.web, text)) return 'web';
    if (searchKeyword(keywords.crm, text)) return 'crm';
    if (searchKeyword(keywords.socialMedia, text)) return 'socialMedia';
    if (searchKeyword(keywords.gmb, text)) return 'gmb';
    return null;
};

const flowSeller = addKeyword(EVENTS.ACTION)
    .addAnswer(["En *The Old School Services* ofrecemos soluciones personalizadas para digitalizar tu negocio y mejorar su rendimiento."], null, async (context: BotContext, { flowDynamic }) => {
        await flowDynamic("Aquí tienes una lista de nuestros servicios y productos:\n\n- Desarrollo Web 🌐\n- Soluciones CRM 📈\n- Gestión de Redes Sociales 📱\n- Optimización de Google My Business 🌟\n\nNos encantaría saber más sobre lo que necesitas. ¿Podrías darnos una idea general de qué tipo de solución de software buscas y para qué áreas de tu negocio? 🤔", { delay: 5000 });
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        await state.update({ body: context.body });
        const detectedService = detectService(context.body);
        const serviceMessage = {
            web: "Parece que estás interesado en soluciones de desarrollo web 🌐.",
            crm: "Entiendo que buscas una solución CRM 📈.",
            socialMedia: "Estás buscando una solución para Redes Sociales 📱.",
            gmb: "Quieres mejorar la imagen pública de tu negocio en Google 🌟."
        }[detectedService] || "Gracias por la información. Procederemos con los detalles para agendar una reunión.";
        await state.update({ service: detectedService });
        await flowDynamic(serviceMessage, { delay: 5000 });
        return gotoFlow(meetingFlow);
    });
export { flowSeller };