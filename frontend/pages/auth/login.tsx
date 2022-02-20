import Head from "next/head";
import { FC } from "react";
import LoginRoute from "../../components/routes/auth/login/login-route";

interface LoginPageProps {
    
}
 
const LoginPage: FC<LoginPageProps> = () => {
    return ( 
        <section className="w-full flex justify-center items-center">
            <Head>
                <title>Login</title>
            </Head>
            <LoginRoute/>
        </section>
     );
}
 
export default LoginPage;