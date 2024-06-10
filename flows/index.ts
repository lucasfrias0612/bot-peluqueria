import { EVENTS, createFlow, addKeyword } from "@builderbot/bot";
import { welcomeFlow } from "./welcome.flows";
import { flowSeller } from "./seller.flow";
import { meetingFlow } from "./meeting.flow";

const flowMedia = addKeyword(EVENTS.MEDIA)
    .addAnswer('He recibido tu foto o video pero actualmente no estoy preparado para interpretarla.')
    .addAnswer('Te pido disculpas por el inconveniente.')
    .addAction(async (context) => {
        console.log("FLOW MEDIA");
        console.log(context);
    });

const flowLocation = addKeyword(EVENTS.LOCATION)
    .addAnswer('Gracias por compartir tu ubicación conmigo, lo tendré en cuenta.')
    .addAction(async (context) => {
        console.log("FLOW LOCATION");
        console.log(context);
    });

const flowAudio = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('He recibido tu audio pero actualmente no estoy preparado para interpretarlo.')
    .addAnswer('Te pido disculpas por el inconveniente.')
    .addAction(async (context) => {
        console.log("FLOW VOICE_NOTE");
        console.log(context);
    });

const flowDocument = addKeyword(EVENTS.DOCUMENT)
    .addAnswer('He recibido tu archivo pero actualmente no estoy preparado para interpretarlo.')
    .addAnswer('Te pido disculpas por el inconveniente.')
    .addAction(async (context) => {
        console.log("FLOW DOCUMENT");
        console.log(context);
    });

const flows = createFlow([
    welcomeFlow,
    flowDocument,
    flowAudio,
    flowLocation,
    flowMedia,
    flowSeller,
    meetingFlow
]);

export default flows;