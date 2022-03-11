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
    MessageStatus: MessageStatus;
    chatId: string;
    sender: PartialUser;
    sendedAt: string;
}

enum MessageStatus {
    NotSended = 0,
    SendedNotSeened = 1,
    SendedAndSeened = 2,
}

export type PartialMessage = Partial<Message>;