
import {Entries} from "../types/entries";

export const handlebarsHelpers = {
    findPrice: (entries: Entries, selectedItem: string): number => {

        const found = entries.find(el => el[0] === selectedItem);

        if (!found) {
            throw new Error(`This ${selectedItem} base is no in our ofert!`);
        }
        const [, price] = found;
        return price;
    },

    pricify: (price: number): string=> price.toFixed(2),

    //isNotOnArray: <T>(array: T[], element: T):boolean => !array.includes(element),
    //generic type <T> = something of type T needs to be returned as same type
    isInArray: <T>(array: T[], element: T): boolean => array.indexOf(element) !== -1,
};
// isInArray([1,2,3], 2); good use of generic type
//isInArray([1,2,3], 'yes');  // ERROR

//const {isInArray} = handlebarsHelpers;
