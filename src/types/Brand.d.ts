import {ListableItem} from "../components/List";

export interface Brand extends ListableItem {
    name: string,
    origin: string,
    image: string
}
