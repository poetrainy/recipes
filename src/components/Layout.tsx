import { VStack } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <VStack alignItems="stretch" gap="24px" maxW="600px" m="0 auto" p="16px">
    {children}
  </VStack>
);

export default Layout;
