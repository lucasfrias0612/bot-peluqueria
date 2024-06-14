import { addKeyword, EVENTS } from "@builderbot/bot";
import { isValidEmail } from '../utils/validators';
import { flowSeller } from "./seller.flow";
import { createContact } from "services/gohighlevel/contactService";

const flowAskEmail = addKeyword(EVENTS.ACTION)
    .addAnswer('¿Cuál es tu email?', { capture: true }, async (ctx, { state, fallBack, flowDynamic, gotoFlow }) => {
        if (!isValidEmail(ctx.body)) {
            return fallBack('Por favor, ingresa un email válido. ¿Cuál es tu email?');
        } else {
            await state.update({ email: ctx.body })
            await flowDynamic("¡Gracias por los datos proporcionados!");
            const createdContact=await createContact(state);
            await state.update({ contactId: createdContact.id });
            return gotoFlow(flowSeller);
        }
    });

export { flowAskEmail };