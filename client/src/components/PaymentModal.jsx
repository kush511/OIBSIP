import axios from 'axios';
import { useState } from 'react';

const PaymentModal = ({ showPaymentModal, setShowPaymentModal, selectedOrder, onPaymentSuccess }) => {
  const [processing, setProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const handlePayment = async () => {
    if (!selectedOrder) return;

    setProcessing(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/process`,
        { orderId: selectedOrder._id },
        { headers: { token } }
      );

      if (response.data.success) {
        setPaymentResult('success');
        setTimeout(() => {
          onPaymentSuccess();
        }, 2000);
      } else {
        setPaymentResult('failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentResult('failed');
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    setShowPaymentModal(false);
    setPaymentResult(null);
  };

  if (!showPaymentModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">💳 Payment</h2>
        
        {selectedOrder && (
          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>
              <p className="text-sm text-gray-600">Order #{selectedOrder._id.slice(-6)}</p>
              <p className="text-lg font-bold text-green-600 mt-2">₹{selectedOrder.totalPrice}</p>
            </div>
          </div>
        )}

        {paymentResult === 'success' && (
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Payment Successful!</h3>
            <p className="text-gray-600">Your order is now being prepared.</p>
          </div>
        )}

        {paymentResult === 'failed' && (
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Payment Failed</h3>
            <p className="text-gray-600">Please try again.</p>
          </div>
        )}

        {!paymentResult && (
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🍕</div>
            <p className="text-gray-600">This is a payment simulation. Click "Pay Now" to proceed.</p>
          </div>
        )}

        <div className="flex gap-4">
          {!paymentResult && (
            <>
              <button
                onClick={handleClose}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={processing}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50 cursor-pointer"
              >
                {processing ? 'Processing...' : 'Pay Now'}
              </button>
            </>
          )}
          
          {paymentResult && (
            <button
              onClick={handleClose}
              className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
