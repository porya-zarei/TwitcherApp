import {PartialUser} from "./user";

export interface Message {
    messageId: string;
    content: string;
    image: string;
    file: string;
    voice: string;
    video: string;
    fileSize: number;
    imageSize: number;
    voiceSize: number;
    videoSize: number;
    messageStatus: MessageStatus;
    chatId: string;
    sender: PartialUser;
    sendedAt: string;
}

export enum MessageStatus {
    NotSended = 0,
    SendedNotSeened = 1,
    SendedAndSeened = 2,
}

export type PartialMessage = Partial<Message>;

export interface MessageData {
    content: string;
    file?: File | null;
    image?: File | null;
    video?: File | null;
    voice?: File | null;
    chatId: string;
    messageStatus?: MessageStatus;
    senderUserName?: string;
}
