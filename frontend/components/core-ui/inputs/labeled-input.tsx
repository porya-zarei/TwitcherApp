import {FC} from "react";

interface LabeledInputProps {
    label: string;
    className?: string;
    labelClassName?: string;
}

const LabeledInput: FC<LabeledInputProps> = ({
    label,
    className,
    labelClassName,
    children,
}) => {
    return (
        <div
            className={`w-full overflow-hidden flex justify-start content-evenly flex-wrap p-1 ${className}`}>
            <label className={`w-full mx-1 p-1 ${labelClassName}`}>
                {label}
            </label>
            {children}
        </div>
    );
};

export default LabeledInput;
