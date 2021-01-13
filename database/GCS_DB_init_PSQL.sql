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
