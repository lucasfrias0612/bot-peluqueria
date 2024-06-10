import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";

const meetingFlow = addKeyword(["default"])
    .addAnswer(["¿Podrías brindarme más detalles al respecto? 😊"], null, async (context: BotContext, { flowDynamic }) => {
        await flowDynamic("Recuerda ser lo más precis@ posible para poder concretar la reunión con el mayor detalle posible.");
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, state }) => {
        await state.update({ details: context.body });
        await flowDynamic("Entendido, hemos registrado tu solicitud. Ahora, estos son los días disponibles para una reunión:");
        //Consultar dias del calendario
        await flowDynamic("Días: 11/6, 12/6, 13/6. ¿Cuál de estos días te viene bien?");
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, state }) => {
        await state.update({ meetingDay: context.body });
        await flowDynamic(`Perfecto, te esperamos el ${context.body}.`);
    })
    .addAction({ capture: false }, async (context: BotContext, { endFlow }) => {
        return endFlow();
    });

export { meetingFlow };