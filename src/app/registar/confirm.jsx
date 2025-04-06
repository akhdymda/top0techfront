'use client';

import React from 'react';
import { Calendar, Clock, Coffee, Mail, MessageCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSearchParams } from 'next/navigation';

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const formData = {
    lastName: searchParams.get('lastName') || '',
    firstName: searchParams.get('firstName') || '',
    email: searchParams.get('email') || '',
    department: searchParams.get('department') || '',
    position: searchParams.get('position') || '',
    yearsOfService: searchParams.get('yearsOfService') || '',
    employmentType: searchParams.get('employmentType') || '',
    skills: searchParams.getAll('skills') || [],
    consultationDays: searchParams.getAll('consultationDays') || [],
    consultationTimeStart: searchParams.get('consultationTimeStart') || '',
    consultationTimeEnd: searchParams.get('consultationTimeEnd') || '',
    consultationType: searchParams.getAll('consultationType') || [],
    welcomeMessage: searchParams.get('welcomeMessage') || '',
    experiences: searchParams.getAll('experiences').map(exp => JSON.parse(exp)) || [],
    message: searchParams.get('message') || ''
  };

  const handleTeamsClick = () => {
    window.open('msteams://', '_blank');
  };

  const handleEmailClick = () => {
    window.open(`mailto:${formData.email}`, '_blank');
  };

  const handleConfirm = () => {
    window.location.href = '/search';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-[#f5f1eb] text-[#6b635d] pt-16">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-[#4a4541] mb-6">登録内容の確認</h1>
          
          {/* Profile Header */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-[#e6dfd4] p-8 mb-6">
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
                  <p className="text-[#6b635d] bg-[#faf7f2] p-4 rounded-lg text-sm border border-[#e6dfd4]">
                    <span className="font-medium text-[#4a4541]">{formData.welcomeMessage}</span>
                    <br />
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
                  <div className="flex items-end gap-2 mb-2">
                    <div className="text-4xl font-bold text-[#4a4541]">0</div>
                    <div className="bg-[#6b635d] rounded-full w-8 h-8 flex items-center justify-center mb-1">
                      <span className="text-white text-xs font-bold">TY</span>
                    </div>
                  </div>
                  <div className="text-sm text-[#6b635d]">今月獲得ポイント</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-[#e6dfd4] text-[#4a4541] rounded-lg hover:bg-[#d8cfc2] transition-colors"
            >
              戻る
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-[#6b635d] text-white rounded-lg hover:bg-[#4a4541] transition-colors"
            >
              登録を確定する
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 