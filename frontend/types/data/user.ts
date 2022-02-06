import {Category} from "./category";

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
    failed,
    CustomStatus,
}

export interface User {
    userId: string;
    fullName: string;
    userName: string;
    email: string;
    birthDay: Date;
    bio: string;
    profileImage: string;
    backgroundImage: string;
    status: UserStatus;
    joinedAt: Date;
    statusText: string;
    userType: UserTypes;
    followersCount: number;
    followingsCount:number;
    interestedCategories: Category[];
}
