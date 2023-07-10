import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onOpenChange, title, description, children }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent onOpenAutoFocus={(e) => {e.preventDefault()}}>
        <DialogHeader className="text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
