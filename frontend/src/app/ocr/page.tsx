import type { Metadata } from 'next';
import OCRClient from './OCRClient';
import Protected from '../components/Protected';

export const metadata: Metadata = {
    title: 'OCR Tool – Extract Text from Images & PDFs',
    description:
        'Upload images or PDFs and extract text securely using server-side OCR.'
};

export default function OCRPage() {
    return (
        <Protected>
            <OCRClient />
        </Protected>
    );
}
