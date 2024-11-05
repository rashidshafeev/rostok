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