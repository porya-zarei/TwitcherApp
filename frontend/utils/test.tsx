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

const createWords = async (word) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    };
    try {
        const sendData = Object.entries(word)
            .filter(([key, value]) => value && value.length > 0)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

        const res = await axios.post(
            `http://alp.thescenius.com/api/v1/words`,
            sendData,
            config,
        );
        if (res.data.status) {
            dispatch({
                type: WORD_ACT,
                status: res.data.status,
                message: "کلمه ی جدید اضافه شد",
            });
            await allWords();
            setStatus();
        }
    } catch (err) {
        dispatch({
            type: ERROR_CONNECTION,
            message: err.response.data.errors.source,
        });
    }
};
