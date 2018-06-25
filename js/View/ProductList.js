/**
 * Represents a product list view.
 */
class ProductList{
    static Setup(){
        this.rootElement = document.getElementById('product-list');

        // Populate with products, and store the instances
        this.ProductCardInstances = ProductCard.CreateElements(Product.Instances);

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

ProductList.ProductCardInstances = [];