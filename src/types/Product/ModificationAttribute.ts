// src/types/Attribute.ts

export interface Attribute {
    id: number;
    name: string;
    type: string;
    values: AttributeValue[];
}

export interface AttributeValue {
    type: string;
    text: string;
}

export interface ModificationAttribute {
    id: number;
    value: number;
    sorting: number;
    name: string;
    type: string;
    text: string;
    color?: string;
    second_color?: string;
}