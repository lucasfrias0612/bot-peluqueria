import { addKeyword, EVENTS } from "@builderbot/bot";
import { isValidName } from '../utils/validators';
import { flowAskLastName } from "./askLastName";

const flowAskName = addKeyword(EVENTS.ACTION)
    .addAnswer('¿Cuál es tu nombre?', { capture: true }, async (ctx, { fallBack, state, gotoFlow }) => {
        if (!isValidName(ctx.body)) {
            return fallBack('Por favor, ingresa un nombre válido (solo letras y espacios). ¿Cuál es tu nombre?');
        } else {
            await state.update({ name: ctx.body });
            return gotoFlow(flowAskLastName);
        }
    });

export { flowAskName };