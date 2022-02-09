import { FC } from "react";
import LoginView from "../../components/routes/auth/login/login-view";

interface LoginPageProps {
    
}
 
const LoginPage: FC<LoginPageProps> = () => {
    return ( 
        <section className="w-full flex justify-center items-center">
            <LoginView/>
        </section>
     );
}
 
export default LoginPage;