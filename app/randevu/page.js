"use client";

import React, { useState } from 'react';
import { Calendar, Clock, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'initial', // initial or followup
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  // Get next 14 days for appointment selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) { // Exclude Sundays
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log({
      ...formData,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Randevunuz Oluşturuldu!</h2>
          <p className="text-gray-600 mb-8">
            {selectedDate} tarihinde saat {selectedTime} için randevunuz alınmıştır.
            En kısa sürede sizinle iletişime geçeceğiz.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#00CED1] text-white rounded-lg hover:bg-[#00B4B7] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-[#00CED1] mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Ana Sayfaya Dön
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-[#00CED1] to-[#00B4B7] bg-clip-text text-transparent">
              Randevu Oluştur
            </span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Görüşme Tipi
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="initial">İlk Görüşme</option>
                  <option value="followup">Kontrol</option>
                </select>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tarih Seçin
              </label>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {getAvailableDates().map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`p-2 rounded-lg text-sm ${
                      selectedDate === date
                        ? 'bg-[#00CED1] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {new Date(date).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Saat Seçin
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg text-sm ${
                        selectedTime === time
                          ? 'bg-[#00CED1] text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedDate || !selectedTime}
              className="w-full py-4 bg-gradient-to-r from-[#00CED1] to-[#00B4B7] text-white rounded-lg hover:shadow-lg hover:shadow-[#00CED1]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Randevu Oluştur
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;