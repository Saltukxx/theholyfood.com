"use client";
import { useState } from 'react';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    adinizSoyadiniz: '',
    telefon: '',
    email: '',
    gorusmeTipi: 'İlk Görüşme',
    selectedDate: '',
    selectedTime: ''
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
          type: 'appointment',
          ...formData
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setFormData({
          adinizSoyadiniz: '',
          telefon: '',
          email: '',
          gorusmeTipi: 'İlk Görüşme',
          selectedDate: '',
          selectedTime: ''
        });
        alert('Randevu talebiniz başarıyla gönderildi!');
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
            placeholder="Adınız Soyadınız"
            required
            value={formData.adinizSoyadiniz}
            onChange={(e) => setFormData({...formData, adinizSoyadiniz: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
          />
        </div>

        <div>
          <input
            type="tel"
            placeholder="Telefon"
            required
            value={formData.telefon}
            onChange={(e) => setFormData({...formData, telefon: e.target.value})}
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
          <select
            value={formData.gorusmeTipi}
            onChange={(e) => setFormData({...formData, gorusmeTipi: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
          >
            <option value="İlk Görüşme">İlk Görüşme</option>
            <option value="Kontrol">Kontrol</option>
            <option value="Danışmanlık">Danışmanlık</option>
          </select>
        </div>

        <div>
          <input
            type="date"
            required
            value={formData.selectedDate}
            onChange={(e) => setFormData({...formData, selectedDate: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
          />
        </div>

        <div>
          <input
            type="time"
            required
            value={formData.selectedTime}
            onChange={(e) => setFormData({...formData, selectedTime: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
          />
        </div>

        <button 
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-4 bg-[#00CED1] text-white rounded-lg hover:bg-[#00B4B7] transition-all duration-300"
        >
          {status === 'sending' ? 'Gönderiliyor...' : 'Randevu Oluştur'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-center">Randevu talebiniz başarıyla gönderildi!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-center">Bir hata oluştu, lütfen tekrar deneyin.</p>
        )}
      </form>
    </div>
  );
}