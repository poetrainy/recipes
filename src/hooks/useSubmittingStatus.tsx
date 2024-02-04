import { useNavigation } from "react-router-dom";

export const useSubmittingStatus = () => {
  const navigation = useNavigation();

  return {
    isLoadingOrIsSubmitting:
      navigation.state !== "idle" && navigation.formAction != null,
  };
};
