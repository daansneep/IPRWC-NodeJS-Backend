DROP TABLE klant CASCADE;
DROP TABLE categorie CASCADE;
DROP TABLE product CASCADE;

CREATE TABLE Klant (
	klantnummer SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	wachtwoord VARCHAR(127) NOT NULL,
	postcode VARCHAR(7),
	straatnaam VARCHAR(63),
	huisnummer INT,
	toevoeging VARCHAR(7),
	stad VARCHAR(63)
);

CREATE TABLE Categorie (
	categorienummer SERIAL PRIMARY KEY,
	categorienaam VARCHAR(31) NOT NULL
);

CREATE TABLE Product (
	productnummer SERIAL PRIMARY KEY,
	titel VARCHAR(255) NOT NULL,
	beschrijving VARCHAR(1024),
	afbeelding VARCHAR(1024),
	categorienummer INT NOT NULL,
	inkoopprijs REAL NOT NULL,
	verkoopprijs REAL NOT NULL,
	voorraad INT NOT NULL,
	marge_percentage INT NOT NULL,
	laat_zien_in_webshop BOOLEAN NOT NULL,
	CONSTRAINT fk_categorienummer
		FOREIGN KEY (categorienummer) REFERENCES Categorie(categorienummer)
);
