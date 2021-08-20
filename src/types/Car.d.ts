import {ListableItem} from "../components/List";

export interface Car extends ListableItem {
    name: string,
    origin: string
    year: string
}
