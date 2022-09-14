import { ref, customRef } from "vue";

/**
 *
 * @param {*} fn 回调函数
 * @param {*} delay 延迟毫秒数
 * @param {*} immediate 是否立即执行
 * @returns
 */
const debounce = (fn, delay = 0, immediate = false) => {
    let timeout;
    return (...args) => {
        if (immediate && !timeout) fn(...args);
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

const useDebouncedRef = (initialValue, delay, immediate) => {
    const state = ref(initialValue);
    const debouncedRef = customRef((track, trigger) => ({
        get() {
            track();
            return state.value;
        },
        set: debounce(
            (value) => {
                state.value = value;
                trigger();
            },
            delay,
            immediate
        ),
    }));
    return debouncedRef;
};

export default useDebouncedRef;
