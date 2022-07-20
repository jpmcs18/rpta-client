import React, { useContext, ReactNode, useState } from 'react';
import { Message } from '../entities/Message';
import { ToasterMessage, ToasterMessageItem } from '../entities/ToasterMessage';
import Toaster from '../pages/components/toaster';
import MessageDialog from '../pages/modals/message-dialog';
import { Guid } from 'guid-typescript';

const SetToasterMessageContext = React.createContext<
  (message: ToasterMessageItem) => void
>(() => {});
const ToasterMessageContext = React.createContext<
  [ToasterMessage[], React.Dispatch<React.SetStateAction<ToasterMessage[]>>]
>([[], () => {}]);
const SetMessageContext = React.createContext<(message: Message) => void>(
  () => {}
);
const SetCloseMessageDialogContext = React.createContext<() => void>(() => {});
const MessageContext = React.createContext<Message | undefined>(undefined);
const OpenMessageDialogContext = React.createContext<boolean>(false);
const SetBusyContext = React.createContext<(args: boolean) => void>(() => {});
export function useSetToasterMessage() {
  return useContext(SetToasterMessageContext);
}
export function useToasterMessage() {
  return useContext(ToasterMessageContext);
}
export function useSetCloseMessageDialog() {
  return useContext(SetCloseMessageDialogContext);
}
export function useSetMessage() {
  return useContext(SetMessageContext);
}
export function useMessage() {
  return useContext(MessageContext);
}
export function useOpenMessageDialog() {
  return useContext(OpenMessageDialogContext);
}
export function useSetBusy() {
  return useContext(SetBusyContext);
}
export function AuthorizeProvider({ children }: { children: ReactNode }) {
  const [toasterMessages, setToasterMessages] = useState<ToasterMessage[]>(
    () => []
  );
  const [openMessageDialog, setOpenMessageDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>();
  const [showLoading, setShowLoading] = useState<number>(() => 0);
  function showMessage(message: Message) {
    setMessage(message);
    setOpenMessageDialog(true);
  }
  function closeMessageDilaog() {
    setOpenMessageDialog(false);
  }
  function setBusy(isBusy: boolean) {
    setShowLoading((b) => b + (isBusy ? 1 : -1));
    if (showLoading + (isBusy ? 1 : -1) === 1) {
      document.body.classList.add('body-modal');
    } else {
      document.body.classList.remove('body-modal');
    }
  }
  function showToaster(message: ToasterMessageItem) {
    setToasterMessages((r) => [
      ...r,
      {
        id: Guid.create(),
        content: message.content,
        title: message.title,
        idle: false,
        time: 10,
      },
    ]);
  }
  return (
    <div>
      <div
        className={
          'loading-screen' + (showLoading > 0 ? ' loading-block' : '')
        }>
        <div className='loading-blocker'></div>
        <div className='loading'>
          <div></div>
        </div>
      </div>
      <SetBusyContext.Provider value={setBusy}>
        <SetToasterMessageContext.Provider value={showToaster}>
          <OpenMessageDialogContext.Provider value={openMessageDialog}>
            <SetCloseMessageDialogContext.Provider value={closeMessageDilaog}>
              <MessageContext.Provider value={message}>
                <SetMessageContext.Provider value={showMessage}>
                  {children}
                  {openMessageDialog && <MessageDialog />}
                  <ToasterMessageContext.Provider
                    value={[toasterMessages, setToasterMessages]}>
                    <Toaster />
                  </ToasterMessageContext.Provider>
                </SetMessageContext.Provider>
              </MessageContext.Provider>
            </SetCloseMessageDialogContext.Provider>
          </OpenMessageDialogContext.Provider>
        </SetToasterMessageContext.Provider>
      </SetBusyContext.Provider>
    </div>
  );
}
