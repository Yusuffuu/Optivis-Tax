import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, X, FileText, AlertCircle, CheckCircle, Shield, Sparkles } from 'lucide-react';
import Modal from '../ui/Modal';

export default function RequestServiceModal({ isOpen, onClose, service }) {
    const [files, setFiles] = useState([]);
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...uploadedFiles.map(f => ({
            name: f.name,
            size: (f.size / 1024 / 1024).toFixed(2) + ' MB'
        }))]);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = (data) => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            reset();
            setFiles([]);
            onClose();
        }, 2200);
    };

    if (!service) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Engagement Request: ${service.title}`} size="lg">
            {success ? (
                <div className="text-center py-10">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-primary mb-1">Engagement Request Submitted!</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        An Optivis Senior Associate has received your file and will review your documentation within 24 business hours.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                        <div>
                            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">Selected Package</span>
                            <p className="font-bold text-primary text-sm">{service.title}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">Starting Retainer</span>
                            <p className="font-bold font-serif text-primary text-sm">KSh {service.basePrice?.toLocaleString()}</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Engagement Objective & Tax Requirements *
                        </label>
                        <textarea
                            {...register('description', { required: 'Please specify your tax requirements' })}
                            rows={4}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all font-sans"
                            placeholder="Provide a brief overview of your business entity, filing period, or specific tax advisory questions..."
                        />
                        {errors.description && (
                            <p className="text-rose-500 text-xs mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Desired Turnaround
                            </label>
                            <select
                                {...register('urgency')}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                            >
                                <option value="normal">Standard Review (1-2 weeks)</option>
                                <option value="urgent">Expedited Audit (2-5 business days)</option>
                                <option value="emergency">Critical Statutory Deadline (24 hours)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Preferred Contact Channel
                            </label>
                            <select
                                {...register('contactMethod')}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                            >
                                <option value="portal">Portal Direct Consultation</option>
                                <option value="email">Official Corporate Email</option>
                                <option value="phone">Direct Telephone / Call</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Upload Financial Statements / Statutory Notices (Optional)
                        </label>
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer block">
                                <Upload className="w-8 h-8 text-gold mx-auto mb-1.5" />
                                <p className="text-xs font-semibold text-slate-700">
                                    Click to attach files or drag & drop
                                </p>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                    PDF, XLS, DOCX (Strictly confidential & 256-bit encrypted)
                                </p>
                            </label>
                        </div>

                        {files.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                                        <div className="flex items-center space-x-2 min-w-0">
                                            <FileText className="w-4 h-4 text-primary shrink-0" />
                                            <span className="font-semibold text-slate-800 truncate">{file.name}</span>
                                            <span className="text-[10px] text-slate-400 font-mono shrink-0">({file.size})</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="text-slate-400 hover:text-rose-500 p-1"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 px-4 bg-linear-to-r from-primary to-primary-600 text-white rounded-xl text-xs font-bold hover:from-primary-600 hover:to-primary-700 shadow-xs transition-all flex items-center justify-center space-x-1.5"
                        >
                            <Shield className="w-3.5 h-3.5 text-gold" />
                            <span>Confirm & Dispatch Request</span>
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
}