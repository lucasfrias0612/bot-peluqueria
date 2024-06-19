export class SupportTicket {
    constructor(
        public id: string,
        public description: string,
        public type: string,
        public userContact: string,
        public createdAt: Date = new Date()
    ) {}
}