import TailwindTypes from "$lib/consts/TailwindTypes";
import { writable } from "svelte/store";

export const toastType = writable(TailwindTypes.success);
export const toastText = writable("");
export const toastVisible = writable(false);


export function showToast(text: string, type: TailwindTypes = TailwindTypes.success, duration: number = 3000,)
{
    toastText.set(text);
    toastType.set(type);
    toastVisible.set(true);

    setTimeout(() =>
    {
        toastText.set("");
        toastType.set(TailwindTypes.success);
        toastVisible.set(false);
    }, duration);
}

