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
  const [formData, setFormData] = useState({
    lastName: '佐藤',
    firstName: '美咲',
    email: 'example@company.com',
    department: 'マーケティング部',
    position: 'プロジェクトマネージャー',
    yearsOfService: 5,
    employmentType: '新卒',
    skills: ['SEO（検索エンジン最適化）', 'コンテンツマーケティング', 'SNSマーケティング', ],
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
      <Header />
      <main className="flex-1 bg-[#f5f1eb] text-[#6b635d] pt-16">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-[#4a4541]">マイページ</h1>
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 bg-[#6b635d] text-white px-4 py-2 rounded-lg hover:bg-[#4a4541] transition-colors"
            >
              <Edit2 size={18} />
              プロフィールを編集
            </button>
          </div>
          
          {/* Profile Header */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-8 mb-6 relative">
            <button
              onClick={() => {
                setIsBookmarked(!isBookmarked);
                if (!isBookmarked) {
                  setBookmarkDate(new Date());
                } else {
                  setBookmarkDate(null);
                }
              }}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2"
            >
              {isBookmarked && (
                <span className="text-sm text-gray-500">
                  {bookmarkDate?.toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  }).replace(/\//g, '/')}
                </span>
              )}
              <Bookmark
                size={24}
                className={isBookmarked ? 'text-[#FF6058] fill-[#FF6058]' : 'text-gray-400'}
              />
            </button>
            <div className="flex items-start gap-8">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
              />
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-2xl font-semibold text-[#4a4541]">{formData.lastName} {formData.firstName}</h1>
                </div>
                <p className="text-[#6b635d] mb-2">{formData.department} / {formData.position}</p>
                <div className="flex gap-3 mb-4">
                  <span className="text-sm bg-[#e6dfd4] text-[#6b635d] px-3 py-1 rounded-full">
                    社歴 {formData.yearsOfService}年目
                  </span>
                  <span className="text-sm bg-[#e6dfd4] text-[#6b635d] px-3 py-1 rounded-full">
                    {formData.employmentType}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#4a4541] block text-center bg-[#e6dfd4] px-6 py-3 rounded-lg">
                    {formData.welcomeMessage}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-[#6b635d] bg-[#faf7f2] p-4 rounded-lg text-sm border border-[#e6dfd4]">
                    {formData.message}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleTeamsClick}
                    className="flex items-center gap-2 bg-[#6b635d] text-white px-4 py-2 rounded-lg hover:bg-[#4a4541] transition-colors"
                  >
                    <MessageCircle size={18} />
                    Teamsで連絡
                  </button>
                  <button 
                    onClick={handleEmailClick}
                    className="flex items-center gap-2 bg-[#e6dfd4] text-[#4a4541] px-4 py-2 rounded-lg hover:bg-[#d8cfc2] transition-colors"
                  >
                    <Mail size={18} />
                    メールで連絡
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">
              {/* Expertise Section */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#4a4541]">得意分野</h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span key={skill} className="bg-[#faf7f2] text-[#6b635d] px-3 py-1 rounded-full text-sm border border-[#e6dfd4]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#4a4541]">経験・実績</h2>
                <ul className="space-y-4">
                  {formData.experiences.map((exp, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="w-1 bg-[#e6dfd4] rounded"></div>
                      <div>
                        <h3 className="font-medium text-[#4a4541]">{exp.title}</h3>
                        <p className="text-[#6b635d] text-sm mt-1">
                          {exp.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Status Section */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#4a4541]">相談可能時間</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[#6b635d]">
                    <Calendar size={18} />
                    <span>{formData.consultationDays.join('・')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#6b635d]">
                    <Clock size={18} />
                    <span>{formData.consultationTimeStart} - {formData.consultationTimeEnd}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#6b635d]">
                    <Coffee size={18} />
                    <span>{formData.consultationType.join(' / ')}</span>
                  </div>
                </div>
              </div>

              {/* Thanks Points Section */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#4a4541]">サンクスポイント</h2>
                <div className="bg-[#faf7f2] rounded-lg p-6 border border-[#e6dfd4]">
                  <div className="flex items-end gap-2 mb-2 ml-auto w-fit">
                    <div className="text-6xl font-bold text-[#4a4541]">50</div>
                    <div className="bg-[#FF6058] rounded-full w-12 h-12 flex items-center justify-center mb-1 shadow-md shadow-gray-600/50">
                      <span className="text-white text-xs font-bold text-center">
                        Thank<br />You
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-[#6b635d]">今月獲得ポイント</div>
                </div>
              </div>
            </div>
          </div>

          {/* Free Comments Section */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#6b635d]/20 p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#6b635d]">CHOTTOひとこと</h2>
            <div className="space-y-4">
              <p className="text-[#6b635d]/80 text-left py-4">
                新しいことに挑戦するのが好きです。私自身も色んな方と一緒に経験を積んでいきたいので、声かけて頂くのは大歓迎です！休日は、走ってます。マラソン仲間も募集中！
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6">プロフィールを編集</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#6b635d] mb-1">姓 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                      errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-[#e6dfd4] focus:ring-[#6b635d]'
                    }`}
                    required
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b635d] mb-1">名 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                      errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-[#e6dfd4] focus:ring-[#6b635d]'
                    }`}
                    required
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6b635d] mb-1">メールアドレス <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-[#e6dfd4] focus:ring-[#6b635d]'
                  }`}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#6b635d] mb-1">部署 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                      errors.department ? 'border-red-500 focus:ring-red-500' : 'border-[#e6dfd4] focus:ring-[#6b635d]'
                    }`}
                    required
                  />
                  {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b635d] mb-1">役職 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                      errors.position ? 'border-red-500 focus:ring-red-500' : 'border-[#e6dfd4] focus:ring-[#6b635d]'
                    }`}
                    required
                  />
                  {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#6b635d] mb-1">採用区分 <span className="text-red-500">*</span></label>
                  <div className="flex items-center h-[42px] gap-6 mt-2">
                    {['新卒', '中途'].map(type => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="employmentType"
                          value={type}
                          checked={formData.employmentType === type}
                          onChange={(e) => handleInputChange('employmentType', e.target.value)}
                          className="text-[#6b635d] focus:ring-[#6b635d]"
                        />
                        <span className="text-sm text-[#6b635d]">{type}</span>
                      </label>
                    ))}
                  </div>
                  {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b635d] mb-1">社歴（年目） <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => handleYearsChange(false)}
                      className="px-3 py-1 bg-[#e6dfd4] text-[#4a4541] rounded-lg hover:bg-[#d8cfc2] transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={formData.yearsOfService}
                      onChange={(e) => handleInputChange('yearsOfService', parseInt(e.target.value))}
                      min="1"
                      className={`w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-center ${
                        errors.yearsOfService ? 'border-red-500 focus:ring-red-500' : 'border-[#e6dfd4] focus:ring-[#6b635d]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => handleYearsChange(true)}
                      className="px-3 py-1 bg-[#e6dfd4] text-[#4a4541] rounded-lg hover:bg-[#d8cfc2] transition-colors"
                    >
                      +
                    </button>
                    <span className="text-sm text-[#6b635d]">年目</span>
                  </div>
                  {errors.yearsOfService && <p className="text-red-500 text-xs mt-1">{errors.yearsOfService}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6b635d] mb-1">
                  得意分野（5つまで選択可能）
                  <span className="text-sm text-[#6b635d] ml-2">
                    {formData.skills.length}/5
                  </span>
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {AVAILABLE_SKILLS.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        formData.skills.includes(skill)
                          ? 'bg-[#6b635d] text-white border-[#6b635d]'
                          : 'bg-[#faf7f2] text-[#6b635d] border-[#e6dfd4] hover:bg-[#e6dfd4]'
                      } ${
                        !formData.skills.includes(skill) && formData.skills.length >= 5
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                      disabled={!formData.skills.includes(skill) && formData.skills.length >= 5}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6b635d] mb-3">相談可能日</label>
                <div className="flex gap-3 justify-center bg-[#faf7f2] rounded-lg p-3 border border-[#e6dfd4]">
                  {DAYS_OF_WEEK.map(day => (
                    <label key={day} className="relative">
                      <input
                        type="checkbox"
                        name="consultationDays"
                        value={day}
                        checked={formData.consultationDays.includes(day)}
                        onChange={handleCheckboxChange}
                        className="sr-only"
                      />
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors ${
                        formData.consultationDays.includes(day)
                          ? 'bg-[#6b635d] text-white'
                          : 'bg-white text-[#6b635d] hover:bg-[#e6dfd4]'
                      }`}>
                        {day}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#6b635d] mb-1">相談可能時間（開始）</label>
                  <input
                    type="time"
                    value={formData.consultationTimeStart}
                    onChange={(e) => handleInputChange('consultationTimeStart', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#6b635d]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b635d] mb-1">相談可能時間（終了）</label>
                  <input
                    type="time"
                    value={formData.consultationTimeEnd}
                    onChange={(e) => handleInputChange('consultationTimeEnd', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#6b635d]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6b635d] mb-3">相談形式</label>
                <div className="flex gap-3 justify-center bg-[#faf7f2] rounded-lg p-3 border border-[#e6dfd4]">
                  {CONSULTATION_TYPES.map(type => (
                    <label key={type} className="relative">
                      <input
                        type="checkbox"
                        name="consultationType"
                        value={type}
                        checked={formData.consultationType.includes(type)}
                        onChange={handleCheckboxChange}
                        className="sr-only"
                      />
                      <div className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
                        formData.consultationType.includes(type)
                          ? 'bg-[#6b635d] text-white'
                          : 'bg-white text-[#6b635d] hover:bg-[#e6dfd4]'
                      }`}>
                        {type}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-[#6b635d]">経験・実績</label>
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="flex items-center gap-2 text-sm text-[#6b635d] hover:text-[#4a4541] transition-colors"
                  >
                    <Plus size={16} />
                    追加
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.experiences.map((exp, index) => (
                    <div key={index} className="relative bg-[#faf7f2] p-4 rounded-lg border border-[#e6dfd4]">
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(index)}
                        className="absolute top-2 right-2 text-[#6b635d] hover:text-[#4a4541] transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                          placeholder="タイトル"
                          className="w-full px-3 py-2 bg-white border border-[#e6dfd4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b635d]"
                        />
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                          placeholder="説明"
                          rows={2}
                          className="w-full px-3 py-2 bg-white border border-[#e6dfd4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b635d]"
                        />
                      </div>
                    </div>
                  ))}
                  {formData.experiences.length === 0 && (
                    <div className="text-center py-8 bg-[#faf7f2] rounded-lg border border-[#e6dfd4] text-[#6b635d]">
                      経験・実績を追加してください
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6b635d] mb-1">相談Welcomeメッセージ</label>
                <div className="relative" ref={welcomeMessageRef}>
                  <button
                    type="button"
                    onClick={() => setIsWelcomeMessageOpen(!isWelcomeMessageOpen)}
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b635d] text-left text-[#6b635d] bg-white flex justify-between items-center"
                  >
                    <span className={`${formData.welcomeMessage ? 'text-lg font-medium text-[#4a4541] bg-[#faf7f2] px-3 py-1 rounded' : ''}`}>
                      {formData.welcomeMessage || 'メッセージを選択してください'}
                    </span>
                    <span className="transform transition-transform">
                      {isWelcomeMessageOpen ? '▲' : '▼'}
                    </span>
                  </button>
                  {isWelcomeMessageOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#e6dfd4] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => handleWelcomeMessageSelect(null)}
                        className="w-full px-3 py-2 text-left hover:bg-[#faf7f2] text-[#6b635d] transition-colors border-b border-[#e6dfd4]"
                      >
                        選択をクリア
                      </button>
                      {WELCOME_MESSAGES.map((message, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleWelcomeMessageSelect(message)}
                          className="w-full px-3 py-2 text-left hover:bg-[#faf7f2] text-[#6b635d] transition-colors"
                        >
                          {message}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6b635d] mb-1">CHOTTOひとこと</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-[#e6dfd4] focus:outline-none focus:ring-2 focus:ring-[#6b635d]"
                  placeholder="相談者へのメッセージを入力してください"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-[#e6dfd4] text-[#4a4541] rounded-lg hover:bg-[#d8cfc2] transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSaveClick}
                  className="px-6 py-2 bg-[#6b635d] text-white rounded-lg hover:bg-[#4a4541] transition-colors"
                >
                  保存する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
