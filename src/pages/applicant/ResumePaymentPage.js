import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  StarIcon,
  UserIcon,
  BuildingOfficeIcon,
  XMarkIcon,
  CheckCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import BackButton from '../../components/common/BackButton';

const userProfile = {
  name: 'Rahul Sharma',
  avatar: 'RS',
};

const banks = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'IDFC FIRST Bank',
];

const wallets = [
  'Paytm',
  'PhonePe',
  'Google Pay',
  'Amazon Pay',
];

const ResumePaymentPage = () => {
  const [method, setMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [upiStatus, setUpiStatus] = useState('');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [bank, setBank] = useState('');
  const [wallet, setWallet] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!method) newErrors.method = 'Please select a payment method.';
    if (method === 'upi') {
      if (!upiId.trim()) newErrors.upiId = 'UPI ID is required.';
      else if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) newErrors.upiId = 'Invalid UPI ID.';
    }
    if (method === 'card') {
      if (!card.number.trim()) newErrors.cardNumber = 'Card number is required.';
      else if (!/^\d{16}$/.test(card.number.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits.';
      if (!card.name.trim()) newErrors.cardName = 'Card holder name is required.';
      if (!card.expiry.trim()) newErrors.cardExpiry = 'Expiry date is required.';
      else if (!/^\d{2}\/\d{2}$/.test(card.expiry)) newErrors.cardExpiry = 'Invalid expiry (MM/YY).';
      if (!card.cvv.trim()) newErrors.cardCvv = 'CVV is required.';
      else if (!/^\d{3,4}$/.test(card.cvv)) newErrors.cardCvv = 'Invalid CVV.';
    }
    if (method === 'netbanking') {
      if (!bank) newErrors.bank = 'Please select a bank.';
    }
    if (method === 'wallet') {
      if (!wallet) newErrors.wallet = 'Please select a wallet.';
    }
    return newErrors;
  };

  // Simulate payment
  const handlePay = e => {
    e.preventDefault();
    setGeneralError('');
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate payment success
      navigate('/applicant/resume/confirmation');
    }, 2000);
  };

  // Simulate UPI verify
  const handleVerifyUpi = () => {
    setUpiStatus('loading');
    setTimeout(() => {
      if (upiId.endsWith('@okicici') || upiId.endsWith('@oksbi')) {
        setUpiStatus('success');
      } else {
        setUpiStatus('error');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-primary-600 rounded-full p-2 mr-2">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="font-bold text-lg text-primary-700">VishwasJobPortal</span>
          </div>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link to="/applicant" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <UserIcon className="h-5 w-5 mr-3" /> My Overview
          </Link>
          <Link to="/applicant/jobs" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <BriefcaseIcon className="h-5 w-5 mr-3" /> Search Jobs
          </Link>
          <Link to="/applicant/applications" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <DocumentTextIcon className="h-5 w-5 mr-3" /> My Applications
          </Link>
          <Link to="/applicant/saved" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <StarIcon className="h-5 w-5 mr-3" /> Saved Jobs
          </Link>
          <Link to="/applicant/interviews" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <CalendarIcon className="h-5 w-5 mr-3" /> My Interviews
          </Link>
          <Link to="/applicant/profile" className="flex items-center px-4 py-2 rounded-lg font-medium text-primary-700 bg-primary-100">
            <BuildingOfficeIcon className="h-5 w-5 mr-3" /> My Profile
          </Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 px-8 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <BackButton className="mr-4" />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">Applicant</span>
            <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center font-bold text-primary-700">{userProfile.avatar}</div>
          </div>
        </div>
        {/* Page Title & Breadcrumbs */}
        <div className="max-w-xl mx-auto px-4 py-8 w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h1>
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link to="/applicant/profile" className="text-gray-500 hover:text-gray-700">My Profile</Link>
              </li>
              <li>
                <span className="text-gray-400">&gt;</span>
                <span className="ml-2 text-gray-900">Create Resume with AI</span>
              </li>
              <li>
                <span className="text-gray-400">&gt;</span>
                <span className="ml-2 text-gray-900">Complete Payment</span>
              </li>
            </ol>
          </nav>
        </div>
        {/* General Error Banner */}
        {generalError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between max-w-xl mx-auto">
            <div className="flex items-center">
              <XMarkIcon className="h-5 w-5 text-red-400" />
              <span className="ml-3 text-red-700 font-medium">{generalError}</span>
            </div>
            <button onClick={() => setGeneralError('')} className="text-red-700 hover:text-red-900"><XMarkIcon className="h-5 w-5" /></button>
          </div>
        )}
        {/* Payment Form */}
        <form onSubmit={handlePay} className="max-w-xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8 mb-24">
          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">AI Resume Generation</span>
              <span className="font-bold text-xl text-primary-700">₹50.00</span>
            </div>
          </div>
          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
            <div className="space-y-4">
              {/* UPI */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="method" value="upi" checked={method === 'upi'} onChange={() => setMethod('upi')} />
                <span>UPI</span>
              </label>
              {method === 'upi' && (
                <div className="ml-6 mt-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enter UPI ID</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => { setUpiId(e.target.value); setUpiStatus(''); }}
                      placeholder="e.g., yourname@bankname"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.upiId ? 'border-red-300' : 'border-gray-300'}`}
                    />
                    <button type="button" onClick={handleVerifyUpi} className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700" disabled={!upiId || upiStatus === 'loading'}>
                      {upiStatus === 'loading' ? 'Verifying...' : 'Verify UPI ID'}
                    </button>
                  </div>
                  {upiStatus === 'success' && <span className="text-green-600 text-sm">UPI ID verified!</span>}
                  {upiStatus === 'error' && <span className="text-red-600 text-sm">Invalid UPI ID.</span>}
                  {errors.upiId && <span className="text-red-600 text-sm">{errors.upiId}</span>}
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Or scan QR code to pay:</span>
                    <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center mt-1">QR Code</div>
                  </div>
                </div>
              )}
              {/* Card */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="method" value="card" checked={method === 'card'} onChange={() => setMethod('card')} />
                <span>Credit/Debit Card</span>
              </label>
              {method === 'card' && (
                <div className="ml-6 mt-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={card.number}
                    onChange={e => setCard(prev => ({ ...prev, number: e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim() }))}
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  {errors.cardNumber && <span className="text-red-600 text-sm">{errors.cardNumber}</span>}
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                  <input
                    type="text"
                    value={card.name}
                    onChange={e => setCard(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="As on card"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.cardName ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  {errors.cardName && <span className="text-red-600 text-sm">{errors.cardName}</span>}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={card.expiry}
                        onChange={e => setCard(prev => ({ ...prev, expiry: e.target.value }))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.cardExpiry ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {errors.cardExpiry && <span className="text-red-600 text-sm">{errors.cardExpiry}</span>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV/CVC <span className="text-xs text-gray-400 ml-1">(3 or 4 digits)</span></label>
                      <input
                        type="password"
                        value={card.cvv}
                        onChange={e => setCard(prev => ({ ...prev, cvv: e.target.value.replace(/[^\d]/g, '') }))}
                        maxLength={4}
                        placeholder="CVV"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.cardCvv ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      {errors.cardCvv && <span className="text-red-600 text-sm">{errors.cardCvv}</span>}
                    </div>
                  </div>
                </div>
              )}
              {/* Net Banking */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="method" value="netbanking" checked={method === 'netbanking'} onChange={() => setMethod('netbanking')} />
                <span>Net Banking</span>
              </label>
              {method === 'netbanking' && (
                <div className="ml-6 mt-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                  <select value={bank} onChange={e => setBank(e.target.value)} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.bank ? 'border-red-300' : 'border-gray-300'}`}>
                    <option value="">-- Select Bank --</option>
                    {banks.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {errors.bank && <span className="text-red-600 text-sm">{errors.bank}</span>}
                  <button type="button" className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 mt-2">Proceed to Bank</button>
                </div>
              )}
              {/* Wallets */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="method" value="wallet" checked={method === 'wallet'} onChange={() => setMethod('wallet')} />
                <span>Wallets</span>
              </label>
              {method === 'wallet' && (
                <div className="ml-6 mt-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Wallet</label>
                  <div className="flex flex-wrap gap-4">
                    {wallets.map(w => (
                      <label key={w} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="walletOption" value={w} checked={wallet === w} onChange={() => setWallet(w)} />
                        <span>{w}</span>
                      </label>
                    ))}
                  </div>
                  {errors.wallet && <span className="text-red-600 text-sm">{errors.wallet}</span>}
                  <button type="button" className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 mt-2">Proceed with {wallet || 'Wallet'}</button>
                </div>
              )}
              {errors.method && <span className="text-red-600 text-sm">{errors.method}</span>}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel Payment
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
          {/* Security Message */}
          <div className="mt-8 text-xs text-gray-500 text-center">
            Your payment is secured by SSL encryption.
          </div>
        </form>
      </main>
    </div>
  );
};

export default ResumePaymentPage; 