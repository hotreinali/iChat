import type { FormatMessageResponse, MessageResponse, ReactionResponse } from 'stream-chat';
import type { PreparedQueries } from '../types';
export declare const insertReaction: ({ flush, message, reaction, }: {
    message: MessageResponse | FormatMessageResponse;
    reaction: ReactionResponse;
    flush?: boolean | undefined;
}) => PreparedQueries[];
//# sourceMappingURL=insertReaction.d.ts.map