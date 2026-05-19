CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,

    customer_name VARCHAR(100),

    email VARCHAR(100),

    phone VARCHAR(20),

    product_name VARCHAR(100),

    amount DECIMAL(10,2),

    payment_id VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
