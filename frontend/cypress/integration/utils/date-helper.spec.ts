// /// <reference types="cypress" />
// import {convertToEnglish,convertToPersian} from '../../../utils/date-helper';

// describe("Unit Test Application Code", () => {
//     const stringDate:string = "Fri Feb 04 2022 20:49:50 GMT+0330 (Iran Standard Time)";
//     const myDate:Date = new Date(stringDate);
//     before(() => {
//         // check if the import worked correctly
//         expect(convertToPersian, "convertToPersian").to.be.a("function");
//         expect(convertToEnglish, "convertToEnglish").to.be.a("function");
//     });

//     context("date helper", ()=> {
//         it("convert date to persian",  ()=> {
//             const res = convertToPersian(myDate);
//             console.log(res);
//             expect(res).to.be.a("string");
//         });
//     });
// });
