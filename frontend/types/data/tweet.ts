import {User} from "./user";

export enum TweetTypes {
    Tweet = 0,
    ReTweet,
    QouteTweet,
    Replay,
}

export interface Tweet {
    tweetId: string;
    title: string;
    content: string;
    createdAt: Date;
    hashtags: string[];
    images: string[];
    likesCount: number;
    reTweetType: TweetTypes;
    sender: User;
    video: string;
}

// {
//     "tweetId": "3b328311-50d6-4a63-8297-b90e2b12cf84",
//     "reTweetType": 0,
//     "title": "",
//     "content": "",
//     "images": [],
//     "video": "",
//     "likesCount": 0,
//     "createdAt": "0001-01-01T00:00:00",
//     "hashtags": [],
//     "sender": {
//         "userId": "00000000-0000-0000-0000-000000000000",
//         "fullName": "",
//         "userName": "",
//         "email": "",
//         "birthDay": null,
//         "bio": "",
//         "profileImage": "",
//         "backgroundImage": "",
//         "status": 0,
//         "joinedAt": null,
//         "statusText": "Happy",
//         "userType": 5,
//         "followingsCount": 0,
//         "followersCount": 0,
//         "interestedCategories": []
//     }
// }
