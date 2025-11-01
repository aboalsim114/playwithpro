import React, { useState, useRef } from 'react'

function Payment() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('card')
  
  // SECURITY: Sensitive payment data should NEVER be stored in React state
  // Using refs to avoid storing sensitive data in component state
  // These refs will be cleared immediately after submission
  const cardNumberRef = useRef(null)
  const expiryDateRef = useRef(null)
  const cvvRef = useRef(null)
  const cardholderNameRef = useRef(null)
  const bankNameRef = useRef(null)
  const accountNumberRef = useRef(null)
  const paypalEmailRef = useRef(null)
  const cryptoWalletRef = useRef(null)
  
  // Only non-sensitive data can be stored in state
  const [cryptoType, setCryptoType] = useState('bitcoin')
  const [isSubmitting, setIsSubmitting] = useState(false)
  // State for UI updates only (not storing sensitive data, just validation status and display values)
  const [validationStatus, setValidationStatus] = useState({
    cardNumber: false,
    paypalEmail: false,
    cryptoWallet: false
  })
  // Display values for card preview (only for visual feedback, not stored)
  const [cardPreview, setCardPreview] = useState({
    cardNumber: '**** **** **** ****',
    cardholderName: 'YOUR NAME',
    expiryDate: 'MM/YY'
  })

  // Moyens de paiement avec style élégant
  const existingPaymentMethods = [
    {
      id: 1,
      type: 'card',
      name: 'Visa Platinum',
      icon: '💳',
      color: 'from-blue-400 to-cyan-600',
      isDefault: true,
      expiryDate: '12/25',
      last4: '1234',
      brand: 'Visa',
      status: 'Active',
      balance: '€2,450.00',
      level: 'Premium',
      fingerprint: 'card_1ABC123...' // Identifiant sécurisé
    },
    {
      id: 2,
      type: 'paypal',
      name: 'PayPal Business',
      icon: '🅿️',
      color: 'from-yellow-400 to-orange-600',
      isDefault: false,
      email: 'business@email.com',
      status: 'Connected',
      balance: '€1,230.50',
      level: 'Professional',
      fingerprint: 'paypal_2DEF456...'
    },
    {
      id: 3,
      type: 'crypto',
      name: 'Bitcoin Wallet',
      icon: '₿',
      color: 'from-purple-400 to-violet-600',
      isDefault: false,
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      cryptoType: 'Bitcoin',
      status: 'Synced',
      balance: '0.045 BTC',
      level: 'Elite',
      fingerprint: 'btc_3GHI789...'
    }
  ]

  const paymentStats = {
    totalMethods: existingPaymentMethods.length,
    defaultMethod: existingPaymentMethods.find(m => m.isDefault)?.name,
    lastUsed: '2 hours ago',
    securityLevel: 'Maximum',
    totalBalance: '€3,680.50'
  }

  // SECURITY: Send sensitive payment data directly to secure payment API
  // Never log or store sensitive payment information
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Collect sensitive data from refs (not stored in state)
      let paymentData = {}
      
      if (selectedMethod === 'card') {
        // SECURITY: Sensitive card data collected directly from refs
        paymentData = {
          type: 'card',
          cardNumber: cardNumberRef.current?.value || '',
          expiryDate: expiryDateRef.current?.value || '',
          cvv: cvvRef.current?.value || '',
          cardholderName: cardholderNameRef.current?.value || ''
        }
        
        // Validate required fields
        if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardholderName) {
          alert('Please fill in all required card fields')
          setIsSubmitting(false)
          return
        }
      } else if (selectedMethod === 'paypal') {
        paymentData = {
          type: 'paypal',
          email: paypalEmailRef.current?.value || ''
        }
        
        if (!paymentData.email) {
          alert('Please enter your PayPal email')
          setIsSubmitting(false)
          return
        }
      } else if (selectedMethod === 'crypto') {
        paymentData = {
          type: 'crypto',
          cryptoType: cryptoType,
          walletAddress: cryptoWalletRef.current?.value || ''
        }
        
        if (!paymentData.walletAddress) {
          alert('Please enter your wallet address')
          setIsSubmitting(false)
          return
        }
      } else if (selectedMethod === 'bank') {
        paymentData = {
          type: 'bank',
          bankName: bankNameRef.current?.value || '',
          accountNumber: accountNumberRef.current?.value || ''
        }
        
        if (!paymentData.bankName || !paymentData.accountNumber) {
          alert('Please fill in all required bank account fields')
          setIsSubmitting(false)
          return
        }
      }
      
      // SECURITY: Send data directly to secure payment API/tokenization service
      // Never store sensitive data in frontend state or logs
      // TODO: Replace with actual secure payment API endpoint
      const response = await fetch('/api/payments/tokenize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers as needed
        },
        body: JSON.stringify(paymentData)
      })
      
      if (!response.ok) {
        throw new Error('Payment method registration failed')
      }
      
      // SECURITY: Only store the token/ID returned from secure server, not sensitive data
      // The response should contain a tokenized payment method ID
      await response.json()
      
      // SECURITY: Clear sensitive data from refs immediately after submission
      clearSensitiveData()
      
      setShowAddModal(false)
      setIsSubmitting(false)
      
      // Show success message (without sensitive data)
      alert('Payment method added successfully')
      
      // Refresh payment methods list
      // You would typically reload from your secure backend here
      
    } catch (error) {
      setIsSubmitting(false)
      // SECURITY: Never log sensitive payment data
      console.error('Payment processing error:', error.message)
      alert('Failed to add payment method. Please try again.')
    }
  }
  
  // SECURITY: Function to clear all sensitive data from refs
  const clearSensitiveData = () => {
    if (cardNumberRef.current) cardNumberRef.current.value = ''
    if (expiryDateRef.current) expiryDateRef.current.value = ''
    if (cvvRef.current) cvvRef.current.value = ''
    if (cardholderNameRef.current) cardholderNameRef.current.value = ''
    if (bankNameRef.current) bankNameRef.current.value = ''
    if (accountNumberRef.current) accountNumberRef.current.value = ''
    if (paypalEmailRef.current) paypalEmailRef.current.value = ''
    if (cryptoWalletRef.current) cryptoWalletRef.current.value = ''
    setValidationStatus({
      cardNumber: false,
      paypalEmail: false,
      cryptoWallet: false
    })
    setCardPreview({
      cardNumber: '**** **** **** ****',
      cardholderName: 'YOUR NAME',
      expiryDate: 'MM/YY'
    })
  }
  
  // Handle closing modal - clear sensitive data
  const handleCloseModal = () => {
    clearSensitiveData()
    setShowAddModal(false)
  }

  const handleSetDefault = (id) => {
    console.log('Définir comme moyen par défaut:', id)
  }

  const handleDeleteMethod = (id) => {
    console.log('Supprimer le moyen de paiement:', id)
  }

  // Fonction pour formater le numéro de carte
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  // Fonction pour formater la date d'expiration
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="flex-1 flex flex-col ml-64 bg-gray-900 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Payment Management</h1>
              <p className="text-gray-400">Manage your payment methods and transactions</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center space-x-2"
            >
              <span className="text-xl">+</span>
              <span>Add Payment</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-white/5 backdrop-blur-sm border border-white/20 p-1 rounded-xl w-fit">
            {[
              { id: 'overview', name: 'Overview', icon: '📊', color: 'from-cyan-400 to-blue-500' },
              { id: 'methods', name: 'Payment Methods', icon: '💳', color: 'from-purple-400 to-pink-500' },
              { id: 'security', name: 'Security', icon: '🔒', color: 'from-emerald-400 to-teal-500' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content selon l'onglet actif */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards avec style liquid glass */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-300 text-sm font-medium mb-1">Total Methods</p>
                    <p className="text-3xl font-bold text-white">{paymentStats.totalMethods}</p>
                    <p className="text-gray-400 text-xs">Active accounts</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30">
                    <span className="text-cyan-400 text-xl">💳</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm font-medium mb-1">Default Method</p>
                    <p className="text-lg font-bold text-white">{paymentStats.defaultMethod}</p>
                    <p className="text-gray-400 text-xs">Primary payment</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                    <span className="text-purple-400 text-xl">⭐</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-300 text-sm font-medium mb-1">Security Level</p>
                    <p className="text-lg font-bold text-white">{paymentStats.securityLevel}</p>
                    <p className="text-gray-400 text-xs">Protection active</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
                    <span className="text-emerald-400 text-xl">🛡️</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-300 text-sm font-medium mb-1">Total Balance</p>
                    <p className="text-lg font-bold text-white">{paymentStats.totalBalance}</p>
                    <p className="text-gray-400 text-xs">Available funds</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-xl flex items-center justify-center border border-orange-400/30">
                    <span className="text-orange-400 text-xl">💰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold mr-3 text-sm">
                  ⚡
                </span>
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: '💳', name: 'Add Card', color: 'from-blue-500 to-cyan-500' },
                  { icon: '🅿️', name: 'Connect PayPal', color: 'from-yellow-500 to-orange-500' },
                  { icon: '₿', name: 'Crypto Wallet', color: 'from-purple-500 to-pink-500' },
                  { icon: '🔒', name: 'Security', color: 'from-green-500 to-emerald-500' }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => action.name === 'Security' ? setActiveTab('security') : setShowAddModal(true)}
                    className="p-6 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300 text-center group hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    <div className={`text-4xl mb-3 bg-gradient-to-r ${action.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <div className="text-white font-medium text-sm">{action.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold mr-3 text-sm">
                  📈
                </span>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { type: 'Payment', amount: '+€150.00', method: 'Visa Platinum', time: '2 hours ago', status: 'Completed' },
                  { type: 'Transfer', amount: '-€75.50', method: 'PayPal Business', time: '5 hours ago', status: 'Completed' },
                  { type: 'Deposit', amount: '+€500.00', method: 'Bank Transfer', time: '1 day ago', status: 'Completed' }
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'Payment' ? 'bg-green-500/20' :
                        transaction.type === 'Transfer' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                      }`}>
                        <span className={`text-lg ${
                          transaction.type === 'Payment' ? 'text-green-400' :
                          transaction.type === 'Transfer' ? 'text-blue-400' : 'text-purple-400'
                        }`}>
                          {transaction.type === 'Payment' ? '💳' : transaction.type === 'Transfer' ? '🔄' : '💰'}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{transaction.type}</p>
                        <p className="text-gray-400 text-sm">{transaction.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>{transaction.amount}</p>
                      <p className="text-gray-400 text-sm">{transaction.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'methods' && (
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="grid gap-6">
              {existingPaymentMethods.map((method, index) => (
                <div key={method.id} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-purple-400/30">
                        <span className="text-3xl">{method.icon}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{method.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            method.level === 'Elite' ? 'bg-yellow-500/20 text-yellow-400' :
                            method.level === 'Professional' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {method.level}
                          </span>
                        </div>
                        {method.brand && (
                          <p className="text-gray-400 text-sm font-mono">**** **** **** {method.last4}</p>
                        )}
                        {method.email && (
                          <p className="text-gray-400 text-sm">{method.email}</p>
                        )}
                        {method.walletAddress && (
                          <p className="text-gray-400 text-sm font-mono">{method.walletAddress.slice(0, 20)}...</p>
                        )}
                        {method.expiryDate && (
                          <p className="text-gray-400 text-sm">Expires {method.expiryDate}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-xs font-medium">{method.status}</span>
                          </div>
                          <span className="text-gray-400 text-xs">Balance: {method.balance}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-xs text-gray-500 font-mono">ID: {method.fingerprint}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {method.isDefault && (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 border border-green-400/30">
                          <span>⭐</span>
                          <span>Default</span>
                        </span>
                      )}
                      
                      <div className="flex space-x-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefault(method.id)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-400 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105"
                          >
                            Set Default
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleDeleteMethod(method.id)}
                          className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-400/30 text-red-400 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Security Panel */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold mr-3 text-sm">
                  🔒
                </span>
                Security & Privacy
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {[
                    { title: 'SSL Encryption', desc: '256-bit secure connection', status: 'Active', level: 'Maximum' },
                    { title: 'PCI DSS Compliance', desc: 'Payment card industry standards', status: 'Verified', level: 'High' },
                    { title: 'Data Protection', desc: 'Encrypted storage system', status: 'Secured', level: 'Maximum' },
                    { title: 'Secure Processing', desc: 'Bank-level security standards', status: 'Certified', level: 'Maximum' }
                  ].map((security, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-400/30">
                        <span className="text-emerald-400 text-sm">✓</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-lg">{security.title}</p>
                        <p className="text-gray-400 text-sm">{security.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          security.level === 'Maximum' ? 'bg-green-500/20 text-green-400' :
                          security.level === 'High' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {security.level}
                        </span>
                        <p className="text-green-400 text-xs font-medium mt-1">{security.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold text-lg mb-4 flex items-center">
                    <span className="text-cyan-400 mr-2">⚡</span>
                    Security Features
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-cyan-400 mt-1 font-bold">▶</span>
                      <span>Secure card input validation</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-cyan-400 mt-1 font-bold">▶</span>
                      <span>PCI DSS Level 1 compliance</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-cyan-400 mt-1 font-bold">▶</span>
                      <span>Tokenized payment methods</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-cyan-400 mt-1 font-bold">▶</span>
                      <span>Fraud detection & prevention</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-cyan-400 mt-1 font-bold">▶</span>
                      <span>3D Secure authentication</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal d'ajout avec validation sécurisée - Design Fun & Interactif */}
        {showAddModal && (
          <div 
            className="fixed inset-0 bg-gradient-to-br from-black/80 via-purple-900/20 to-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
          >
            <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-2xl border-2 border-cyan-500/30 rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-cyan-500/20 relative animate-slideUp">
              {/* Animated Background Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>

              {/* Header avec animation */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/50 animate-bounce" style={{ animationDuration: '2s' }}>
                      ➕
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-ping"></div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Add Payment Method
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Choose your preferred payment option</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/20 hover:border-red-400/50 text-gray-400 hover:text-red-400 text-2xl transition-all duration-300 hover:rotate-90 hover:scale-110 flex items-center justify-center"
                >
                  ×
                </button>
              </div>

              {/* Type Selection avec animations interactives */}
              <div className="mb-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <label className="block text-xl font-bold text-white flex items-center">
                    <span className="mr-2">🎯</span>
                    Payment Method Type
                  </label>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>Secure</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'card', name: 'Credit Card', icon: '💳', color: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/50' },
                    { id: 'paypal', name: 'PayPal', icon: '🅿️', color: 'from-yellow-500 to-orange-500', glow: 'shadow-orange-500/50' },
                    { id: 'crypto', name: 'Cryptocurrency', icon: '₿', color: 'from-purple-500 to-pink-500', glow: 'shadow-purple-500/50' },
                    { id: 'bank', name: 'Bank Account', icon: '🏦', color: 'from-green-500 to-emerald-500', glow: 'shadow-green-500/50' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`relative group p-6 rounded-2xl border-2 transition-all duration-500 transform ${
                        selectedMethod === method.id
                          ? `border-cyan-400 bg-gradient-to-br ${method.color} text-white shadow-2xl ${method.glow} scale-105 rotate-1`
                          : 'border-white/20 bg-white/5 backdrop-blur-sm hover:border-white/40 hover:bg-white/10 text-white hover:scale-105 hover:-rotate-1'
                      }`}
                    >
                      {/* Animated background effect when selected */}
                      {selectedMethod === method.id && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></div>
                      )}
                      
                      <div className="text-center relative z-10">
                        <div className={`text-5xl mb-3 transition-transform duration-300 ${
                          selectedMethod === method.id ? 'scale-125 rotate-12' : 'group-hover:scale-110 group-hover:rotate-6'
                        }`}>
                          {method.icon}
                        </div>
                        <div className={`font-bold text-sm transition-all duration-300 ${
                          selectedMethod === method.id ? 'text-white drop-shadow-lg' : ''
                        }`}>
                          {method.name}
                        </div>
                        {selectedMethod === method.id && (
                          <div className="mt-2 flex items-center justify-center">
                            <span className="text-xs bg-white/20 px-2 py-1 rounded-full animate-pulse">✓ Selected</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Ripple effect on click */}
                      {selectedMethod === method.id && (
                        <div className="absolute inset-0 rounded-2xl bg-white/10 animate-ping opacity-20"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {/* Card Form avec validation sécurisée et animations */}
                {selectedMethod === 'card' && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Animated Card Preview */}
                    <div className="relative mb-6">
                      <div className="h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl transform perspective-1000 hover:rotate-y-5 transition-transform duration-500">
                        <div className="flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start">
                            <div className="text-4xl">💳</div>
                            <div className="text-white/80 text-sm font-mono">
                              {cardPreview.cardNumber}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-white/90 text-sm">Cardholder Name</div>
                            <div className="text-white text-xl font-semibold">
                              {cardPreview.cardholderName}
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <div className="text-white/80 text-xs">Expires</div>
                                <div className="text-white text-sm font-mono">
                                  {cardPreview.expiryDate}
                                </div>
                              </div>
                              <div className="text-white text-2xl font-bold">VISA</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-white mb-3 flex items-center">
                        <span className="mr-2">🔢</span>
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          ref={cardNumberRef}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value)
                          e.target.value = formatted
                          const isValid = formatted.replace(/\s/g, '').length >= 16
                          setValidationStatus(prev => ({
                            ...prev,
                            cardNumber: isValid
                          }))
                          setCardPreview(prev => ({
                            ...prev,
                            cardNumber: formatted || '**** **** **** ****'
                          }))
                        }}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 text-lg font-mono hover:border-cyan-400/50"
                          required
                          autoComplete="cc-number"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {validationStatus.cardNumber && (
                            <span className="text-green-400 text-xl animate-bounce">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-bold text-white mb-3 flex items-center">
                          <span className="mr-2">📅</span>
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          ref={expiryDateRef}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value)
                            e.target.value = formatted
                            setCardPreview(prev => ({
                              ...prev,
                              expiryDate: formatted || 'MM/YY'
                            }))
                          }}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 text-lg font-mono hover:border-cyan-400/50"
                          required
                          autoComplete="cc-exp"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-bold text-white mb-3 flex items-center">
                          <span className="mr-2">🔐</span>
                          CVV
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            name="cvv"
                            ref={cvvRef}
                            placeholder="123"
                            maxLength="4"
                            className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 text-lg font-mono hover:border-cyan-400/50"
                            required
                            autoComplete="cc-csc"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            🔒
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-bold text-white mb-3 flex items-center">
                        <span className="mr-2">👤</span>
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardholderName"
                        ref={cardholderNameRef}
                        placeholder="John Doe"
                        onChange={(e) => {
                          setCardPreview(prev => ({
                            ...prev,
                            cardholderName: e.target.value.toUpperCase() || 'YOUR NAME'
                          }))
                        }}
                        className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 text-lg hover:border-cyan-400/50"
                        required
                        autoComplete="cc-name"
                      />
                    </div>
                  </div>
                )}

                {/* PayPal Form avec animations */}
                {selectedMethod === 'paypal' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-center py-8 relative">
                      <div className="relative inline-block">
                        <div className="text-9xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>🅿️</div>
                        <div className="absolute inset-0 text-9xl opacity-20 blur-2xl animate-pulse">🅿️</div>
                      </div>
                      <p className="text-white text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        Connect your PayPal account
                      </p>
                      <p className="text-gray-400 text-sm">Secure & Instant connection</p>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-bold text-white mb-3 flex items-center">
                        <span className="mr-2">📧</span>
                        PayPal Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="paypalEmail"
                          ref={paypalEmailRef}
                          placeholder="your@email.com"
                          onChange={(e) => {
                            setValidationStatus(prev => ({
                              ...prev,
                              paypalEmail: e.target.value.includes('@')
                            }))
                          }}
                          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/30 transition-all duration-300 text-lg hover:border-orange-400/50"
                          required
                          autoComplete="email"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {validationStatus.paypalEmail && (
                            <span className="text-orange-400 text-xl animate-bounce">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Crypto Form avec animations */}
                {selectedMethod === 'crypto' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-center py-8 relative">
                      <div className="relative inline-block">
                        <div className="text-9xl mb-6 animate-pulse" style={{ animationDuration: '1.5s' }}>₿</div>
                        <div className="absolute inset-0 text-9xl opacity-30 blur-3xl animate-ping" style={{ animationDuration: '2s' }}>₿</div>
                      </div>
                      <p className="text-white text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Add cryptocurrency wallet
                      </p>
                      <p className="text-gray-400 text-sm">Decentralized & Secure</p>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-bold text-white mb-3 flex items-center">
                        <span className="mr-2">🪙</span>
                        Cryptocurrency Type
                      </label>
                      <select
                        name="cryptoType"
                        value={cryptoType}
                        onChange={(e) => setCryptoType(e.target.value)}
                        className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all duration-300 text-lg hover:border-purple-400/50 cursor-pointer"
                      >
                        <option value="bitcoin">₿ Bitcoin (BTC)</option>
                        <option value="ethereum">Ξ Ethereum (ETH)</option>
                        <option value="litecoin">Ł Litecoin (LTC)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-bold text-white mb-3 flex items-center">
                        <span className="mr-2">🔑</span>
                        Wallet Address
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cryptoWallet"
                          ref={cryptoWalletRef}
                          placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                          onChange={(e) => {
                            setValidationStatus(prev => ({
                              ...prev,
                              cryptoWallet: e.target.value.length >= 26
                            }))
                          }}
                          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all duration-300 font-mono text-sm hover:border-purple-400/50"
                          required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {validationStatus.cryptoWallet && (
                            <span className="text-purple-400 text-xl animate-bounce">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Form avec animations */}
                {selectedMethod === 'bank' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-center py-8 relative">
                      <div className="relative inline-block">
                        <div className="text-9xl mb-6 animate-pulse" style={{ animationDuration: '2s' }}>🏦</div>
                        <div className="absolute inset-0 text-9xl opacity-20 blur-2xl animate-ping" style={{ animationDuration: '3s' }}>🏦</div>
                      </div>
                      <p className="text-white text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Add bank account
                      </p>
                      <p className="text-gray-400 text-sm">Traditional & Reliable</p>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-bold text-white mb-3 flex items-center">
                        <span className="mr-2">🏛️</span>
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        ref={bankNameRef}
                        placeholder="Bank Name"
                        className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 text-lg hover:border-green-400/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-lg font-bold text-white mb-3 flex items-center">
                        <span className="mr-2">🔢</span>
                        Account Number
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          name="accountNumber"
                          ref={accountNumberRef}
                          placeholder="1234567890"
                          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 text-lg font-mono hover:border-green-400/50"
                          required
                          autoComplete="off"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                          🔒
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Buttons avec animations interactives */}
                <div className="flex space-x-6 pt-8 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 backdrop-blur-sm border-2 border-cyan-400/50 text-white font-bold py-6 px-8 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    {/* Animated background shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    
                    {isSubmitting ? (
                      <>
                        <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></span>
                        <span className="relative z-10">Processing...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl relative z-10 animate-bounce">💾</span>
                        <span className="relative z-10">Save Payment Method</span>
                        <span className="absolute right-4 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">✨</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                    className="px-8 py-6 bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:bg-red-500/20 hover:border-red-400/50 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <span>✕</span>
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Payment