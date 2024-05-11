
import ColorType from "$lib/constants/tailwind";
import { writable } from "svelte/store";

export const toastType = writable(ColorType.success);
export const toastText = writable("");
export const toastVisible = writable(false);


export function showToast(text: string, type: ColorType = ColorType.success, duration: number = 3000,)
{
    toastText.set(text);
    toastType.set(type);
    toastVisible.set(true);

    setTimeout(() =>
    {
        toastText.set("");
        toastType.set(ColorType.success);
        toastVisible.set(false);
    }, duration);
}

