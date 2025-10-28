import React, { useState } from 'react'
import { BookbaseURL } from '../../axiosinstance'
import { useEffect } from 'react';
const Home = () => {
  const [formData, setFormData] = useState({
    BookName: '',
    BookTitle: '',
    Author: '',
    SellingPrice: '',
    PublishDate: ''
  });
  const [booklist, setBooklist] = useState([]);

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
     const response = await BookbaseURL.post('/addbook', formData);
      console.log('Response:', response.data);
      
      // Reset form after successful submission
      setFormData({
        BookName: '',
        BookTitle: '',
        Author: '',
        SellingPrice: '',
        PublishDate: ''
      });
      
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding book. Please try again.');
    }
  };

  console.log("bookform", formData)


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Add New Book</h2>
          <p className="mt-2 text-sm text-gray-600">Fill in the book details below</p>
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

        
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
            >
              Submit
            </button>
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
