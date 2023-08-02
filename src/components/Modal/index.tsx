import { Modal as ModalBox, ModalOverlay } from '@chakra-ui/react';

import Backup from './Backup';

interface Modal {
  type: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = (props: Modal) => {
  const { type, isOpen, onClose } = props;

  if (!type) return;

  return (
    <ModalBox isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size={{ base: 'full', md: 'sm' }}>
      <ModalOverlay bgColor='rgba(1,1,1,.9)' />
      {type === 'backup' && <Backup />}
    </ModalBox>
  );
};

export default Modal;
