import {ToastOptions} from "react-toastify";

export const namesValidatior = (name: string): string => {
    const errors: string[] = [];
    if (name.length < 3) {
        errors.push("name must be at least 3 characters");
    }
    if (name.length > 15) {
        errors.push("name must be less than 15 characters");
    }
    return errors.join(" ");
};

export const emailValidation = (email?: string): string => {
    const errors: string[] = [];
    if (!email) {
        errors.push("Email is required");
    } else {
        const regex = new RegExp(/^.+@.+\..+$/);
        if (!regex.test(email)) {
            errors.push("Email is invalid");
        }
    }
    return errors.join(", ");
};

export const passwordValidation = (password?: string): string => {
    const errors: string[] = [];
    if (!password) {
        errors.push("Password is required");
    } else {
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters");
        } else {
            const requiredCharacters = "@#$%^&+=[]{}|\\:;<>?,./!~`";
            let hasRequiredCharacters = password
                .split("")
                .some((char) => requiredCharacters.includes(char));
            if (!hasRequiredCharacters) {
                errors.push(
                    "Password must contain at least one special character (@#$%^&+=[]{}|\\:;<>?,./!~`)",
                );
            }
            const hasUpperCase = password
                .split("")
                .some((char) => char.toUpperCase() === char);
            if (!hasUpperCase) {
                errors.push(
                    "Password must contain at least one uppercase letter",
                );
            }
            const hasLowerCase = password
                .split("")
                .some((char) => char.toLowerCase() === char);
            if (!hasLowerCase) {
                errors.push(
                    "Password must contain at least one lowercase letter",
                );
            }
        }
    }
    return errors.join(", ");
};

export const userNameValidation = (
    userName: string,
    isUserNameUnique: boolean,
): string => {
    const errors: string[] = [];
    if (!isUserNameUnique) {
        errors.push("User name is already taken");
    } else {
        if (userName.length < 3) {
            errors.push("User name must be at least 3 characters");
        } else if (userName.length > 15) {
            errors.push("User name must be less than 15 characters");
        }
        if (userName.includes(" ")) {
            errors.push("User name must not contain spaces");
        }
        if (userName.includes("@")) {
            errors.push("User name must not contain @");
        }
        if (userName.includes(".")) {
            errors.push("User name must not contain .(dot)");
        }
    }
    return errors.join(", ");
};

export const registerValidation = (
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    password: string,
    isUserNameUnique: boolean,
    notify: (message: string, options?: ToastOptions<{}> | undefined) => void,
): boolean => {
    const userNameErrors = userNameValidation(userName, isUserNameUnique);
    const emailErrors = emailValidation(email);
    const passwordErrors = passwordValidation(password);
    const firstNameErrors = namesValidatior(firstName);
    const lastNameErrors = namesValidatior(lastName);
    if (emailErrors.length > 0) {
        notify(emailErrors, {type: "error", autoClose: false});
    }
    if (passwordErrors.length > 0) {
        notify(passwordErrors, {type: "error", autoClose: false});
    }
    if (firstNameErrors.length > 0) {
        notify(firstNameErrors, {type: "error", autoClose: false});
    }
    if (lastNameErrors.length > 0) {
        notify(lastNameErrors, {type: "error", autoClose: false});
    }
    if (userNameErrors.length > 0) {
        notify(userNameErrors, {type: "error", autoClose: false});
    }
    return (
        emailErrors.length === 0 &&
        passwordErrors.length === 0 &&
        firstNameErrors.length === 0 &&
        lastNameErrors.length === 0 &&
        userNameErrors.length === 0
    );
};

export const loginValidation = (
    email: string,
    password: string,
    notify: (message: string, options?: ToastOptions<{}> | undefined) => void,
): boolean => {
    let emailErrors: string = "";
    if (email.includes("@")) {
        emailErrors = emailValidation(email);
    }else{
        // is username
        emailErrors = userNameValidation(email, true);
    }
    const passwordErrors = passwordValidation(password);
    
    if (emailErrors.length > 0) {
        notify(emailErrors, {type: "error", autoClose: false});
    }
    if (passwordErrors.length > 0) {
        notify(passwordErrors, {type: "error", autoClose: false});
    }
    return emailErrors.length === 0 && passwordErrors.length === 0;
};
