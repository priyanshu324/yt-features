'use client';

import { useState } from 'react';
import Header from '../components/Header';
import UploadBox from '../components/UploadBox';
import UrlInput from '../components/UrlInput';
import OptionsPanel from '../components/OptionsPanel';
import ActionButton from '../components/ActionButton';
import OutputBox from '../components/OutputBox';
import StatusBanner from '../components/StatusBanner';
import BatchInfo from '../components/BatchInfo';
import OCRHistory from '../components/OCRHistory';
import UsageAnalytics from '../components/UsageAnalytics'; // ✅ NEW
import { uploadOCRFiles, uploadOCRUrl } from '../lib/api';

import { OCRStatus } from '../lib/types';
import { hasValidInput, isValidImageUrl } from '../lib/validators';
import { useOCRStore } from '../store/ocrStore';

export default function OCRClient() {
    const { addRecordOptimistic, refreshHistory } = useOCRStore();

    const [files, setFiles] = useState<FileList | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [language, setLanguage] = useState('auto');

    const [status, setStatus] = useState<OCRStatus>('idle');
    const [error, setError] = useState('');
    const [output, setOutput] = useState('');
    const [addRecord, setAddRecord] = useState();


    const handleSubmit = async () => {
        setError('');
        setOutput('');
        setStatus('processing');

        try {
            // ✅ HARD GUARD (most important fix)
            if (!files?.length && !imageUrl) {
                setError('Please upload a file or provide an image URL.');
            setStatus('error');
            return;
        }

            let result;

            // ✅ FILES → upload endpoint
            if (files && files.length > 0) {
                result = await uploadOCRFiles(Array.from(files), language);
            }
            // ✅ URL → url endpoint
            else if (imageUrl) {
                result = await uploadOCRUrl(imageUrl, language);
            }

            if (!result?.text) {
                throw new Error('No text extracted');
            }

            setOutput(result.text);

            // ✅ update session immediately
            addRecordOptimistic(result.text);

            // ✅ sync with backend history
            await refreshHistory();

            setStatus('success');

        } catch (err: any) {
            setError(err.message || 'Request failed');
            setStatus('error');
        }
    };


    return (
        <>
            <Header />

            <main className="section py-8 sm:py-10 space-y-6">
                {/* Existing OCR UI */}

                <UploadBox onSelect={setFiles} />
                {files?.length ? <BatchInfo fileCount={files.length} /> : null}

                <UrlInput value={imageUrl} onChange={setImageUrl} />
                <OptionsPanel language={language} setLanguage={setLanguage} />

                {status === 'error' && (
                    <StatusBanner type="error" message={error} />
                )}

                <ActionButton
                    onClick={handleSubmit}
                    loading={status === 'processing'}
                    disabled={status === 'validating'}
                />

                <OutputBox text={output} />

                {/* Existing History */}
                <OCRHistory />

                {/* NEW: Usage Analytics */}
                <UsageAnalytics />
            </main>
        </>
    );
}
