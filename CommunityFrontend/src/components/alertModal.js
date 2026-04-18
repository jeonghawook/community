import React from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

function AlertModal({ isOpen, onClose, onAccept, onCancel, title, message }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          
            <ModalContent >
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{message}</ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onAccept}>
                        계속
                    </Button>
                    <Button ml={3} onClick={onCancel}>
                        취소
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AlertModal;
