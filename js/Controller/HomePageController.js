class HomePageController{
    static Setup(){
        Product.LoadAll(function(){
            ProductList.Setup();
            Checkout.Setup();
            console.log("Loaded");
        });
        
        window.addEventListener("unload", function(){
            Product.SaveAll();
            Checkout.SaveCheckoutList();
        });
    }
}