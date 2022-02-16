export const getRandomNumber = (
    min: number = 0,
    max: number = 1000,
): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const objectToFormData = (data: any): FormData => {
    const form: FormData = new FormData();
    for (const key in data) {
        const value = data[key];
        if (Array.isArray(value)) {
            const arrayKey = `${key}`;
            value.forEach((v) => {
                form.append(arrayKey, v);
            });
        } else {
            form.append(key, value);
        }
    }
    return form;
};
