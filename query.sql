CREATE DATABASE IF NOT EXISTS woow_chluis CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE woow_chluis;

CREATE TABLE users (
    id CHAR(36) NOT NULL,
    email VARCHAR(191) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role ENUM('ADMIN', 'MANAGER', 'VIEWER') DEFAULT 'VIEWER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (email)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE suppliers (
    id CHAR(36) NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(191) NOT NULL,
    phone VARCHAR(50),
    contact_info TEXT, -- Dirección u otros datos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (email)
);

CREATE TABLE products (
    id CHAR(36) NOT NULL,
    sku VARCHAR(100) NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    current_stock INT DEFAULT 0,
    min_stock INT DEFAULT 5,
    status ENUM('ACTIVE', 'DRAFT', 'DISCONTINUED') DEFAULT 'ACTIVE', 
    category_id INT,
    supplier_id CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (sku),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
);

INSERT INTO categories (name, description) VALUES 
('TV', 'Televisores y soportes'),
('Celulares', 'Equipos y cargadores'),
('Electrónica', 'Gadgets y computadoras'),
('Audio', 'Parlantes, auriculares y equipos de sonido'),
('Hogar', 'Electrodomésticos y artículos para el hogar'),
('Gaming', 'Consolas, accesorios y videojuegos'),
('Deportes', 'Indumentaria y equipamiento deportivo'),
('Moda', 'Ropa, calzado y accesorios'),
('Mascotas', 'Productos para el cuidado y alimentación de mascotas'),
('Oficina', 'Muebles, insumos y equipamiento para oficina'),
('Salud y Belleza', 'Cuidado personal, cosmética y bienestar');

INSERT INTO users (id, email, password, full_name, role)  VALUES 
('072718bd-4512-4768-ab3a-2ec0d5eaec31', 'admin@admin.com', '$2b$10$SOKSW0stuytF62OZGDsYX.BLUvca0xA5m6/0rLa0xbEyKV6nib5pW', 'Admin User', 'ADMIN'),
('3c6d6c37-7708-44f2-8aa1-eaa89dc8f87e', 'manager@manager.com', '$2b$10$SOKSW0stuytF62OZGDsYX.BLUvca0xA5m6/0rLa0xbEyKV6nib5pW', 'Manager User', 'MANAGER'),
('c5d666b3-1c05-4a5e-87e7-8b16d3d7ac82', 'viewer@viewer.com', '$2b$10$SOKSW0stuytF62OZGDsYX.BLUvca0xA5m6/0rLa0xbEyKV6nib5pW', 'Viewer User', 'VIEWER');

INSERT INTO suppliers (id, name, email, phone) VALUES 
('f3a4c1ce-1d9a-4c3e-9f73-6af577a3c201', 'TecnoGlobales S.A.S.', 'contacto3@tecnoglobal.com', '555-0199'),
('0c92a4d0-6b8e-4bb1-8c5c-8d77f2fb91f4', 'Distribuciones Norte SRL', 'ventas@dnorte.com', '555-2211'),
('a6e73c41-8bcb-4d6b-8bd8-2a3cfa45b0d2', 'ProveeTech Argentina', 'soporte@proveetech.com', '555-8844');

INSERT INTO products (id, sku, name, description, price, current_stock, min_stock, status, category_id, supplier_id) VALUES
(UUID(), 'TV-001', 'Smart TV Samsung 55"', 'Televisor 4K UHD con HDR10+', 399999, 12, 5, 'ACTIVE', 1, 'f3a4c1ce-1d9a-4c3e-9f73-6af577a3c201'),
(UUID(), 'TV-002', 'Soporte TV 32-55"', 'Soporte metálico articulado', 24999, 30, 5, 'ACTIVE', 1, '0c92a4d0-6b8e-4bb1-8c5c-8d77f2fb91f4'),
(UUID(), 'CEL-001', 'Xiaomi Redmi Note 13', '128GB, 8GB RAM, dual SIM', 189999, 20, 5, 'ACTIVE', 2, 'a6e73c41-8bcb-4d6b-8bd8-2a3cfa45b0d2'),
(UUID(), 'CEL-002', 'Cargador Rápido USB-C 25W', 'Cargador universal de carga rápida', 14999, 50, 5, 'ACTIVE', 2, '0c92a4d0-6b8e-4bb1-8c5c-8d77f2fb91f4'),
(UUID(), 'ELEC-001', 'Mouse Inalámbrico Logitech', 'Mouse ergonómico con receptor USB', 9999, 40, 5, 'ACTIVE', 3, 'f3a4c1ce-1d9a-4c3e-9f73-6af577a3c201'),
(UUID(), 'ELEC-002', 'Teclado Mecánico RGB', 'Switch blue, iluminación RGB', 34999, 15, 5, 'ACTIVE', 3, 'a6e73c41-8bcb-4d6b-8bd8-2a3cfa45b0d2'),
(UUID(), 'AUD-001', 'Auriculares JBL Tune 510BT', 'Bluetooth, batería 40h', 32999, 22, 5, 'ACTIVE', 4, '0c92a4d0-6b8e-4bb1-8c5c-8d77f2fb91f4'),
(UUID(), 'AUD-002', 'Parlante Portátil Sony SRS-XB13', 'Extra bass, resistente al agua', 45999, 10, 5, 'ACTIVE', 4, 'f3a4c1ce-1d9a-4c3e-9f73-6af577a3c201'),
(UUID(), 'HOG-001', 'Licuadora Philips ProBlend', '550W, vaso de vidrio', 58999, 18, 5, 'ACTIVE', 5, 'a6e73c41-8bcb-4d6b-8bd8-2a3cfa45b0d2'),
(UUID(), 'HOG-002', 'Aspiradora Xiaomi Mi Vacuum', 'Robot inteligente con mapeo', 229999, 5, 2, 'ACTIVE', 5, '0c92a4d0-6b8e-4bb1-8c5c-8d77f2fb91f4'),
(UUID(), 'GAME-001', 'Joystick PS5 DualSense', 'Control inalámbrico oficial', 99999, 14, 5, 'ACTIVE', 6, 'f3a4c1ce-1d9a-4c3e-9f73-6af577a3c201'),
(UUID(), 'GAME-002', 'Auriculares Gamer HyperX Cloud II', '7.1 Surround, mic removible', 129999, 8, 5, 'ACTIVE', 6, 'a6e73c41-8bcb-4d6b-8bd8-2a3cfa45b0d2'),
(UUID(), 'DEP-001', 'Pelota de Fútbol Adidas', 'Tamaño 5, uso profesional', 32999, 25, 5, 'ACTIVE', 7, '0c92a4d0-6b8e-4bb1-8c5c-8d77f2fb91f4'),
(UUID(), 'DEP-002', 'Guantes de Gimnasio', 'Antideslizantes, talla M', 14999, 35, 5, 'ACTIVE', 7, 'f3a4c1ce-1d9a-4c3e-9f73-6af577a3c201'),
(UUID(), 'MOD-001', 'Zapatillas Urbanas Hombre', 'Talle 41, color negro', 52999, 12, 3, 'ACTIVE', 8, 'a6e73c41-8bcb-4d6b-8bd8-2a3cfa45b0d2'),
(UUID(), 'MOD-002', 'Campera Liviana Impermeable', 'Unisex, color azul', 69999, 9, 3, 'ACTIVE', 8, '0c92a4d0-6b8e-4bb1-8c5c-8d77f2fb91f4'),
(UUID(), 'PET-001', 'Alimento Premium Perros 15kg', 'Raza mediana, sin colorantes', 45999, 22, 5, 'ACTIVE', 9, 'f3a4c1ce-1d9a-4c3e-9f73-6af577a3c201'),
(UUID(), 'PET-002', 'Cama para Perro Grande', 'Material acolchonado resistente', 37999, 7, 2, 'ACTIVE', 9, 'a6e73c41-8bcb-4d6b-8bd8-2a3cfa45b0d2'),
(UUID(), 'OFF-001', 'Silla Ergonómica Reclinable', 'Soporte lumbar, regulable', 119999, 11, 3, 'ACTIVE', 10, '0c92a4d0-6b8e-4bb1-8c5c-8d77f2fb91f4'),
(UUID(), 'OFF-002', 'Escritorio de Madera 120cm', 'Diseño moderno, color wengue', 89999, 6, 2, 'ACTIVE', 10, 'f3a4c1ce-1d9a-4c3e-9f73-6af577a3c201'),
(UUID(), 'BEAU-001', 'Plancha de Pelo Remington', 'Cerámica avanzada', 45999, 17, 5, 'ACTIVE', 11, 'a6e73c41-8bcb-4d6b-8bd8-2a3cfa45b0d2'),
(UUID(), 'BEAU-002', 'Crema Facial Hidratante 50ml', 'Piel normal a seca', 12999, 40, 5, 'ACTIVE', 11, '0c92a4d0-6b8e-4bb1-8c5c-8d77f2fb91f4');