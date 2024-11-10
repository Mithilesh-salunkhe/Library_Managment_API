CREATE TABLE books(
    B_id VARCHAR(50) PRIMARY KEY,
    B_name VARCHAR(50) UNIQUE,
    B_author VARCHAR(50),
    B_publishingDate VARCHAR(50) 
);

INSERT INTO books
(B_id , B_name , B_author , B_publishingDate)
values
(uuid(),"harry potter" , "j.k rowlling" ,"1997"),
(uuid(), "Fantastic Beasts and Where to Find Them", "J.K. Rowling", "2001"),
(uuid(), "The Casual Vacancy", "J.K. Rowling", "2012"),
(uuid(), "The Tales of Beedle the Bard", "J.K. Rowling", "2008"),
(uuid(), "The Great Gatsby", "F. Scott Fitzgerald", "1925"),
(uuid(), "To Kill a Mockingbird", "Harper Lee", "1960"),
(uuid(), "1984", "George Orwell", "1949"),
(uuid(), "Pride and Prejudice", "Jane Austen", "1813"),
(uuid(), "The Catcher in the Rye", "J.D. Salinger", "1951"),
(uuid(), "The Hobbit", "J.R.R. Tolkien", "1937"),
(uuid(), "Moby-Dick", "Herman Melville", "1851"),
(uuid(), "War and Peace", "Leo Tolstoy", "1869"),
(uuid(), "The Lord of the Rings", "J.R.R. Tolkien", "1954"),
(uuid(), "The Alchemist", "Paulo Coelho", "1988");
