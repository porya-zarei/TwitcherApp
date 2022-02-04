import dayjs from "dayjs";
import fa from "dayjs/locale/fa";
// import * as fa from "dayjs/locale/fa";
export const convertToPersian = (date: string | Date): string => {
    console.log("convertToPersian");
    const dateConverter: typeof dayjs = dayjs;
    return dateConverter(date).locale(fa||"fa").format("YYYY/MM/DD");
};

export const convertToEnglish = (date: string | Date): string => {
    const dateConverter: typeof dayjs = dayjs;
    dateConverter.locale("en");
    return dateConverter(date).locale("en").format("YYYY/MM/DD");
};
