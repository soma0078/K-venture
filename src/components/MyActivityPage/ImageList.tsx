import ImageCard from './ImageCard';
import ImageInput from './ImageInput';

interface ImageListProps {
  imageFiles: File[];
  maxLength: number;
  onAddImage: (f: File) => void;
  onDeleteImage: (f: File) => void;
}

export default function ImageList({
  imageFiles,
  maxLength,
  onAddImage,
  onDeleteImage,
}: ImageListProps) {
  return (
    <ul className="flex w-full flex-wrap gap-2 pc:gap-6 tablet:gap-4">
      <ImageInput
        disabled={imageFiles.length >= maxLength}
        onChange={onAddImage}
      />
      {imageFiles.map((file) => (
        <ImageCard image={file} onClickDelete={onDeleteImage} />
      ))}
    </ul>
  );
}
