
import React, { useState } from 'react';
import { ArrowLeft, Plus, Upload, Mic, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { VoiceInput } from '../components/VoiceInput';
import GoogleTranslate from '../components/GoogleTranslate';

const Dashboard = () => {
  const navigate = useNavigate();
  const { orders, language, showToast } = useApp();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    tags: [] as string[],
    images: [] as File[]
  });
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const texts = {
    en: {
      title: "Seller Dashboard",
      greeting: "Welcome back, Seller!",
      addProduct: "Add New Product",
      totalSales: "Total Sales",
      pendingOrders: "Pending Orders",
      recentOrders: "Recent Orders",
      productName: "Product Name",
      price: "Price",
      description: "Description",
      category: "Category",
      tags: "Tags",
      images: "Images",
      save: "Save Product",
      cancel: "Cancel",
      customer: "Customer",
      product: "Product",
      quantity: "Quantity",
      total: "Total",
      status: "Status",
      date: "Date",
      actions: "Actions"
    },
    ta: {
      title: "விற்பனையாளர் டாஷ்போர்டு",
      greeting: "மீண்டும் வரவேற்கிறோம், விற்பனையாளர்!",
      addProduct: "புதிய தயாரிப்பு சேர்க்கவும்",
      totalSales: "மொத்த விற்பனை",
      pendingOrders: "நிலுவையில் உள்ள ஆர்டர்கள்",
      recentOrders: "சமீபத்திய ஆர்டர்கள்",
      productName: "தயாரிப்பு பெயர்",
      price: "விலை",
      description: "விளக்கம்",
      category: "வகை",
      tags: "குறிச்சொற்கள்",
      images: "படங்கள்",
      save: "தயாரிப்பு சேமிக்க",
      cancel: "ரத்து செய்",
      customer: "வாடிக்கையாளர்",
      product: "தயாரிப்பு",
      quantity: "அளவு",
      total: "மொத்தம்",
      status: "நிலை",
      date: "தேதி",
      actions: "செயல்கள்"
    },
    hi: {
      title: "विक्रेता डैशबोर्ड",
      greeting: "वापस आपका स्वागत है, विक्रेता!",
      addProduct: "नया उत्पाद जोड़ें",
      totalSales: "कुल बिक्री",
      pendingOrders: "लंबित ऑर्डर",
      recentOrders: "हाल के ऑर्डर",
      productName: "उत्पाद का नाम",
      price: "मूल्य",
      description: "विवरण",
      category: "श्रेणी",
      tags: "टैग",
      images: "चित्र",
      save: "उत्पाद सहेजें",
      cancel: "रद्द करें",
      customer: "ग्राहक",
      product: "उत्पाद",
      quantity: "मात्रा",
      total: "कुल",
      status: "स्थिति",
      date: "दिनांक",
      actions: "कार्य"
    }
  };

  const currentText = texts[language];

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'name') return a.customerName.localeCompare(b.customerName);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleVoiceDescription = (transcript: string) => {
    setProductForm(prev => ({ ...prev, description: transcript }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setProductForm(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.description) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    showToast('Product added successfully!', 'success');
    setIsAddProductOpen(false);
    setProductForm({
      name: '',
      price: '',
      description: '',
      category: '',
      tags: [],
      images: []
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-30 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-primary">{currentText.title}</h1>
            <GoogleTranslate />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">{currentText.greeting}</h2>
          <p className="text-gray-600">Manage your products and orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{currentText.totalSales}</h3>
            <p className="text-3xl font-bold text-primary">₹{totalSales.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{currentText.pendingOrders}</h3>
            <p className="text-3xl font-bold text-accent">{pendingOrders}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Products Listed</h3>
            <p className="text-3xl font-bold text-green-600">12</p>
          </div>
        </div>

        {/* Add Product Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            {currentText.addProduct}
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">{currentText.recentOrders}</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'status')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentText.customer}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentText.product}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentText.quantity}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentText.total}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentText.status}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentText.date}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentText.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.date.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, orders.length)} of {orders.length} orders
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">{currentText.addProduct}</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{currentText.productName}</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{currentText.price}</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{currentText.description}</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent h-24 resize-none"
                  placeholder="Enter product description"
                />
                <div className="mt-2">
                  <VoiceInput 
                    onTranscript={handleVoiceDescription}
                    placeholder="Or use voice to describe your product"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{currentText.category}</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  <option value="">Select category</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="handicrafts">Handicrafts</option>
                  <option value="food">Food</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{currentText.images}</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload images</span>
                  </label>
                  {productForm.images.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {productForm.images.map((file, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-4">
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {currentText.cancel}
              </button>
              <button
                onClick={handleSaveProduct}
                className="px-6 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors"
              >
                {currentText.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
