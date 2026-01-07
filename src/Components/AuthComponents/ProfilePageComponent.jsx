import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

// Icons
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiShoppingBag,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdCheckCircle, MdErrorOutline } from "react-icons/md";

const ProfilePageComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [editData, setEditData] = useState({ ...profileData });

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  
  // Get user from Redux store
  const currentUser = useSelector((state) => state.product?.user);

  // Mock data for orders
  const recentOrders = [
    {
      id: "ORD-2024-001",
      date: "Jan 5, 2024",
      status: "Delivered",
      total: 299.99,
      items: 3,
    },
    {
      id: "ORD-2024-002",
      date: "Jan 3, 2024",
      status: "In Transit",
      total: 149.99,
      items: 2,
    },
    {
      id: "ORD-2024-003",
      date: "Dec 28, 2023",
      status: "Processing",
      total: 89.99,
      items: 1,
    },
  ];

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        
        if (!user) {
          navigate('/login');
          return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const data = {
            name: userData.name || user.displayName || "",
            email: userData.email || user.email || "",
            phone: userData.phone || "",
            address: userData.address || "",
            city: userData.city || "",
            state: userData.state || "",
            zipCode: userData.zipCode || "",
            country: userData.country || "",
          };
          setProfileData(data);
          setEditData(data);
        } else {
          // If document doesn't exist, create it with basic info
          const basicData = {
            name: user.displayName || "",
            email: user.email || "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          };
          setProfileData(basicData);
          setEditData(basicData);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth, db, navigate]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({ ...profileData });
    }
    setIsEditing(!isEditing);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const user = auth.currentUser;
      
      if (!user) {
        setErrorMessage("You must be logged in to update profile");
        setSaving(false);
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      
      // Update Firestore document
      await updateDoc(userDocRef, {
        name: editData.name,
        phone: editData.phone,
        address: editData.address,
        city: editData.city,
        state: editData.state,
        zipCode: editData.zipCode,
        country: editData.country,
        updatedAt: new Date().toISOString()
      });

      setProfileData({ ...editData });
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "In Transit":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-[112px] pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-[112px] pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Account
          </h1>
          <p className="text-gray-600">
            Manage your profile and view your activity
          </p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <MdCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
            <p className="text-green-800 text-sm">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <MdErrorOutline className="text-red-600 text-xl flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{errorMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-[130px]">
              {/* Profile Picture Section */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg overflow-hidden">
                    {auth.currentUser?.photoURL ? (
                      <img 
                        src={auth.currentUser.photoURL} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="text-4xl text-blue-600" />
                    )}
                  </div>
                  <button className="absolute bottom-2 right-0 bg-white text-blue-600 p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                    <FiCamera className="text-sm" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {profileData.name || "User"}
                </h3>
                <p className="text-sm text-blue-100">{profileData.email}</p>
              </div>

              {/* Navigation Menu */}
              <nav className="p-4">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                    activeTab === "profile"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FiUser className="text-lg" />
                  <span className="font-medium">Profile Info</span>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                    activeTab === "orders"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FiShoppingBag className="text-lg" />
                  <span className="font-medium">My Orders</span>
                </button>

                <Link
                  to="/wishList"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <FiHeart className="text-lg" />
                  <span className="font-medium">Wishlist</span>
                </Link>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                    activeTab === "settings"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FiSettings className="text-lg" />
                  <span className="font-medium">Settings</span>
                </button>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                  >
                    <FiLogOut className="text-lg" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Profile Info Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Profile Information
                    </h2>
                    <p className="text-sm text-blue-100">
                      Update your personal details
                    </p>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                      <FiEdit2 />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                          saving 
                            ? 'bg-gray-400 text-white cursor-not-allowed' 
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        <FiSave />
                        <span className="hidden sm:inline">
                          {saving ? 'Saving...' : 'Save'}
                        </span>
                      </button>
                      <button
                        onClick={handleEditToggle}
                        disabled={saving}
                        className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-50 transition-all disabled:opacity-50"
                      >
                        <FiX />
                        <span className="hidden sm:inline">Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Form Content */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FiUser className="text-blue-600" />
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-medium">
                          {profileData.name || "Not set"}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FiMail className="text-blue-600" />
                        Email Address
                      </label>
                      <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-medium">
                        {profileData.email}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FiPhone className="text-blue-600" />
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editData.phone}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          placeholder="+1 (555) 123-4567"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-medium">
                          {profileData.phone || "Not set"}
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FiMapPin className="text-blue-600" />
                        Street Address
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={editData.address}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          placeholder="123 Main Street"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-medium">
                          {profileData.address || "Not set"}
                        </div>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <IoLocationOutline className="text-blue-600" />
                        City
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={editData.city}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          placeholder="New York"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-medium">
                          {profileData.city || "Not set"}
                        </div>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        State
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="state"
                          value={editData.state}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          placeholder="NY"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-medium">
                          {profileData.state || "Not set"}
                        </div>
                      )}
                    </div>

                    {/* Zip Code */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Zip Code
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="zipCode"
                          value={editData.zipCode}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          placeholder="10001"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-medium">
                          {profileData.zipCode || "Not set"}
                        </div>
                      )}
                    </div>

                    {/* Country */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Country
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={editData.country}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          placeholder="United States"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-medium">
                          {profileData.country || "Not set"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <FiShoppingBag className="text-2xl text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <h3 className="text-2xl font-bold text-gray-900">24</h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <BsHandbag className="text-2xl text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Delivered</p>
                        <h3 className="text-2xl font-bold text-gray-900">18</h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <FiHeart className="text-2xl text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Spent</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          $2.4k
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Recent Orders
                    </h2>
                    <p className="text-sm text-blue-100">
                      Track your order history
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {order.id}
                                </h3>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <FiShoppingBag className="text-blue-600" />
                                  {order.items} items
                                </span>
                                <span>•</span>
                                <span>{order.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                              <div className="text-right">
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="text-2xl font-bold text-blue-600">
                                  ${order.total}
                                </p>
                              </div>
                              <button className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                                View Details
                                <FiChevronRight />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-6 border-2 border-blue-600 text-blue-600 rounded-full py-3 font-semibold hover:bg-blue-50 transition-all">
                      View All Orders
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    Account Settings
                  </h2>
                  <p className="text-sm text-blue-100">
                    Manage your account preferences
                  </p>
                </div>

                <div className="p-6 md:p-8">
                  <div className="space-y-6">
                    {/* Password Section */}
                    <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-1">
                            Password
                          </h3>
                          <p className="text-sm text-gray-600">
                            Change your password regularly for security
                          </p>
                        </div>
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all">
                          Change
                        </button>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-all">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">
                        Notifications
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              Email Notifications
                            </p>
                            <p className="text-sm text-gray-600">
                              Receive order updates via email
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              SMS Notifications
                            </p>
                            <p className="text-sm text-gray-600">
                              Get text messages for deliveries
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Privacy */}
                    <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-all">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">
                        Privacy & Security
                      </h3>
                      <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-all">
                          Two-Factor Authentication
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-all">
                          Connected Devices
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-all">
                          Download My Data
                        </button>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50">
                      <h3 className="font-bold text-red-900 text-lg mb-4">
                        Danger Zone
                      </h3>
                      <button className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-all">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponent;