import { addKeyword, EVENTS } from "@builderbot/bot";
import { isAffirmative } from "../utils/validators";
import { customerHelpFlow } from "./customerHelp.flow";
import { BotContext } from "@builderbot/bot/dist/types";

const exitFlow = addKeyword(EVENTS.ACTION)
    .addAnswer('¿Hay algo más en lo que pueda ayudarte?', { capture: true }, async (ctx: BotContext, { gotoFlow, flowDynamic, endFlow }) => {
        if (isAffirmative(ctx.body)) {
            await flowDynamic("¡Genial! Estoy aquí para ayudarte. Un momento mientras te redirijo a nuestro equipo de soporte...");
            return gotoFlow(customerHelpFlow);
        } else {
            await flowDynamic(["Entiendo. Si tienes alguna otra pregunta en el futuro, no dudes en contactarnos. ¡Que tengas un excelente día! 😊", "Gracias por usar nuestros servicios. ¡Hasta pronto!"], {delay: 3000});
            return endFlow()
        }
    });

export { exitFlow };
