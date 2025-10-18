import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  CreditCard, 
  Home, 
  Send, 
  PiggyBank, 
  Shield, 
  Menu,
  X,
  Settings,
  LogOut,
  Building2,
  ArrowRight,
  Wallet,
  Receipt,
  Calculator,
  Bell,
} from 'lucide-react'
import './App.css'

const API_BASE_URL = '/api'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authToken, setAuthToken] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isRegistering, setIsRegistering] = useState(null)
  
  // Form states
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: ''
  })
  
  // User data
  const [userData, setUserData] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [loans, setLoans] = useState([])
  const [cards, setCards] = useState([])
  
  // Transfer form
  const [transferData, setTransferData] = useState({
    from_account_id: '',
    to_account_number: '',
    amount: '',
    description: ''
  })
  
  // Loan form
  const [loanData, setLoanData] = useState({
    loan_type: 'personal',
    amount: '',
    term_months: 12,
    purpose: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setAuthToken(token)
      setIsLoggedIn(true)
      fetchUserData(token)
    }
  }, [])

  const fetchUserData = async (token) => {
    try {
      // Fetch user profile
      const profileRes = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const profileData = await profileRes.json()
      setUserData(profileData)
      
      // Fetch accounts
      const accountsRes = await fetch(`${API_BASE_URL}/accounts/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const accountsData = await accountsRes.json()
      setAccounts(accountsData.accounts || [])
      
      // Fetch recent transactions
      const transactionsRes = await fetch(`${API_BASE_URL}/transactions/recent`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const transactionsData = await transactionsRes.json()
      setRecentTransactions(transactionsData.transactions || [])
      
      // Fetch loans
      const loansRes = await fetch(`${API_BASE_URL}/loans/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const loansData = await loansRes.json()
      setLoans(loansData.loans || [])
      
      // Fetch cards
      const cardsRes = await fetch(`${API_BASE_URL}/cards/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const cardsData = await cardsRes.json()
      setCards(cardsData.cards || [])
      
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setAuthToken(data.access_token)
        localStorage.setItem('authToken', data.access_token)
        setIsLoggedIn(true)
        fetchUserData(data.access_token)
      } else {
        alert(data.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setAuthToken(data.access_token)
        localStorage.setItem('authToken', data.access_token)
        setIsLoggedIn(true)
        fetchUserData(data.access_token)
      } else {
        alert(data.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setAuthToken(null)
    localStorage.removeItem('authToken')
    setUserData(null)
    setAccounts([])
    setRecentTransactions([])
    setLoans([])
    setCards([])
    setLoginEmail('')
    setLoginPassword('')
  }

  const handleTransfer = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(transferData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert('Transfer successful!')
        fetchUserData(authToken)
        setTransferData({
          from_account_id: '',
          to_account_number: '',
          amount: '',
          description: ''
        })
      } else {
        alert(data.error || 'Transfer failed')
      }
    } catch (error) {
      console.error('Transfer error:', error)
      alert('Transfer failed. Please try again.')
    }
  }

  const handleLoanApplication = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/loans/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(loanData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert('Loan application submitted successfully!')
        fetchUserData(authToken)
        setLoanData({
          loan_type: 'personal',
          amount: '',
          term_months: 12,
          purpose: ''
        })
      } else {
        alert(data.error || 'Loan application failed')
      }
    } catch (error) {
      console.error('Loan application error:', error)
      alert('Loan application failed. Please try again.')
    }
  }

  const handleApplyForCard = async (cardType) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cards/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ card_type: cardType })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert('Card created successfully!')
        fetchUserData(authToken)
      } else {
        alert(data.error || 'Card application failed')
      }
    } catch (error) {
      console.error('Card application error:', error)
      alert('Card application failed. Please try again.')
    }
  }

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sifiso Bank
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#security" className="text-gray-700 hover:text-blue-600 transition-colors">Security</a>
              <Button variant="outline" onClick={() => setIsRegistering(false)}>Sign In</Button>
              <Button onClick={() => setIsRegistering(true)}>Register</Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600">Features</a>
              <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600">Services</a>
              <a href="#security" className="block py-2 text-gray-700 hover:text-blue-600">Security</a>
              <Button className="w-full mb-2" variant="outline" onClick={() => setIsRegistering(false)}>Sign In</Button>
              <Button className="w-full" onClick={() => setIsRegistering(true)}>Register</Button>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      {!isLoggedIn && (isRegistering !== null) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{isRegistering ? 'Create Account' : 'Sign In'}</CardTitle>
              <CardDescription>
                {isRegistering ? 'Register for a new Sifiso Bank account' : 'Welcome back to Sifiso Bank'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isRegistering ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={registerData.first_name}
                        onChange={(e) => setRegisterData({...registerData, first_name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={registerData.last_name}
                        onChange={(e) => setRegisterData({...registerData, last_name: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg_email">Email</Label>
                    <Input
                      id="reg_email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg_password">Password</Label>
                    <Input
                      id="reg_password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Register</Button>
                    <Button type="button" variant="outline" onClick={() => setIsRegistering(null)}>Cancel</Button>
                  </div>
                  <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => setIsRegistering(false)}
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Sign In</Button>
                    <Button type="button" variant="outline" onClick={() => setIsRegistering(null)}>Cancel</Button>
                  </div>
                  <p className="text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => setIsRegistering(true)}
                    >
                      Register
                    </button>
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              The <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">First</span> Complete Banking Solution
            </h1>
            <p className="text-xl text-gray-600">
              Experience banking reimagined. Sifiso Bank brings you every service you need in one comprehensive platform. From personal accounts to business loans, we've got everything covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" onClick={() => setIsRegistering(true)}>
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => setIsRegistering(false)}>
                Sign In
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
            <Card className="relative bg-white/80 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle>Secure Banking Platform</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Full-Stack Solution</p>
                    <p className="text-2xl font-bold">React + Flask + PostgreSQL</p>
                  </div>
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">All banking services in one comprehensive platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Wallet, title: "Multiple Account Types", desc: "Checking, Savings, Business - all in one place" },
              { icon: Send, title: "Instant Transfers", desc: "Send money instantly to anyone, anywhere" },
              { icon: CreditCard, title: "Cards & Credit", desc: "Debit cards, credit cards, and flexible credit options" },
              { icon: Receipt, title: "Bill Payments", desc: "Schedule and automate all your bill payments" },
              { icon: Calculator, title: "Loan Services", desc: "Personal and business loans with competitive rates" },
              { icon: Shield, title: "Advanced Security", desc: "JWT authentication and encrypted data" }
            ].map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )

  // Banking Dashboard Component
  const BankingDashboard = () => {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Sifiso Bank</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userData?.first_name} {userData?.last_name}!
            </h1>
            <p className="text-gray-600">Here's your financial overview</p>
          </div>

          {/* Account Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {accounts.map((account, idx) => {
              const colors = {
                checking: 'from-blue-600 to-blue-700',
                savings: 'from-green-600 to-green-700',
                business: 'from-purple-600 to-purple-700'
              }
              const icons = {
                checking: Home,
                savings: PiggyBank,
                business: Building2
              }
              const Icon = icons[account.account_type] || Wallet
              
              return (
                <Card key={idx} className={`bg-gradient-to-br ${colors[account.account_type]} text-white`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="capitalize">{account.account_type} Account</span>
                      <Icon className="h-5 w-5" />
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      ****{account.account_number.slice(-4)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">${account.balance.toFixed(2)}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
              <TabsTrigger value="loans">Loans</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your latest account activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentTransactions.length > 0 ? (
                      <div className="space-y-4">
                        {recentTransactions.map((transaction) => (
                          <div key={transaction.id} className="flex justify-between items-center pb-4 border-b last:border-0">
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-gray-500">{transaction.date}</p>
                            </div>
                            <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No recent transactions</p>
                    )}
                  </CardContent>
                </Card>

                {/* Account Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Summary</CardTitle>
                    <CardDescription>Total balance across all accounts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Total Balance</p>
                        <p className="text-4xl font-bold">${totalBalance.toFixed(2)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <p className="text-xs text-gray-600">Accounts</p>
                          <p className="text-2xl font-semibold">{accounts.length}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <p className="text-xs text-gray-600">Cards</p>
                          <p className="text-2xl font-semibold">{cards.length}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Transfer Tab */}
            <TabsContent value="transfer">
              <Card>
                <CardHeader>
                  <CardTitle>Transfer Money</CardTitle>
                  <CardDescription>Send money between accounts or to others</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTransfer} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="from-account">From Account</Label>
                      <select
                        id="from-account"
                        className="w-full p-2 border rounded-md"
                        value={transferData.from_account_id}
                        onChange={(e) => setTransferData({...transferData, from_account_id: e.target.value})}
                        required
                      >
                        <option value="">Select account</option>
                        {accounts.map(acc => (
                          <option key={acc.id} value={acc.id}>
                            {acc.account_type} (****{acc.account_number.slice(-4)}) - ${acc.balance.toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to-account">To Account Number</Label>
                      <Input
                        id="to-account"
                        placeholder="Enter recipient account number"
                        value={transferData.to_account_number}
                        onChange={(e) => setTransferData({...transferData, to_account_number: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={transferData.amount}
                        onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="memo">Description (Optional)</Label>
                      <Input
                        id="memo"
                        placeholder="What's this for?"
                        value={transferData.description}
                        onChange={(e) => setTransferData({...transferData, description: e.target.value})}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Transfer
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Loans Tab */}
            <TabsContent value="loans">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Apply for Loan</CardTitle>
                    <CardDescription>Get the financing you need</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLoanApplication} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="loan-type">Loan Type</Label>
                        <select
                          id="loan-type"
                          className="w-full p-2 border rounded-md"
                          value={loanData.loan_type}
                          onChange={(e) => setLoanData({...loanData, loan_type: e.target.value})}
                        >
                          <option value="personal">Personal Loan</option>
                          <option value="business">Business Loan</option>
                          <option value="mortgage">Mortgage</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loan-amount">Loan Amount</Label>
                        <Input
                          id="loan-amount"
                          type="number"
                          placeholder="10000"
                          value={loanData.amount}
                          onChange={(e) => setLoanData({...loanData, amount: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loan-term">Term (months)</Label>
                        <select
                          id="loan-term"
                          className="w-full p-2 border rounded-md"
                          value={loanData.term_months}
                          onChange={(e) => setLoanData({...loanData, term_months: parseInt(e.target.value)})}
                        >
                          <option value="12">12 months</option>
                          <option value="24">24 months</option>
                          <option value="36">36 months</option>
                          <option value="48">48 months</option>
                          <option value="60">60 months</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="purpose">Purpose (Optional)</Label>
                        <Input
                          id="purpose"
                          placeholder="What will you use this loan for?"
                          value={loanData.purpose}
                          onChange={(e) => setLoanData({...loanData, purpose: e.target.value})}
                        />
                      </div>
                      <Button type="submit" className="w-full">Apply Now</Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Loans</CardTitle>
                    <CardDescription>Active and pending loan applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loans.length > 0 ? (
                      <div className="space-y-4">
                        {loans.map(loan => (
                          <div key={loan.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-semibold capitalize">{loan.loan_type} Loan</p>
                                <p className="text-sm text-gray-600">{loan.status}</p>
                              </div>
                              <p className="text-lg font-bold">${loan.amount.toFixed(2)}</p>
                            </div>
                            {loan.monthly_payment && (
                              <p className="text-sm text-gray-600">
                                Monthly Payment: ${loan.monthly_payment.toFixed(2)}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No loans yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Cards Tab */}
            <TabsContent value="cards">
              <div className="grid md:grid-cols-2 gap-6">
                {cards.length > 0 ? (
                  cards.map(card => (
                    <Card key={card.id}>
                      <CardHeader>
                        <CardTitle className="capitalize">{card.card_type} Card</CardTitle>
                        <CardDescription>{card.status}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl mb-4">
                          <div className="mb-8">
                            <CreditCard className="h-10 w-10" />
                          </div>
                          <p className="text-xl mb-2">{card.card_number}</p>
                          <div className="flex justify-between">
                            <div>
                              <p className="text-xs opacity-70">Expires</p>
                              <p className="text-sm">{card.expiry_date}</p>
                            </div>
                            {card.credit_limit && (
                              <div>
                                <p className="text-xs opacity-70">Credit Limit</p>
                                <p className="text-sm">${card.credit_limit.toFixed(2)}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>No Cards Yet</CardTitle>
                      <CardDescription>Apply for a debit or credit card</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                      <Button onClick={() => handleApplyForCard('debit')}>
                        Apply for Debit Card
                      </Button>
                      <Button variant="outline" onClick={() => handleApplyForCard('credit')}>
                        Apply for Credit Card
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Accounts Tab */}
            <TabsContent value="accounts">
              <Card>
                <CardHeader>
                  <CardTitle>Your Accounts</CardTitle>
                  <CardDescription>Manage all your banking accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accounts.map(account => (
                      <div key={account.id} className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-semibold capitalize">{account.account_type} Account</p>
                          <p className="text-sm text-gray-600">Account Number: {account.account_number}</p>
                        </div>
                        <p className="text-2xl font-bold">${account.balance.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  // Main App Render
  return (
    <div className="min-h-screen">
      {isLoggedIn ? 
               <BankingDashboard />
              : 
               <LandingPage />}
    </div>
  )
}

export default App

