import { showMessage, MessageType, MessageOptions } from 'react-native-flash-message';

export const DefaultFlashConfig: MessageOptions = {
  duration: 3000,
  message: "",
  description : "",
  hideStatusBar: false,
  type: 'info'
}

export const getFlashConfig = (options: MessageOptions) =>  {
  return ({
    ...DefaultFlashConfig,
    ...options,
  })
}

export const notify = (message: string, description: string, type?: MessageType) => {
  showMessage(getFlashConfig({
    message,
    description,
    type: 'danger'
  }));
};

export const notifySuccess = (message: string, description: string) => {
  showMessage({
    message,
    description,
    type: 'success'
  });
};

export const notifyInfo = (message: string, description: string) => {
  showMessage({
    message,
    description,
    type: 'info'
  });
};
