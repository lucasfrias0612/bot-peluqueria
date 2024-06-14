import { fetchData, postData } from './api'
import { config } from '../../config/config';
import { BotContext, BotStateStandAlone } from '@builderbot/bot/dist/types';

const { token, locationId } = config;
const url = "https://services.leadconnectorhq.com/contacts/"
const version = "2021-07-28"
const authorization = 'Bearer ' + token

interface Contact {
    lastName: string;
    firstName: string;
    phone: string;
    locationId: string;
}
export async function findContact(context: BotContext) {
    let contact: Contact = null
    try {
        const data = await fetchData({ url, locationId, authorization, version });
        contact = data.contacts.find(contact => contact.phone === context.from || contact.phone.replace('+', '') === context.from);
    } catch (error) {
        console.error('Error al buscar el contacto:', error);
    }
    return contact;
}

export async function createContact(state: BotStateStandAlone) {
    let contact: Contact = null
    const postPayload = {
        firstName: state.get('name'),
        locationId: locationId,
        phone: state.get('phone')
    };
    try {
        const response = await postData({ url, locationId, authorization, version, data: postPayload });
        contact = response.contact;
        console.log(response);
    } catch (error) {
        console.error('Error al enviar los datos:', error);
    }
    return contact;
}