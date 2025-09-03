// /src/components/Navigation.tsx
import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../state/AuthProvider';

type Props = {
  onOpenAuth?: () => void;
  onOpenAccount?: () => void;
};

const Navigation: React.FC<Props> = ({ onOpenAuth, onOpenAccount }) => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: 'Explore Experiences', id: 'experiences' },
    { label: 'About Miles', id: 'about' },
    // All Tours は削除（Explore と同義だったため）
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact Us', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-orange-500' : 'text-white'}`}
          >
            Miles
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors duration-300 hover:text-orange-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Auth buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenAccount?.()}
                  className={`${isScrolled ? 'text-gray-700' : 'text-white'} font-medium hover:text-orange-500`}
                >
                  My Account
                </button>
                <button
                  onClick={signOut}
                  className="px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth?.()}
                className="px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
              >
                Log in
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white hover:bg-opacity-20'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                {user ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => { onOpenAccount?.(); setIsOpen(false); }}
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                      My Account
                    </button>
                    <button
                      onClick={() => { signOut(); setIsOpen(false); }}
                      className="flex-1 px-3 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { onOpenAuth?.(); setIsOpen(false); }}
                    className="w-full px-3 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
