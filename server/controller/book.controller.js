const { Book } = require("../model/book.model");

const handleBookStoreController = async(req, res) => {
  try {
    const body = req.body;
    
    // Validate required fields
    if(!body.BookName || !body.BookTitle || !body.Author || !body.SellingPrice) {
      return res.status(400).json({ 
        message: "BookName, BookTitle, Author, and SellingPrice are required", 
        Success: false 
      });
    }

    // Create new book
    const newBook = new Book(body);
    const savedBook = await newBook.save();
    
    console.log('Book saved:', savedBook);
    
    return res.status(201).json({ 
      message: "Book added successfully", 
      Success: true,
      data: savedBook
    });
    
  } catch(err) {
    console.error('Error saving book:', err);
    return res.status(500).json({ 
      message: err.message, 
      Success: false 
    });
  }
};

module.exports = { handleBookStoreController };