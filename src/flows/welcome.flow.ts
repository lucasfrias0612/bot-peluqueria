import { EVENTS, addKeyword } from "@bot-whatsapp/bot";
import { BotContext } from "@bot-whatsapp/bot/dist/types";
import { flowSeller } from "./seller.flow";

/**
 * Este flow responde a cualquier palabra que escriban
 */

export default addKeyword(EVENTS.WELCOME)
    .addAnswer(['Hola ☺️', 'Soy Educapri el asistente de *The Old School Services*'], null, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        console.log(context)
        if (!state.get('name'))
            if (context.name)
                return flowDynamic('Tu nombre es ' + context.name + '?')
            else
                return flowDynamic('¿Cuál es tu nombre?')
        else
            gotoFlow(flowSeller)
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        if (context.body.trim().toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes('si')) {
            await state.update({ name: context.name })
            return gotoFlow(flowSeller)
        }
        else
            return flowDynamic('¿Cuál es tu nombre?')
    })
    .addAction({ capture: true }, async (context: BotContext, { gotoFlow, state }) => {
        await state.update({ name: context.body })
        return gotoFlow(flowSeller)
    })



//.addAction(conversationalLayer)
//.addAction(mainLayer)