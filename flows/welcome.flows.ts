import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";
import { flowSeller } from "./seller.flow";
import { fetchData, postData } from '../services/gohighlevel/api'
import { config } from '../config/config';

const { token, locationId } = config;
const url = "https://services.leadconnectorhq.com/contacts/"
const version = "2021-07-28"
const authorization = 'Bearer ' + token
let existe = false;

const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
};

const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAnswer(['¡Hola! Soy *TOSiBot* 😀, el asistente virtual de *The Old School Services*.'], null, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        if (!state.get('name')) {
            if (context.name && validateName(context.name)) {
                return await flowDynamic(`¿Tu nombre es ${context.name}?`);
            } else {
                return await flowDynamic('¿Cuál es tu nombre?');
            }
        } else {
            return gotoFlow(flowSeller);
        }
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        const userResponse = context.body.trim().toLowerCase();
        if (userResponse.includes('si') || userResponse.includes('yes')) {
            const name = state.get('name');
            if (validateName(name)) {
                await state.update({ name });
                try {
                    const data = await fetchData({ url, locationId, authorization, version });
                    existe = data.contacts.some(contact => contact.phone === context.from);
                    
                    if (!existe) {
                        const postPayload = {
                            name: context.name,
                            locationId: locationId,
                            phone: context.from
                        };
                        try {
                            const response = await postData({ url, locationId, authorization, version, data: postPayload });
                            console.log(response);
                        } catch (error) {
                            console.error('Error al enviar los datos:', error);
                        }
                    }
                    
                    return gotoFlow(flowSeller);
                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                }
            } else {
                return await flowDynamic('Por favor, ingresa un nombre válido (solo letras y espacios). ¿Cuál es tu nombre?');
            }
        } else {
            return await flowDynamic('¿Cuál es tu nombre?');
        }
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        let name = context.body.trim();
        if (!validateName(name)) {
            await flowDynamic('Por favor, ingresa un nombre válido (solo letras y espacios). ¿Cuál es tu nombre?');
            return;
        }
        
        await state.update({ name: name });
        try {
            const data = await fetchData({ url, locationId, authorization, version });
            existe = data.contacts.some(contact => contact.phone === context.from);
            
            if (!existe) {
                const postPayload = {
                    name: context.name,
                    locationId: locationId,
                    phone: context.from
                };
                try {
                    const response = await postData({ url, locationId, authorization, version, data: postPayload });
                    console.log(response);
                } catch (error) {
                    console.error('Error al enviar los datos:', error);
                }
            }
            
            return gotoFlow(flowSeller);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    });

export { welcomeFlow };
