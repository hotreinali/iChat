import React from 'react';
import { ReactionGroupResponse, ReactionResponse } from 'stream-chat';
import { MessageContextValue } from '../../../contexts/messageContext/MessageContext';
import { MessagesContextValue } from '../../../contexts/messagesContext/MessagesContext';
import type { DefaultStreamChatGenerics } from '../../../types/types';
import type { ReactionData } from '../../../utils/utils';
import { ReactionSummary } from '../hooks/useProcessReactions';
export type MessageReactions = {
    reactions: ReactionSummary[];
    supportedReactions?: ReactionData[];
};
export type ReactionListPropsWithContext<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Pick<MessageContextValue<StreamChatGenerics>, 'alignment' | 'message' | 'onLongPress' | 'onPress' | 'onPressIn' | 'preventPress' | 'reactions' | 'showMessageOverlay'> & Pick<MessagesContextValue<StreamChatGenerics>, 'targetedMessage'> & {
    messageContentWidth: number;
    supportedReactions: ReactionData[];
    fill?: string;
    /** An array of the reaction objects to display in the list */
    latest_reactions?: ReactionResponse<StreamChatGenerics>[];
    /** An array of the own reaction objects to distinguish own reactions visually */
    own_reactions?: ReactionResponse<StreamChatGenerics>[] | null;
    radius?: number;
    /** An object containing summary for each reaction type on a message */
    reaction_groups?: Record<string, ReactionGroupResponse> | null;
    reactionSize?: number;
    stroke?: string;
    strokeSize?: number;
};
export type ReactionListProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Partial<ReactionListPropsWithContext<StreamChatGenerics>> & Pick<ReactionListPropsWithContext<StreamChatGenerics>, 'messageContentWidth'>;
/**
 * ReactionList - A high level component which implements all the logic required for a message reaction list
 */
export declare const ReactionList: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: ReactionListProps<StreamChatGenerics>) => React.JSX.Element;
//# sourceMappingURL=ReactionList.d.ts.map