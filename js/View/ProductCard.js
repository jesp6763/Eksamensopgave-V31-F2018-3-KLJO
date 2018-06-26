/**
 * Represents a Product card view.
 */
class ProductCard {
    constructor(product) {
        // Store the root element
        let productListItems = document.getElementsByClassName('product-list-item');
        this.rootElement = productListItems[productListItems.length - 1];

        // Store the product id, to easier find the product instance associated to this card.
        this.representedProduct = product.id;
    }

    OrderClickHandler(){
        Checkout.Add(Product.Instances[this.representedProduct]);
    }

    /**
     * Creates a product card for each specified product in the given instances list, in the specified parent.
     * @param {HTMLElement} parent The element to create the product card in.
     * @param {Map<string, Product>} products A map of product instances.
     */
    static CreateCards(parent, products) {
        let productCardInstances = [],
        keys = Object.keys(products);

        keys.forEach((key, index) => {
            productCardInstances[index] = new ProductCard(products[key]);

            // Insert the product card before the parent's end tag
            parent.insertAdjacentHTML('beforeend', this._GenerateHTMLElement(products[key]));
        });

        return productCardInstances;
    }

    /**
     * Generates the HTML code for the product, and then returns it.
     * @param {Product} product The product to get the information from.
     */
    static _GenerateHTMLElement(product) {
        return `
        <article class="col-12 col-sm-6 mb-4 product-list-item">
            <div class="card">
                <img class="card-img-top" src="img/${product.img}" alt="coffee picture">
                <div class="card-body">
                    <h4 class="card-title">${product.name}</h4>
                    <p class="card-text">${product.description}</p>

                    <div class="row container pr-0">
                        <div class="col-6 p-0">
                            <button class="product-purchase-btn btn btn-outline-secondary" data-id="${product.id}">Bestil</button>
                        </div>

                        <p class="col-6 p-0 text-right my-auto product-price">${product.price}kr</p>
                    </div>
                </div>
            </div>
        </article>
        `;
    }
}