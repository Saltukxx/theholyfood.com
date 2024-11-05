"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Check, 
  Star, 
  ArrowRight, 
  Mail, 
  Phone, 
  Instagram,
  Facebook, 
  MapPin, 
  Heart, 
  Sparkles,
  Calendar,
  Clock,
  Clock3,
  User
} from 'lucide-react';

const TurkuazDietitianWebsite = () => {
  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position > 20);

      const sections = ['home', 'services', 'about', 'blog', 'contact'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const bounds = element.getBoundingClientRect();
          if (bounds.top <= 100 && bounds.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data);
        } else {
          console.error("Blog gönderileri alınamadı:", response.statusText);
        }
      } catch (error) {
        console.error("Blog gönderileri alınırken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Form Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Navigation Links
  const navLinks = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'services', label: 'Hizmetler' },
    { id: 'about', label: 'Hakkımda' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'İletişim' }
  ];

  // Featured blog posts
  const featuredPosts = [
    {
      id: 1,
      title: "Sağlıklı Kilo Vermenin 10 Altın Kuralı",
      excerpt: "Kalıcı ve sağlıklı kilo verme yolculuğunuzda size yardımcı olacak bilimsel temelli öneriler...",
      category: "Kilo Yönetimi",
      date: "2024-03-15",
      readTime: "5 dk",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Bağışıklık Sistemini Güçlendiren Besinler",
      excerpt: "Doğal yollarla bağışıklığınızı güçlendirmek için tüketmeniz gereken süper besinler...",
      category: "Bağışıklık",
      date: "2024-03-10",
      readTime: "4 dk",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Sporcu Beslenmesinde Dikkat Edilmesi Gerekenler",
      excerpt: "Performansınızı artırmak için beslenme düzeninizi nasıl optimize edebilirsiniz?",
      category: "Spor Beslenmesi",
      date: "2024-03-05",
      readTime: "6 dk",
      image: "/api/placeholder/400/250"
    }
  ];

  // Services Data
  const services = [
    {
      title: "Kişisel Beslenme",
      price: "750₺",
      icon: <User className="w-6 h-6" />,
      features: [
        "Kişiye özel plan",
        "Haftalık görüşme",
        "Online takip",
        "E-posta desteği"
      ]
    },
    {
      title: "VIP Paket",
      price: "1500₺",
      icon: <Star className="w-6 h-6" />,
      features: [
        "Tam kapsamlı analiz",
        "Sınırsız görüşme",
        "7/24 destek",
        "Ev/ofis ziyareti"
      ]
    },
    {
      title: "Sporcu Paketi",
      price: "1000₺",
      icon: <Heart className="w-6 h-6" />,
      features: [
        "Performans programı",
        "Supleman planı",
        "Antrenman desteği",
        "Haftalık ölçüm"
      ]
    }
  ];

  // Statistics Data
  const stats = [
    { number: "500+", label: "Mutlu Danışan" },
    { number: "10+", label: "Yıllık Deneyim" },
    { number: "%95", label: "Başarı Oranı" }
  ];
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-[#00CED1]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00CED1] to-[#00B4B7] bg-clip-text text-transparent">
                Dyt. Betül Ozan
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                link.href ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors text-gray-600 hover:text-[#00CED1]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => {
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(link.id);
                    }}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors
                      ${activeSection === link.id ? 'text-[#00CED1]' : 'text-gray-600 hover:text-[#00CED1]'}`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#00CED1] transform origin-left transition-transform duration-300
                      ${activeSection === link.id ? 'scale-x-100' : 'scale-x-0'}`} />
                  </button>
                )
              ))}
              <Link 
                href="/randevu"
                className="px-6 py-2.5 bg-gradient-to-r from-[#00CED1] to-[#00B4B7] text-white rounded-full hover:shadow-lg hover:shadow-[#00CED1]/20 transition-all duration-300 transform hover:scale-105"
              >
                Randevu Al
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg md:hidden animate-fade-in">
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                link.href ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-600 hover:text-[#00CED1] py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => {
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(link.id);
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-[#00CED1] py-2 transition-colors"
                  >
                    {link.label}
                  </button>
                )
              ))}
              <Link 
                href="/randevu"
                className="w-full py-3 bg-gradient-to-r from-[#00CED1] to-[#00B4B7] text-white rounded-lg text-center"
              >
                Randevu Al
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00CED1]/10 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#00CED1]" />
            <span className="text-sm font-medium text-[#00CED1]">
              Sağlıklı Yaşama Merhaba
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-[#00CED1] to-[#00B4B7] bg-clip-text text-transparent">
              Beslenme
            </span>
            <br />
            Danışmanlığı
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 animate-fade-in">
            Kişiye özel beslenme programları ile ideal kilonuza ulaşın ve sağlıklı yaşam tarzınızı oluşturun.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-gradient-to-r from-[#00CED1] to-[#00B4B7] text-white rounded-full hover:shadow-lg hover:shadow-[#00CED1]/20 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                Ücretsiz Danışma
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-[#00CED1] rounded-full border-2 border-[#00CED1] hover:bg-[#F0FFFF] transition-all duration-300"
            >
              Programları İncele
            </button>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00CED1] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00B4B7] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-float animation-delay-2000"></div>
      </section>
{/* Services Section */}
<section id="services" className="py-20 px-6 bg-gradient-to-b from-white to-[#F0FFFF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00CED1] to-[#00B4B7] bg-clip-text text-transparent">
                Beslenme Programları
              </span>
            </h2>
            <p className="text-gray-600">Size özel hazırlanmış programlar ile hedeflerinize ulaşın</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl transition-all duration-300 ${
                  hoveredCard === index
                    ? 'bg-gradient-to-b from-[#00CED1] to-[#00B4B7] text-white transform -translate-y-2'
                    : 'bg-white shadow-lg hover:shadow-xl'
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                    hoveredCard === index ? 'bg-white text-[#00CED1]' : 'bg-[#F0FFFF] text-[#00CED1]'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                
                <p className={`text-3xl font-bold mb-6 ${
                  hoveredCard === index ? 'text-white' : 'text-[#00CED1]'
                }`}>
                  {service.price}
                </p>
                
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className={`w-5 h-5 ${
                        hoveredCard === index ? 'text-white' : 'text-[#00CED1]'
                      }`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/randevu"
                  className={`block w-full py-3 px-6 rounded-lg text-center transition-all duration-300 ${
                    hoveredCard === index
                      ? 'bg-white text-[#00CED1] hover:bg-opacity-90'
                      : 'bg-gradient-to-r from-[#00CED1] to-[#00B4B7] text-white hover:shadow-lg hover:shadow-[#00CED1]/20'
                  }`}
                >
                  Programı Seç
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00CED1] to-[#00B4B7] bg-clip-text text-transparent">
                Hakkımda
              </span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              10 yılı aşkın deneyimimle, bilimsel ve güncel yaklaşımları kullanarak
              sağlıklı beslenme konusunda danışanlarıma destek oluyorum.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-4xl font-bold text-[#00CED1] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-6 bg-gradient-to-b from-white to-[#F0FFFF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00CED1] to-[#00B4B7] bg-clip-text text-transparent">
                Sağlıklı Yaşam Blogu
              </span>
            </h2>
            <p className="text-gray-600 mb-8">
              En son beslenme önerileri, sağlıklı tarifler ve yaşam tarzı ipuçları
            </p>
          </div>

          {/* Featured Posts */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800">Öne Çıkan Yazılar</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-[#00CED1] bg-[#F0FFFF] px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock3 className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('tr-TR')}
                    </span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-[#00CED1] hover:text-[#00B4B7] transition-colors flex items-center gap-1"
                    >
                      Devamını Oku
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-gray-800">Son Yazılar</h3>
            {loading ? (
              <div className="text-center py-12">
                <p>Yükleniyor...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-12">
                <p>Henüz blog yazısı bulunmuyor.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-[#00CED1] bg-[#F0FFFF] px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#00CED1] hover:text-[#00B4B7] transition-colors flex items-center gap-1"
                    >
                      Devamını Oku
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* View All Posts Button */}
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00CED1] text-white rounded-lg hover:bg-[#00B4B7] transition-colors"
            >
              Tüm Yazıları Gör
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-[#F0FFFF] to-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00CED1] to-[#00B4B7] bg-clip-text text-transparent">
                İletişime Geçin
              </span>
            </h2>
            <p className="text-gray-600">Sorularınız için bize ulaşın</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Adınız"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="E-posta"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <textarea
              placeholder="Mesajınız"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#00CED1] to-[#00B4B7] text-white rounded-lg hover:shadow-lg hover:shadow-[#00CED1]/20 transition-all duration-300"
            >
              Gönder
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#00CED1] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Dyt. Betül Ozan</h3>
              <p className="text-white/80">
                Sağlıklı yaşam için profesyonel beslenme danışmanlığı
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">İletişim</h3>
              <div className="space-y-2 text-white/80">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@betulozan.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+90 (555) 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Nişantaşı, İstanbul</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Sosyal Medya</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white/80 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-white/80 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/80">
            <p>&copy; 2024 Dyt. Betül Ozan. Tüm hakları saklıdır.</p>
            <Link 
              href="/admin/login" 
              className="text-white/40 text-sm hover:text-white/60 transition-colors mt-2 inline-block"
            >
              Admin Girişi
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TurkuazDietitianWebsite;