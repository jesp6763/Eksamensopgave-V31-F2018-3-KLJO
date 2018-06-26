/**
 * Represents the data for a product.
 */
class Product {
    /**
     * Initializes a new instance of the Product class.
     * @param {integer} id The id of the product.
     * @param {object} info The product information.
     * Name, description, and price.
     */
    constructor(id, info) {
        this.id = id;
        this.name = info.name;
        this.description = info.description;
        this.price = Number(info.price.slice(0, -2));
        this.img = info.img;
    }

    /**
     * Creates some test data based on the data in the produkter.json file.
     * @param {function} creationCompleteCallback The function that will be called when the test data creation has been completed.
     */
    static CreateTestData(creationCompleteCallback) {
        // Load from local products.json file
        HTTPRequestUtil.RequestAsync('GET', 'produkter.json', function (json) {
            let testData = JSON.parse(json);
            let keys = Object.keys(testData);

            // Add test data to Product.Instances
            keys.forEach((key) => {
                const instance = testData[key];
                const info = {
                    id: key,
                    name: instance.navn,
                    description: instance.beskrivelse,
                    price: instance.pris,
                    img: instance.img
                }
                
                Product.Instances[key] = new Product(key, info);
            });

            creationCompleteCallback();
            console.log("Test data created");

            Product.SaveAll();
        });
    }

    /**
     * Saves the Product.Instances to the local storage.
     */
    static SaveAll() {
        try {
            Storage.Local.set.ProductList(JSON.stringify(Product.Instances));
        }
        catch (error) {
            alert('Failed to read from localstorage.\n\n' + error);
        }
    }

    /**
     * Loads all products from local storage. Creates test data and loads it if no data were found in the local storage.
     * @param {function} loadCompleteCallback The function that will be called when loading has been completed. 
     */
    static LoadAll(loadCompleteCallback) {
        if (Storage.Local.get.ProductList) {
            Product.Instances = JSON.parse(Storage.Local.get.ProductList);
            loadCompleteCallback();
        }
        else {
            this.CreateTestData(loadCompleteCallback);
        }
    }
}

/**
 * All loaded product instances.
 */
Product.Instances = {};