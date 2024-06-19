// services/invokeService.ts
import axios from 'axios';
import { config } from '../../config/config';


export interface Subscription {
    _id: string;
    contactId: string;
    contactName: string;
    contactEmail: string;
    currency: string;
    amount: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const { token, locationId } = config;
const url = "https://services.leadconnectorhq.com/payments/subscriptions";
const version = "2021-07-28";
const authorization = 'Bearer ' + token;

export async function getClientSuscriptions(contactId: string): Promise<Subscription[]> {
    const options = {
        method: 'GET',
        url: url,
        params: { altId: locationId, altType: 'location', contactId: contactId },
        headers: { Authorization: authorization, Version: version, Accept: 'application/json' }
    };
    
    try {
        const { data } = await axios.request<{ data: Subscription[] }>(options);
        return data.data;
    } catch (error) {
        console.error(error);
        throw new Error(`Error obteniendo suscripciones del cliente: ${contactId}`);
    }
}
