/**
 * Represents the checkout view.
 */
class Checkout{
    /**
     * Sets up the checkout element.
     */
    static Setup(){
        this.rootElement = document.querySelector('.checkout');
        this.list = this.rootElement.querySelector('#checkout-list');
        this.checkoutBtn = this.list.querySelector('button');
        this.orderCount = this.rootElement.querySelector('.checkout p.badge');
        this.totalLabel = this.list.querySelector('li > div > div:nth-child(2) > p');
        
        // Load checkout items from session
        if(Storage.Session.get.CheckoutList){
            let loadedList = JSON.parse(Storage.Session.get.CheckoutList);

            loadedList.forEach(itemID => {
                this.Add(Product.Instances[itemID]);
            });
        }

        // Setup event delegation for checkout-list
        this.list.addEventListener('click', function(event){
            let clickedElement = event.target;

            if(clickedElement && clickedElement.matches('button.remove-order-btn')){
                let productID = clickedElement.getAttribute('data-id');
                Remove(productID);
            }
        });

        this.UpdateCheckoutBtn();
    }

    /**
     * Adds a product to the order list.
     * @param {Product} product The product to add to the list.
     */
    static Add(product){
        if(!this.ContainsProduct(product.id)){
            this.OrderedProducts.push(OrderedListItem.Create(this.list, product));
        }
        else{
            this.OrderedProducts.forEach(item => {
                if(item.representedProduct === product.id){
                    item.IncrementQuantity();
                }
            });
        }
            
        this.UpdateTotalCost();
        this.UpdateOrderCount();
        this.UpdateCheckoutBtn();
    }

    /**
     * Removes the first matching item in the order list.
     * @param {string} productID The ID of the product to remove.
     */
    static Remove(productID){
        this.list.removeChild();
        Checkout.OrderedProducts.splice(product.id, 1);
        
        this.UpdateTotalCost();
        this.UpdateOrderCount();
        this.UpdateCheckoutBtn();
    }

    /**
     * Checks to see if there's already a product with the same ID in the order list.
     * Returns true if a match is found.
     * @param {string} productID The products ID to check for.
     */
    static ContainsProduct(productID){
        let returnValue = false;

        this.OrderedProducts.forEach(item => {
            if(item.representedProduct === productID){
                returnValue = true;
            }
        });

        return returnValue;
    }

    /**
     * Refreshes the total cost text in the checkout element.
     */
    static UpdateTotalCost(){
        let totalPrice = 0;

        this.OrderedProducts.forEach(orderedItem => {
            // Get product price
            let productPrice = Product.Instances[orderedItem.representedProduct].price;

            // Add price to a local integer variable. 
            totalPrice += productPrice;
        });

        // Set the total cost text to the value.
        this.totalLabel.textContent = totalPrice + 'kr';
    }

    /**
     * Refreshes the order count text in the checkout element.
     */
    static UpdateOrderCount(){
        // Set the order count text to the length of checkout items array.
        this.orderCount.textContent = this.OrderedProducts.length;
    }

    /**
     * Checks how many items is in the checkout list. If there is none, then the checkout button will be inactive.
     */
    static UpdateCheckoutBtn(){
        if(this.OrderedProducts.length > 0){
            this.checkoutBtn.removeAttribute('disabled');
        }
        else{
            this.checkoutBtn.setAttribute('disabled', '');
        }
    }

    /**
     * Saves the ordered items in the session storage.
     */
    static SaveOrderedItems(){
        if(this.OrderedProducts.length > 0){
            Storage.Session.set.CheckoutList(JSON.stringify(this.OrderedProducts));
        }
    }
}

/**
 * A map of ordered items that is used to know which products is ordered, and the quantity of that product was ordered.
 */
Checkout.OrderedProducts = [];