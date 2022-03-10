import {PartialUser} from "./user";

export interface Message {
    messageId: string;
    Content: string;
    Image: string;
    File: string;
    Voice: string;
    Video: string;
    fileSize: number;
    imageSize: number;
    voiceSize: number;
    videoSize: number;
    MessageStatus: MessageStatus;
    chatId: string;
    Sender: PartialUser;
    SendedAt: string;
}

enum MessageStatus {
    NotSended = 0,
    SendedNotSeened = 1,
    SendedAndSeened = 2,
}

export type PartialMessage = Partial<Message>;