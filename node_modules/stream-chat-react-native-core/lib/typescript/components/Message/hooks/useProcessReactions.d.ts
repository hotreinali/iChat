import { ComponentType } from 'react';
import { MessagesContextValue } from '../../../contexts/messagesContext/MessagesContext';
import { DefaultStreamChatGenerics } from '../../../types/types';
import { ReactionListProps } from '../MessageSimple/ReactionList';
export type ReactionSummary = {
    own: boolean;
    type: string;
    count?: number;
    firstReactionAt?: Date | null;
    Icon?: ComponentType | null;
    lastReactionAt?: Date | null;
    latestReactedUserNames?: string[];
    unlistedReactedUserCount?: number;
};
export type ReactionsComparator = (a: ReactionSummary, b: ReactionSummary) => number;
type UseProcessReactionsParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Pick<ReactionListProps<StreamChatGenerics>, 'own_reactions' | 'reaction_groups' | 'latest_reactions'> & Partial<Pick<MessagesContextValue<StreamChatGenerics>, 'supportedReactions'>> & {
    sortReactions?: ReactionsComparator;
};
export declare const defaultReactionsSort: ReactionsComparator;
/**
 * Custom hook to process reactions data from message and return a list of reactions with additional info.
 */
export declare const useProcessReactions: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: UseProcessReactionsParams<StreamChatGenerics>) => {
    existingReactions: {
        count: number;
        firstReactionAt: Date | null;
        Icon: ComponentType<import("../../..").IconProps> | null;
        lastReactionAt: Date | null;
        latestReactedUserNames: string[];
        own: boolean;
        type: string;
        unlistedReactedUserCount: number;
    }[];
    hasReactions: boolean;
    totalReactionCount: number;
};
export {};
//# sourceMappingURL=useProcessReactions.d.ts.map