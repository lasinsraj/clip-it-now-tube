
import { GradientText } from "../ui/gradient-text";

const Header = () => {
  return (
    <header className="px-4 py-6 w-full">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <svg 
            className="h-8 w-8 text-youtube" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <GradientText className="text-3xl font-bold">Clip-it-now</GradientText>
        </div>
        <p className="text-muted-foreground text-center max-w-2xl">
          Download your favorite YouTube videos and music quickly and easily
        </p>
        
        {/* Ad space - Top banner */}
        <div className="w-full h-[90px] bg-gray-100 flex items-center justify-center border rounded-md my-2">
          <span className="text-muted-foreground text-sm">Advertisement Space</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
