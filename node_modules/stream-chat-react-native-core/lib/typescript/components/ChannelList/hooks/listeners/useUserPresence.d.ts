/// <reference types="react" />
import type { Channel } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../../../types/types';
type Parameters<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    setChannels: React.Dispatch<React.SetStateAction<Channel<StreamChatGenerics>[] | null>>;
    setForceUpdate: React.Dispatch<React.SetStateAction<number>>;
};
export declare const useUserPresence: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ setChannels, setForceUpdate, }: Parameters<StreamChatGenerics>) => void;
export {};
//# sourceMappingURL=useUserPresence.d.ts.map