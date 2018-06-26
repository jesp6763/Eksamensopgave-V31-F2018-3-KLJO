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

        this.UpdateCheckoutBtn();
    }

    /**
     * Adds a product to the checkout list if "AddIDToCheckoutItems" is true.
     * Will always add the specified product visually to the list.
     * @param {Product} product The product to add to the list.
     */
    static Add(product){
        this.list.insertAdjacentHTML('afterbegin', this._GenerateHTMLItemElement(product));
        Checkout.CheckoutItems.push(product.id);

        this.UpdateTotalCost();
        this.UpdateOrderCount();
        this.UpdateCheckoutBtn();
    }

    /**
     * Removes the first matching item in the checkout list.
     * @param {string} productID The ID of the product to remove.
     */
    static Remove(productID){
        // this.rootElement.removeChild(this.CheckoutItems);
        Checkout.CheckoutItems.splice(product.id, 1);
        
        this.UpdateTotalCost();
        this.UpdateOrderCount();
        this.UpdateCheckoutBtn();
    }

    /**
     * Refreshes the total cost text in the checkout element.
     */
    static UpdateTotalCost(){
        let totalPrice = 0;

        this.CheckoutItems.forEach(productID => {
            // Get product price
            let productPrice = Product.Instances[productID].price;

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
        this.orderCount.textContent = this.CheckoutItems.length;
    }

    /**
     * Checks how many items is in the checkout list. If there is none, then the checkout button will be disabled.
     */
    static UpdateCheckoutBtn(){
        if(this.CheckoutItems.length > 0){
            this.checkoutBtn.removeAttribute('disabled');
        }
        else{
            this.checkoutBtn.setAttribute('disabled', '');
        }
    }

    /**
     * Generates the HTML code for the product, and then returns it.
     * @param {Product} product The product to get the information from.
     */
    static _GenerateHTMLItemElement(product){
        return `
        <li class="list-group-item checkout-list-item">
                            <div class="row">
                                <div class="col-6">
                                    <p class="font-weight-bold my-1">${product.name}</p>
                                </div>

                                <div class="col-6">
                                    <p class="text-right my-1">${product.price}kr</p>
                                </div>
                            </div>
                        </li>
        `;
    }

    /**
     * Saves the checkout list in the session storage.
     */
    static SaveCheckoutList(){
        if(this.CheckoutItems.length > 0){
            Storage.Session.set.CheckoutList(JSON.stringify(this.CheckoutItems));
        }
    }
}

/**
 * The list of checkout items.
 */
Checkout.CheckoutItems = [];