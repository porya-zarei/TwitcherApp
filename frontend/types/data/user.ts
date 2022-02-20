import {Category} from "./category";
import { PartialTweet } from "./tweet";

export enum UserTypes {
    Creator = 0,
    Admin,
    Professional,
    Gold,
    Silver,
    Bronze,
}

export enum UserStatus {
    Happy = 0,
    Busy,
    Successful,
    Failed,
    CustomStatus,
}

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    birthDay: string;
    phoneNumber: string;
    bio: string;
    profileImage: string;
    backgroundImage: string;
    status: UserStatus;
    joinedAt: Date;
    statusText: string;
    userType: UserTypes;
    followersCount: number;
    followingsCount: number;
    interestedCategories: Category[];
    tweets: PartialTweet[];
    replies: PartialTweet[];
    retweets: PartialTweet[];
    isFollowed: boolean;
}

export type PartialUser = Partial<User>;

export type PartialUserWithToken = PartialUser & {token?: string};

export interface IUserImagesChangedData {
    data: FormData;
    token: string;
}

export interface IUserImagesChangedResult {
    profileImage: string;
    backgroundImage: string;
}
