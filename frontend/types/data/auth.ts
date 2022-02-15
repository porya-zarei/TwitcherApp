export type ILoginData =
    | {
          email: string;
          password: string;
      }
    | {
          userName: string;
          password: string;
      };

export type IRegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userName: string;
};
