import React from 'react';
import { Reaction } from './OverlayReactions';
import type { MessageOverlayContextValue } from '../../contexts/messageOverlayContext/MessageOverlayContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
import { ReactionData } from '../../utils/utils';
export type OverlayReactionsItemProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Pick<MessageOverlayContextValue<StreamChatGenerics>, 'OverlayReactionsAvatar'> & {
    reaction: Reaction;
    supportedReactions: ReactionData[];
};
export declare const OverlayReactionsItem: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ OverlayReactionsAvatar, reaction, supportedReactions, }: OverlayReactionsItemProps<StreamChatGenerics>) => React.JSX.Element;
//# sourceMappingURL=OverlayReactionsItem.d.ts.map