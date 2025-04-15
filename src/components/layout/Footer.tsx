
const Footer = () => {
  return (
    <footer className="mt-auto px-4 py-6 border-t">
      <div className="container mx-auto">
        {/* Ad space - Bottom banner */}
        <div className="w-full h-[90px] bg-gray-100 flex items-center justify-center border rounded-md mb-6">
          <span className="text-muted-foreground text-sm">Advertisement Space</span>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Disclaimer</h3>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              Clip-it-now is designed for downloading content for personal use only. 
              Please respect copyright laws and the rights of content creators. 
              Do not download or share copyrighted content without authorization.
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-2 mt-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Clip-it-now. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
