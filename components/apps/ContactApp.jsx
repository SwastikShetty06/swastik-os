import React, { useState, useRef } from 'react';
import { contactLinks } from '../../constants';
import { Mail, Linkedin, Github, Phone, ArrowRight, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactApp = () => {
    const formRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'Mail': return <Mail size={20} />;
            case 'Linkedin': return <Linkedin size={20} />;
            case 'Github': return <Github size={20} />;
            case 'Phone': return <Phone size={20} />;
            default: return <Mail size={20} />;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formRef.current) return;

        setIsSubmitting(true);

        try {
            await emailjs.sendForm(
                'service_ij8j4eg',
                'template_jm4ubcn',
                formRef.current,
                's-bKCjxmR-0Y4t36b'
            );
            setSubmitStatus('success');
            formRef.current.reset();
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 3000);
        }
    };

    return (
        <div className="font-sans h-full overflow-y-auto bg-gray-50">
            <div className="max-w-5xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 h-full">

                {/* Left Column: Contact Links */}
                <div className="flex flex-col justify-center space-y-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 tracking-tight">Get In Touch</h2>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>
                    </div>

                    <div className="space-y-3">
                        {contactLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between bg-white border border-gray-300 p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
                            >
                                <div className="flex items-center space-x-3 md:space-x-4">
                                    <div className="bg-blue-50 p-2 md:p-2.5 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-inner">
                                        {getIcon(link.icon)}
                                    </div>
                                    <div className="flex flex-col text-left overflow-hidden">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{link.channel}</span>
                                        <span className="font-semibold text-gray-800 text-sm truncate">{link.value}</span>
                                    </div>
                                </div>
                                <ArrowRight size={18} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-center relative overflow-hidden mb-6 md:mb-0">
                    {/* Glossy Header Effect */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 opacity-80"></div>

                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Mail className="text-blue-500" size={24} />
                        <span>Send a Message</span>
                    </h3>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Your Name</label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all shadow-inner placeholder-gray-400 text-sm"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Your Email</label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all shadow-inner placeholder-gray-400 text-sm"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Message</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all shadow-inner placeholder-gray-400 resize-none text-sm"
                                placeholder="Hello, I'd like to talk about..."
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-md active:shadow-inner active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Status Feedback */}
                        {submitStatus === 'success' && (
                            <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200 animate-in fade-in slide-in-from-bottom-2">
                                <CheckCircle size={18} />
                                <span className="font-medium text-sm">Message sent successfully!</span>
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 animate-in fade-in slide-in-from-bottom-2">
                                <XCircle size={18} />
                                <span className="font-medium text-sm">Failed to send. Please try again.</span>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <div className="py-6 border-t border-gray-200 text-center mt-auto bg-gray-100/50">
                <p className="text-xs text-gray-400 font-medium">Designed with React & Tailwind</p>
                <p className="text-xs text-gray-400 mt-1">© 2025 Swastik OS</p>
            </div>
        </div>
    );
};

export default ContactApp;
