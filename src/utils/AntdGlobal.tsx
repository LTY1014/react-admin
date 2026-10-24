import React from 'react';
import { App as AntdApp, message as antdMessage, Modal as antdModal, notification as antdNotification } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

let message: MessageInstance = antdMessage;
let notification: NotificationInstance = antdNotification;
let modal: Omit<ModalStaticFunctions, 'warn'> = antdModal;

/**
 * 全局 Antd 静态方法桥接组件
 * 挂载在 <AntdApp> 内部，注入带动态主题上下文的 message / modal / notification 实例，
 * 并覆盖 antd 静态方法，使各处业务组件与拦截器无需编写 App.useApp() 即可响应暗黑模式与主题色。
 */
export const AntdGlobal: React.FC = () => {
    const staticFunction = AntdApp.useApp();

    message = staticFunction.message;
    modal = staticFunction.modal;
    notification = staticFunction.notification;

    Object.assign(antdMessage, staticFunction.message);
    Object.assign(antdModal, staticFunction.modal, {
        warn: staticFunction.modal.warning,
    });
    Object.assign(antdNotification, staticFunction.notification);

    return null;
};

export { message, notification, modal };
