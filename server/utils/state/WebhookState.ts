let isWebhookActive = false;
export function getWebhookStatus(){
    return isWebhookActive;
}

export function setWebhookStatus(value: boolean){
    console.log("Set Webhook status = "+value);
    isWebhookActive = value;
}