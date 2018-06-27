/**
 * Represents an item view for the checkout order list.
 */
class OrderedListItem {
    /**
     * Initializes a new instance of the OrderedListItem.
     * If you want to create a new instance and at the same time an element to the DOM, use the static Create method instead.
     * @param {HTMLElement} element The element this instance belongs to.
     * @param {Product} product The product this item will get information from.
     */
    constructor(element, productID, quantity) {
        // Setup variables
        this.quantity = quantity;
        this.representedProduct = productID;

        this.rootElement = element;
        this.priceLabel = this.rootElement.querySelector('div:nth-child(1) > div.col-3 > p');
        this.quantityLabel = this.rootElement.querySelector('div:nth-child(1) > div.col-8.pl-2 > p > span');

        this.UpdateQuantityLabel();
        this.UpdatePriceLabel();
    }

    IncrementQuantity() {
        this.quantity++;
        this.UpdateQuantityLabel();
        this.UpdatePriceLabel();
    }

    DecrementQuantity() {
        this.quantity--;
        this.UpdateQuantityLabel();
        this.UpdatePriceLabel();
    }

    UpdatePriceLabel() {
        let product = Product.Instances[this.representedProduct];

        this.priceLabel.textContent = (product.price * this.quantity) + 'kr';
    }

    UpdateQuantityLabel() {
        this.quantityLabel.textContent = this.quantity;
    }

    /**
     * 
     * @param {HTMLElement} parent The element this item will be created in.
     * @param {Product} product The product to get information from.
     */
    static Create(parent, product, quantity) {
        parent.insertAdjacentHTML('afterbegin', this._GenerateHTMLElement(product));

        // Return the newly added order item
        return new OrderedListItem(parent.getElementsByTagName('li')[0], product.id, quantity);
    }

    /**
     * Generates the HTML code for the product, and then returns it.
     * @param {Product} product The product to get the information from.
     */
    static _GenerateHTMLElement(product) {
        return `
        <li class="list-group-item checkout-list-item">
                            <div class="row">
                                <div class="col-8 pl-2">
                                    <img class="h-100 rounded-circle float-left mr-2" src="img/${product.img}">
                                    <p class="font-weight-bold my-1">${product.name} (x<span>${this.quantity}</span>)</p>
                                </div>

                                <div class="col-3">
                                    <p class="text-right my-1">${product.price}kr</p>
                                </div>

                                <div class="col-1 p-0">
                                    <button type="button" class="btn btn-danger btn-sm float-right remove-order-btn" data-id="${product.id}">&times;</button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 font-weight-light">
                                    <p class="my-2">
                                    ${product.description}
                                    </p>
                                </div>
                            </div>
                        </li>
        `;
    }
}