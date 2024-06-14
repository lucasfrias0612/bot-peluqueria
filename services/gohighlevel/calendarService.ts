import { fetchData } from './api'
import { config } from '../../config/config';

const { token, locationId } = config;

const calendarId = "dKT7Cl8sV9bmt8WkLS7X" //Calendario de TOS
const version = "2021-07-28"
const authorization = 'Bearer ' + token

interface CalendarEvent {
    id: string,
    calendarId: string,
    status: string,
    title: string,
    appoinmentStatus: string,
    assignedUserId: string,
    notes: string,
    startTime: string,
    endTime: string
}

export async function findContactAppointments(contactId: string) {
    const url = "https://services.leadconnectorhq.com/contacts/" + contactId + "/appointments/"
    let existingEvents: CalendarEvent[] = []
    try {
        const data = await fetchData({ url, locationId, authorization, version });
        if (data.events && Array.isArray(data.events))
            existingEvents = data.events.filter(event => event.calendarId == calendarId);
    } catch (error) {
        console.error('Error al buscar Eventos de calendario del contacto:', error);
    }
    return existingEvents;
}
