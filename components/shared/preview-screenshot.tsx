import { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ImageDown } from 'lucide-react';
import { captureScreenshot } from '@/utils';
import { useTheme } from 'next-themes';

const PreviewScreenshot = ({
  open,
  setOpen,
}: {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
}) => {
  const { theme } = useTheme();
  return (
    <Dialog
      open={open ? true : false}
      onOpenChange={() => setOpen(open ? '' : open)}
    >
      <DialogContent
        className="h-[600px] max-w-[90vw] rounded-[1rem]"
        style={{
          borderRadius: '1rem',
        }}
        closeClassName=" h-[30px] w-[30px] rounded-full flex  items-center justify-center mobile992:right-[-40px] mobile992:top-0 bg-foreground text-background opacity-100 right-1 top-[-40px]  "
        xSize="h-6 w-6"
        id="capture-modal"
      >
        <DialogHeader>
          <DialogTitle>Globe Graph</DialogTitle>
        </DialogHeader>
        <div className="w-full rounded-[1rem]">
          <Image
            src={open}
            alt="Screenshot"
            fill
            className="h-full w-full rounded-[1rem]"
          />

          <div className="absolute right-5 top-[140px] flex flex-col items-end md:top-7">
            <h1 className="text-base font-bold md:text-lg">Globe Graph</h1>
            <p className="text-xs text-muted-foreground md:text-sm">
              {new Date().toLocaleDateString()}{' '}
              {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div
            id="ignore-capture"
            className="absolute right-11 top-[-40px] mobile992:right-[-40px] mobile992:top-10"
          >
            <Button
              className="h-[30px] w-[30px] rounded-full"
              size="icon"
              onClick={() => {
                captureScreenshot({
                  elementId: 'capture-modal',
                  theme: theme || 'light',
                  callback: () => {},
                  isDownLoad: true,
                });
              }}
            >
              <ImageDown size={18} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewScreenshot;
