import { addKeyword, EVENTS } from "@builderbot/bot";
import { isValidName } from '../utils/validators';
import { flowSeller } from "./seller.flow";

const flowAskName = addKeyword(EVENTS.ACTION)
    .addAnswer('¿Cuál es tu nombre?', { capture: true, regex: true }, async (ctx, { fallBack, state, gotoFlow }) => {
        if (!isValidName(ctx.body)) {
            return fallBack('Por favor, ingresa un nombre válido (solo letras y espacios). ¿Cuál es tu nombre?');
        } else {
            await state.update({ name: ctx.body });
            await state.update({ phone: ctx.from });
            return gotoFlow(flowSeller);
        }
    });

export { flowAskName };