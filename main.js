document.addEventListener('DOMContentLoaded', () => {
    // Fetch the CSV file
    fetch('products.csv')  // Adjust the path to your CSV file
        .then(response => response.text())
        .then(data => {
            const products = parseCSV(data);
            displayProducts(products);
        })
        .catch(error => console.error('Error loading CSV file:', error));
});

// Function to parse CSV data
function parseCSV(data) {
    const rows = data.split('\n');
    const products = [];

    // Assume the first row contains headers
    const headers = rows[0].split(',');

    // Loop through each row (skipping header row)
    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');
        if (values.length === headers.length) {
            const product = {};
            for (let j = 0; j < headers.length; j++) {
                product[headers[j].trim()] = values[j].trim();
            }
            products.push(product);
        }
    }

    return products;
}

// Function to display the products in the table
function displayProducts(products) {
    const tableBody = document.querySelector('#product-list tbody');
    tableBody.innerHTML = ''; // Clear any previous content

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product['Product Name']}</td>
            <td>${product['Price']}</td>
            <td>${product['Description']}</td>
        `;
        tableBody.appendChild(row);
    });
}
