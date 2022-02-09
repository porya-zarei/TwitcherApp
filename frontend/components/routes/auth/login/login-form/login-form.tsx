import {useRouter} from "next/router";
import {FC, FormEvent} from "react";
import {HiLockClosed} from "react-icons/hi";
import {useLogin} from "../../../../../api/mutations/useLogin";
import {useUserContext} from "../../../../../contexts/user-context/user-context";
import useHandleableState from "../../../../../hooks/useHandleableState";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
    const {changeUser, changeToken} = useUserContext();
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
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="text"
                        autoComplete="username"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email or UserName"
                        value={email}
                        onChange={onEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={rememberMe}
                        onChange={onRememberMeChange}
                    />
                    <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                        Remember me
                    </label>
                </div>
                <div className="text-sm">
                    <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot your password?
                    </a>
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <HiLockClosed className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                    </span>
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;