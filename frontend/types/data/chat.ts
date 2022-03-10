import {PartialMessage} from "./message";
import {PartialUser} from "./user";

export interface Chat {
    chatId: string;
    title: string;
    description: string;
    chatLink: string;
    createdAt: string;
    isOpen: boolean;
    messages: PartialMessage[];
    users: PartialUser[];
    admins: PartialUser[];
    type: ChatTypes;
    creator: PartialUser;
}

export enum ChatTypes {
    Pv,
    EncryptedPv,
    Group,
    Channel,
}

export type PartialChat = Partial<Chat>;
