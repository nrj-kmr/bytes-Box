export const Footer = () => {
   return (
      <div>
         <div className="bottom-0 relative bg-gray-300 dark:bg-slate-800 py-1.5">
            <div className="grid grid-cols-3 gap-4 px-10 mx-2 mb-1 py-4 bg-gray-200 dark:bg-slate-700 rounded-lg">
               <div>
                  <h4 className="font-semibold text-sm mb-2">About</h4>
                  <p className="text-xs text-gray-700 dark:text-gray-300">BytesBox is an IDE that runs inside a Browser.</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300">Built to Build.</p>
               </div>
               <div className="flex flex-col items-center">
                  <h4 className="font-semibold text-sm mb-2">Links</h4>
                  <a href="https://github.com/nrj-kmr/bytes-Box/blob/main/apps/docs/system-architecture.md" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Docs</a>
                  <a href="/blogs" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Blog</a>
               </div>
               <div className="flex flex-col items-end">
                  <h4 className="font-semibold text-sm mb-2">Contact</h4>
                  <a href="mailto:faaltuhaikya@gmail.com" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">hello@bytesbox.com</a>
               </div>
            </div>
            <p className="w-full text-center text-xs text-foreground">All rights reserved, Copyright &copy; 2025 - BytesBox</p>
         </div>
      </div>
   );
};