module.exports = function viewedItems(oldViewedItems) {
    this.items = oldViewedItems.items || {};


    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, price: 0};
        }
    };



    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
       slicedArr = arr.slice(0,6);
        return slicedArr;
    };
};