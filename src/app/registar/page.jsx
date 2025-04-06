'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, Coffee, Mail, MessageCircle, Plus, Trash2 } from 'lucide-react';

// Available skills for selection
const AVAILABLE_SKILLS = [
  'プロジェクト管理', 'アジャイル開発', 'チームビルディング', 'デジタルマーケティング', 
  'コンテンツ戦略', 'リーダーシップ', 'コミュニケーション', '問題解決', 'データ分析',
  'プレゼンテーション', '戦略立案', 'リスク管理', '品質管理', '予算管理', 
  'チェンジマネジメント', 'ステークホルダー管理', 'タイムマネジメント', 'コーチング',
  'ファシリテーション', 'ネゴシエーション'
];

const DAYS_OF_WEEK = ['月', '火', '水', '木', '金', '土', '日'];
const CONSULTATION_TYPES = ['Teams', 'メール', 'オンライン', '対面'];

const WELCOME_MESSAGES = [
  '相談歓迎！一緒に解決策を見つけましょう',
  '初心者ですが、お話なら全然聞きます！',
  '仲間づくり大歓迎！一緒に成長しましょう',
  '本好きなので、読書会歓迎です',
  'キャリアについて一緒に考えましょう',
  '気軽にお話しましょう！',
  '新しい視点を一緒に見つけましょう',
  '失敗談から学んだことをシェアできます',
  'プロジェクトの相談、いつでもどうぞ',
  'チーム作りについて話し合いましょう',
  'リーダーシップについて語り合いましょう',
  '業界の最新トレンドについて話しましょう',
  'スキルアップの方法を共有します',
  'メンタリングを通じて共に成長しましょう',
  'アイデアを出し合って新しい解決策を',
  'コミュニケーションスキルを高めましょう',
  '目標達成のサポートをさせていただきます',
  'モチベーション維持のコツを共有します',
  'ワークライフバランスについて話しましょう',
  'キャリアプランニングのアドバイスができます'
];

function RegisterPage() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    department: '',
    position: '',
    yearsOfService: 1,
    employmentType: '新卒',
    skills: [],
    consultationDays: [],
    consultationTimeStart: '',
    consultationTimeEnd: '',
    consultationType: [],
    welcomeMessage: '',
    experiences: [],
    message: ''
  });

  const [isWelcomeMessageOpen, setIsWelcomeMessageOpen] = useState(false);
  const welcomeMessageRef = useRef(null);

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const queryParams = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => queryParams.append(key, item));
        } else {
          queryParams.append(key, value);
        }
      });
      window.location.href = `/registar/confirm?${queryParams.toString()}`;
    }
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

  return (
    <div className="min-h-screen bg-[#f5f1eb] text-gray-800">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-8">
          <h1 className="text-2xl font-semibold text-[#4a4541] mb-6">プロフィール登録</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4a4541] mb-1">
                  姓<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-[#e6dfd4] focus:ring-[#6b635d]'
                  }`}
                  required
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4a4541] mb-1">
                  名<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-[#e6dfd4] focus:ring-[#6b635d]'
                  }`}
                  required
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4a4541] mb-1">
                メールアドレス<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-[#e6dfd4] focus:ring-[#6b635d]'
                }`}
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4a4541] mb-1">
                  部署<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.department ? 'border-red-500 focus:ring-red-500' : 'border-[#e6dfd4] focus:ring-[#6b635d]'
                  }`}
                  required
                />
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4a4541] mb-1">
                  役職<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.position ? 'border-red-500 focus:ring-red-500' : 'border-[#e6dfd4] focus:ring-[#6b635d]'
                  }`}
                  required
                />
                {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4a4541] mb-1">
                  採用区分<span className="text-red-500 ml-1">*</span>
                </label>
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
                <label className="block text-sm font-medium text-[#4a4541] mb-1">
                  社歴（年目）<span className="text-red-500 ml-1">*</span>
                </label>
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
                    name="yearsOfService"
                    value={formData.yearsOfService}
                    onChange={(e) => handleInputChange('yearsOfService', e.target.value)}
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
              <label className="block text-sm font-medium text-[#4a4541] mb-1">
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
              <label className="block text-sm font-medium text-[#4a4541] mb-3">相談可能日</label>
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
                <label className="block text-sm font-medium text-[#4a4541] mb-1">相談可能時間（開始）</label>
                <input
                  type="time"
                  name="consultationTimeStart"
                  value={formData.consultationTimeStart}
                  onChange={(e) => handleInputChange('consultationTimeStart', e.target.value)}
                  className="w-full px-3 py-2 border border-[#e6dfd4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b635d]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4a4541] mb-1">相談可能時間（終了）</label>
                <input
                  type="time"
                  name="consultationTimeEnd"
                  value={formData.consultationTimeEnd}
                  onChange={(e) => handleInputChange('consultationTimeEnd', e.target.value)}
                  className="w-full px-3 py-2 border border-[#e6dfd4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b635d]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4a4541] mb-3">相談形式</label>
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
                <label className="block text-sm font-medium text-[#4a4541]">経験・実績</label>
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
              <label className="block text-sm font-medium text-[#4a4541] mb-1">相談Welcomeメッセージ</label>
              <div className="relative" ref={welcomeMessageRef}>
                <button
                  type="button"
                  onClick={() => setIsWelcomeMessageOpen(!isWelcomeMessageOpen)}
                  className="w-full px-3 py-2 border border-[#e6dfd4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b635d] text-left text-[#6b635d] bg-white flex justify-between items-center"
                >
                  <span>{formData.welcomeMessage || 'メッセージを選択してください'}</span>
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
              <label className="block text-sm font-medium text-[#4a4541] mb-1">自己紹介メッセージ</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-[#e6dfd4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b635d]"
                placeholder="相談者へのメッセージを入力してください"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6b635d] text-white py-3 rounded-lg hover:bg-[#4a4541] transition-colors font-medium"
            >
              登録する
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;