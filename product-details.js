document.addEventListener('DOMContentLoaded', function () {
  const product = JSON.parse(localStorage.getItem('selectedProduct'));

  if (product) {
    const productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" class="w-full mb-2">
        <h3 class="font-semibold text-lg">${product.title}</h3>
        <p class="text-gray-600">${product.description}</p>
        <p class="text-blue-500 font-semibold">${product.price}</p>
        <p>Discount Percentage: ${product.discountPercentage}%</p>
        <p>Rating: ${product.rating}</p>
        <p>Stock: ${product.stock}</p>
        <p>Brand: ${product.brand}</p>
        <p>Category: ${product.category}</p>
        <p>Images:</p>
        <div class="flex flex-wrap">
          ${product.images.map(image => `<img src="${image}" alt="${product.title}" class="w-24 h-24 object-cover mr-2 mb-2">`).join('')}
        </div>
      `;
  } else {
    console.error('Product not found.');
  }
});
