"use client";
import React, { useState, useEffect, useRef, MouseEvent, ChangeEvent, FormEvent } from 'react';
import { Linkedin, Github, Twitter, Menu, X, ArrowDown, Briefcase, Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';

// --- MAIN APP COMPONENT ---
export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-fade-in').forEach(el => {
            observer.observe(el as Element);
        });

        // Lock body scroll when mobile menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
        { href: '#skills', label: 'Skills' },
        { href: '#contact', label: 'Contact' },
    ];

    const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setFormStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setFormStatus(''), 5000);
        }, 2000);
    };

    return (
        <div className="bg-gray-900 text-gray-100 font-sans antialiased selection:bg-purple-500 selection:text-white relative">
            <div
                className="pointer-events-none fixed inset-0 z-30 transition duration-300"
                style={{
                    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
                }}
            ></div>

            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-gray-900/70 backdrop-blur-xl shadow-2xl border-b border-gray-800' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">HC</a>
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-gray-300 hover:text-white transition-colors duration-300 text-lg relative group">
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-300 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        ))}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none z-50">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <nav className="flex flex-col items-center justify-center h-full space-y-8">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-gray-300 hover:text-white transition-colors duration-300 text-3xl font-bold">
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>

            <main>
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex flex-col justify-center items-center relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                    <div className="absolute inset-0 bg-black/70"></div>
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 animate-fade-in-down bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            Himanshu Choudhary
                        </h1>
                        <p className="text-2xl md:text-3xl text-gray-300 mb-8 animate-fade-in-up">
                            Flutter Developer | Crafting Beautiful &amp; Performant Mobile Apps
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 text-center my-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            <div className="flex items-center gap-3">
                                <Briefcase size={40} className="text-cyan-300" />
                                <div>
                                    <p className="text-3xl font-bold text-white">2.6+</p>
                                    <p className="text-gray-400 text-sm">Years of Experience</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle size={40} className="text-cyan-300" />
                                <div>
                                    <p className="text-3xl font-bold text-white">20+</p>
                                    <p className="text-gray-400 text-sm">Projects Completed</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Star size={40} className="text-cyan-300" />
                                <div>
                                    <p className="text-3xl font-bold text-white">99%</p>
                                    <p className="text-gray-400 text-sm">Client Satisfaction</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                            <a href="#projects" onClick={(e) => scrollToSection(e, '#projects')} className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 inline-block shadow-lg shadow-purple-500/30 animate-pulse-slow">
                                View My Work
                            </a>
                            <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="border-2 border-cyan-400 text-cyan-400 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:bg-cyan-400 hover:text-white inline-block shadow-lg hover:shadow-cyan-500/30">
                                Hire Me
                            </a>
                        </div>
                    </div>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-pulse">
                        <a href="#about" onClick={(e) => scrollToSection(e, '#about')} aria-label="Scroll down">
                            <ArrowDown size={32} className="text-white/70" />
                        </a>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-24 bg-gray-900/80 backdrop-blur-sm">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16 animate-fade-in">
                            <h2 className="text-4xl font-bold text-white mb-3">About Me</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto"></div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-12 animate-fade-in">
                            <div className="md:w-1/3 text-center">
                                <div className="relative inline-block group">
                                    <Image
                                        src="https://placehold.co/400x400/1a202c/ffffff?text=HC"
                                        alt="Himanshu Choudhary"
                                        width={256}
                                        height={256}
                                        className="rounded-full w-64 h-64 mx-auto border-4 border-purple-500/50 shadow-lg transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/1a202c/ffffff?text=HC'; }}
                                    />
                                    <div className="absolute inset-0 rounded-full border-4 border-cyan-400/50 animate-spin-slow"></div>
                                </div>
                            </div>
                            <div className="md:w-2/3 text-lg text-gray-300 leading-relaxed">
                                <p className="mb-4">
                                    Hello! I&apos;m Himanshu, a passionate Flutter developer with a knack for creating fluid, intuitive, and high-performance mobile applications for both iOS and Android. My journey into mobile development started with a fascination for how a few lines of code could translate into a powerful tool in someone&apos;s pocket.
                                </p>
                                <p className="mb-4">
                                    I thrive on turning complex problems into simple, beautiful, and user-friendly designs. I&apos;m proficient in Dart, Firebase, and state management solutions like Provider and BLoC. I&apos;m always eager to learn new technologies and improve my craft.
                                </p>
                                <p>
                                    When I&apos;m not coding, you can find me exploring the latest tech trends, contributing to open-source projects, or enjoying a good cup of coffee.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-24 bg-gray-800/80 backdrop-blur-sm">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16 animate-fade-in">
                            <h2 className="text-4xl font-bold text-white mb-3">My Projects</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <ProjectCard
                                title="E-Commerce App"
                                description="A feature-rich e-commerce application built with Flutter, featuring product browsing, cart management, and a secure checkout process using Firebase."
                                imageUrl="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                tags={['Flutter', 'Firebase', 'Provider']}
                                githubUrl="#"
                                playStoreUrl="#"
                                appStoreUrl="#"
                            />
                            <ProjectCard
                                title="Fitness Tracker"
                                description="A mobile app to track workouts, set fitness goals, and visualize progress with charts and statistics. Integrated with device sensors for real-time data."
                                imageUrl="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                tags={['Flutter', 'BLoC', 'Charts', 'SQLite']}
                                githubUrl="#"
                                playStoreUrl="#"
                            />
                            <ProjectCard
                                title="Chat Application"
                                description="A real-time chat application using Flutter and Firebase. Supports text messages, image sharing, and push notifications for an interactive experience."
                                imageUrl="https://images.unsplash.com/photo-1522098635833-216c03d81f44?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                tags={['Flutter', 'Firebase Auth', 'Firestore']}
                                githubUrl="#"
                            />
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="py-24 bg-gray-900/80 backdrop-blur-sm">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16 animate-fade-in">
                            <h2 className="text-4xl font-bold text-white mb-3">Technical Skills</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto"></div>
                        </div>
                        <div className="max-w-5xl mx-auto animate-fade-in">
                            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                                <SkillBadge name="Flutter" imageUrl="https://img.icons8.com/color/96/000000/flutter.png" />
                                <SkillBadge name="Dart" imageUrl="https://img.icons8.com/color/96/000000/dart.png" />
                                <SkillBadge name="Firebase" imageUrl="https://img.icons8.com/color/96/000000/firebase.png" />
                                <SkillBadge name="REST APIs" imageUrl="https://img.icons8.com/fluency/96/000000/api-settings.png" />
                                <SkillBadge name="Provider" imageUrl="https://img.icons8.com/fluency/96/000000/data-provider.png" />
                                <SkillBadge name="BLoC" imageUrl="https://img.icons8.com/fluency/96/000000/bloc.png" />
                                <SkillBadge name="Git" imageUrl="https://img.icons8.com/color/96/000000/git.png" />
                                <SkillBadge name="GitHub" imageUrl="https://img.icons8.com/nolan/96/github.png" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-24 bg-gray-800/80 backdrop-blur-sm">
                    <div className="container mx-auto px-6 text-center">
                        <div className="animate-fade-in max-w-2xl mx-auto">
                            <h2 className="text-4xl font-bold text-white mb-3">Get In Touch</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mb-8"></div>
                            <p className="text-gray-300 text-xl mb-10">
                                Have a question or want to work together? Leave your details and I&apos;ll get back to you.
                            </p>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                />
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleFormChange}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={formStatus === 'sending'}
                                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                            {formStatus === 'success' && (
                                <p className="mt-6 text-green-400 bg-green-900/50 py-3 px-4 rounded-lg">
                                    Thank you for your message! I&apos;ll be in touch soon.
                                </p>
                            )}
                            <div className="flex justify-center space-x-8 mt-12">
                                <SocialLink href="#" icon={<Github size={32} />} label="GitHub" />
                                <SocialLink href="#" icon={<Linkedin size={32} />} label="LinkedIn" />
                                <SocialLink href="#" icon={<Twitter size={32} />} label="Twitter" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-6">
                <div className="container mx-auto px-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Himanshu Choudhary. All Rights Reserved.</p>
                </div>
            </footer>

            {/* CSS for animations */}
            <style>{`
                @keyframes fade-in-down { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out 0.4s forwards; opacity: 0; }
                .animate-fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
                .animate-fade-in-visible { opacity: 1; transform: translateY(0); }
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin-slow { animation: spin-slow 15s linear infinite; }
                @keyframes pulse-slow {
                    50% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 15px rgba(168, 85, 247, 0);
                    }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 2.5s infinite;
                }
            `}</style>
        </div>
    );
}

// Project Card Component
type ProjectCardProps = {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    githubUrl?: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, tags, githubUrl, playStoreUrl, appStoreUrl }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: globalThis.MouseEvent) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / 25;
            const y = (e.clientY - top - height / 2) / 25;
            card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const PlayStoreIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 22V2l18 10-18 10z"/></svg>
    );

    const AppStoreIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.27a2.23 2.23 0 0 0-1.5.65 2.15 2.15 0 0 0-1.42 1.46A2.1 2.1 0 0 0 9 5.43a2.27 2.27 0 0 0 .15 1 2.2 2.2 0 0 0 .53 1 2.34 2.34 0 0 0 1 .62 2.4 2.4 0 0 0 1.2.18 2.3 2.3 0 0 0-1.18-2 2.24 2.24 0 0 1-.1-2.45A2.22 2.22 0 0 1 12 1.27zm4.29 2.62a5.53 5.53 0 0 0-3.32 1.13 11.2 11.2 0 0 0-2 1.63A11.08 11.08 0 0 0 8.2 9.17a5.5 5.5 0 0 0-2.07 4.4 5.43 5.43 0 0 0 1.5 3.82 5.73 5.73 0 0 0 4 1.6 5.17 5.17 0 0 0 .52 0 5.4 5.4 0 0 0 4.2-2.3 5.5 5.5 0 0 0 .2-5.45 5.43 5.43 0 0 0-2.45-3.35z"/></svg>
    );

    return (
        <div ref={cardRef} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-out group border border-gray-700 hover:border-purple-500/50 animate-fade-in" style={{ transformStyle: 'preserve-3d' }}>
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={600}
                    height={224}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1a202c/ffffff?text=Project'; }}
                />
            </div>
            <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map(tag => (
                        <span key={`${title}-${tag}`} className="bg-gray-700 text-cyan-300 text-sm font-semibold px-3 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <div className="flex space-x-4 mt-auto pt-4 border-t border-gray-700/50">
                    {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300"><Github /></a>}
                    {playStoreUrl && <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300"><PlayStoreIcon /></a>}
                    {appStoreUrl && <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300"><AppStoreIcon /></a>}
                </div>
            </div>
        </div>
    );
};

// Skill Badge Component
type SkillBadgeProps = {
    name: string;
    imageUrl: string;
};

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, imageUrl }) => {
    return (
        <div className="flex flex-col items-center gap-2 text-center group">
            <div className="bg-gray-800/50 p-4 rounded-full border-2 border-transparent group-hover:border-cyan-400 group-hover:bg-cyan-900/50 transition-all duration-300">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={64}
                    height={64}
                    className="w-16 h-16 transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
            </div>
            <p className="text-gray-300 font-medium transition-colors duration-300 group-hover:text-white">{name}</p>
        </div>
    );
};

// Social Link Component
type SocialLinkProps = {
    href: string;
    icon: React.ReactNode;
    label: string;
};

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
    const linkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const link = linkRef.current;
        if (!link) return;

        const handleMouseMove = (e: globalThis.MouseEvent) => {
            const { left, top, width, height } = link.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;
            link.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.2)`;
        };

        const handleMouseLeave = () => {
            link.style.transform = 'translate(0, 0) scale(1)';
        };

        link.addEventListener('mousemove', handleMouseMove);
        link.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            link.removeEventListener('mousemove', handleMouseMove);
            link.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <a ref={linkRef} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-300 transition-all duration-300" aria-label={label}>
            {icon}
        </a>
    );
};
