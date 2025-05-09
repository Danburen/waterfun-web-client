

/**
 * Throttle execution of a function
 * @param func function
 * @param delay  delay between two function execution
 */
export function throttle(func: Function,delay: number) {
    let canRun = true;
    return (...args: any[]) => {
        if(canRun) {
            func.apply(func, args);
            canRun = false;
            setTimeout(()=> canRun = true, delay);
        }
    }
}

/**
 * Debounce execution of a function
 * Only apply at the last trigger
 * @param func function to be debounced executing
 * @param delay delay debounce
 */
export function deBounce(func: Function,delay: number) {
    let timer: NodeJS.Timeout;
    return(...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(func, args);
        },delay);
    }
}

/**
 * Debounce execution of a function
 * Only apply at the first time
 * @param func function to be debounced executing
 * @param delay delay debounce
 */
export function deBounceLeading(func: Function,delay: number) {
    let timer: NodeJS.Timeout | null;
    return(...args: any[]) => {
        if(!timer) func.apply(func, args);
        clearTimeout(timer as NodeJS.Timeout);
        timer = setTimeout(() => {
            timer = null;
        },delay);
    }
}