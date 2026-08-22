import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';
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
        console.log('Request submitted:', { service, ...data, files });
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            reset();
            setFiles([]);
            onClose();
        }, 2000);
    };

    if (!service) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Request: ${service.title}`} size="lg">
            {success ? (
                <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-serif font-bold text-primary mb-2">Request Submitted!</h3>
                    <p className="text-gray-600">Our team will review your request and get back to you shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Describe Your Needs *
                        </label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Please describe the tax service you need..."
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                            <select
                                {...register('urgency')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            >
                                <option value="normal">Normal (1-2 weeks)</option>
                                <option value="urgent">Urgent (2-5 days)</option>
                                <option value="emergency">Emergency (24 hours)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact</label>
                            <select
                                {...register('contactMethod')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            >
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                                <option value="whatsapp">WhatsApp</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Documents (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    PDF, DOC, XLS up to 10MB each
                                </p>
                            </label>
                        </div>

                        {files.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <FileText className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="text-sm font-medium">{file.name}</p>
                                                <p className="text-xs text-gray-500">{file.size}</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-700">
                            By submitting this request, you agree to our terms of service.
                            A tax specialist will review your request within 24 hours.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="btn-primary flex-1">
                            Submit Request
                        </button>
                        <button type="button" onClick={onClose} className="btn-outline flex-1">
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
}