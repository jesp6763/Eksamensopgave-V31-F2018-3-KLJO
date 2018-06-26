Storage.Local = {
    get: {
        ProductList: localStorage['product-list']
    },

    set: {
        ProductList: function(value){
            try {
                localStorage['product-list'] = value;
            }
            catch (error) {
                alert('Error: ' + error);
            }
        }
    }
};

Storage.Session = {
    get: {
        CheckoutList: sessionStorage['checkout-list']
    },

    set: {
        CheckoutList: function (value) {
            try {
                sessionStorage['checkout-list'] = value;
            }
            catch (error) {
                alert('Error: ' + error);
            }
        }
    }
};