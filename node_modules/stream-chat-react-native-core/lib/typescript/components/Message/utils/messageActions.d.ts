import type { MessageContextValue } from '../../../contexts/messageContext/MessageContext';
import type { OwnCapabilitiesContextValue } from '../../../contexts/ownCapabilitiesContext/OwnCapabilitiesContext';
import type { DefaultStreamChatGenerics } from '../../../types/types';
import type { MessageActionType } from '../../MessageOverlay/MessageActionListItem';
export type MessageActionsParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    banUser: MessageActionType;
    copyMessage: MessageActionType;
    deleteMessage: MessageActionType;
    dismissOverlay: () => void;
    editMessage: MessageActionType;
    error: boolean | Error;
    flagMessage: MessageActionType;
    /**
     * Determines if the message actions are visible.
     */
    isMessageActionsVisible: boolean;
    isThreadMessage: boolean;
    /**
     * @deprecated use `isMessageActionsVisible` instead.
     */
    messageReactions: boolean;
    muteUser: MessageActionType;
    ownCapabilities: OwnCapabilitiesContextValue;
    pinMessage: MessageActionType;
    quotedReply: MessageActionType;
    retry: MessageActionType;
    threadReply: MessageActionType;
    unpinMessage: MessageActionType;
    /**
     * @deprecated use `banUser` instead.
     */
    blockUser?: MessageActionType;
} & Pick<MessageContextValue<StreamChatGenerics>, 'message' | 'isMyMessage'>;
export type MessageActionsProp<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = (param: MessageActionsParams<StreamChatGenerics>) => MessageActionType[];
export declare const messageActions: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ banUser, blockUser, copyMessage, deleteMessage, editMessage, error, flagMessage, isMessageActionsVisible, isMyMessage, isThreadMessage, message, messageReactions, ownCapabilities, pinMessage, quotedReply, retry, threadReply, unpinMessage, }: MessageActionsParams<StreamChatGenerics>) => MessageActionType[];
//# sourceMappingURL=messageActions.d.ts.map