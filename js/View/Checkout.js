/**
 * Represents a checkout view.
 */
class Checkout{
    static Setup(){
        this.rootElement = document.querySelector('.checkout');
        this.list = this.rootElement.querySelector('#checkout-list');
        this.orderCount = this.rootElement.querySelector('.checkout p.badge');
        this.totalLabel = this.rootElement.querySelector('ul > li:last-of-type p:nth-of-type(1)');
        
        // Load instances from session
        
    }

    static Add(product){
        this.list.insertAdjacentHTML('afterbegin', this._GenerateHTMLItemElement(product));
    }

    static Remove(productID){
        // this.rootElement.removeChild(this.CheckoutItems);
    }

    static _GenerateHTMLItemElement(product){
        return `
        <li class="list-group-item checkout-list-item">
                            <div class="row">
                                <div class="col-sm">
                                    <p class="font-weight-bold my-1">${product.name}</p>
                                </div>

                                <div class="col-sm">
                                    <p class="text-right my-1">${product.price}</p>
                                </div>
                            </div>
                        </li>
        `;
    }
}

Checkout.CheckoutItems = [];