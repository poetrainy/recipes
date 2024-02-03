import { VStack } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <VStack alignItems="stretch" gap="24px" p="24px 16px">
    {children}
  </VStack>
);

export default Layout;