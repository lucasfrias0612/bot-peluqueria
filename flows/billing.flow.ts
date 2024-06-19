import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";
import { getClientSuscriptions } from "../services/gohighlevel/invokeService";
import { Subscription } from "../services/gohighlevel/invokeService";
import { exitFlow } from "./exit.flow";

const billingFlow = addKeyword(EVENTS.ACTION)
    .addAnswer("Estamos obteniendo los detalles de tu facturación. Un momento, por favor...", null, async (context: BotContext, { state }) => {
        const clientId = context.from;
        try {
            const billingDetails: Subscription[] = await getClientSuscriptions(clientId);
            await state.update({ billingDetails });
        } catch (error) {
            console.error(error);
            await state.update({ billingDetails: null });
        }
    })
    .addAction({ capture: false }, async (context: BotContext, { flowDynamic, state, gotoFlow }) => {
        const billingDetails: Subscription[] = state.get("billingDetails");
        if (billingDetails) {
            const messages = billingDetails.map(sub => {
                return `📅 Última Factura: ${sub.updatedAt}\n💰 Monto: ${sub.amount} ${sub.currency}\nEstado: ${sub.status}`;
            });
            await flowDynamic(messages);
        } else {
            await flowDynamic("No pudimos obtener los detalles de tu facturación. Por favor, intenta nuevamente más tarde.");
        }
        return gotoFlow(exitFlow)
    });

export { billingFlow };
