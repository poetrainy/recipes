import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps,
  Text,
  Input,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useSubmittingStatus } from "~/hooks/useSubmittingStatus";
import { KEY } from "~/libs/key";

const RecipeDeleteModal: FC<
  Omit<ModalProps, "children"> & {
    onDelete: () => void;
  }
> = ({ isOpen, onClose, onDelete }) => {
  const { isLoadingOrIsSubmitting } = useSubmittingStatus();
  const [key, setKey] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const deleteRecipe = () => {
    if (key !== KEY) {
      setIsInvalid(true);
    }

    onDelete();
  };

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>確認</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>このレシピを削除しますか？この操作は取り消せません。</Text>
          <Input
            type="password"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setIsInvalid(false);
            }}
          />
          {isInvalid && (
            <Text color="red.500" fontSize="12px">
              パスワードが誤っています。
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} fontSize="14px">
            キャンセル
          </Button>
          <Button
            colorScheme="red"
            isLoading={isLoadingOrIsSubmitting}
            isDisabled={isLoadingOrIsSubmitting || !key?.length}
            onClick={() => deleteRecipe()}
            loadingText="削除"
            fontSize="14px"
          >
            削除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RecipeDeleteModal;
