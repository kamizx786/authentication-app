import Image from "next/image";
type AvatarProps = {
  className?: string;
  src: string;
  title: string;
  [key: string]: unknown;
};

const Avatar: React.FC<AvatarProps> = ({ src, title }) => {
  return (
    <div
      className={
        "relative cursor-pointer overflow-hidden rounded-full border border-border-100 h-[38px] w-[38px] border-border-200"
      }
    >
      <Image
        alt={title}
        src={src}
        fill
        sizes="(max-width: 768px) 100vw"
        priority={true}
      />
    </div>
  );
};

export default Avatar;
