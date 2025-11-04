import React, { useState } from 'react'
import { BookbaseURL } from '../../axiosinstance'
import { useEffect } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const Home = () => {
  const [formData, setFormData] = useState({
    BookName: '',
    BookTitle: '',
    Author: '',
    SellingPrice: '',
    PublishDate: '',
    _id: null // Add ID field for updates
  });
  const [booklist, setBooklist] = useState([]);
  const [isupdating, setIsUpdating] = useState(false);

 const handleDelete = async(id) => {
  if (window.confirm('Are you sure you want to delete this book?')) {
    try{
      const {data} = await BookbaseURL.delete('/deletebook', {data: {id: id}});
      if(data?.Success){
        alert('Book deleted successfully');
        // Refresh the book list
        getAllBooklist();
      }
    } catch(err){
      console.log("err", err);
      alert('Error deleting book. Please try again.');
    }
  }
};

const handlelupdate = (data) => {
  setFormData({
    BookName: data?.BookName,
    BookTitle: data?.BookTitle,
    Author : data?.Author,
    SellingPrice: data?.SellingPrice,
    PublishDate: data?.PublishDate,
    _id: data?._id
  }); 
  setIsUpdating(true);
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
} 

  

  const getAllBooklist = async() =>{
  try{
  const {data} = await BookbaseURL.get('/booklists');
setBooklist(data.data);
    console.log("booklist",data);
  }catch(err){
    console.log("err",err);
  }
  }

  useEffect(()=>{
    getAllBooklist();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      console.log('Sending data:', formData); 
      
      let response;
      if (isupdating && formData._id) {
        // Update existing book
        response = await BookbaseURL.put('/updatebook', formData);
        alert('Book updated successfully!');
      } else {
        // Create new book
        const { _id, ...dataWithoutId } = formData; // Remove _id for new books
        response = await BookbaseURL.post('/addbook', dataWithoutId);
        alert('Book added successfully!');
      }
      
      console.log('Response:', response.data);
      
     
      setFormData({
        BookName: '',
        BookTitle: '',
        Author: '',
        SellingPrice: '',
        PublishDate: '',
        _id: null
      });
      
      // Reset update mode
      setIsUpdating(false);
      
      getAllBooklist();
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing request. Please try again.');
    }
  };

  console.log("bookform", formData)


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {isupdating ? 'Update Book' : 'Add New Book'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isupdating ? 'Modify the book details below' : 'Fill in the book details below'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bookName" className="block text-sm font-medium text-gray-700 mb-2">
                Book Name
              </label>
              <input
                type="text"
                id="bookName"
                name="BookName"
                value={formData.BookName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter book name"
              />
            </div>

            <div>
              <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Book Title
              </label>
              <input
                type="text"
                id="bookTitle"
                name="BookTitle"
                value={formData.BookTitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter book title"
              />
            </div>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="Author"
                value={formData.Author}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter author name"
              />
            </div>

            <div>
              <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-2">
                Selling Price
              </label>
              <input
                type="number"
                id="sellingPrice"
                name="SellingPrice"
                value={formData.SellingPrice}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter selling price"
              />
            </div>
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-start-1">
              <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date
              </label>
              <input
                type="date"
                id="publishDate"
                name="PublishDate"
                value={formData.PublishDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

        
          <div className="pt-4 flex justify-center gap-4">
            <button
              type="submit"
              className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
            >
              {isupdating ? 'Update Book' : 'Add Book'}
            </button>
            {isupdating && (
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    BookName: '',
                    BookTitle: '',
                    Author: '',
                    SellingPrice: '',
                    PublishDate: '',
                    _id: null
                  });
                  setIsUpdating(false);
                }}
                className="px-8 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <div className='w-full mt-10'>
        <div className='w-full'>
            <table className='w-full table-auto border-collapse border border-gray-300'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='tracking-wider px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase'>Book Name</th>
                         <th className='tracking-wider px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase'>Book Title</th>
                          <th className='tracking-wider px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase'>Book Author</th>
                          <th className='tracking-wider px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase'>Selling Price</th>
                          <th className='tracking-wider px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase'>Publish Date</th>
                          <th className='tracking-wider px-6 py-3 text-center text-xs  font-medium text-gray-500 uppercase'>Actions</th>
                    </tr>
                </thead>
                <tbody className='table-auto border-collapse border border-gray-300'>
                      {
                        booklist?.map((book, index)=>{
                          return(
                            <tr className='hover:bg-gray-200' key={index}>
                              <td className='px-6 py-3 whitespace-nowrap'>{book?.BookName}</td>
                              <td className='px-6 py-3 whitespace-nowrap'>{book?.BookTitle}</td>
                              <td className='px-6 py-3 whitespace-nowrap'>{book?.Author}</td>
                              <td className='px-6 py-3 whitespace-nowrap'>{book?.SellingPrice}</td>
                              <td className='px-6 py-3 whitespace-nowrap'>{book?.PublishDate}</td>
                              <td className='px-6 py-3 whitespace-nowrap'>
                                <div className='w-20 flex justify-center gap-5'>
                                  <div className='h-8 w-8 flex justify-center items-center bg-red-100 text-red-600 rounded text-lg cursor-pointer' onClick={()=> handleDelete(book._id)}>
                                    <span><MdDelete/></span>
                                  </div>
                                  <div className='h-8 w-8 flex justify-center items-center bg-green-100 text-green-600 rounded text-lg  curser-pointer' onClick={() => handlelupdate(book)}>
                                    <span><MdEdit/></span>
                                  </div>
                                

                                </div>
                              </td>
                            </tr>
                          )

                        })
                      }
                  
                </tbody>
            </table>

        </div>

      </div>
    </div>
  )
}

export default Home
