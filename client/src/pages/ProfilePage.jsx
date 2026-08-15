import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { profileService } from '../services/api';
import {
  User,
  Mail,
  Phone,
  School,
  BookOpen,
  GitBranch,
  Calendar,
  Github,
  Linkedin,
  Globe,
  Upload,
  FileText,
  Trash2,
  Download,
  Plus,
  X,
  Save,
  CheckCircle2
} from 'lucide-react';

const ProfilePage = () => {
  const { user, updateUserLocal } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    college: user?.college || '',
    degree: user?.degree || '',
    branch: user?.branch || '',
    graduationYear: user?.graduationYear || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    portfolio: user?.portfolio || ''
  });

  const [skills, setSkills] = useState(user?.skills || []);
  const [skillInput, setSkillInput] = useState('');
  const [resume, setResume] = useState(user?.resume || null);
  
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [deletingResume, setDeletingResume] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        college: user.college || '',
        degree: user.degree || '',
        branch: user.branch || '',
        graduationYear: user.graduationYear || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        portfolio: user.portfolio || ''
      });
      setSkills(user.skills || []);
      setResume(user.resume || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      const res = await profileService.updateProfile({
        ...formData,
        skills
      });

      if (res.success && res.data?.user) {
        updateUserLocal(res.data.user);
        showToast('Profile updated successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update profile', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleResumeFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Client-side format & size check
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowed.includes(ext)) {
      showToast('Invalid file format. Please upload PDF, DOC, or DOCX.', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('File size exceeds maximum 5MB limit.', 'error');
      return;
    }

    try {
      setUploadingResume(true);
      const formDataObj = new FormData();
      formDataObj.append('resume', file);

      const res = await profileService.uploadResume(formDataObj);
      if (res.success && res.data?.resume) {
        setResume(res.data.resume);
        updateUserLocal({ resume: res.data.resume });
        showToast('Resume uploaded successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Resume upload failed', 'error');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      setDeletingResume(true);
      const res = await profileService.deleteResume();
      if (res.success) {
        setResume(null);
        updateUserLocal({ resume: null });
        showToast('Resume removed.', 'info');
      }
    } catch (err) {
      showToast(err.message || 'Failed to remove resume', 'error');
    } finally {
      setDeletingResume(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        
        {/* Profile Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden bg-gradient-to-r from-blue-950/40 via-slate-900 to-purple-950/40">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-2xl shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-extrabold text-white text-3xl">
              {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              {formData.name || 'Student Profile'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {user?.email} • {formData.college || 'College N/A'}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              <Badge variant="primary">{formData.degree || 'Degree'} - {formData.branch || 'Branch'}</Badge>
              <Badge variant="purple">Class of {formData.graduationYear || '2026'}</Badge>
              {resume?.fileName && <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3 h-3" /> Resume Verified</Badge>}
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-8">
          
          {/* Section 1: Personal & Contact */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white font-['Outfit'] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" /> Personal & Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                icon={User}
                required
              />
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                icon={Phone}
              />
            </div>
          </div>

          {/* Section 2: Academic Info */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white font-['Outfit'] mb-6 flex items-center gap-2">
              <School className="w-5 h-5 text-purple-400" /> Academic Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="College / Institution"
                name="college"
                value={formData.college}
                onChange={handleChange}
                icon={School}
              />
              <Input
                label="Degree Program"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                icon={BookOpen}
              />
              <Input
                label="Branch / Major"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                icon={GitBranch}
              />
              <Input
                label="Graduation Year"
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                icon={Calendar}
              />
            </div>
          </div>

          {/* Section 3: Technical Skills Chips Manager */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-cyan-400" /> Technical Skills & Technologies
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Type skill and press Add (e.g. React, Node.js, Python)..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <Button type="button" onClick={handleAddSkill} variant="secondary" icon={Plus}>
                Add Skill
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 min-h-[60px]">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Section 4: Portfolio Links */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white font-['Outfit'] mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" /> Social & Developer Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="GitHub URL"
                name="github"
                value={formData.github}
                onChange={handleChange}
                icon={Github}
              />
              <Input
                label="LinkedIn URL"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                icon={Linkedin}
              />
              <Input
                label="Portfolio Website"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                icon={Globe}
              />
            </div>
          </div>

          {/* Section 5: Resume Upload & Management (Multer) */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" /> Resume Management (PDF / DOC / DOCX)
            </h3>

            {resume && resume.fileName ? (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white truncate max-w-xs">{resume.fileName}</h4>
                    <p className="text-[11px] text-slate-400">
                      Uploaded on {new Date(resume.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={resume.filePath ? resume.filePath : '/api/profile/resume'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button type="button" variant="outline" size="sm" icon={Download}>
                      Download / View
                    </Button>
                  </a>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    isLoading={deletingResume}
                    onClick={handleDeleteResume}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-2xl p-8 text-center bg-slate-900/40 transition-colors">
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-white mb-1">Upload Your Latest Resume</h4>
                <p className="text-xs text-slate-400 mb-4">Supported Formats: PDF, DOC, DOCX (Max size: 5MB)</p>

                <label className="inline-flex">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeFileUpload}
                    className="hidden"
                    disabled={uploadingResume}
                  />
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    icon={Upload}
                    isLoading={uploadingResume}
                    onClick={(e) => e.target.previousSibling.click()}
                  >
                    Choose File to Upload
                  </Button>
                </label>
              </div>
            )}
          </div>

          {/* Save Profile Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={Save}
              isLoading={savingProfile}
              className="px-8"
            >
              Save Profile Changes
            </Button>
          </div>

        </form>

      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
