import { NextPage } from "next";
import Head from "next/head";
import RegisterRoute from "../../components/routes/auth/register/register-route";

interface RegisterPageProps {
    
}
 
const RegisterPage: NextPage<RegisterPageProps> = () => {
    return (
        <section className="w-full flex justify-center items-center">
            <Head>
                <title>Register</title>
            </Head>
            <RegisterRoute />
        </section>
    );
}
 
export default RegisterPage;