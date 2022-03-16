const memoize = (fn: Function, isEqual: Function) => {
    let cachedOutput: any;
    let cachedInputs: any;
    return (...data: any[]) => {
        console.log("hi", data, cachedInputs, cachedOutput);
        if (isEqual(data, cachedInputs)) {
            console.log("returning cached output");
            return cachedOutput;
        } else {
            cachedInputs = data;
            cachedOutput = fn(...data);
            return cachedOutput;
        }
    };
};

const fn = (a: number, b: number) => a + b;
const isEqual = (a: any, b: any) => a && b && a[0] === b[0] && a[1] === b[1];
const memoizedFn = memoize(fn, isEqual);
console.log(memoizedFn(1, 2));
console.log(memoizedFn(1, 2));
console.log(memoizedFn(1, 3));
console.log(memoizedFn(1, 2));
console.log(memoizedFn(1, 2));
console.log(memoizedFn(1, 2));
console.log(memoizedFn(1, 2));
