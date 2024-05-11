export enum UserStatus
{
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export enum FormType
{
    TEXT = "text",
    TEXTAREA = "textarea",
    SELECT = "select",
    CHECKBOX = "checkbox",
    RADIO = "radio",
    DATE = "date",
    TIME = "time",
    FILE = "file",
    IMAGE = "image",
}

export enum DocumentMode
{
    View,
    Create,
    Edit
}

export const emptyOption = { label: 'None', value: '' };