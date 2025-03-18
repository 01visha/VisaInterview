import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { X, Search, ChevronUp, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

const SubscriptionHistoryModal = ({ show, handleClose }) => {
  const navigate = useNavigate()
  const [subscriptions, setSubscriptions] = useState([])
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: "purchase_date", direction: "desc" })
  const [searchTerm, setSearchTerm] = useState("")
  const [paymentStatus, setPaymentStatus] = useState(false)
  useEffect(() => {
    if (show) {
      fetchSubscriptionHistory()
    }
  }, [show])

  const fetchSubscriptionHistory = async () => {
    setIsLoading(true)
    try {
      const authCode = localStorage.getItem("auth_code")
      if (!authCode) {
        toast.error("Authentication code not found. Please login again.")
        handleClose()
        return
      }

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/subscription_history`, {
        headers: { Authorization: `Bearer ${authCode}` },
      })

      const sortedData =
        response.data.data?.data.sort((a, b) => new Date(b.purchase_date) - new Date(a.purchase_date)) || []
      setSubscriptions(sortedData)
    } catch (error) {
      console.error("Error fetching subscription history:", error)
      toast.error(error.response?.data?.message || "Failed to fetch subscription history.")
    } finally {
      setIsLoading(false)
    }
  }
  const handlePayNow = async (
    price,
    subscriptionId,
    interviewId,
    description,
    trialSubscriptionId,
    orderIdFromHistory,
  ) => {
    try {
      if (!window.Razorpay) {
        toast.error("Payment gateway is not ready. Please try again.")
        return
      }

      const authCode = localStorage.getItem("auth_code")
      if (!authCode) {
        toast.error("Authentication code not found. Please login again.")
        return
      }

      const options = {
        key: "rzp_test_mPWcOUk1gXlKUZ", // Replace with your live key for production
        amount: price * 100, // Razorpay accepts amount in paise, so multiplying by 100
        currency: "INR",
        name: "Crack Visa",
        description: `Payment for ${description} package`,
        handler: async (response) => {
          try {
           // console.log("Payment successful:", response.razorpay_payment_id)

            // Step 1: Payload for updating subscription status
            const updateStatusPayload = {
              subscription_id: subscriptionId,
              order_id: orderIdFromHistory,
              pg_response: {
                status: "Active",
                transaction_id: response.razorpay_payment_id,
                payment_gateway: "Razorpay",
              },
            }

           // console.log("Update Status Payload:", updateStatusPayload)

            // Step 2: API call to update subscription status
            const updateStatusResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/update-subscription-status`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authCode}`,
              },
              body: JSON.stringify(updateStatusPayload),
            })

            if (!updateStatusResponse.ok) {
              throw new Error(
                `Update Status Error: ${updateStatusResponse.status} - ${updateStatusResponse.statusText}`,
              )
            }

            const updateStatusResult = await updateStatusResponse.json()
            //console.log("Subscription status updated successfully:", updateStatusResult)

            // Final success message and redirect to dashboard
            toast.success("Payment successful! Subscription activated.")
            navigate("/dashboard") // Redirect to the dashboard
          } catch (error) {
            console.error("Error during payment process:", error.message)
            toast.error("Failed to process payment. Please try again.")
          }
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
          contact: user?.contact || "9999999999",
        },
        theme: {
          color: "#528FF0",
        },
        modal: {
          ondismiss: () => {
           // console.log("Razorpay gateway was closed by the user.")
            toast.error("Payment process was not completed.")
          },
        },
      }

      const razorpayInstance = new window.Razorpay(options)
      razorpayInstance.open()
    } catch (error) {
      console.error("Error during payment initialization:", error.message)
      toast.error("Failed to initiate payment. Please try again.")
    }
  }

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const sortedSubscriptions = React.useMemo(() => {
    const sortableItems = [...subscriptions]
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [subscriptions, sortConfig])

  const filteredSubscriptions = sortedSubscriptions.filter((subscription) =>
    Object.values(subscription).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const SortIcon = ({ column }) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
    }
    return null
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-100 to-gray-200 z-50 flex items-center justify-center">
      <div className="w-screen h-screen bg-white shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b bg-gray-100">
          <h2 className="text-3xl font-bold mt-8">Subscription History</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 mt-8">
            <X className="h-8 w-8" />
          </button>
        </div>

        <div className="flex items-center space-x-2 p-4 bg-gray-50 border-b">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="p-4 md:p-6 overflow-y-auto h-[calc(100%-8rem)]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredSubscriptions.length > 0 ? (
            <>
              {/* Table View for Desktop */}
              <div className="hidden md:block">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-blue-100">
                    <tr>
                      {[
                        "Order ID",
                        "Name",
                        "Status",
                        "Purchase Date",
                        "Expiry Date",
                        "Auto Renew",
                        "Remaining Tests",
                        "Pay Now",
                      ].map((header, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort(header.toLowerCase().replace(" ", "_"))}
                        >
                          <div className="flex items-center">
                            {header}
                            <SortIcon column={header.toLowerCase().replace(" ", "_")} />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubscriptions.map((subscription) => (
                      <tr key={subscription.order_id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {subscription.order_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscription.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              subscription.status,
                            )}`}
                          >
                            {subscription.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(subscription.purchase_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(subscription.expiry_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              subscription.is_auto_renew ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {subscription.is_auto_renew ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {subscription.remaining_tests}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {subscription.status === "In Progress - Payment Due" ? (
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                              onClick={() =>
                                handlePayNow(
                                  subscription.price,
                                  subscription.subscription_id,
                                  subscription.interview_id,
                                  subscription.name,
                                  subscription.trial_subscription_id,
                                  subscription.order_id,
                                )
                              }
                            >
                              Pay Now
                            </button>
                          ) : (
                            <button
                              className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 
             appearance-none hover:bg-gray-600"
                              disabled
                              >
                              Pay Now
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card View for Mobile */}
              <div className="block md:hidden space-y-6 pb-6">
                {filteredSubscriptions.map((subscription) => (
                  <div
                    key={subscription.subscription_id}
                    className="border rounded-lg p-6 shadow-sm bg-white space-y-5"
                  >
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold text-gray-700">Order ID: {subscription.order_id}</p>
                      <p
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}
                      >
                        {subscription.status}
                      </p>
                    </div>
                    <div className="text-gray-500 space-y-2 ">
                      <p className="text-sm">
                        {" "}
                        <span className="text-bold">Name: </span>
                        {subscription.name}
                      </p>
                      <p className="text-sm">
                        {" "}
                        <span className="text-bold">Purchase Date: </span> {formatDate(subscription.purchase_date)}
                      </p>
                      <p className="text-sm">
                        {" "}
                        <span className="text-bold">Expiry Date: </span> {formatDate(subscription.expiry_date)}
                      </p>
                      <p className="text-sm">
                        {" "}
                        <span className="text-bold">Auto Renew: </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-custom ${
                            subscription.is_auto_renew ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {subscription.is_auto_renew ? "Yes" : "No"}
                        </span>
                      </p>
                      <p className="text-sm">
                        {" "}
                        <span className="text-bold">Remaining Tests:</span> {subscription.remaining_tests}
                      </p>
                      {subscription.status === "In Progress - Payment Due" && (
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          onClick={() =>
                            handlePayNow(
                              subscription.price,
                              subscription.subscription_id,
                              subscription.interview_id,
                              subscription.name,
                              subscription.trial_subscription_id,
                              subscription.order_id,
                            )
                          }
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No subscription history found.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SubscriptionHistoryModal

