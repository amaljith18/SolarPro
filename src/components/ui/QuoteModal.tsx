import { QuoteForm } from '@/components/forms/QuoteForm';
import type { PropertyType } from '@/types';
import { Modal } from './Modal';

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  propertyType?: PropertyType;
}

export function QuoteModal({ open, onClose, propertyType }: QuoteModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title="Get a Free Solar Quote"
      description="Tell us a little about your property and we’ll prepare a no-obligation proposal."
    >
      <QuoteForm defaultPropertyType={propertyType} onDone={onClose} />
    </Modal>
  );
}
