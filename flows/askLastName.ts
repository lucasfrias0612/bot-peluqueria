import { addKeyword, EVENTS } from "@builderbot/bot";
import { isValidName } from '../utils/validators';
import { flowAskEmail } from "./askEmail.flow";

const flowAskLastName = addKeyword(EVENTS.ACTION)
    .addAnswer('¿Cuál es tu apellido?', { capture: true }, async (ctx, { fallBack, state, gotoFlow }) => {
        if (!isValidName(ctx.body)) {
            return fallBack('Por favor, ingresa un apellido válido (solo letras y espacios). ¿Cuál es tu apellido?');
        } else {
            await state.update({ lastName: ctx.body });
            return gotoFlow(flowAskEmail);
        }
    });

export { flowAskLastName };