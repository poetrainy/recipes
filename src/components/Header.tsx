import { Center } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <Center
      h="60px"
      fontSize="24px"
      fontFamily="'Josefin Sans', sans-serif"
      fontWeight="200"
    >
      <Link to="/">poetrainy-recipes</Link>
    </Center>
  );
};

export default Header;
