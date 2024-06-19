import { fetchData, postData } from './api'
import { config } from '../../config/config';
import { BotContext, BotStateStandAlone } from '@builderbot/bot/dist/types';

const { token, locationId } = config;
const url = "https://services.leadconnectorhq.com/contacts/"
const version = "2021-07-28"
const authorization = 'Bearer ' + token

interface Contact {
    id: string;
    lastName: string;
    firstName: string;
    phone: string;
    locationId: string;
}

export async function findContact(context: BotContext) {
    let existingContact: Contact = null
    try {
        const data = await fetchData({ url, locationId, authorization, version });
        existingContact = data.contacts.find(
            contact => contact.phone && (contact.phone == context.from || contact.phone.replace('+', '') == context.from.replace('+', '')));
    } catch (error) {
        console.error('Error al buscar el contacto:', error);
    }
    return existingContact;
}

export async function createContact(state: BotStateStandAlone) {
    let contact: Contact = null
    const postPayload = {
        locationId: locationId,
        firstName: state.get('name'),
        lastName: state.get('lastName'),
        email: state.get('email'),
        phone: state.get('phone').includes('+') ? state.get('phone') : '+' + state.get('phone'),
    };
    try {
        const response = await postData({ url, locationId, authorization, version, data: postPayload });
        contact = response.contact;
    } catch (error) {
        console.error('Error al enviar los datos:', error);
    }
    return contact;
}


export async function getClientPlan(clienteId: string){
    return "basic"
}