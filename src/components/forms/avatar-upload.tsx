// File: src/components/forms/avatar-upload.tsx
"use client";

import React, { useRef, useState } from "react";

interface AvatarUploadProps {
    onFileSelect: (file: File | null) => void;
}

export default function AvatarUpload({ onFileSelect }: AvatarUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setPreview(URL.createObjectURL(file));
            onFileSelect(file);
        } else {
            setPreview(null);
            onFileSelect(null);
        }
    };

const handleClick = () => {
    fileInputRef.current?.click();
};

    return (
        <div className="flex flex-col items-end h-24 mb-3 p-1">
            {/* <label className="mb-1 font-medium text-center">Foto</label> */}
            <div
                onClick={handleClick}
                className=" rounded cursor-pointer flex items-center w-full h-full justify-end"
            >
                {preview ? (
                <img
                    src={preview}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-md"
                />
                ) : (
                <span className="text-gray-500 text-xs text-center">Clique para selecionar uma imagem</span>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}
