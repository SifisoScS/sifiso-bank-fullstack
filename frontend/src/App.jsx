import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  CreditCard, 
  DollarSign, 
  Home, 
  Send, 
  PiggyBank, 
  TrendingUp, 
  Shield, 
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Building2,
  Smartphone,
  Globe,
  Lock,
  Zap,
  CheckCircle2,
  ArrowRight,
  Wallet,
  Receipt,
  FileText,
  Calculator,
  Bell,
  ChevronRight
} from 'lucide-react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [activeAccount, setActiveAccount] = useState('checking')

  // Mock user data
  const userData = {
    name: "John Doe",
    accounts: {
      checking: { balance: 5420.50, number: "****1234" },
      savings: { balance: 12350.75, number: "****5678" },
      business: { balance: 45200.00, number: "****9012" }
    },
    recentTransactions: [
      { id: 1, description: "Grocery Store", amount: -85.50, date: "2025-10-13" },
      { id: 2, description: "Salary Deposit", amount: 3500.00, date: "2025-10-12" },
      { id: 3, description: "Electric Bill", amount: -120.00, date: "2025-10-11" },
      { id: 4, description: "Online Transfer", amount: -200.00, date: "2025-10-10" }
    ]
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoginEmail('')
    setLoginPassword('')
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
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <Button variant="outline" onClick={() => setIsLoggedIn(true)}>Sign In</Button>
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
              <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600">About</a>
              <Button className="w-full" onClick={() => setIsLoggedIn(true)}>Sign In</Button>
            </div>
          )}
        </div>
      </nav>

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
              <Button size="lg" className="text-lg px-8" onClick={() => setIsLoggedIn(true)}>
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Instant transfers</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
            <Card className="relative bg-white/80 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle>Quick Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Total Balance</p>
                    <p className="text-3xl font-bold">$63,971.25</p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-green-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs text-gray-600">Checking</p>
                    <p className="text-lg font-semibold">$5,420.50</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs text-gray-600">Savings</p>
                    <p className="text-lg font-semibold">$12,350.75</p>
                  </div>
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
              { icon: TrendingUp, title: "Investment Tools", desc: "Grow your wealth with smart investment options" },
              { icon: Shield, title: "Advanced Security", desc: "Multi-factor authentication and fraud protection" },
              { icon: Smartphone, title: "Mobile Ready", desc: "Access your accounts anytime, anywhere" },
              { icon: Bell, title: "Real-time Alerts", desc: "Stay informed with instant transaction notifications" }
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

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Services</h2>
            <p className="text-xl text-gray-600">From personal banking to business solutions</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <User className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Personal Banking</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                    <span>Checking & Savings Accounts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                    <span>Personal Loans & Mortgages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                    <span>Credit & Debit Cards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                    <span>Investment Accounts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <Building2 className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Business Banking</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-purple-600" />
                    <span>Business Accounts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-purple-600" />
                    <span>Business Loans & Lines of Credit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-purple-600" />
                    <span>Merchant Services</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-purple-600" />
                    <span>Payroll Management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Bank-Grade Security</h2>
              <p className="text-lg text-gray-600 mb-8">
                Your security is our top priority. We employ the latest technology and best practices to keep your money and data safe.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Lock, title: "256-bit Encryption", desc: "All data encrypted at rest and in transit" },
                  { icon: Shield, title: "Multi-Factor Authentication", desc: "Extra layer of security for your account" },
                  { icon: Zap, title: "Real-time Fraud Detection", desc: "AI-powered monitoring of all transactions" },
                  { icon: Globe, title: "Secure Global Network", desc: "Protected infrastructure worldwide" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <item.icon className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                <Shield className="h-24 w-24 mb-6 opacity-80" />
                <h3 className="text-3xl font-bold mb-4">Protected 24/7</h3>
                <p className="text-lg opacity-90">
                  Our security team monitors your accounts around the clock to ensure your assets are always protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Complete Banking?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who have made the switch to Sifiso Bank
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8" onClick={() => setIsLoggedIn(true)}>
            Open Your Account Today <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6" />
                <span className="text-xl font-bold">Sifiso Bank</span>
              </div>
              <p className="text-gray-400">The first complete banking solution in history.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Personal Banking</li>
                <li>Business Banking</li>
                <li>Loans</li>
                <li>Credit Cards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Security</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sifiso Bank. All rights reserved. Member FDIC.</p>
          </div>
        </div>
      </footer>
    </div>
  )

  // Banking Dashboard Component
  const BankingDashboard = () => (
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
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}!</h1>
          <p className="text-gray-600">Here's your financial overview</p>
        </div>

        {/* Account Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Checking Account</span>
                <Home className="h-5 w-5" />
              </CardTitle>
              <CardDescription className="text-blue-100">
                {userData.accounts.checking.number}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${userData.accounts.checking.balance.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Savings Account</span>
                <PiggyBank className="h-5 w-5" />
              </CardTitle>
              <CardDescription className="text-green-100">
                {userData.accounts.savings.number}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${userData.accounts.savings.balance.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Business Account</span>
                <Building2 className="h-5 w-5" />
              </CardTitle>
              <CardDescription className="text-purple-100">
                {userData.accounts.business.number}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${userData.accounts.business.balance.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
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
                  <div className="space-y-4">
                    {userData.recentTransactions.map((transaction) => (
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
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common banking tasks</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <Send className="h-6 w-6" />
                    <span>Send Money</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <Receipt className="h-6 w-6" />
                    <span>Pay Bills</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <FileText className="h-6 w-6" />
                    <span>Statements</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <Calculator className="h-6 w-6" />
                    <span>Loan Calculator</span>
                  </Button>
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
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="from-account">From Account</Label>
                  <select id="from-account" className="w-full p-2 border rounded-md">
                    <option>Checking Account (****1234)</option>
                    <option>Savings Account (****5678)</option>
                    <option>Business Account (****9012)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to-account">To Account / Email</Label>
                  <Input id="to-account" placeholder="Enter account number or email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memo">Memo (Optional)</Label>
                  <Input id="memo" placeholder="What's this for?" />
                </div>
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Transfer
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Bill Payments</CardTitle>
                <CardDescription>Manage and pay your bills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payee">Payee</Label>
                  <Input id="payee" placeholder="Enter payee name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input id="account-number" placeholder="Enter account number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-amount">Amount</Label>
                  <Input id="payment-amount" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-date">Payment Date</Label>
                  <Input id="payment-date" type="date" />
                </div>
                <Button className="w-full">
                  <Receipt className="mr-2 h-4 w-4" />
                  Schedule Payment
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loans Tab */}
          <TabsContent value="loans">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Loan</CardTitle>
                  <CardDescription>Apply for a personal loan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loan-amount">Loan Amount</Label>
                    <Input id="loan-amount" type="number" placeholder="10000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loan-term">Term (months)</Label>
                    <select id="loan-term" className="w-full p-2 border rounded-md">
                      <option>12 months</option>
                      <option>24 months</option>
                      <option>36 months</option>
                      <option>48 months</option>
                      <option>60 months</option>
                    </select>
                  </div>
                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Loan</CardTitle>
                  <CardDescription>Grow your business with our loans</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-loan-amount">Loan Amount</Label>
                    <Input id="business-loan-amount" type="number" placeholder="50000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-purpose">Purpose</Label>
                    <select id="business-purpose" className="w-full p-2 border rounded-md">
                      <option>Equipment Purchase</option>
                      <option>Working Capital</option>
                      <option>Expansion</option>
                      <option>Real Estate</option>
                    </select>
                  </div>
                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Debit Card</CardTitle>
                  <CardDescription>Manage your debit card</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl">
                    <div className="mb-8">
                      <CreditCard className="h-10 w-10" />
                    </div>
                    <p className="text-xl mb-2">**** **** **** 1234</p>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs opacity-70">Card Holder</p>
                        <p className="text-sm">{userData.name.toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-70">Expires</p>
                        <p className="text-sm">12/27</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Request New Card</Button>
                  <Button variant="outline" className="w-full">Block Card</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Credit Card</CardTitle>
                  <CardDescription>Apply for a credit card</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-6 border-2 border-dashed rounded-xl text-center">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">You don't have a credit card yet</p>
                    <Button>Apply for Credit Card</Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Benefits:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Up to 3% cashback on purchases</li>
                      <li>• No annual fee for the first year</li>
                      <li>• Travel insurance included</li>
                      <li>• Fraud protection guarantee</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

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

