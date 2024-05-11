export function openModal(modalId: string)
{
    const modalEl: any = document.getElementById(modalId);
    modalEl.showModal();
}

export function closeModal(modalId: string)
{
    const modalEl: any = document.getElementById(modalId);
    modalEl.close();
}