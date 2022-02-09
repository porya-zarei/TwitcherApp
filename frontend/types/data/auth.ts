export type ILoginData =
    | {
          email: string;
          password: string;
      }
    | {
          userName: string;
          password: string;
      };
