const ignoredPathes = ["/login", "/logout", "/register"];
const isIgnored = (path: string): boolean =>
    ignoredPathes.some((ignoredPath) => path.includes(ignoredPath));

export const getSidebarClassName = (path: string): string => {
    const classes: string[] = [];
    if (isIgnored(path)) {
        classes.push("hidden");
    } else {
        classes.push("md:w-1/5");
    }
    return classes.join(" ");
};

export const getContainerClassName = (path: string): string => {
    const classes: string[] = [];
    if (isIgnored(path)) {
        classes.push("md:w-full");
    } else {
        classes.push("md:w-4/5");
    }
    return classes.join(" ");
};
