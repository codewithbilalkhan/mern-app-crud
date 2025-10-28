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
      id : savedBook?._id,
    });
    
  } catch(err) {
    console.error('Error saving book:', err);
    return res.status(500).json({ 
      message: err.message, 
      Success: false 
    });
  }
};

const handlebooklistController = async(req, res) =>{
  try{
   const booklist = await Book.find({});
   return res.status(200).json({
    message: "Book list fetched successfully",
    Success: true,
    totalcount: booklist.length, 
    data: booklist
   });
  }catch(err){
     console.error('Error fetching Books:', err);
    return res.status(500).json({ 
      message: err.message, 
      Success: false 
    });
  }
}


const handlebookdeleteController = async(req, res) =>{
  const body = req.body;
 try{
  const deleted = await Book.deleteOne({_id: body.id})
  if(deleted.acknowledged){
    return res.status(200).json({
      message: "Book deleted successfully",
      Success: true,
    });
  }

 }catch(err){
    console.error('Error deleting book:', err);
    return res.status(500).json({ 
      message: err.message, 
      Success: false 
    });
 }
}

module.exports = { handleBookStoreController, handlebooklistController,handlebookdeleteController };