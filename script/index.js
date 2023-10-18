

$(document).ready(function () {
    const products = [
        { name: "Яблука", price: 12.99 },
        { name: "Огірки", price: 9.99 },
        { name: "Чай", price: 14.99 },
        { name: "Кава", price: 23.99 },
        { name: "Печиво", price: 7.99 }
        
    ];

    function renderProducts(data) {
        const productList = $('#product-list');
        productList.empty();

        data.forEach(product => {
            productList.append(`<li>${product.name} - ₴${product.price.toFixed(2)}</li>`);
        });
    }

    renderProducts(products);

    $('#actions').change(function () {
        const selectedAction = $(this).val();
        let modifiedProducts;

        switch (selectedAction) {
            case "show-cheapest":
                modifiedProducts = _.orderBy(products, ['price'], ['asc']);
                alert("Найдешевший продукт: " + modifiedProducts[0].name + " - ₴" + modifiedProducts[0].price.toFixed(2));
                break;

            case "average-price":
                const average = _.meanBy(products, (p) => p.price);
                alert("Середня вартість продуктів: ₴" + average.toFixed(2));
                break;

            case "under-average":
                const avg = _.meanBy(products, (p) => p.price);
                modifiedProducts = _.filter(products, (p) => p.price < avg);
                renderProducts(modifiedProducts);
                break;

            case "above-average":
                const mean = _.meanBy(products, (p) => p.price);
                modifiedProducts = _.filter(products, (p) => p.price > mean);
                renderProducts(modifiedProducts);
                break;

            case "most-expensive":
                modifiedProducts = _.orderBy(products, ['price'], ['desc']);
                alert("Найдорожчий продукт: " + modifiedProducts[0].name + " - ₴" + modifiedProducts[0].price.toFixed(2));
                break;

            case "random-discount":
                modifiedProducts = products.map(product => {
                    const discount = _.random(5, 20); 
                    product.price -= product.price * (discount / 100);
                    return product;
                });
                alert("Випадкова знижка була застосована!");
                renderProducts(modifiedProducts);
                break;

            case "remove-expensive":
                const maxPrice = _.maxBy(products, 'price').price;
                modifiedProducts = _.reject(products, { 'price': maxPrice });
                renderProducts(modifiedProducts);
                break;

            case "add-product":
                const newName = prompt("Введіть назву нового продукту:");
                const newPrice = parseFloat(prompt("Введіть ціну для нового продукту:"));
                if (newName && newPrice) {
                    products.push({ 'name': newName, 'price': newPrice });
                    renderProducts(products);
                }
                break;

            default:
                renderProducts(products);
                break;
        }
    });
});
