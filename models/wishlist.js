module.exports = function Wishlist(oldWishlist) {
    this.items = oldWishlist.items || {};
    //this.totalQty = oldWishlist.totalQty || 0;
    //this.totalPrice = oldWishlist.totalPrice || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, price: 0}; //
        }
    };



    this.removeItem  = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};