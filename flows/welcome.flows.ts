import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";
import { flowSeller } from "./seller.flow";
import { flowAskName } from "./askName.flow";
import { isValidName } from '../utils/validators';
import { createContact, findContact } from "services/gohighlevel/contactService";


const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAnswer(['¡Hola! Soy *TOSSiBot* 😀, el asistente virtual de *The Old School Services*.'], null, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        const existingContact = await findContact(context);
        if (existingContact == null) {
            if (!state.get('name')) {
                if (context.name && isValidName(context.name)) {
                    return await flowDynamic(`¿Tu nombre es ${context.name}?`);
                } else {
                    return gotoFlow(flowAskName)
                }
            } else {
                await createContact(state);
                return gotoFlow(flowSeller);
            }
        }
        else {
            await flowDynamic(`Que bueno verte de nuevo ${existingContact.firstName}!`);
            return gotoFlow(flowSeller);
        }
    })
    .addAction({ capture: true }, async (context: BotContext, { gotoFlow, state }) => {
        const userResponse = context.body.trim().toLowerCase();
        if (userResponse.includes('si') || userResponse.includes('sí')) {
            await state.update({ name: context.name });
            await state.update({ phone: context.from });
            await createContact(state);
            return gotoFlow(flowSeller);
        } else {
            return gotoFlow(flowAskName);
        }
    })

export { welcomeFlow };
