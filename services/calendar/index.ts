import { format, addMinutes } from 'date-fns'

/**
 * get calendar
 * @returns 
 */
const getCurrentCalendar = async (): Promise<string> => {
    const dataCalendarApi = await fetch('https://hook.us1.make.com/c4690upte75ka6bskuboaihmar1sh1ec')
    const json: any[] = await dataCalendarApi.json()
    const list = json.reduce((prev, current) => {
        return prev += [
            `Espacio reservado (NO disponible): `,
            `Desde ${format(current.date, 'eeee do h:mm a')} `,
            `Hasta ${format(addMinutes(current.date, 45), 'eeee do h:mm a')} \n`,
        ].join(' ')
    }, '')
    console.log(list)
    return list
}

/**
 * add to calendar
 * @param text 
 * @returns 
 */
const appToCalendar = async (text: string) => {
    try {
        const payload = JSON.parse(text)
        console.log(payload)
        const dataApi = await fetch('https://hook.us1.make.com/2d73y3fsx3si0l2qe0uqb2f4wvc0eh4s', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        return dataApi
    } catch (err) {
        console.log(`error: `, err)
    }
}

export { getCurrentCalendar, appToCalendar }