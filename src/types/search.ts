import type {ICity} from "@/types/city";
import type {countryListByKeyValue} from "@/types/advertiseItemProp";

export interface ISearch {
    country: countryListByKeyValue,
    city: ICity,
    serviceType: string,
}