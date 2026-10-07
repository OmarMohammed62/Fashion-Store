// ==========================================
// Fashion Store - Complete JavaScript
// ==========================================


// ==========================================
// 1. تحديد عناصر الصفحة
// ==========================================

const products = document.querySelectorAll(".products > div");


// ==========================================
// 2. بيانات سلة المشتريات
// ==========================================

let cartProducts = JSON.parse(localStorage.getItem("fashionCart")) || [];


// ==========================================
// 3. إنشاء قسم سلة المشتريات
// ==========================================

const cartSection = document.createElement("section");

cartSection.id = "shopping-cart";


// ==========================================
// 4. عنوان السلة
// ==========================================

const cartTitle = document.createElement("h2");

cartTitle.textContent = "Shopping Cart";

cartSection.appendChild(cartTitle);


// ==========================================
// 5. عدد المنتجات
// ==========================================

const cartCount = document.createElement("p");

cartCount.id = "cart-count";

cartSection.appendChild(cartCount);


// ==========================================
// 6. مكان عرض المنتجات
// ==========================================

const cartItems = document.createElement("div");

cartItems.id = "cart-items";

cartSection.appendChild(cartItems);


// ==========================================
// 7. الإجمالي
// ==========================================

const cartTotal = document.createElement("p");

cartTotal.id = "cart-total";

cartSection.appendChild(cartTotal);


// ==========================================
// 8. زر مسح السلة
// ==========================================

const clearCartButton = document.createElement("button");

clearCartButton.textContent = "Clear Cart";

clearCartButton.id = "clear-cart";
const placeOrderButton = document.createElement("button");
placeOrderButton.textContent = "Place Order";
placeOrderButton.id = "place-order";

cartSection.appendChild(clearCartButton);
cartSection.appendChild(placeOrderButton);

// ==========================================
// 9. إضافة السلة إلى الصفحة
// ==========================================

document.body.appendChild(cartSection);


// ==========================================
// 10. حفظ السلة في Local Storage
// ==========================================

function saveCart() {

    localStorage.setItem(
        "fashionCart",
        JSON.stringify(cartProducts)
    );

}


// ==========================================
// 11. تحديث السلة على الصفحة
// ==========================================

function updateCart() {

    // مسح محتوى السلة القديم
    cartItems.innerHTML = "";


    // إجمالي السعر
    let total = 0;


    // إجمالي عدد القطع
    let totalQuantity = 0;


    // ======================================
    // إذا كانت السلة فارغة
    // ======================================

    if (cartProducts.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.textContent = "Your cart is empty.";

        cartItems.appendChild(emptyMessage);

    }


    // ======================================
    // عرض المنتجات
    // ======================================

    cartProducts.forEach(function(product, index) {


        // حساب إجمالي المنتج
        const productTotal =
            product.price * product.quantity;


        // إضافة السعر للإجمالي
        total = total + productTotal;


        // إضافة الكمية للإجمالي
        totalQuantity =
            totalQuantity + product.quantity;


        // ==================================
        // إنشاء عنصر المنتج
        // ==================================

        const item = document.createElement("div");

        item.className = "cart-item";


        // ==================================
        // اسم المنتج
        // ==================================

        const itemName = document.createElement("span");

        itemName.textContent = product.name;


        // ==================================
        // السعر
        // ==================================

        const itemPrice = document.createElement("span");

        itemPrice.textContent =
            " $" + product.price;


        // ==================================
        // زر ناقص
        // ==================================

        const decreaseButton =
            document.createElement("button");

        decreaseButton.textContent = "-";


        // ==================================
        // عرض الكمية
        // ==================================

        const quantity = document.createElement("span");

        quantity.textContent =
            " " + product.quantity + " ";


        // ==================================
        // زر زائد
        // ==================================

        const increaseButton =
            document.createElement("button");

        increaseButton.textContent = "+";


        // ==================================
        // إجمالي المنتج
        // ==================================

        const productTotalElement =
            document.createElement("span");

        productTotalElement.textContent =
            " = $" + productTotal;


        // ==================================
        // زر الحذف
        // ==================================

        const removeButton =
            document.createElement("button");

        removeButton.textContent = "Remove";


        // ==================================
        // زر تقليل الكمية
        // ==================================

        decreaseButton.addEventListener(
            "click",
            function() {

                if (product.quantity > 1) {

                    product.quantity--;

                } else {

                    cartProducts.splice(index, 1);

                }


                saveCart();

                updateCart();

            }
        );


        // ==================================
        // زر زيادة الكمية
        // ==================================

        increaseButton.addEventListener(
            "click",
            function() {

                product.quantity++;

                saveCart();

                updateCart();

            }
        );


        // ==================================
        // زر الحذف
        // ==================================

        removeButton.addEventListener(
            "click",
            function() {

                cartProducts.splice(index, 1);

                saveCart();

                updateCart();

            }
        );


        // ==================================
        // إضافة العناصر للمنتج
        // ==================================

        item.appendChild(itemName);

        item.appendChild(itemPrice);

        item.appendChild(decreaseButton);

        item.appendChild(quantity);

        item.appendChild(increaseButton);

        item.appendChild(productTotalElement);

        item.appendChild(removeButton);


        // ==================================
        // إضافة المنتج للسلة
        // ==================================

        cartItems.appendChild(item);

    });


    // ======================================
    // تحديث عدد المنتجات
    // ======================================

    cartCount.textContent =
        "Items in Cart: " + totalQuantity;


    // ======================================
    // تحديث الإجمالي
    // ======================================

    cartTotal.textContent =
        "Total: $" + total;


    // ======================================
    // التحكم في زر Clear Cart
    // ======================================

    if (cartProducts.length === 0) {

        clearCartButton.style.display = "none";

    } else {

        clearCartButton.style.display = "inline-block";

    }

}


// ==========================================
// 12. زر Clear Cart
// ==========================================

clearCartButton.addEventListener(
    "click",
    function() {

        cartProducts = [];

        saveCart();

        updateCart();

    }
);
// ==========================================
// Order Form
// ==========================================

placeOrderButton.addEventListener("click", function() {

    if (cartProducts.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // Create Order Form
    const orderFormBox = document.createElement("div");
    orderFormBox.id = "order-form-box";

    orderFormBox.innerHTML = `
        <h2>Customer Information</h2>

        <input
            type="text"
            id="customer-name"
            placeholder="Full Name"
        >

        <input
            type="tel"
            id="customer-phone"
            placeholder="Phone Number"
        >

        <input
            type="text"
            id="customer-city"
            placeholder="City"
        >

        <textarea
            id="customer-address"
            placeholder="Full Address"
        ></textarea>

        <select id="payment-method">
            <option value="">Choose Payment Method</option>
            <option value="Cash on Delivery">
                Cash on Delivery
            </option>
            <option value="Credit Card">
                Credit Card
            </option>
        </select>

        <button id="confirm-order">
            Confirm Order
        </button>

        <button id="cancel-order">
            Cancel
        </button>
    `;

    document.body.appendChild(orderFormBox);


    // ==========================================
    // Order Form Styles
    // ==========================================

    const orderStyle = document.createElement("style");

    orderStyle.textContent = `

    #order-form-box {
        width: 90%;
        max-width: 450px;
        margin: 30px auto;
        padding: 20px;
        border: 2px solid #222;
        border-radius: 10px;
        background: white;
        box-sizing: border-box;
    }

    #order-form-box h2 {
        margin-bottom: 20px;
    }

    #order-form-box input,
    #order-form-box textarea,
    #order-form-box select {
        width: 100%;
        padding: 10px;
        margin-bottom: 12px;
        border: 1px solid #999;
        border-radius: 6px;
        box-sizing: border-box;
        font-size: 14px;
    }

    #order-form-box textarea {
        height: 80px;
        resize: vertical;
    }

    #order-form-box button {
        margin: 5px;
    }

    `;

    document.head.appendChild(orderStyle);


    // ==========================================
    // Confirm Order
    // ==========================================

    document
        .querySelector("#confirm-order")
        .addEventListener("click", function() {

            const name =
                document.querySelector("#customer-name").value.trim();

            const phone =
                document.querySelector("#customer-phone").value.trim();

            const city =
                document.querySelector("#customer-city").value.trim();

            const address =
                document.querySelector("#customer-address").value.trim();

            const payment =
                document.querySelector("#payment-method").value;


            if (
                name === "" ||
                phone === "" ||
                city === "" ||
                address === "" ||
                payment === ""
            ) {

                alert("Please fill in all fields.");
                return;

            }


           // ==========================================
// Order Summary
// ==========================================

const summaryBox = document.createElement("div");

summaryBox.id = "order-summary";

let summaryHTML = `
    <h2>Order Summary</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Payment:</strong> ${payment}</p>

    <hr>

    <h3>Products</h3>
`;

cartProducts.forEach(function(item) {

    summaryHTML += `
        <p>
            ${item.name}
            × ${item.quantity}
            — $${item.price * item.quantity}
        </p>
    `;

});

const orderTotal = cartProducts.reduce(function(total, item) {

    return total + (item.price * item.quantity);

}, 0);

summaryHTML += `
    <hr>

    <h3>Total: $${orderTotal}</h3>

    <button id="finish-order">
        Finish Order
    </button>
`;

summaryBox.innerHTML = summaryHTML;

document.body.appendChild(summaryBox);


// ==========================================
// Order Summary Styles
// ==========================================

const summaryStyle = document.createElement("style");

summaryStyle.textContent = `

#order-summary {
    width: 90%;
    max-width: 450px;
    margin: 30px auto;
    padding: 20px;
    border: 2px solid #222;
    border-radius: 10px;
    background: white;
    box-sizing: border-box;
}

#order-summary h2 {
    margin-bottom: 20px;
}

#order-summary p {
    margin: 10px 0;
}

#order-summary hr {
    margin: 15px 0;
}

#finish-order {
    margin-top: 15px;
}

`;

document.head.appendChild(summaryStyle);


// ==========================================
// Finish Order
// ==========================================

document
    .querySelector("#finish-order")
    .addEventListener("click", function() {

        alert("Thank you for your order, " + name + "!");

        summaryBox.remove();

        cartProducts = [];

        localStorage.removeItem("fashionCart");

        updateCart();

    });

            orderFormBox.remove();

        });


    // ==========================================
    // Cancel Order
    // ==========================================

    document
        .querySelector("#cancel-order")
        .addEventListener("click", function() {

            orderFormBox.remove();

        });

});



// ==========================================
// 13. تشغيل أزرار Add to Cart
// ==========================================

products.forEach(function(product) {


    // اسم المنتج
    const productName =
        product.querySelector("h3").textContent;


    // السعر
    const productPrice =
        parseFloat(
            product
                .querySelector("p")
                .textContent
                .replace("$", "")
        );


    // زر Add to Cart
    const addButton =
        product.querySelector("button");


    // ======================================
    // عند الضغط على Add to Cart
    // ======================================

    addButton.addEventListener(
        "click",
        function() {


            // البحث عن المنتج في السلة
            const existingProduct =
                cartProducts.find(function(item) {

                    return item.name === productName;

                });


            // ==================================
            // إذا كان المنتج موجودًا
            // ==================================

            if (existingProduct) {

                existingProduct.quantity++;

            }


            // ==================================
            // إذا كان المنتج غير موجود
            // ==================================

            else {

                cartProducts.push({

                    name: productName,

                    price: productPrice,

                    quantity: 1

                });

            }


            // حفظ السلة
            saveCart();


            // تحديث السلة
            updateCart();

        }
    );

});


// ==========================================
// 14. تشغيل السلة عند فتح الصفحة
// ==========================================

updateCart();
// ==========================================
// Seasons
// ==========================================

const seasonBox = document.createElement("div");
seasonBox.id = "season-box";

const seasonTitle = document.createElement("label");
seasonTitle.textContent = "Choose Season: ";

const seasonSelect = document.createElement("select");
seasonSelect.id = "season-select";

const seasons = [
    "Summer",
    "Winter",
    "Spring",
    "Autumn"
];

seasons.forEach(function(season) {

    const option = document.createElement("option");

    option.value = season.toLowerCase();
    option.textContent = season;

    seasonSelect.appendChild(option);
});

seasonBox.appendChild(seasonTitle);
seasonBox.appendChild(seasonSelect);

document.body.insertBefore(
    seasonBox,
    document.querySelector("#shopping-cart")
);


// ==========================================
// Season Styles
// ==========================================

const seasonStyle = document.createElement("style");

seasonStyle.textContent = `

#season-box {
    width: fit-content;
    margin: 25px auto;
    padding: 10px 15px;
    border: 2px solid #222;
    border-radius: 8px;
    background: white;
}

#season-box label {
    font-weight: bold;
}

#season-select {
    margin-left: 8px;
    padding: 6px 10px;
    border-radius: 5px;
    cursor: pointer;
}

`;

document.head.appendChild(seasonStyle);


// ==========================================
// Change Season
// ==========================================

seasonSelect.addEventListener("change", function() {

    const selectedSeason = seasonSelect.value;

    if (selectedSeason === "summer") {

        document.body.style.backgroundColor = "#fff8e1";

    } else if (selectedSeason === "winter") {

        document.body.style.backgroundColor = "#eaf4f8";

    } else if (selectedSeason === "spring") {

        document.body.style.backgroundColor = "#f1f8e9";

    } else if (selectedSeason === "autumn") {

        document.body.style.backgroundColor = "#fff3e0";

    }

});
// ==========================================
// Product Search
// ==========================================

const searchBox = document.createElement("div");
searchBox.id = "search-box";

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search for a product...";

searchBox.appendChild(searchInput);

const productsSection = document.querySelector(".products");

productsSection.parentNode.insertBefore(
    searchBox,
    productsSection
);


// ==========================================
// Search Styles
// ==========================================

const searchStyle = document.createElement("style");

searchStyle.textContent = `

#search-box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 25px 0;
    box-sizing: border-box;
}

#search-box input {
    width: 280px;
    padding: 10px 14px;
    border: 2px solid #222;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    box-sizing: border-box;
}

#search-box input:focus {
    border-color: #555;
}

@media (max-width: 600px) {

    #search-box input {
        width: 90%;
        max-width: 280px;
    }

}

`;

document.head.appendChild(searchStyle);


// ==========================================
// Search Function
// ==========================================

searchInput.addEventListener("input", function() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    products.forEach(function(product) {

        const nameElement = product.querySelector("h3");

        if (!nameElement) {
            return;
        }

        const productName =
            nameElement.textContent.toLowerCase();

        if (productName.includes(searchText)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

});
// ==========================================
// Product Category Filter
// ==========================================

const filterBox = document.createElement("div");
filterBox.id = "filter-box";

const filterSelect = document.createElement("select");
filterSelect.id = "category-filter";

const categories = [
    "All Products",
    "Clothes",
    "Shoes",
    "Accessories"
];

categories.forEach(function(category) {

    const option = document.createElement("option");

    option.value = category.toLowerCase();
    option.textContent = category;

    filterSelect.appendChild(option);
});

filterBox.appendChild(filterSelect);


// Put Filter Under Search
document.querySelector("#search-box").after(filterBox);


// ==========================================
// Filter Styles
// ==========================================

const filterStyle = document.createElement("style");

filterStyle.textContent = `

#filter-box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 10px 0 25px;
}

#category-filter {
    padding: 9px 14px;
    border: 2px solid #222;
    border-radius: 8px;
    font-size: 14px;
    background: white;
    cursor: pointer;
}

`;

document.head.appendChild(filterStyle);


// ==========================================
// Product Categories
// ==========================================

const productCategories = {

    "Classic T-Shirt": "clothes",
    "Hoodie": "clothes",
    "Jeans": "clothes",
    "Jacket": "clothes",
    "Sweatshirt": "clothes",
    "Polo Shirt": "clothes",
    "Shorts": "clothes",
    "Dress": "clothes",
    "Coat": "clothes",

    "Sneakers": "shoes",

    "Black Cap": "accessories",
    "Backpack": "accessories"
};


// ==========================================
// Category Filter Function
// ==========================================

filterSelect.addEventListener("change", function() {

    const selectedCategory = filterSelect.value;

    products.forEach(function(product) {

        const nameElement = product.querySelector("h3");

        if (!nameElement) {
            return;
        }

        const productName =
            nameElement.textContent.trim();

        const productCategory =
            productCategories[productName];

        if (
            selectedCategory === "all products" ||
            productCategory === selectedCategory
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

});
