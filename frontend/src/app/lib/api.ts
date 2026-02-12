const API = process.env.NEXT_PUBLIC_API_URL;

/* ============================
   Authenticated fetch helper
   ============================ */
export const authFetch = async (
    url: string,
    options: RequestInit = {}
) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Not authenticated');
    }

    const res = await fetch(`${API}${url}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            ...(options.headers || {}),
        },
    });

    // 🔴 Important: expose backend error message if available
    if (!res.ok) {
        let message = 'Request failed';
        try {
            const err = await res.json();
            message = err.message || message;
        } catch {
            // ignore JSON parse error
        }
        throw new Error(message);
    }

    return res.json();
};

/* ============================
   OCR: Upload Files (Image / PDF)
   ============================ */
export const uploadOCRFiles = async (
    files: File[],
    language: string
) => {
    const formData = new FormData();

    // ✅ backend expects "files"
    files.forEach((file) => {
        formData.append('files', file);
    });

    // ✅ CRITICAL FIX (your crash reason)
    formData.append('language', language || 'auto');

    return authFetch('/api/ocr/upload', {
        method: 'POST',
        body: formData,
        // ❌ DO NOT set Content-Type for FormData
    });
};

/* ============================
   OCR: Image URL
   ============================ */
export const uploadOCRUrl = async (
    imageUrl: string,
    language: string
) => {
    return authFetch('/api/ocr/url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imageUrl,
            language: language || 'auto',
        }),
    });
};

/* ============================
   OCR History (User-scoped)
   ============================ */
export const fetchOCRHistory = async () => {
    const res = await authFetch('/api/ocr/history');
    return res.data;
};
