import React, { useState } from 'react'

const Home = () => {
  const [formData, setFormData] = useState({
    bookName: '',
    bookTitle: '',
    author: '',
    sellingPrice: '',
    publishDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    
  };

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
                name="bookName"
                value={formData.bookName}
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
                name="bookTitle"
                value={formData.bookTitle}
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
                name="author"
                value={formData.author}
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
                name="sellingPrice"
                value={formData.sellingPrice}
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
                name="publishDate"
                value={formData.publishDate}
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
                    <tr className='hover:bg-gray-200'>
                        <td className='px-6 py-3 whitespace-nowrap'>Name</td>
                         <td className='px-6 py-3 whitespace-nowrap'>Name</td>
                          <td className='px-6 py-3 whitespace-nowrap'>Name</td>
                           <td className='px-6 py-3 whitespace-nowrap'>Name</td>
                            <td className='px-6 py-3 whitespace-nowrap'>Name</td>
                    </tr>
                </tbody>
            </table>

        </div>

      </div>
    </div>
  )
}

export default Home
