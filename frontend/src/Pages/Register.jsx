import {
    Box,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Link as ChakraLink,
    Button, Text
} from "@chakra-ui/react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import { register } from "../lib/api.js"

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {
        mutate: createAccount,
        isPending,
        isError
    } = useMutation({
        mutationFn: register,
        onSuccess: () => {
            navigate("/", {
                replace: true
            })
        }
    })

    return (
        <Flex minH="100hv" aling="center" justify="center">
            <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
                <Heading fontSize="4xl" mb={8}>
                    Create an Account
                </Heading>
                <Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
                    {
                        isError && <Box mb={3} color="red.300">Invalid Email or Password</Box>
                    }
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email Address</FormLabel>
                            <Input type="email"
                                   autoFocus
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="passwoer">
                            <FormLabel>Password</FormLabel>
                            <Input type="password"
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Text color="text.muted" fontSize="xs" textAlign="left" mt={2}>
                            - Must be at least 6 characters long.
                        </Text>
                        <FormControl id="confirmPassword">
                            <FormLabel>Confirm Password</FormLabel>
                            <Input type="password"
                                   value={confirmPassword}
                                   onChange={e => setConfirmPassword(e.target.value)}
                                   onKeyDown={
                                       (e) => e.key === 'Enter' && createAccount({email, password, confirmPassword}) }
                            />
                        </FormControl>
                        <Button my={2} isDisabled={!email || password.length < 6 || confirmPassword.length < 6}
                            isLoading={isPending}
                            onClick={() => createAccount({email, password, confirmPassword})}
                        >
                            Create Account
                        </Button>
                        <Text align='center' fontSize='sm' colot='text.muted'>
                            Already have an account?{" "}
                            <ChakraLink as={ Link } to='/login'>
                                Sign In
                            </ChakraLink>
                        </Text>
                    </Stack>
                </Box>
            </Container>
        </Flex>
    )
}

export default Register
