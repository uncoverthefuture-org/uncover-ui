import React, { useEffect, useState } from "react";
import { FormControl, FormControlProps, FormErrorMessage, FormErrorMessageProps, FormHelperText, FormLabel, FormLabelProps, FormHelperTextProps, Input, Box, HStack, Tag, TagLabel, TagCloseButton, Text, Avatar, TagRightIcon, TagProps, TagCloseButtonProps } from "@chakra-ui/react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { startCase } from "lodash";
import { MdCheck, MdEdit } from "react-icons/md";

export interface DropzoneFile {
    name: string,
    data: File,
    isEditing?: boolean;
    isUploading?: boolean;
    isDeleting?: boolean;
}

export interface PrimaryDropzoneItemProps extends PrimaryDropzoneFileProps {
    index: number,

}
export interface PrimaryDropzoneFileProps extends TagProps {
    file: DropzoneFile,
    onRemoveFile?: (file: DropzoneFile) => void,
    onUpdateFile?: (file: DropzoneFile) => void,
    canEditFileName?: boolean,
    extraActionComponent?: React.ReactElement,
    closeButtonProps?: TagCloseButtonProps
}
export interface PrimaryDropzoneProp {
    inputRef?: React.LegacyRef<HTMLInputElement>,
    label?: string;
    isRequired?: boolean;
    isReadOnly?: boolean;
    labelProps?: FormLabelProps;
    formControlProps?: FormControlProps;
    value?: string;
    error?: boolean;
    dropzoneUploadItem?: (props: PrimaryDropzoneItemProps) => React.ReactElement;
    bottomText?: string | React.ReactElement;
    setValue?: (value: string) => void;
    errorTextProps?: FormErrorMessageProps;
    bottomTextProps?: FormHelperTextProps;
    dropzoneText?: string;
    canEditFileName?: boolean;
    onChange?: (files: DropzoneFile[]) => void;
    onFileRemoved?: (name: any, file: File) => void;
    dropzoneOptions?: DropzoneOptions
}

export const PrimaryDropzone: React.FC<PrimaryDropzoneProp> = ({
    inputRef,
    label,
    labelProps,
    setValue,
    error,
    bottomText,
    formControlProps,
    errorTextProps,
    bottomTextProps,
    canEditFileName,
    dropzoneUploadItem,
    dropzoneText = "Drag 'n' drop your files here, or click to select files",
    onChange = () => { },
    onFileRemoved = () => { },
    dropzoneOptions,
    ...rest
}) => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (new_files) => addFiles(new_files),
        ...dropzoneOptions
    });

    useEffect(() => {
        onChange(files);
    }, [files, onChange]);

    const addFiles = (new_files: File[]) => {
        const addedFiles = new_files.map((file) => ({ name: file.name, data: file }));
        setFiles([...files, ...addedFiles])

    }
    const onRemoveFile = (file: DropzoneFile, index: number) => {
        setFiles(files.filter((f, _index) => (f && (_index !== index))));
        onFileRemoved(file.name, file.data)
    }

    const onUpdateFile = (file: DropzoneFile, index: number) => {
        let copy_files = [...files];
        copy_files[index] = file;
        setFiles(copy_files);
    }


    return (
        <FormControl
            isInvalid={error}
            isRequired={rest.isRequired}
            isReadOnly={rest.isReadOnly}
            {...formControlProps}
        >
            {Boolean(label) && (<FormLabel {...labelProps}>{label}</FormLabel>)}

            <Box
                borderStyle={'dashed'}
                borderWidth={1}
                borderColor={'rgb(232, 232, 232)'}
                borderRadius={5}
                padding={2}
            >

                <Box
                    paddingX={{ base: 2, md: 4 }}
                    paddingY={{ base: 4, md: 4 }}
                    textAlign={'center'}
                    borderRadius={5}
                    backgroundColor={'rgb(245, 245, 245)'}
                    {...getRootProps({ className: 'dropzone' })}
                >
                    <input {...getInputProps()} />
                    <Text color={"#bdbdbd"} paddingY={"5"}>
                        {dropzoneText}
                    </Text>
                </Box>
                <HStack
                    spacing={0}
                    shouldWrapChildren={true}
                    wrap={'wrap'}
                >
                    {files.map((file, index) => (
                        dropzoneUploadItem ? dropzoneUploadItem({
                            file,
                            index,
                            onRemoveFile: () => onRemoveFile(file, index),
                            onUpdateFile: (file: any) => onUpdateFile(file, index),
                            canEditFileName
                        }) : (
                            <PrimaryDropzoneFile
                                key={index}
                                file={file}
                                canEditFileName={canEditFileName}
                                onRemoveFile={() => onRemoveFile(file, index)}
                                onUpdateFile={(file: any) => onUpdateFile(file, index)}
                            />
                        )
                    ))}
                </HStack>
            </Box>

            {/* left component goes here  */}
            {Boolean(error && bottomText) && (<FormErrorMessage {...errorTextProps}>{bottomText}</FormErrorMessage>)}
            {Boolean(!error && bottomText) && (<FormHelperText {...bottomTextProps}>{bottomText}</FormHelperText>)}
        </FormControl>
    )
}


export const PrimaryDropzoneFile: React.FC<PrimaryDropzoneFileProps> = ({
    file,
    onRemoveFile = () => { },
    onUpdateFile = () => { },
    extraActionComponent,
    canEditFileName,
    closeButtonProps,
    ...rest
}) => {
    const [editFile, setEditFile] = useState<DropzoneFile>(file);
    const isEditing = editFile?.isEditing;

    useEffect(() => {
        onUpdateFile({ ...file, isEditing });
    }, [editFile, file, isEditing, onUpdateFile]);

    const initUpdateFile = () => {
        onUpdateFile({ ...editFile, isEditing: false });
    }

    const onCancelButtonClicked = () => {
        if (!isEditing) return onRemoveFile(file);
        setEditFile({ ...file, isEditing: false });
    }


    return (
        <Tag
            size={'lg'}
            borderRadius={'md'}
            variant='solid'
            colorScheme='green'
            marginTop={"3"}
            marginRight={"2"}
            {...rest}
        >
            <Avatar
                size='xs'
                colorScheme='whiteAlpha'
                name={file.data.type.replace('image/', '').replace('', ' ')}
                ml={-1}
                mr={2}
            />
            {isEditing && <Input size={'sm'} value={editFile.name} minWidth={'130px'} onChange={({ target }) => setEditFile({ ...editFile, name: target.value })} />}
            {/* show file name and convert bytes to megabytes */}
            {!isEditing && (
                <TagLabel>
                    {startCase(editFile.name)}&nbsp;
                    <span className="text-light fw-light">({(file.data.size / (1024 ** 2)).toFixed(2)}mb)</span>
                </TagLabel>
            )}
            {extraActionComponent}
            {/* show file name and convert bytes to megabytes */}
            {(!isEditing && canEditFileName) && <TagRightIcon as={MdEdit} onClick={() => setEditFile({ ...editFile, isEditing: true })} />}
            {(isEditing && canEditFileName) && <TagRightIcon as={MdCheck} onClick={initUpdateFile} />}
            <TagCloseButton {...closeButtonProps} onClick={onCancelButtonClicked} />
        </Tag>
    )
}