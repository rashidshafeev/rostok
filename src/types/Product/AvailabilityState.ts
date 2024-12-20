import { DateType } from "../Common/DateType";


export interface AvailabilityState {
    stock: number;
    preorder: DateType | null;
}