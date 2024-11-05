"use client";
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    adiniz: '',
    email: '',
    mesajiniz: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adiniz: formData.adiniz,
          email: formData.email,
          mesajiniz: formData.mesajiniz
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setFormData({
          adiniz: '',
          email: '',
          mesajiniz: ''
        });
        alert('Mesajınız başarıyla gönderildi!');
      } else {
        setStatus('error');
        alert('Bir hata oluştu, lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      alert('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Adınız"
            required
            value={formData.adiniz}
            onChange={(e) => setFormData({...formData, adiniz: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
          />
        </div>
        
        <div>
          <input
            type="email"
            placeholder="E-posta"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
          />
        </div>
        
        <div>
          <textarea
            placeholder="Mesajınız"
            required
            value={formData.mesajiniz}
            onChange={(e) => setFormData({...formData, mesajiniz: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
            rows={4}
          />
        </div>
        
        <button 
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-4 bg-[#00CED1] text-white rounded-lg hover:bg-[#00B4B7] transition-all duration-300"
        >
          {status === 'sending' ? 'Gönderiliyor...' : 'Gönder'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-center">Mesajınız başarıyla gönderildi!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-center">Bir hata oluştu, lütfen tekrar deneyin.</p>
        )}
      </form>
    </div>
  );
}