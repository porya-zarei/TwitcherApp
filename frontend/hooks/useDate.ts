import { useEffect, useState } from "react";
import {convertToPersian,convertToEnglish} from "../utils/date-helper";
export const useDate = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    
    useEffect(() => {
        // const interval = setInterval(() => {
        // setDate(new Date());
        // setTime(new Date());
        // }, 1000);
        // return () => clearInterval(interval);
        console.log("useDate",convertToPersian(date));
    }, []);
    
    return { date, time };
}