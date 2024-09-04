// Add to Cart Button Functionality
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        alert('Added to cart!');
        // Here you can implement adding the product to cart and updating the cart icon count
    });
});