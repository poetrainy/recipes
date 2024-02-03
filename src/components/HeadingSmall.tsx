import { FC } from "react";
import { Heading } from "@chakra-ui/react";

const HeadingSmall: FC<{ children: string }> = ({ children }) => (
  <Heading as="h3" color="gray.600" fontWeight="bold" fontSize="13px">
    {children}
  </Heading>
);

export default HeadingSmall;
