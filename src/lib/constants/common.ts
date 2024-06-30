export enum UserStatus
{
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export enum ButtonType
{
    CREATE = "create",
    VIEW = "view",
    VIEW_OWN = "view-own",
    EDIT = "edit",
    EDIT_OWN = "edit-own",
    EDIT_AS_EDITOR = "	edit-as-editor",
    DELETE = "delete",
    DELETE_OWN = "delete-own"
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

export const emptyOption = { label: 'None', value: null };