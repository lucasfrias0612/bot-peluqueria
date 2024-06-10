import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";
import { flowSeller } from "./seller.flow";

const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAnswer(['¡Hola! Soy *TOSiBot* 😀, el asistente virtual de *The Old School Services*.'], null, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        if (!state.get('name')) {
            if (context.name) {
                return await flowDynamic(`¿Tu nombre es ${context.name}?`);
            } else {
                return await flowDynamic('¿Cuál es tu nombre?');
            }
        } else {
            return gotoFlow(flowSeller);
        }
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        if (context.body.trim().toLowerCase().includes('si') || context.body.trim().toLowerCase().includes('yes')) {
            await state.update({ name: context.name });
            // Request POST a la API para generar un contact
            return gotoFlow(flowSeller);
        } else {
            return await flowDynamic('¿Cuál es tu nombre?');
        }
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        await state.update({ name: context.body });
        // Request POST a la API para generar un contact
        return gotoFlow(flowSeller);
    });

export { welcomeFlow };
