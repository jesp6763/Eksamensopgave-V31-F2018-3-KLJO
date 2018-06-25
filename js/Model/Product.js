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
        this.price = info.price;
        this.img = info.img;
    }

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

            Product.SaveAllProductInstances();
        });

    }

    /**
     * Saves the Product.Instances to the local storage.
     */
    static SaveAllProductInstances() {
        this.SaveAll(Product.Instances, "localstorage");
    }

    /**
     * Saves the instances in the specified storage.
     * @param {Product[]} instances An array of Product instances.
     * @param {string} method The saving method. Acceptable values: "localStorage", "session".
     */
    static SaveAll(instances, method) {
        try {
            if (method.toLowerCase() === "localstorage") {
                this._SetProductLocalStorage(JSON.stringify(instances));
            }
            else if (method.toLowerCase() === "session") {
                this._SetProductSessionStorage(JSON.stringify(instances));
            }
        }
        catch (error) {
            alert('Failed to read from localstorage.\n\n' + error);
        }
    }

    static LoadAll(loadCompleteCallback) {
        if (this._GetProductLocalStorage()) {
            Product.Instances = JSON.parse(this._GetProductLocalStorage());
            loadCompleteCallback();
        }
        else {
            this.CreateTestData(loadCompleteCallback);
        }
    }

    /**
     * Gets the value stored in StarbuckProducts local storage.
     */
    static _GetProductLocalStorage() {
        return localStorage['StarbucksProducts'];
    }

    /**
     * Gets the value stored in StarbuckProducts session storage.
     */
    static _GetProductSessionStorage() {
        return sessionStorage['StarbucksProducts'];
    }

    /**
     * Sets the product local storage to a new value.
     * @param {string} newValue The new StarbuckProducts local storage value.
     */
    static _SetProductLocalStorage(newValue) {
        localStorage['StarbucksProducts'] = newValue;
    }

    /**
     * Sets the product session storage to a new value.
     * @param {string} newValue The new StarbuckProducts session storage value.
     */
    static _SetProductSessionStorage(newValue) {
        sessionStorage['StarbucksProducts'] = newValue;
    }

    /**
     * Stores a value at the specified key in Product.Instances.
     * @param {string} key The key of where the value will be stored.
     * @param {Product} newValue The value where the specified key is.
     */
    static _SetProductItemValue(key, newValue) {
        Product.Instances[key] = newValue;
    }
}

Product.Instances = {};