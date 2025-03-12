import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, User, Users, Heart, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageCarousel from './components/ImageCarousel';
import TabContent from './components/TabContent';
import './i18n/i18n';

function App() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('personal');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'gu' : 'en');
  };

  const tabs = [
    { id: 'personal', label: t('tabs.personal'), icon: User },
    { id: 'family', label: t('tabs.family'), icon: Users },
    { id: 'maternal', label: t('tabs.maternal'), icon: Heart },
    { id: 'contact', label: t('tabs.contact'), icon: Phone }
  ];

  const nextTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    setActiveTab(tabs[(currentIndex + 1) % tabs.length].id);
  };

  const prevTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    setActiveTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length].id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Decorative Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(circle_500px_at_50%_50%,rgba(120,119,198,0.3),transparent)]" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle_500px_at_50%_50%,rgba(67,56,202,0.3),transparent)]" />
        </div>

        {/* Header - Biodata Profile & Language Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-row justify-between items-center mb-12 gap-4"
        >
          {/* Biodata Profile Heading - Left Aligned in Mobile */}
          <div className="relative flex-1">
            <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight">
              {i18n.language === 'en' ? 'Biodata Profile' : 'બાયોડેટા પ્રોફાઇલ'}
            </h1>
            <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-indigo-500 to-transparent rounded-full" />
          </div>

          {/* Toggle Language Button - Small Icon for Mobile, Full Button for Desktop */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="relative group px-3 py-2 rounded-full overflow-hidden md:px-6 md:py-3"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center text-white">
              {isMobile ? (
                <Languages size={20} />
              ) : (
                <>
                  <Languages size={20} />
                  <span className="ml-2 font-medium">{i18n.language === 'en' ? 'ગુજરાતી' : 'English'}</span>
                </>
              )}
            </div>
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section - Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group rounded-3xl overflow-hidden h-[450px] md:h-[750px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 z-10 mix-blend-overlay" />
            <ImageCarousel />
          </motion.div>

          {/* Right Section - Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 h-[450px] md:h-[750px]"
          >
            {/* Tab Navigation */}
            <div className="relative p-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              {isMobile ? (
                <div className="flex justify-between items-center px-4">
                  <button onClick={prevTab} className="text-white/70 hover:text-white">
                    <ChevronLeft size={24} />
                  </button>
                  <div className="flex items-center gap-2 text-white">
                    {(() => {
                      const Icon = tabs.find(tab => tab.id === activeTab)?.icon;
                      return Icon ? <Icon size={18} /> : null;
                    })()}
                    <span className="font-medium">{tabs.find(tab => tab.id === activeTab)?.label}</span>
                  </div>
                  <button onClick={nextTab} className="text-white/70 hover:text-white">
                    <ChevronRight size={24} />
                  </button>
                </div>
              ) : (
                <div className="flex space-x-1">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 overflow-hidden ${
                          activeTab === tab.id ? 'text-white' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
                            initial={false}
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span className="relative flex items-center gap-2">
                          <Icon size={18} />
                          <span className="font-medium">{tab.label}</span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <TabContent key={activeTab} activeTab={activeTab} />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;