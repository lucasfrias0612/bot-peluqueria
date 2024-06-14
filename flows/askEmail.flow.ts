import { addKeyword, EVENTS } from "@builderbot/bot";
import { isValidName, isValidEmail } from '../utils/validators';
import { flowSeller } from "./seller.flow";

const flowAskEmail = addKeyword(EVENTS.ACTION)
    .addAnswer('¿Cuál es tu email?', { capture: true, regex: true }, async (ctx, { fallBack, state, gotoFlow }) => {
        if (!isValidEmail(ctx.body)) {
            return fallBack('Por favor, ingresa un email válido (debe contener un @). ¿Cuál es tu email?');
        } else {
            await state.update({email: ctx.body})
            return gotoFlow(flowSeller);
        }
    });

export { flowAskEmail };