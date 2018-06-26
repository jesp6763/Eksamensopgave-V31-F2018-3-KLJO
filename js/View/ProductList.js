/**
 * Represents a product list view.
 */
class ProductList{
    /**
     * Sets up the product list.
     * Loading products.
     */
    static Setup(){
        this.rootElement = document.getElementById('product-list');

        // Populate with products, and store the instances
        this.ProductCardInstances = ProductCard.CreateCards(this.rootElement, Product.Instances);

        // Event delegation
        addEventListener('click', function(event){
            let clickedElement = event.target;

            if(clickedElement && clickedElement.matches('button.product-purchase-btn')){
                let productID = clickedElement.getAttribute('data-id');
                let productCard = ProductList.GetProductCardByProductID(productID);

                productCard.OrderClickHandler();
            }
        });
    }

    /**
     * Attempts to find a product card instance that matches the specified product ID. Can return null if no match was found.
     * @param {string} productID The ID of the product.
     */
    static GetProductCardByProductID(productID){
        let productToReturn = null;
        
        this.ProductCardInstances.forEach(product => {
            if(product.representedProduct === productID){
                productToReturn = product;
            }
        });

        return productToReturn;
    }
}

/**
 * All product card instances.
 */
ProductList.ProductCardInstances = [];