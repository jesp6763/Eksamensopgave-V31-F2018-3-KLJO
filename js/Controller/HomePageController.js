class HomePageController{
    static Setup(){
        Checkout.Setup();

        Product.LoadAll(function(){
            ProductList.Setup();
            console.log("Loaded");
        });

        window.addEventListener("unload", function(){
            Product.SaveAllProductInstances();
        });
    }
}