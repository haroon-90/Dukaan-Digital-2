import { useState } from 'react'
import { login } from '../../services/authServices.js';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../components/Context/UserContext.jsx';
import DukaanDigital from '../../assets/Dukaan_Digital.svg'
import { toast } from 'react-hot-toast';
import { Mail, Lock, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext()

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await login(form)
      console.log(response.data);
      if (response.data && response.data.token) {
        sessionStorage.setItem('token', response.data.token)
        toast.success('Login successfully!');
        const USER = response.data.user;
        setUser(USER);
        if (USER.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/manager');
        }
      } else {
        setError('Invalid login response')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed!');
      setError(err.response?.data?.message || 'An error occurred during login')
    } finally {
      setLoading(false)
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] relative overflow-hidden font-sans transition-colors duration-300">

      <div className="glass-panel w-full max-w-lg p-8 md:p-10 rounded-3xl shadow-xl z-10 mx-4">

        <div className="flex flex-col items-center mb-8">
          <img src={DukaanDigital} alt="Dukaan Digital" className="h-16 my-4 w-auto invert-logo" />

          <h2 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight text-center">
            Welcome Back
          </h2>
          <p className="text-[var(--color-muted-foreground)] text-sm text-center mt-2 max-w-xs">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--color-foreground)] ml-1" htmlFor="email">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] group-focus-within:text-[var(--color-primary)] transition-colors" size={18} />
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                placeholder="you@company.com"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-[var(--color-foreground)]" htmlFor="password">Password</label>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] group-focus-within:text-[var(--color-primary)] transition-colors" size={18} />
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg text-center animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <div className='pt-2'>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] py-3 rounded-xl font-semibold shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-[var(--color-primary)]/40 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  Logging in...
                </span>
              ) : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
