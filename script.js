 // Filter products by price
 function filterProductsByPrice() {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
      let isVisible = true;
      const price = parseFloat(product.querySelector('p').textContent);

      checkboxes.forEach(checkbox => {
        if (checkbox.checked && checkbox.id !== 'showAllCheckbox') {
          const minPrice = parseFloat(checkbox.getAttribute('id').replace('priceFilter', '')) || 0;
          const maxPrice = minPrice + 10;
          
          if (!(price >= minPrice && price <= maxPrice)) {
            isVisible = false;
          }
        }
      });

      product.style.display = isVisible ? 'block' : 'none';
    });
  }

  // Update product prices based on selected currency
  function updatePrices(currency) {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
      const priceElement = product.querySelector('p');
      const price = parseFloat(priceElement.textContent);
      const convertedPrice = convertCurrency(price, currency);
      priceElement.textContent = `${convertedPrice.toFixed(2)}`;
    });

    // Update filter ranges based on currency
    const currencyRate = {
      usd: 1,
      euro: 0.88,
      inr: 73.18
    };

    const checkboxes = document.querySelectorAll('.filter-checkbox[id^="priceFilter"]');
    checkboxes.forEach(checkbox => {
      const minPrice = parseFloat(checkbox.getAttribute('id').replace('priceFilter', '')) || 0;
      const maxPrice = minPrice + 10;
      const currencyConversionRate = currencyRate[currency];
      const convertedMinPrice = minPrice / currencyConversionRate;
      const convertedMaxPrice = maxPrice / currencyConversionRate;
      checkbox.nextElementSibling.textContent = `${currency.toUpperCase()} ${convertedMinPrice.toFixed(2)} - ${currency.toUpperCase()} ${convertedMaxPrice.toFixed(2)}`;
    });
  }

  // Convert currency
  function convertCurrency(price, toCurrency) {
    // Conversion rates (for demonstration purposes)
    const rates = {
      usd: 1,
      euro: 0.88,
      inr: 1 / 73.18 // Inverse of the INR conversion rate
    };

    // Convert to USD first, then to target currency
    const usdPrice = price / rates['usd'];
    return usdPrice * rates[toCurrency];
  }

  // Event listeners
  document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', filterProductsByPrice);
  });

  document.getElementById('currencySelect').addEventListener('change', function() {
    const currency = this.value;
    updatePrices(currency);
  });

  // Apply filter after page loads
  window.addEventListener('load', function() {
    filterProductsByPrice();
  });