import Image from "next/image";
import { Button } from "../button";

interface UploadImageProps {
  isLoading?: boolean;
  image?: String;
  clearImage?: () => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ isLoading, image, clearImage }) => {
  return (
    <>
      <div className="p-3 rounded border flex items-center justify-around select-none">
        
        <div className="relative h-[100px] w-[100px] bg-gray-200 flex items-center justify-center rounded">
          {image ? (
            <Image
              src={`${image ? image : ""}`}
              alt="Uploaded Product Image"
              fill
              style={{ objectFit: "contain" }}
            />
          ) : (
            "NO IMAGE"
          )}
        </div>
        <Button disabled={isLoading} onClick={clearImage} type="button" variant="destructive">
          Clear Image
        </Button>
        <Button disabled={isLoading} type="button" className="p-0">
          <label
            className="w-full h-full flex items-center justify-center p-3 hover:cursor-pointer"
            htmlFor="imageUpload"
          >
            {isLoading ? "Uploading..." : "Upload Image"}
          </label>
        </Button>
      </div>
    </>
  );
};
export default UploadImage;
