export interface Product {
    id:          string;
    name:        string;
    description: string;
    type:        Type;
    price:       string;
    quantity:    number;
    image:       Image;
}

export interface Image {
    regular?:     string;
    transparent?: string;
}

export enum Type {
    Notebook = "Notebook",
    Notepad = "Notepad",
}

