import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact – Creator OCR',
    description:
        'Get in touch with the Creator OCR team for feedback, support, or collaboration.'
};

export default function ContactPage() {
    return <ContactClient />;
}
