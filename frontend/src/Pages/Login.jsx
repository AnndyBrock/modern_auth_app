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
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import { login } from "../lib/api.js"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    const location = useLocation();
    const redirectUrl = location.state?.redirectUrl || "/";

    const {
        mutate: signIn,
        isPending,
        isError
    } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate(redirectUrl, {
                replace: true
            })
        }
    })

    return (
        <Flex minH="100hv" aling="center" justify="center">
            <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
                <Heading fontSize="4xl" mb={8}>
                    Sing in
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
                                   onKeyDown={
                                (e) => e.key === 'Enter' && signIn({email, password}) }
                            />
                        </FormControl>
                        <ChakraLink as={ Link } to='/password/forgot' fontSize='sm' textAlign={{
                            base: "center", sm: 'right'
                        }}>Forgot Password? </ChakraLink>
                        <Button my={2} isDisabled={!email || password.length < 6}
                            isLoading={isPending}
                            onClick={() => signIn({email, password})}
                        >
                            Sign In
                        </Button>
                        <Text align='center' fontSize='sm' colot='text.muted'>
                            Don`t have an account?{" "}
                            <ChakraLink as={Link} to='/register'>
                                Sign Up
                            </ChakraLink>
                        </Text>
                    </Stack>
                </Box>
            </Container>
        </Flex>
    )
}

export default Login
