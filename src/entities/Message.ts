export interface Message {
  message: any;
  type?: MESSAGETYPE | undefined;
  action?: MESSAGEACTION | undefined;
  onOk?: () => void;
}

export type MESSAGETYPE = 'MESSAGE' | 'ALERT';
export type MESSAGEACTION = 'YESNO' | 'OKCANCEL';
