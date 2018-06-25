/**
 * Represents a Product card view.
 */
class ProductCard {
    constructor(product) {
        ProductList.rootElement.insertAdjacentHTML('beforeend', ProductCard._GenerateHTMLElement(product));

        // Store the root element
        let productListItems = document.getElementsByClassName('product-list-item');
        this.rootElement = productListItems[productListItems.length - 1];

        // Store the product id, to easier find the product instance associated to this card.
        this.representedProduct = product.id;
    }

    OrderClickHandler(){
        Checkout.Add(Product.Instances[this.representedProduct]);
    }

    static CreateElements(productInstances) {
        let productCardInstances = [],
        keys = Object.keys(productInstances);

        keys.forEach((key, index) => {
            productCardInstances[index] = new ProductCard(productInstances[key]);
        });

        return productCardInstances;
    }

    static _GenerateHTMLElement(product) {
        return `
        <article class="col-lg-6 product-list-item">
            <div class="card">
                <img class="card-img-top" src="img/${product.img}" alt="coffee picture">
                <div class="card-body">
                    <h4 class="card-title">${product.name}</h4>
                    <p class="card-text">${product.description}</p>

                    <div class="row container pr-0">
                        <div class="col-sm p-0">
                            <button class="product-purchase-btn btn btn-outline-secondary" data-id="${product.id}">Bestil</button>
                        </div>

                        <p class="col-sm p-0 text-right my-auto product-price">${product.price}</p>
                    </div>
                </div>
            </div>
        </article>
        `;
    }
}