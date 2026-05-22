<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Organic Honey Store</title>

<link rel="stylesheet" href="style.css">

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

</head>

<body>

<!-- HERO SECTION -->

<section class="hero">

    <div class="hero-content">

        <h1>Pure Natural Honey</h1>

        <p>
            Raw • Organic • Farm Fresh Honey
        </p>

        <button onclick="scrollToProducts()">
            Explore Products
        </button>

    </div>

</section>

<!-- PRODUCTS SECTION -->

<section class="products">

    <h2>Our Honey Collection</h2>

    <div class="product-grid">

        <!-- PRODUCT 1 -->

        <div class="product-card">

            <img src="assets/jamun.jpg" alt="Jamun Honey">

            <h3>Jamun Honey</h3>

            <p>
                Rich antioxidants & diabetic-friendly natural honey.
            </p>

            <h4>₹499</h4>

            <button onclick="payNow('Jamun Honey',499)">
                Buy Now
            </button>

        </div>

        <!-- PRODUCT 2 -->

        <div class="product-card">

            <img src="assets/litchi.jpg" alt="Litchi Honey">

            <h3>Litchi Honey</h3>

            <p>
                Light floral aroma with smooth texture.
            </p>

            <h4>₹399</h4>

            <button onclick="payNow('Litchi Honey',399)">
                Buy Now
            </button>

        </div>

        <!-- PRODUCT 3 -->

        <div class="product-card">

            <img src="assets/sidr.jpg" alt="Sidr Honey">

            <h3>Sidr Honey</h3>

            <p>
                Premium medicinal honey from forest regions.
            </p>

            <h4>₹799</h4>

            <button onclick="payNow('Sidr Honey',799)">
                Buy Now
            </button>

        </div>

        <!-- PRODUCT 4 -->

        <div class="product-card">

            <img src="assets/forest.jpg" alt="Forest Honey">

            <h3>Forest Honey</h3>

            <p>
                Wild forest honey collected naturally from hives.
            </p>

            <h4>₹599</h4>

            <button onclick="payNow('Forest Honey',599)">
                Buy Now
            </button>

        </div>

    </div>

</section>

<script>

function scrollToProducts(){

    document.querySelector('.products').scrollIntoView({
        behavior:'smooth'
    });

}

function payNow(product, amount){

    var options = {

        key: "YOUR_RAZORPAY_KEY",

        amount: amount * 100,

        currency: "INR",

        name: "Honey Store",

        description: product,

        handler: function (response){

            alert(product + " Payment Successful");

            window.location.href = "payment_success.php";

        }

    };

    var rzp = new Razorpay(options);

    rzp.open();
}

</script>

</body>
</html>
