/**
 * Represents the checkout view.
 */
class Checkout{
    static Setup(){
        this.rootElement = document.querySelector('.checkout');
        this.list = this.rootElement.querySelector('#checkout-list');
        this.orderCount = this.rootElement.querySelector('.checkout p.badge');
        this.totalLabel = this.list.querySelector('li > div > div:nth-child(2) > p');
        
        // Load checkout items from session
        if(Storage.Session.get.CheckoutList){
            this.CheckoutItems = JSON.parse(Storage.Session.get.CheckoutList);

            this.CheckoutItems.forEach(itemID => {
                this.Add(Product.Instances[itemID], false);
            });
        }
    }

    static Add(product, addIDToCheckoutItems = true){
        this.list.insertAdjacentHTML('afterbegin', this._GenerateHTMLItemElement(product));

        if(addIDToCheckoutItems){
            Checkout.CheckoutItems.push(product.id);
        }

        this.UpdateTotalCost();
        this.UpdateOrderCount();
    }

    static Remove(productID){
        // this.rootElement.removeChild(this.CheckoutItems);

        Checkout.CheckoutItems.splice(product.id, 1);
        
        this.UpdateTotalCost();
        this.UpdateOrderCount();
    }

    static UpdateTotalCost(){
        let totalPrice = 0;

        // Loop through all checked out products.
        this.CheckoutItems.forEach(productID => {
            // Get product price
            let productPrice = Product.Instances[productID].price;

            // Add price to a local integer variable. 
            totalPrice += productPrice;
        });

        // Set the total cost text to the value.
        this.totalLabel.textContent = totalPrice + 'kr';
    }

    static UpdateOrderCount(){
        // Set the order count text to the length of checkout items array.
        this.orderCount.textContent = this.CheckoutItems.length;

    }

    static _GenerateHTMLItemElement(product){
        return `
        <li class="list-group-item checkout-list-item">
                            <div class="row">
                                <div class="col-sm">
                                    <p class="font-weight-bold my-1">${product.name}</p>
                                </div>

                                <div class="col-sm">
                                    <p class="text-right my-1">${product.price}kr</p>
                                </div>
                            </div>
                        </li>
        `;
    }

    static SaveCheckoutList(){
        if(this.CheckoutItems.length > 0){
            Storage.Session.set.CheckoutList(JSON.stringify(this.CheckoutItems));
        }
    }
}

Checkout.CheckoutItems = [];