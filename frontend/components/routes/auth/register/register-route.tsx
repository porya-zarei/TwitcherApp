import {FC} from "react";
import RegisterForm from "./register-form/register-form";

interface RegisterRouteProps {}

const RegisterRoute: FC<RegisterRouteProps> = () => {
    return (
        <div className="bg-light text-dark dark:bg-dark dark:text-light w-full min-h-screen flex justify-center items-center">
            <div className="min-h-full w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 rounded-xl border-2 border-primary p-5">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold">
                            register to join us
                        </h2>
                    </div>
                    <div>
                        <RegisterForm/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterRoute;
