import { useState } from 'react';
import { register } from '../../services/authServices.js';
import { useNavigate } from 'react-router-dom';
import DukaanDigital from '../../assets/Dukaan_Digital.svg'
import toast from 'react-hot-toast';
import InputField from '../../components/UI/inputFields'
import { User, Mail, Lock, Phone, Store, MapPin, UserCog, ChevronDown, Loader2 } from 'lucide-react';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'manager',
        phone: '',
        shopname: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await register(formData);
            if (response.data) {
                toast.success("Account registered successfully!");
                setTimeout(() => {
                    navigate('/admin');
                }, 200);
            }
        } catch (err) {
            toast.error("Registration failed!")
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] relative overflow-hidden font-sans transition-colors duration-300 py-12 px-4">

            <div className="glass-panel w-full max-w-4xl p-8 md:p-10 rounded-3xl shadow-xl z-10 animate-fade-in-up">
                <div className="flex flex-col items-center mb-8">
                    <img className='h-16 my-4 w-auto invert-logo' src={DukaanDigital} alt="DukaanDigital" />
                    <h2 className="text-3xl font-bold text-[var(--color-foreground)] tracking-tight text-center">
                        Register Account
                    </h2>
                    <p className="text-[var(--color-muted-foreground)] text-sm text-center mt-2">
                        Create a new account for your team.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-center font-medium animate-pulse-once">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <InputField label="Full Name" icon={User} name="name" placeholder="Haroon" value={formData.name} onChange={handleChange} />
                        <InputField label="Email" icon={Mail} name="email" type="email" placeholder="haroon@example.com" value={formData.email} onChange={handleChange} />
                        <InputField label="Password" icon={Lock} name="password" type="password" placeholder="Create a password" value={formData.password} onChange={handleChange} />
                        <InputField label="Phone Number" icon={Phone} name="phone" type="tel" placeholder="+923000000000" value={formData.phone} onChange={handleChange} />

                        {formData.role === "manager" && (
                            <InputField label="Shop Name" icon={Store} name="shopname" placeholder="My Awesome Shop" required={false} value={formData.shopname} onChange={handleChange} />
                        )}

                        <InputField label="Address" icon={MapPin} name="address" placeholder="123 Main St, City" value={formData.address} onChange={handleChange} />

                        {/* Role Select Dropdown */}
                        <div className="space-y-1">
                            <label htmlFor="role" className="block text-sm font-medium text-[var(--color-foreground)]">
                                Role
                            </label>
                            <div className="relative group">
                                <UserCog className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] group-focus-within:text-[var(--color-primary)] transition-colors pointer-events-none" size={18} />
                                <select
                                    name="role"
                                    id="role"
                                    className="w-full pl-11 pr-10 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl appearance-none text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all cursor-pointer"
                                    onChange={handleChange}
                                    defaultValue="manager"
                                    disabled={loading}
                                >
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-center pt-4 border-t border-[var(--color-border)]">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto md:min-w-[200px] py-3 px-8 rounded-xl font-bold text-[var(--color-primary-foreground)] bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-[var(--color-primary)]/40 hover:brightness-110 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin" size={20} />
                                    Creating Account...
                                </span>
                            ) : 'Create Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;