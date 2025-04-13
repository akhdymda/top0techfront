'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, Coffee, Mail, MessageCircle, Edit2, Plus, Trash2, Bookmark } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { WELCOME_MESSAGES } from '../../constants/welcomeMessages';

const AVAILABLE_SKILLS = [
  'Webマーケティング全般', 'SEO（検索エンジン最適化）', 'コンテンツマーケティング', 'SNSマーケティング', 
  '広告運用（PPC・リスティング）', 'メールマーケティング', 'マーケティングオートメーション（MA）', 'データ分析と計測', 'グロースハック',
  'Eコマース・D2Cマーケティング', 'AI・最新テクノロジーの活用'
];

const DAYS_OF_WEEK = ['月', '火', '水', '木', '金', '土', '日'];
const CONSULTATION_TYPES = ['Teams', 'メール', 'オンライン', '対面'];

export default function MyPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isWelcomeMessageOpen, setIsWelcomeMessageOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkDate, setBookmarkDate] = useState(null);
  const welcomeMessageRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: 'example@company.com',
    department: '',
    position: 'プロジェクトマネージャー',
    yearsOfService: 5,
    employmentType: '新卒',
    skills: [],
    consultationDays: ['月', '水', '金'],
    consultationTimeStart: '14:00',
    consultationTimeEnd: '17:00',
    consultationType: ['オンライン', '対面'],
    welcomeMessage: WELCOME_MESSAGES[0],
    message: 'プロジェクト管理やチーム運営について、お気軽にご相談ください。経験を活かしてサポートさせていただきます。',
    experiences: [
      {
        title: '大規模プロジェクトのマネジメント',
        description: '100人規模のチームで新規サービスの立ち上げを担当。スケジュール管理からリスク管理まで一貫して対応。'
      },
      {
        title: 'マーケティング戦略の立案と実行',
        description: '複数の新規サービスのマーケティング戦略を担当。ユーザー獲得からブランディングまで幅広く対応。'
      }
    ]
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/1`);
        const data = await response.json();
        console.log('Fetched user data:', data); // デバッグ用ログ
        setUserData(data);
        
        // Update formData with user data where available
        setFormData(prev => ({
          ...prev,
          lastName: data.name?.split(' ')[0] || '',
          firstName: data.name?.split(' ')[1] || '',
          department: data.department?.name || '',
          position: data.position || prev.position,
          skills: data.skills || [],
          yearsOfService: data.yearsOfService || prev.yearsOfService,
          employmentType: data.joinForm || prev.employmentType,
          welcomeMessage: data.welcome_level || prev.welcomeMessage,
          message: data.message || prev.message,
        }));
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (welcomeMessageRef.current && !welcomeMessageRef.current.contains(event.target)) {
        setIsWelcomeMessageOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.lastName) newErrors.lastName = '姓は必須です';
    if (!formData.firstName) newErrors.firstName = '名は必須です';
    if (!formData.email) newErrors.email = 'メールアドレスは必須です';
    if (!formData.department) newErrors.department = '部署は必須です';
    if (!formData.position) newErrors.position = '役職は必須です';
    if (!formData.employmentType) newErrors.employmentType = '採用区分は必須です';
    if (!formData.yearsOfService) newErrors.yearsOfService = '社歴は必須です';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
        ? [...(prev[name] || []), value]
        : prev[name].filter(item => item !== value)
    }));
  };

  const handleYearsChange = (increment) => {
    setFormData(prev => ({
      ...prev,
      yearsOfService: Math.max(1, prev.yearsOfService + (increment ? 1 : -1))
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => {
      const currentSkills = prev.skills;
      if (currentSkills.includes(skill)) {
        return {
          ...prev,
          skills: currentSkills.filter(s => s !== skill)
        };
      }
      if (currentSkills.length >= 5) {
        return prev;
      }
      return {
        ...prev,
        skills: [...currentSkills, skill]
      };
    });
  };

  const handleWelcomeMessageSelect = (message) => {
    setFormData(prev => ({ ...prev, welcomeMessage: message || '' }));
    setIsWelcomeMessageOpen(false);
  };

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { title: '', description: '' }]
    }));
  };

  const handleRemoveExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      setIsEditing(false);
    }
  };

  const handleTeamsClick = () => {
    // Teams deep link integration
    window.open('msteams://', '_blank');
  };

  const handleEmailClick = () => {
    // Email client integration
    window.open(`mailto:${formData.email}`, '_blank');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="relative flex-1 bg-black text-white pt-16">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-2154/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />

        <div className="relative z-20 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* プロフィールヘッダー */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gray-200 overflow-hidden">
                  {userData?.image_data ? (
                    <img
                      src={`data:${userData.image_data_type};base64,${userData.image_data}`}
                      alt={formData.lastName + formData.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                      {formData.lastName.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                      {formData.lastName} {formData.firstName}
                    </h1>
                    {!isEditing && (
                      <button
                        onClick={handleEditClick}
                        className="inline-flex items-center text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        プロフィールを編集
                      </button>
                    )}
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-sm sm:text-base text-gray-300">{formData.department}</p>
                    <p className="text-sm sm:text-base text-gray-300">{formData.position}</p>
                    <p className="text-sm sm:text-base text-gray-300">
                      社歴：{formData.yearsOfService}年目 ({formData.employmentType})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* スキルと相談可能時間 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">スキル</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs sm:text-sm text-white bg-white/10 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">相談可能時間</h2>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 text-sm sm:text-base text-gray-300">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{formData.consultationDays.join('・')}曜日</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm sm:text-base text-gray-300">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{formData.consultationTimeStart} 〜 {formData.consultationTimeEnd}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm sm:text-base text-gray-300">
                    <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{formData.consultationType.join('・')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* メッセージと経験 */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">メッセージ</h2>
                <p className="text-sm sm:text-base text-gray-300 whitespace-pre-wrap">{formData.message}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">経験</h2>
                <div className="space-y-4 sm:space-y-6">
                  {formData.experiences.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-base sm:text-lg font-medium text-white">{exp.title}</h3>
                      <p className="text-sm sm:text-base text-gray-300">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 連絡手段 */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleTeamsClick}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border-2 border-white/20 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Teamsで相談する
              </button>
              <button
                onClick={handleEmailClick}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border-2 border-white/20 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                メールで相談する
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
