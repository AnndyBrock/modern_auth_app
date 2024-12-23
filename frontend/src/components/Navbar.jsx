import { Box, Flex, Link as ChakraLink, Text, HStack, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
    return (
        <Box
            borderBottom="1px"
            borderColor="gray.200"
            px={4}
            py={2}
            position="sticky"
            top={0}
            zIndex="sticky"
        >
            <Flex alignItems="center">
                {/* Левый блок */}
                <HStack spacing={4} display={{ base: "none", md: "flex" }}>
                    <Box position="relative" _hover={{ '> div': { display: 'block' } }}>
                        <ChakraLink as={Link} to="/buy" fontSize="sm" cursor="pointer">
                            Buy
                        </ChakraLink>
                        <Box
                            position="absolute"
                            top="100%"
                            left="0"
                            boxShadow="md"
                            p={2}
                            display="none"
                            minW="150px"
                            zIndex="popover"
                            bg="blue.500"
                        >
                            <ChakraLink as={Link} to="/buy-houses" display="block" py={1}>Houses</ChakraLink>
                            <ChakraLink as={Link} to="/buy-townhouses" display="block" py={1}>Townhouses</ChakraLink>
                            <ChakraLink as={Link} to="/buy-condos" display="block" py={1}>Condos</ChakraLink>
                            <ChakraLink as={Link} to="/buy-manufactured" display="block" py={1}>Manufactured</ChakraLink>
                            <ChakraLink as={Link} to="/buy-land" display="block" py={1}>Lot/Land</ChakraLink>
                            <ChakraLink as={Link} to="/buy-new" display="block" py={1}>New Homes/New Construction</ChakraLink>
                            <ChakraLink as={Link} to="/buy" display="block" py={1}>All Homes</ChakraLink>
                        </Box>
                    </Box>

                    <Box position="relative" _hover={{ '> div': { display: 'block' } }}>
                        <ChakraLink as={Link} to="/rent" fontSize="sm" cursor="pointer">
                            Rent
                        </ChakraLink>
                        <Box
                            position="absolute"
                            top="100%"
                            left="0"
                            boxShadow="md"
                            p={2}
                            display="none"
                            minW="150px"
                            zIndex="popover"
                            bg="blue.500"
                        >
                            <ChakraLink as={Link} to="/rent-houses" display="block" py={1}>Houses</ChakraLink>
                            <ChakraLink as={Link} to="/rent-townhouses" display="block" py={1}>Townhouses</ChakraLink>
                            <ChakraLink as={Link} to="/rent-condos" display="block" py={1}>Condos</ChakraLink>
                            <ChakraLink as={Link} to="/rent-apartments" display="block" py={1}>Apartments</ChakraLink>
                            <ChakraLink as={Link} to="/rent" display="block" py={1}>All Rentals</ChakraLink>
                        </Box>
                    </Box>

                    <ChakraLink as={Link} to="/sell" fontSize="sm">Sell</ChakraLink>
                    <ChakraLink as={Link} to="/agent" fontSize="sm">Find an Agent</ChakraLink>
                </HStack>

                <Spacer />

                {/* Центральный текст */}
                <Text fontWeight="bold" fontSize="xl">
                    Estalia.ca
                </Text>

                <Spacer />

                {/* Правый блок: если есть пользователь, показываем его имя, если нет – ссылки на вход и регистрацию */}
                {
                    user ? (
                        <Text fontSize="sm" fontWeight="bold">{user.name}</Text>
                    ) : (
                        <HStack spacing={4}>
                            <ChakraLink as={Link} to="/login" fontSize="sm">Sign In</ChakraLink>
                            <ChakraLink as={Link} to="/register" fontSize="sm">Sign Up</ChakraLink>
                        </HStack>
                    )
                }
            </Flex>
        </Box>
    );
};

export default Navbar;
