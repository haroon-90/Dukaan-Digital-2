import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, Globe, Send, HelpCircle, ShieldCheck, KeyRound } from 'lucide-react';
import { useState } from 'react';

const ContactUs = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [submitMessage, setSubmitMessage] = useState('');
    const [formData, setFormData] = useState({
        from: "Dukaan Digital Form page",
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://formspree.io/f/mvzgvzqa", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitStatus('success');
                setSubmitMessage('Your message has been sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                setSubmitStatus('error');
                setSubmitMessage('Failed to send your message. Please try again later.');
            }
        } catch (error) {
            setSubmitStatus('error');
            setSubmitMessage('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => {
                setSubmitMessage('');
                setSubmitStatus('');
            }, 5000);
        }
    };
    return (
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] py-16 px-6 sm:px-10 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-12 animate-fade-in-up">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-foreground)] tracking-tight">
                        Get in Touch with <span className="text-[var(--color-primary)]">Dukaan Digital</span>
                    </h1>
                    <p className="text-lg text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
                        We're here to help you succeed. Whether you have a question about our platform, need technical support, or want to explore partnership opportunities.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <div className="glass-panel p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6 flex items-center gap-2">Contact Details</h2>
                            <p className="mb-6 text-[var(--color-muted-foreground)]">
                                You can reach out to our dedicated support team via phone or email during our business hours.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--color-foreground)]">Phone</p>
                                        <a href="tel:+923009530640" className="text-[var(--color-primary)] hover:underline">+92 300 9530640</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--color-foreground)]">Email</p>
                                        <a href="mailto:dukaandigital2@gmail.com" className="text-[var(--color-primary)] hover:underline">dukaandigital2@gmail.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--color-foreground)]">Website</p>
                                        <a href="https://dukaan-digital.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">www.dukaan-digital.vercel.app</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--color-foreground)]">Address</p>
                                        <p className="text-[var(--color-muted-foreground)]">Main Market, Kotla Arab Ali Khan, District Gujrat, Punjab, Pakistan</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Office Hours & Socials</h2>
                            <div className="mb-6">
                                <p className="text-[var(--color-muted-foreground)] mb-2">
                                    Our support team is available during:
                                </p>
                                <p className="font-medium text-[var(--color-foreground)]">
                                    Monday - Thursday, Saturday: <span className="text-[var(--color-muted-foreground)] font-normal">9:00 AM to 5:00 PM (PKT)</span>
                                </p>
                                <p>
                                    Friday: <span className="text-[var(--color-muted-foreground)] font-normal">9:00 AM to 12:00 PM (PKT)</span>
                                </p>
                                <p>
                                    Sunday: <span className="text-[var(--color-muted-foreground)] font-normal">Closed</span>
                                </p>
                            </div>
                            <div>
                                <p className="mb-4 text-[var(--color-muted-foreground)]">Follow us on social media:</p>
                                <div className="flex gap-4">
                                    {[
                                        { icon: Facebook, link: "https://www.facebook.com/haroon.nawaz.144734", label: "Facebook" },
                                        { icon: Instagram, link: "https://www.instagram.com/haroon_nawaz_/", label: "Instagram" },
                                        { icon: Linkedin, link: "https://www.linkedin.com/in/muhammad-haroon-nawaz-206343362/", label: "LinkedIn" }
                                    ].map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.link}
                                            target='_blank'
                                            rel="noreferrer"
                                            aria-label={social.label}
                                            className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all"
                                        >
                                            <social.icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Send us a Message</h2>
                        {submitStatus && (
                            <div className={`mb-6 flex items-center gap-2 border ${submitStatus === 'success' ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'} p-3 rounded-xl`}>
                                <p className={`text-sm ${submitStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                    {submitMessage}
                                </p>
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-foreground)]">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all placeholder:text-[var(--color-muted-foreground)]"
                                    placeholder="e.g., Haroon"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)]">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all placeholder:text-[var(--color-muted-foreground)]"
                                    placeholder="e.g., yourname@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-foreground)]">Subject</label>
                                <select
                                    id="subject"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-[var(--color-foreground)]"
                                >
                                    <option value="">Select an inquiry type</option>
                                    <option value="technical_support">Technical Support</option>
                                    <option value="billing_inquiry">Billing Inquiry</option>
                                    <option value="partnership">Partnership Opportunity</option>
                                    <option value="general_feedback">General Feedback</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-foreground)]">Your Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all placeholder:text-[var(--color-muted-foreground)]"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full disabled:opacity-60 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-6 py-3 rounded-xl hover:brightness-110 transition-all font-semibold shadow-lg shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="glass-panel p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-[var(--color-primary)]">
                                <HelpCircle size={24} />
                                <h3 className="font-semibold text-lg text-[var(--color-foreground)]">Getting Started</h3>
                            </div>
                            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                                You can create account by contacting to the admin team and provide your details.
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-[var(--color-primary)]">
                                <ShieldCheck size={24} />
                                <h3 className="font-semibold text-lg text-[var(--color-foreground)]">Data Security</h3>
                            </div>
                            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                                We use encryption and secure servers to keep your business data protected.
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-[var(--color-primary)]">
                                <KeyRound size={24} />
                                <h3 className="font-semibold text-lg text-[var(--color-foreground)]">Forgot Password?</h3>
                            </div>
                            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                                If you have forgotten your password, you can reset it by contacting our support team.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs