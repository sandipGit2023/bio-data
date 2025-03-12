import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface TabContentProps {
  activeTab: string;
}

export default function TabContent({ activeTab }: TabContentProps) {
  const { t, i18n } = useTranslation();

  const contentVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const renderContent = () => {
    const values = {
      personal: {
        en: {
          name: "John Doe",
          dob: "01/01/1990",
          education: "Masters in Computer Science",
          occupation: "Software Engineer",
          height: "5'10''",
          birthPlace: "New York",
          maritalStatus: "Single"
        },
        gu: {
          name: "જોન ડો",
          dob: "૦૧/૦૧/૧૯૯૦",
          education: "કમ્પ્યુટર સાયન્સમાં માસ્ટર્સ",
          occupation: "સોફ્ટવેર એન્જિનિયર",
          height: "૫'૧૦''",
          birthPlace: "ન્યૂયોર્ક",
          maritalStatus: "અપરિણીત"
        }
      },
      family: {
        en: {
          fatherName: "Robert Doe",
          fatherOccupation: "Business Owner",
          motherName: "Mary Doe",
          motherOccupation: "Teacher",
          siblings: "2 Brothers, 1 Sister"
        },
        gu: {
          fatherName: "રોબર્ટ ડો",
          fatherOccupation: "વ્યવસાય માલિક",
          motherName: "મેરી ડો",
          motherOccupation: "શિક્ષક",
          siblings: "૨ ભાઈઓ, ૧ બહેન"
        }
      },
      maternal: {
        en: {
          grandfatherName: "William Smith",
          grandmotherName: "Elizabeth Smith",
          maternalUncle: "James Smith",
          maternalAunt: "Sarah Johnson"
        },
        gu: {
          grandfatherName: "વિલિયમ સ્મિથ",
          grandmotherName: "એલિઝાબેથ સ્મિથ",
          maternalUncle: "જેમ્સ સ્મિથ",
          maternalAunt: "સારાહ જોન્સન"
        }
      },
      contact: {
        en: {
          phone: "+1 (555) 123-4567",
          email: "john.doe@example.com",
          address: "123 Main Street",
          city: "New York",
          state: "NY"
        },
        gu: {
          phone: "+૧ (૫૫૫) ૧૨૩-૪૫૬૭",
          email: "john.doe@example.com",
          address: "૧૨૩ મેઈન સ્ટ્રીટ",
          city: "ન્યૂયોર્ક",
          state: "એનવાય"
        }
      }
    };

    const currentLang = i18n.language as 'en' | 'gu';
    const currentValues = values[activeTab as keyof typeof values][currentLang];

    const renderFields = (fields: Record<string, string>) => (
      <div className="space-y-4">
        {Object.entries(fields).map(([key, value], index) => (
          <Field 
            key={key} 
            label={t(`${activeTab}.${key}`)} 
            value={value}
            index={index}
          />
        ))}
      </div>
    );

    return renderFields(currentValues);
  };

  return (
    <motion.div
      variants={contentVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="h-[calc(100%-4.5rem)] overflow-y-auto p-6"
    >
      {renderContent()}
    </motion.div>
  );
}

function Field({ label, value, index }: { label: string; value: string; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-4 rounded-xl transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-xl group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-300" />
      <div className="relative">
        <span className="block text-sm font-medium text-white/60 mb-1">{label}</span>
        <span className="text-lg text-white group-hover:text-white/90 transition-colors duration-300">{value}</span>
      </div>
    </motion.div>
  );
}