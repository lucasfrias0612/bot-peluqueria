import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";
import { flowSeller } from "./seller.flow";

const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
};

const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAnswer(['¡Hola! Soy *TOSiBot* 😀, el asistente virtual de *The Old School Services*.'], null, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        if (!state.get('name')) {
            if (context.name && validateName(context.name)) {
                return await flowDynamic(`¿Tu nombre es ${context.name}?`);
            } else {
                return await flowDynamic('¿Cuál es tu nombre?');
            }
        } else {
            return gotoFlow(flowSeller);
        }
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        const userResponse = context.body.trim().toLowerCase();
        if (userResponse.includes('si') || userResponse.includes('yes')) {
            const name = state.get('name');
            if (validateName(name)) {
                await state.update({ name });
                // Request POST a la API para generar un contact
                return gotoFlow(flowSeller);
            } else {
                return await flowDynamic('Por favor, ingresa un nombre válido (solo letras y espacios). ¿Cuál es tu nombre?');
            }
        } else {
            return await flowDynamic('¿Cuál es tu nombre?');
        }
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        let name = context.body.trim();

        while (!validateName(name)) {
            await flowDynamic('Por favor, ingresa un nombre válido (solo letras y espacios). ¿Cuál es tu nombre?');
            name = await state.get('body')
        }

        await state.update({ name: name });
        // Request POST a la API para generar un contact
        return gotoFlow(flowSeller);
    });

export { welcomeFlow };
