import { addKeyword, EVENTS } from "@builderbot/bot";
import { BotContext } from "@builderbot/bot/dist/types";
import { meetingFlow } from "./meeting.flow";



const keywords = {
    web: [
        'página web', 'sitio web', 'desarrollo web', 'diseño web', 'web responsive', 'ecommerce', 'tienda en línea', 
        'diseño de páginas web', 'desarrollo de tiendas en línea', 'creación de sitios web', 'host web',
        'web design', 'web development', 'online store', 'responsive design', 'website creation', 'web hosting',
        'web app', 'web application', 'wordpress', 'aplicación web', 'landing page', 'host'
    ],
    crm: [
        'CRM', 'gestión de clientes', 'customer relationship management', 'gestión de relaciones', 'sistema de ventas', 
        'automatización de ventas', 'salesforce', 'hubspot', 'zoho crm', 'pipedrive', 'gestión de leads', 
        'gestión de clientes', 'automatización de ventas', 'base de datos de clientes', 'gestión de pipeline', 'software CRM',
        'lead management', 'client management', 'sales automation', 'customer database', 'pipeline management', 'crm software'
    ],
    socialMedia: [
        'redes sociales', 'social media', 'gestión de redes', 'community manager', 'gestor de redes sociales', 
        'estrategia de redes sociales', 'publicidad en redes sociales', 'estrategia de social media', 'facebook', 'instagram', 
        'twitter', 'linkedin', 'marketing en redes sociales', 'creación de contenido', 'publicidad en social media', 
        'campañas en redes sociales', 'análisis de redes sociales', 'marketing de influencers', 'comunidad en línea',
        'social media strategy', 'social media manager', 'social media marketing', 'content creation', 'social media advertising', 
        'social media campaigns', 'social media analytics', 'influencer marketing', 'online community'
    ],
    gmb: [
        'Google My Business', 'GMB', 'gestión de Google My Business', 'ficha de Google', 'negocios en Google', 
        'optimización de GMB', 'google maps', 'seo local', 'listado de negocios', 'reseñas de google', 'negocio local', 
        'perfil de negocio de google', 'optimización de gmb', 'búsqueda local', 'google local', 'gestión de google my business',
        'reputación en línea', 'página de negocio de google',
        'local seo', 'business listing', 'google reviews', 'local business', 
        'google business profile', 'gmb optimization', 'local search', 'google my business management',
        'online reputation', 'google business page'
    ]
};


const normalizeText = (text) => {
    return text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const detectService = (text) => {
    const normalizedText = normalizeText(text);
    for (const [service, words] of Object.entries(keywords)) {
        if (words.some(word => normalizedText.includes(normalizeText(word)))) {
            return service;
        }
    }
    return null;
};

const flowSeller = addKeyword(EVENTS.ACTION)
    .addAnswer(["En *The Old School Services* ofrecemos soluciones personalizadas para digitalizar tu negocio y mejorar su rendimiento."], null, async (context: BotContext, { flowDynamic }) => {
        await flowDynamic("Aquí tienes una lista de nuestros servicios y productos:\n\n- Desarrollo Web 🌐\n- Soluciones CRM 📈\n- Gestión de Redes Sociales 📱\n- Optimización de Google My Business 🌟\n\nNos encantaría saber más sobre lo que necesitas. ¿Podrías darnos una idea general de qué tipo de solución de software buscas y para qué áreas de tu negocio? 🤔");
    })
    .addAction({ capture: true }, async (context: BotContext, { flowDynamic, gotoFlow, state }) => {
        await state.update({ body: context.body });
        const detectedService = detectService(context.body);
        const serviceMessage = {
            web: "Parece que estás interesado en soluciones de desarrollo web 🌐.",
            crm: "Entiendo que buscas una solución CRM 📈.",
            socialMedia: "Estás buscando una solución para Redes Sociales 📱.",
            gmb: "Quieres mejorar la imagen pública de tu negocio en Google 🌟."
        }[detectedService] || "Gracias por la información. Procederemos con los detalles para agendar una reunión.";

        await flowDynamic(serviceMessage);
        return gotoFlow(meetingFlow);
    });
export { flowSeller };