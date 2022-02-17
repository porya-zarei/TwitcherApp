import {FC} from "react";
import UserBioInput from "./inputs/user-bio-input";
import UserBirthDayInput from "./inputs/user-birthday-input";
import UserEmailInput from "./inputs/user-email-input";
import UserFullNameInputs from "./inputs/user-full-name-inputs";
import UserPasswordInput from "./inputs/user-password-input";
import UserPhoneNumberInput from "./inputs/user-phonenumber-input";
import UserUserNameInput from "./inputs/user-username-input";

interface PersonalDataFormProps {}

const PersonalDataForm: FC<PersonalDataFormProps> = () => {
    return (
        <div className="w-full h-auto flex justify-center items-start content-start flex-wrap flex-row">
            <UserFullNameInputs />
            <UserUserNameInput />
            <UserEmailInput />
            <UserPasswordInput />
            <UserBirthDayInput />
            <UserPhoneNumberInput />
            <UserBioInput/>
        </div>
    );
};

export default PersonalDataForm;
