import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";
import { findContactAppointments } from "../services/gohighlevel/calendarService";
import { isAffirmative } from "utils/validators";

const meetingFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(["¿Te gustaría agendar una consultoría personalizada con uno de nuestros expertos? 😊"])
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, endFlow, state }) => {
        if (isAffirmative(context.body)) {
            await flowDynamic("¡Perfecto! Un momento mientras revisamos nuestra agenda. 🕒");
            const existingContactEvents = await findContactAppointments(state.get("contactId"))
            if (existingContactEvents.length > 0) {
                const firstEvent = existingContactEvents[0];
                await flowDynamic("Hemos detectado que ya tienes una cita agendada con nosotros. Aquí están los detalles:", { delay: 3000 });
                await flowDynamic([`📌 ${firstEvent.title}`, `📅 Fecha y Hora: ${firstEvent.startTime}`], { delay: 1000 });
                await flowDynamic("¡Gracias por confiar en nosotros! Estamos emocionados de ayudarte a potenciar tu negocio. 🚀", { delay: 1000 });
            } else {
                await flowDynamic(["Te invitamos a reservar tu cita mediante nuestro servicio online en el siguiente enlace: ", '🔗 https://www.theoldschool.services/contacto']);
            }
        } else {
            await flowDynamic("¡No hay problema! Si tienes alguna otra consulta, no dudes en decírmelo. 😊");
        }
        return endFlow();
    });

export { meetingFlow };