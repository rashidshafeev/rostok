import { SelectableItem } from "./SelectableItem";

interface DynamicFilterValue extends SelectableItem {
    id: number;
    text: string;
    color?: string;
    second_color?: string | null;
}

enum FilterType {
  COLOR = 'color',
  TEXT = 'text'
}

export interface DynamicFilter {
    is_active: boolean;
    id: number;
    name: string;
    type: FilterType;
    values: DynamicFilterValue[];
}
