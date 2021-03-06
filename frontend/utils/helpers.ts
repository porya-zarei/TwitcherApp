import {PartialUser} from "../types/data/user";
import defaultProfile from "../assets/images/default-profile.png";
import defaultBackground from "../assets/images/default-background.jpg";

export const getRandomNumber = (
    min: number = 0,
    max: number = 1000,
): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const objectToFormData = (data: any): FormData => {
    const form: FormData = new FormData();
    for (const key in data) {
        const value = data[key];
        if (Array.isArray(value)) {
            const arrayKey = `${key}`;
            value.forEach((v) => {
                form.append(arrayKey, v);
            });
        } else {
            form.append(key, value);
        }
    }
    return form;
};

export const getUserProfileImage = (
    user?: PartialUser | string | StaticImageData,
): string | StaticImageData => {
    let imageUrl: StaticImageData | string = defaultProfile;
    // if (typeof user === "string" && user.length > 0) {
    //     imageUrl = user;
    // }else if (
    //     typeof user === "object" &&
    //     user?.profileImage &&
    //     user.profileImage?.length > 0
    // ) {
    //     imageUrl = user.profileImage;
    // }
    return imageUrl;
};

export const getUserBackgroundImage = (
    user?: PartialUser | string | StaticImageData,
): string | StaticImageData => {
    let imageUrl: StaticImageData | string = defaultBackground;
    // if (typeof user === "string" && user.length > 0) {
    //     imageUrl = user;
    // }else if (
    //     typeof user === "object" &&
    //     user?.backgroundImage &&
    //     user.backgroundImage?.length > 0
    // ) {
    //     imageUrl = user.backgroundImage;
    // }
    return imageUrl;
};

export const getOtherUser = (users?: PartialUser[], userName?: string) => {
    const otherUser = users?.find((user) => user.userName !== userName);
    return otherUser;
};
