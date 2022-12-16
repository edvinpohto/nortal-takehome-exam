-- PROMPT -- 
-- A database contains the tables defined below. 
-- Customer can have multiple addresses but only one active address. Customer may not have an address.

-- DATABASE STRUCTURE
-- Customer [CustomerID, CreatedDate]
-- Address [Address, CustomerID, CreatedDate, Active]

-- Using the query language of your choice, produce queries described below.
-- My chosen query language is SQL.

-- ANSWERS --

-- Question One --
-- Get customers which have CreatedDate of ‘1.1.2015’ or later
-- ◦ Return: CustomerID, Customer.CreatedDate
SELECT CustomerID, CreatedDate
FROM Customer
WHERE CreatedDate >= '1.1.2015' --This date assumes that the date format is as defined in the question. 

-- Question Two --
-- Get customers which have ’Oulu’ as an active address
-- ◦ Return: CustomerID, Address.CreatedDate
SELECT Customer.CustomerID, Address.CreatedDate
FROM Customer
JOIN Address ON Customer.CustomerID = Address.CustomerID
WHERE Address.Active = Address.Address LIKE '%Oulu%' 
-- We create a JOIN to use both tables by the CustomerID value.
-- The basic JOIN is actually an INNER JOIN, returning all records that have matching values in both tables
-- Address LIKE '%Oulu%' means that the string value (assuming from the question it is a string value) includes Oulu.

-- Question Three --
-- Get customers which have at some point had ‘Oulu’ or ‘Helsinki’ as their address
-- • Return: CustomerID
SELECT DISTINCT Customer.CustomerID
FROM Customer
JOIN Address ON Customer.CustomerID = Address.CustomerID
WHERE Address.Address LIKE '%Oulu%' OR Address.Address LIKE '%Helsinki%'
-- Similar to question two, we create a JOIN to connect the two tables and then use a WHERE to limit our search according
-- to our search parameters.
-- The DISTINCT keyword helps us eliminate duplicate CustomerIDs.

-- Question Four --
-- Get customers which have at some point had 'Oulu' and 'Helsinki' as their address
-- • Return: CustomerID
SELECT DISTINCT Customer.CustomerID
FROM Customer
JOIN Address ON Customer.CustomerID = Address.CustomerID
WHERE Address.Address LIKE '%Oulu%' AND Address.Address LIKE '%Helsinki%'
-- This query is almost identical to the one in question three, with the difference being the AND operator instead of OR in the WHERE clause.
-- The information cannot be derived from the given structure of the database, but for this to work the address lines in each row need
-- to include both Oulu and Helsinki. 

-- Question Five --
-- Get all customers and an active address for each
-- • Return: CustomerID, Address (if no address, use empty string)
SELECT * Customer.CustomerID, IFNULL(Address.Active, '') AS Address
FROM Customer
JOIN Address ON Customer.CustomerID = Address.CustomerID;
-- The IFNULL function is used to replace an empty cell with an empty string (because empty values are NULL in SQL tables)

-- Question Six --
-- Describe briefly what kind of index(es) could be used to improve the performance of the
-- queries above.
-- • How do indexes improve performance of queries?
-- Indexes are specifically created, separate (smaller) tables used by the database's search engine to look things up. 
-- Essentially, an index is like a phonebook for the database.
-- These tables are small and light weight, and can be created or dropped without an effect on the data in the DB.
-- By defining on what table (and possibly also column(s)) you want to create an index, you aid the search engine in finding things.
-- In SQL, an index can increase the speed at which the DB engine performs SELECT queries and WHERE clauses.
-- A good target for an index is any table and/or column that is frequently accessed. 
-- For the above queries, we could for example argue that the most frequently used queries are directed at the CustomerIDs and Addressess.
-- In that case, we could create an index for the CustomerID column in the Customer table, and the Address and CustomerID columns in the Address table.
-- This could look something like this:

CREATE INDEX customer_index
ON Customer (CustomerID);

CREATE INDEX address_index
ON Address (Address, CustomerID);

-- • What is the trade-off of using indexes?
-- The trade-off of using indexes is that they slow down data input (e.g. using the UPDATE and INSERT calls).
-- Indexes are also redundant and therefore bad to use on small tables.
-- You should also reconsider the benefit of the index if there are frequent and/or large additions or updates made to the table.
-- Additional cases where indexes may cause more harm than anything else are if a table consists of many NULL values or if they are
-- generally manipulated often.

