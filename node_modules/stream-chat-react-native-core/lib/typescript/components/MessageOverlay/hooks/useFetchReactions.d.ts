import { ReactionResponse, ReactionSort } from 'stream-chat';
import { DefaultStreamChatGenerics } from '../../../types/types';
export type UseFetchReactionParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    limit?: number;
    messageId?: string;
    reactionType?: string;
    sort?: ReactionSort<StreamChatGenerics>;
};
export declare const useFetchReactions: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ limit, messageId, reactionType, sort, }: UseFetchReactionParams) => {
    loading: boolean;
    loadNextPage: () => Promise<void>;
    reactions: ReactionResponse<StreamChatGenerics>[];
};
//# sourceMappingURL=useFetchReactions.d.ts.map