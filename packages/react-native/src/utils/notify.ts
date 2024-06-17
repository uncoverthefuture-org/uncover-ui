import { showMessage, MessageType } from 'react-native-flash-message';

export const notify = (message: string, description: string, type?: MessageType) => {
  showMessage({
    duration: 3000,
    message,
    description,
    hideStatusBar: false,
    type: type ?? 'danger'
  });
};

export const notifySuccess = (message: string, description: string) => {
  showMessage({
    duration: 3000,
    message,
    description,
    hideStatusBar: false,
    type: 'success'
  });
};

export const notifyInfo = (message: string, description: string) => {
  showMessage({
    duration: 4000,
    message,
    description,
    icon: 'info',
    hideStatusBar: false,
    type: 'info'
  });
};
