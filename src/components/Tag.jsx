export default function SkillTag({ text, size = 'normal' }) {
  const baseClasses = "inline-flex items-center rounded-full bg-white text-gray-700 font-semibold";
  
  const sizeClasses = {
    small: "px-2.5 py-1 text-sm",
    normal: "px-3 py-1 text-base"
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]}`}>
      {text}
    </span>
  );
} 