import { goto } from "$app/navigation";
import { DocumentMode } from "$lib/constants/common";
import { API_PATH } from "$lib/constants/constants";
import MESSAGES from "$lib/constants/messages";
import ColorType from "$lib/constants/tailwind";
import { writable } from "svelte/store";
import { showToast } from "./toast";
import { closeModal } from "$lib/utils/dialog";

export const isLoading = writable(false);

export const submitForm = async (slug: string, mode: DocumentMode, payload: any, id?: string) =>
{
    try
    {
        isLoading.set(true);
        const url = `${API_PATH}/${slug}${mode === DocumentMode.Create ? '' : `/${id}`}`;

        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: mode === DocumentMode.Create ? 'POST' : 'PATCH',
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.message && data.message === MESSAGES.SUCCESS)
        {
            goto(`/bean-noodle/${slug}`);
            showToast(
                mode === DocumentMode.Create
                    ? 'Created Successfully! Redirecting ...'
                    : 'Updated Successfully! Redirecting ...'
            );
        } else
        {
            const message = `${data.message || 'Something went wrong'}\n${data.error ? JSON.stringify(data.error) : ''}`;
            showToast(message, ColorType.error);
        }
    } catch (e)
    {
        console.error(e);
    } finally
    {
        isLoading.set(false);
    }
};


export const deleteDocument = async (slug: string, id: string) =>
{
    isLoading.set(true);
    const url = `${API_PATH}/${slug}/${id}`;
    const res = await fetch(url, {
        method: 'DELETE'
    });

    const data = await res.json();

    isLoading.set(false);
    closeModal('delete_item');
    if (data.message && data.message === MESSAGES.SUCCESS)
    {
        showToast('Deleted Successfully!', ColorType.error);
        goto(`/bean-noodle/${slug}`);
    }
};