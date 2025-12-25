import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, Globe, Send, HelpCircle, ShieldCheck, KeyRound } from 'lucide-react';

const ContactUs = () => {
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
                        {/* Contact Details */}
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
                                        <p className="text-[var(--color-muted-foreground)]">+92 300 9530640</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--color-foreground)]">Email</p>
                                        <a href="mailto:haroonboy90@gmail.com" className="text-[var(--color-primary)] hover:underline">support@dukaandigital.com</a>
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
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--color-foreground)]">Website</p>
                                        <a href="https://haroon-90.github.io/Dukaan-Digital/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">www.dukaandigital.pk</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Office Hours & Socials */}
                        <div className="glass-panel p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Office Hours & Socials</h2>
                            <div className="mb-6">
                                <p className="text-[var(--color-muted-foreground)] mb-2">
                                    Our support team is available during:
                                </p>
                                <p className="font-medium text-[var(--color-foreground)]">
                                    Monday - Friday: <span className="text-[var(--color-muted-foreground)] font-normal">9:00 AM to 5:00 PM (PKT)</span>
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

                    {/* Contact Form */}
                    <div className="glass-panel p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-foreground)]">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all placeholder:text-[var(--color-muted-foreground)]"
                                    placeholder="e.g., Haroon"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)]">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all placeholder:text-[var(--color-muted-foreground)]"
                                    placeholder="e.g., yourname@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-foreground)]">Subject</label>
                                <select
                                    id="subject"
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
                                    className="w-full p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all placeholder:text-[var(--color-muted-foreground)]"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-6 py-3 rounded-xl hover:brightness-110 transition-all font-semibold shadow-lg shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="glass-panel p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-[var(--color-primary)]">
                                <HelpCircle size={24} />
                                <h3 className="font-semibold text-lg text-[var(--color-foreground)]">Getting Started</h3>
                            </div>
                            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                                You can easily sign up for an account on our website. Our intuitive onboarding process will guide you through setting up your shop.
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-[var(--color-primary)]">
                                <ShieldCheck size={24} />
                                <h3 className="font-semibold text-lg text-[var(--color-foreground)]">Data Security</h3>
                            </div>
                            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                                Yes, data security is our top priority. We use robust encryption and secure cloud servers to ensure all your business data is protected.
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-[var(--color-primary)]">
                                <KeyRound size={24} />
                                <h3 className="font-semibold text-lg text-[var(--color-foreground)]">Forgot Password?</h3>
                            </div>
                            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                                You can reset your password directly from the login page by clicking the "Forgot Password" link and following the instructions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs