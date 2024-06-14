import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";
import { flowSeller } from "./seller.flow";
import { flowAskName } from "./askName.flow";
import { findContact } from "services/gohighlevel/contactService";


const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAnswer(['¡Hola! Soy *TOSSiBot* 😀, el asistente virtual de *The Old School Services*.'], null, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        const existingContact = await findContact(context);
        if (existingContact == null) {
            await state.update({ phone: context.from });
            return gotoFlow(flowAskName)
        }
        else {
            await state.update({ contactId: existingContact.id });
            await flowDynamic(`Que bueno verte de nuevo ${existingContact.firstName}!`, { delay: 2000 });
            return gotoFlow(flowSeller);
        }
    })

export { welcomeFlow };
