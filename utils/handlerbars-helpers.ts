const handlebarsHelpers = {
    findPrice: (entries, selectedItem) => {

        const found = entries.find(el => el[0] === selectedItem);

        if (!found) {
            throw new Error(`This ${selectedItem} base is no in our ofert!`);
        }
        const [, price] = found;
        return price;
    },

    pricify: price => price.toFixed(2),

    isNotOnArray: (array, element) => !array.includes(element),
    isInArray: (array, element) => array.includes(element),
};

module.exports = {
    handlebarsHelpers,
}
