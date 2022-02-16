interface IHubs {
    users: string;
}

const base: string = "https://localhost:7219/";

export const isDev: boolean = true;
export const apiUrl: string = `${base}api/`;
export const baseImagesUrl: string = `${base}files/images/`;
export const baseVideoUrl: string = `${base}files/videos/`;
export const hubsURL: string = `${base}hubs/`;
export const HUBS: IHubs = {
    users: `${hubsURL}users/`,
};

export const itemsPerPage: number = 100;
