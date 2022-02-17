import Link from "next/link";
import {useRouter} from "next/router";
import {FC, FormEvent} from "react";
import {HiLockClosed} from "react-icons/hi";
import {useLogin} from "../../../../../api/mutations/useLogin";
import {useUserContext} from "../../../../../contexts/user-context/user-context";
import useHandleableState from "../../../../../hooks/useHandleableState";
import useNotification from "../../../../../hooks/useNotification";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
    const {changeUser, changeToken} = useUserContext();
    const {notify} = useNotification();
    const router = useRouter();
    const {mutateAsync} = useLogin();
    const {value: email, onChange: onEmailChange} = useHandleableState("");
    const {value: password, onChange: onPasswordChange} =
        useHandleableState("");
    const {value: rememberMe, onChange: onRememberMeChange} =
        useHandleableState(false);
    const handleLogin: (
        event: FormEvent<HTMLFormElement>,
    ) => Promise<void> = async (event) => {
        event.preventDefault();
        console.log(email, password, rememberMe);
        const response = await mutateAsync({
            email,
            password,
        });
        if (
            response.ok &&
            response?.result &&
            response?.result?.token &&
            changeUser &&
            changeToken
        ) {
            changeUser(response.result);
            changeToken(response?.result?.token);
            router.push("/home");
        }else{
            notify("Login failed",{
                type: "error",
            });
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="flex justify-center content-start flex-wrap flex-row rounded-md shadow-sm -space-y-px">
                <div className="w-full flex items-center justify-between">
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="text"
                        autoComplete="username"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-secondary placeholder-secondary text-dark rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Email or UserName"
                        value={email}
                        onChange={onEmailChange}
                    />
                </div>
                <div className="w-full flex items-center justify-between">
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-light-gray placeholder-secondary text-dark rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </div>
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-light-gray rounded"
                        checked={rememberMe}
                        onChange={onRememberMeChange}
                    />
                    <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-dark dark:text-light-gray">
                        Remember me
                    </label>
                </div>
                <div className="text-sm">
                    <Link href="/auth/register">
                        <a className="text-primary hover:text-primary-dark">
                            create a account ?
                        </a>
                    </Link>
                </div>
            </div>
            <div className="w-full flex items-center justify-between">
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-light bg-primary hover:bg-dark-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <HiLockClosed className="h-5 w-5 text-light group-hover:text-light-gray" />
                    </span>
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
