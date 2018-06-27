/**
 * Represents an item view for the checkout order list.
 */
class OrderedListItem {
    /**
     * Initializes a new instance of the OrderedListItem.
     * If you want to create a new instance and at the same time an element to the DOM, use the static Create method instead.
     * @param {HTMLElement} element The element this instance belongs to.
     * @param {Number} productID The ID of the product that is representing this view.
     * @param {Number} quantity The amount of the product is ordered.
     */
    constructor(element, productID, quantity) {
        this._InitializeClassVariables(element, productID, quantity);
        this._InitializeHoverEvents();

        this.UpdateQuantityLabel();
        this.UpdatePriceLabel();
    }

    /**
     * Initializes all class variables.
     * @param {HTMLElement} element The element this instance belongs to.
     * @param {Number} productID The ID of the product that is representing this view.
     * @param {Number} quantity The amount of the product is ordered.
     */
    _InitializeClassVariables(element, productID, quantity){
        /* Data */
        this.quantity = quantity;
        this.representedProduct = productID;

        /* Elements */
        this.rootElement = element;
        this.priceLabel = this.rootElement.querySelector('div:nth-child(1) > div.col-4 > p');
        this.quantityLabel = this.rootElement.querySelector('div:nth-child(1) > div.col-8.pl-2 > p > span');
    }

    /**
     * Adds a mouseover, and mouseleave event listener to the remove button.
     */
    _InitializeHoverEvents(){
        let element = this.rootElement;
        
        // Show remove button when order item is hovered over.
        this.rootElement.addEventListener('mouseover', function(){
            element.querySelector('button').classList.remove('d-none');
        });

        // Hide remove button when mouse leaves the order item.
        this.rootElement.addEventListener('mouseleave', function(){
            element.querySelector('button').classList.add('d-none');
        });
    }

    /**
     * Increments the quantity, and refreshes the view.
     */
    IncrementQuantity() {
        this.quantity++;
        this.UpdateQuantityLabel();
        this.UpdatePriceLabel();
    }

    /**
     * Decrements the quantity, and refreshes the view.
     */
    DecrementQuantity() {
        this.quantity--;
        this.UpdateQuantityLabel();
        this.UpdatePriceLabel();
    }

    /**
     * Refreshes the price label.
     */
    UpdatePriceLabel() {
        let product = Product.Instances[this.representedProduct];
        this.priceLabel.textContent = (product.price * this.quantity) + 'kr';
    }

    /**
     * Refreshes the quantity label.
     */
    UpdateQuantityLabel() {
        this.quantityLabel.textContent = this.quantity;
    }

    /**
     * Creates a order item view for a specified product.
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
        <li class="list-group-item checkout-list-item fade-in">
                            <div class="row">
                                <div class="col-8 pl-2">
                                    <img class="h-100 rounded-circle float-left mr-2" src="img/${product.img}">
                                    <p class="font-weight-bold my-1">${product.name} (x<span>${this.quantity}</span>)</p>
                                </div>

                                <div class="col-4 d-flex flex-row justify-content-end">
                                    <p class="my-1">${product.price}kr</p>
                                    <button type="button" class="btn btn-danger btn-sm float-right remove-order-btn rounded-0 d-none ml-2 font-weight-bold py-0" data-id="${product.id}">&times;</button>
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