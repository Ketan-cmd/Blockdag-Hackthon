import React, { useState } from 'react';
import { CreditCard, Wallet, ArrowRight, Shield, Clock } from 'lucide-react';

interface PaymentGatewayProps {
  project: any;
  onPayment: (paymentMethod: string) => void;
  isProcessing: boolean;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  project,
  onPayment,
  isProcessing,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('metamask');

  const paymentMethods = [
    {
      id: 'metamask',
      name: 'MetaMask Wallet',
      icon: Wallet,
      description: 'Pay directly from your MetaMask wallet',
      recommended: true,
    },
    {
      id: 'stripe',
      name: 'Credit Card',
      icon: CreditCard,
      description: 'Pay with credit/debit card via Stripe',
      recommended: false,
    },
  ];

  const handlePayment = () => {
    if (selectedMethod === 'stripe') {
      // Redirect to Stripe payment page
      window.open('https://buy.stripe.com/test_payment_link', '_blank');
    } else {
      onPayment(selectedMethod);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Release Payment</h2>
          <p className="text-white/70">
            Release {project.price} ETH to the freelancer
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              {method.recommended && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
                  Recommended
                </div>
              )}
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedMethod === method.id ? 'bg-blue-500' : 'bg-white/10'
                }`}>
                  <method.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{method.name}</h3>
                  <p className="text-white/60 text-sm">{method.description}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-white/30'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2 text-white/70 mb-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Payment Details</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white">
              <span>Project Amount:</span>
              <span>{project.price} ETH</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Platform Fee:</span>
              <span>0.00 ETH</span>
            </div>
            <div className="border-t border-white/20 pt-2 flex justify-between text-white font-medium">
              <span>Total:</span>
              <span>{project.price} ETH</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-white/60 text-xs mb-6">
          <Clock className="w-4 h-4" />
          <span>Payment will be processed immediately and sent to the freelancer's wallet</span>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-white/10 text-white py-3 px-4 rounded-xl font-medium hover:bg-white/20 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Release Payment</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};