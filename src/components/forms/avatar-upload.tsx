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
        <div className="relative flex flex-col items-end w-20 h-20 border rounded-md">
            {/* <label className="mb-1 font-medium text-center">Foto</label> */}
            <div
                onClick={handleClick}
                className=" rounded cursor-pointer flex items-center justify-center w-full h-full"
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="absolute h-full w-full object-cover rounded-md"
                    />
                ) : (
                    <span className="text-gray-500 text-[10px] text-center">selecionar imagem</span>
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
