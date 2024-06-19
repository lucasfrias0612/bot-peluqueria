import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";
import { getClientPlan } from "services/gohighlevel/contactService";
import { exitFlow } from "./exit.flow";

const persuasiveMessages = {
    basic: [
        "Hemos notado que estás en el Plan Básico. ¿Sabías que al cambiar al Plan Negocio puedes obtener soporte en la reputación de tu negocio en Google Maps automatizado y recordatorios personalizados para tus clientes? 🏆",
        "Además, con el Plan Negocio puedes desarrollar un sistema de ventas en el que el cliente pueda realizar pagos directamente en tu plataforma y mejorar el SEO de tu sitio web. ¡Es una excelente oportunidad para llevar tu negocio al siguiente nivel! 🚀"
    ],
    business: [
        "Actualmente estás disfrutando de los beneficios del Plan Negocio. ¿Te gustaría llevar tu negocio aún más lejos con el Plan Empresarial? 🌟",
        "Con el Plan Empresarial, obtendrás soluciones digitales con inteligencia artificial a tu medida, un ecommerce personalizado, y estrategias de marketing mensual para atraer más clientes. ¡No dejes pasar esta oportunidad para expandir tu negocio digitalmente! 📈"
    ]
};

const suggestUpgrade = (currentPlan: string): string[] => {
    return persuasiveMessages[currentPlan] || [];
};

const upgradePlanFlow = addKeyword(EVENTS.ACTION)
    .addAnswer("Estamos revisando tu plan actual. Un momento, por favor...", null, async (context: BotContext, { state }) => {
        const currentPlan = await getClientPlan(state.get("contactId"));
        await state.update({ currentPlan });
    })
    .addAction({ capture: false }, async (context: BotContext, { flowDynamic, state, gotoFlow }) => {
        const currentPlan = state.get("currentPlan");
        const messages = suggestUpgrade(currentPlan);
        for (const message of messages) {
            await flowDynamic(message, { delay: 5000 });
        }
        return gotoFlow(exitFlow)
    });

export { upgradePlanFlow };
