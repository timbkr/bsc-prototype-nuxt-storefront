/**
    ------------- NOTIFICATION BAR STATUS: ------------- 
*/
export type NotificationBarStatus = {
    visible: Boolean,
    type: "success" | "error" //success | error
    msg: String
}

export const useNotificationBarStatus = () =>
    useState<NotificationBarStatus>("notificationBarStatus", () => ({
        visible: false,
        type: "success",
        msg: "",
    }));

let notificationBarTimeOut = setTimeout(() => {});

export function showNotificationBar(type: NotificationBarStatus["type"], msg: String) {
    const notificationBarStatus = useNotificationBarStatus();
    notificationBarStatus.value.visible = true;
    notificationBarStatus.value.type = type;
    notificationBarStatus.value.msg = msg;

    clearTimeout(notificationBarTimeOut);
    notificationBarTimeOut = setTimeout(() => {
        notificationBarStatus.value.visible = false;
    }, 3000);
}

export function closeNotificationBar() {
    const notificationBarStatus = useNotificationBarStatus();
    notificationBarStatus.value.visible = false;
    clearTimeout(notificationBarTimeOut);
}
