import { NextPage } from "next";
import RegisterRoute from "../../components/routes/auth/register/register-route";

interface RegisterPageProps {
    
}
 
const RegisterPage: NextPage<RegisterPageProps> = () => {
    return (
        <section className="w-full flex justify-center items-center">
            <RegisterRoute />
        </section>
    );
}
 
export default RegisterPage;