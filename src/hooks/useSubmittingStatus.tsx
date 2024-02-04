import { useNavigation } from "react-router-dom";

export const useSubmittingStatus = () => {
  const navigation = useNavigation();
  const isLoadingOrIsSubmitting =
    navigation.state !== "idle" && navigation.formAction != null;

  return {
    isLoadingOrIsSubmitting,
    intent:
      isLoadingOrIsSubmitting && navigation.formData
        ? (navigation.formData.get("intent") as string | null)
        : null,
  };
};
