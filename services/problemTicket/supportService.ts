import { SupportTicket } from '../../models/supportTicket';

const supportTickets: SupportTicket[] = [];

export const createSupportTicket = (description: string, type: string, userContact: string): SupportTicket => {
    const ticket = new SupportTicket(Date.now().toString(), description, type, userContact);
    supportTickets.push(ticket);
    return ticket;
};

export const getSupportTickets = (): SupportTicket[] => supportTickets;