CREATE TABLE Klant (
	klantnummer SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	wachtwoord VARCHAR(50) NOT NULL,
	postcode VARCHAR(7),
	straatnaam VARCHAR(63),
	huisnummer INT,
	toevoeging VARCHAR(7),
	stad VARCHAR(63)
);

CREATE TABLE Factuur (
	factuurnummer SERIAL PRIMARY KEY,
	klantnummer INT NOT NULL,
	totaalbedrag REAL NOT NULL,
	CONSTRAINT fk_klantnummer
		FOREIGN KEY (klantnummer) REFERENCES Klant(klantnummer)
);

CREATE TABLE Product_Categorie (
	categorienummer SERIAL PRIMARY KEY,
	categorienaam VARCHAR(31) NOT NULL
);

CREATE TABLE Product (
	productnummer SERIAL PRIMARY KEY,
	categorienummer INT NOT NULL,
	inkoopprijs REAL NOT NULL,
	verkoopprijs REAL NOT NULL,
	voorraad INT NOT NULL,
	marge_percentage INT NOT NULL,
	CONSTRAINT fk_categorienummer
		FOREIGN KEY (categorienummer) REFERENCES Product_Categorie(categorienummer)
);

CREATE TABLE Factuur_Product (
	factuurnummer INT NOT NULL,
	productnummer INT NOT NULL,
	PRIMARY KEY(factuurnummer, productnummer),
	CONSTRAINT fk_factuurnummer
		FOREIGN KEY (factuurnummer) REFERENCES Factuur(factuurnummer),
	CONSTRAINT fk_productnummer
		FOREIGN KEY (productnummer) REFERENCES Product(productnummer)
);
