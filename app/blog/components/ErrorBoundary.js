'use client';

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Blog error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Bir şeyler yanlış gitti
              </h1>
              <p className="text-gray-600 mb-4">
                {this.state.error?.message || 'Beklenmeyen bir hata oluştu'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#00CED1] text-white rounded-lg hover:bg-[#00B4B7]"
              >
                Sayfayı Yenile
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;