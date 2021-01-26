DROP TABLE account CASCADE;
DROP TABLE category CASCADE;
DROP TABLE product CASCADE;

CREATE TABLE Account (
	accountnumber SERIAL PRIMARY KEY,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	postalcode TEXT,
	streetname TEXT,
	housenumber INT,
	addition TEXT,
	city TEXT,
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Category (
	categorynumber SERIAL PRIMARY KEY,
	categoryname TEXT NOT NULL,
	previousCategoryNumber INTEGER,
	FOREIGN KEY (previousCategoryNumber) REFERENCES Category(categorynumber)
);

CREATE TABLE Product (
	productnumber SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT,
	imagepath TEXT,
	categorynumber INT NOT NULL,
	purchaseprice REAL NOT NULL,
	saleprice REAL NOT NULL,
	stock INT NOT NULL,
	margin INT NOT NULL,
	showinwebshop BOOLEAN NOT NULL,
	CONSTRAINT fk_categorienummer
		FOREIGN KEY (categorynumber) REFERENCES Category(categorynumber)
);

INSERT INTO category (categoryname) VALUES ('Alle producten');
INSERT INTO category (categoryname, previousCategoryNumber)
VALUES ('Elektronica', 1),
       ('Extra', 1);

INSERT INTO product (title, description, imagepath, categorynumber, purchaseprice, saleprice, stock, margin, showinwebshop)
VALUES ('DELL XPS 9300', 'Een laptop van het merk Dell', 'path/to/image', 2, 1453.56, 1999.99, 3, 13, TRUE);

INSERT INTO product (title, description, imagepath, categorynumber, purchaseprice, saleprice, stock, margin, showinwebshop)
VALUES ('LENOVO X1 Carbon', 'Een laptop van het merk Lenovo', 'path/to/image', 2, 1246.56, 1999.99, 5, 6, TRUE);

CREATE TABLE properties (
    categorynumber INTEGER PRIMARY KEY,
    properties TEXT[] NOT NULL,
    CONSTRAINT fk_category
        FOREIGN KEY(categorynumber) REFERENCES category(categorynumber)
);

CREATE TABLE product_properties (
    productnumber INTEGER PRIMARY KEY,
    properties TEXT[] NOT NULL,
    CONSTRAINT fk_product
        FOREIGN KEY(productnumber) REFERENCES product(productnumber)
);
