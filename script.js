let products = [];
let currentPage = 0;
let productSize = 3; //initially let 3 product card 

async function fetchProducts() {
  const response = await fetch(`https://dummyjson.com/products`);
  const data = await response.json();
  products=[...data.products];
  // products = [...products, ...data.products];
}

async function renderProducts() {
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = '';

  const startIndex = currentPage;
  const endIndex = productSize;

  products.slice(startIndex, endIndex).forEach(product => {
    const card = `
      <div class="bg-white p-4 border border-gray-200 rounded-lg">
        <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-40 object-cover mb-2">
        <h3 class="font-semibold text-lg">${product.title}</h3>
        <p class="text-gray-600">${product.description}</p>
        <p class="text-blue-500 font-semibold">$${product.price}</p>
        <p>Rating: ${product.rating}</p>
        <p>Brand: ${product.brand}</p>
        <button onclick="viewDetails(${product.id})" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">View Details</button>
      </div>
    `;
    productGrid.innerHTML += card;
  });

  // if (endIndex < products.length) {
  //   document.getElementById('seeMoreBtn').classList.remove('hidden');
  // } else {
  //   document.getElementById('seeMoreBtn').classList.add('hidden');
  // }
}

// async function showMore() {
//   productSize = products.length; 
//   renderProducts();
// }

function isBottomOfPage() {
  return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
}

function loadMoreProducts() {
  productSize = products.length; 
  renderProducts();
 
}

window.addEventListener('scroll', function() {
  if (isBottomOfPage()) {
      loadMoreProducts();
  }
});


async function searchProducts() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchInput));
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = '';

  filteredProducts.forEach(product => {
    const card = `
      <div class=" bg-white p-4 border border-gray-200 rounded-lg">
        <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-40 object-cover mb-2">
        <h3 class="font-semibold text-lg">${product.title}</h3>
        <p class="text-gray-600">${product.description}</p>
        <p class="text-blue-500 font-semibold">$${product.price}</p>
        <button onclick="viewDetails(${product.id})" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">View Details</button>
      </div>
    `;
    productGrid.innerHTML += card;
  });
}



async function viewDetails(productId) {
  const product = products.find(prod => prod.id === productId);
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = 'product-details.html';
}



async function main() {
  await fetchProducts();
  renderProducts();
};
main();