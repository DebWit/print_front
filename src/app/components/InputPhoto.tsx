import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

interface InputPhotoProps {
    currentPhoto?: string;
    onChange: (file: File | null) => void;
}

export default function InputPhoto({ currentPhoto, onChange }: InputPhotoProps) {
    const toast = useRef<Toast>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<string | null>(currentPhoto || null);
    const fileUploadRef = useRef<FileUpload>(null);

    useEffect(() => {
        if (currentPhoto) {
            setPreview(currentPhoto);
        }
    }, [currentPhoto]);

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        const file = e.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setPreview(objectURL);
            setFiles([file]);
            onChange(file);
        }
    };

    const onTemplateRemove = () => {
        setPreview(null); 
        setFiles([]);
        onChange(null);
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton} = options;
        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
            </div>
        );
    };

    const itemTemplate = () => {
        return preview ? (
            <div className="flex align-items-center flex-column">
                <img alt="Preview" src={preview} width={200} className="mb-3" />
                <Button
                    type="button"
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger"
                    onClick={onTemplateRemove}
                >
                    Remove
                </Button>
            </div>
        ) : null;
    };

    const emptyTemplate = () => {
        return preview ? (
            itemTemplate()
        ) : (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };

    return (
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />

            <FileUpload
                ref={fileUploadRef}
                name="demo[]"
                accept="image/*"
                maxFileSize={1000000}
                customUpload
                onSelect={onTemplateSelect}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}
                maxfiles={1}
            />
        </div>
    );
}
