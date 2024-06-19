import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";
import { searchKeyword } from "../utils/searchKeyword";
import { keywords } from '../utils/keywords'
import { soporteTecnicoFlow } from "./soporteTecnico.flow";
import { upgradePlanFlow } from "./upgradePlan.flow";
import { billingFlow } from "./billing.flow";

const detectService = (text: string) => {
    if (searchKeyword(keywords.technicalSupport, text)) return 'technicalSupport';
    if (searchKeyword(keywords.upgradePlan, text)) return 'upgradePlan';
    if (searchKeyword(keywords.billing, text)) return 'billing';
    return null;
};

const customerHelpFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(["¿En qué podemos ayudarte hoy? Por favor, cuéntanos brevemente lo que necesitas y te ayudaremos a encontrar la mejor solución."], null, async (context: BotContext, { flowDynamic }) => {
        await flowDynamic("Algunas de las opciones que ofrecemos incluyen:\n\n- Servicio Técnico 🛠️\n- Mejorar mi Plan Actual 📈\n- Opciones sobre la Facturación 💼\n\nNos encantaría saber más sobre lo que necesitas. ¿Podrías darnos una idea general de qué tipo de ayuda buscas? 🤔", { delay: 5000 });
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, gotoFlow, fallBack, state }) => {
        const detectedService = detectService(context.body);
        const serviceMessage = {
            technicalSupport: "Parece que necesitas Servicio Técnico. Un momento mientras te conectamos con uno de nuestros técnicos. 🛠️",
            upgradePlan: "Entiendo que quieres Mejorar tu Plan Actual. Aquí están nuestras opciones disponibles. 📈",
            billing: "Estás interesado en opciones sobre la Facturación. Un momento mientras verificamos tus detalles de facturación. 💼"
        }[detectedService];
        await state.update({ service: detectedService });
        await flowDynamic(serviceMessage, { delay: 5000 });
        if (detectedService === 'technicalSupport') {
            await flowDynamic("Un técnico se comunicará contigo en breve. Gracias por tu paciencia.", {delay: 2000});
            return gotoFlow(soporteTecnicoFlow)
        } else if (detectedService === 'upgradePlan') {
            return gotoFlow(upgradePlanFlow)
        } else if (detectedService === 'billing') {
            return gotoFlow(billingFlow)
        } else return fallBack("Lo siento, no he podido clasificar el área de tu consulta. ¿Podrías describirlo de nuevo con más detalles?")
    });
export { customerHelpFlow };
