CREATE TABLE grocerylist (
    itemid integer PRIMARY KEY,
    itemname character varying(255) NOT NULL,
    quantity integer NOT NULL,
    unit character varying(50),
    category character varying(100),
    purchased boolean DEFAULT false,
    purchasedate date,
    notes text
);
