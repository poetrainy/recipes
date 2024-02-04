import { CreateToastFnReturn } from "@chakra-ui/react";

export type RouterFunctionContextType = { toast: CreateToastFnReturn };
export type ActionFunctionReturnType = Response | NonNullable<unknown> | null;
