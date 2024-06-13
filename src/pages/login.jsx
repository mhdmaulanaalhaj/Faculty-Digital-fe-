import {
  Box,
  Container,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Select,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { useState } from "react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Divider } from "@chakra-ui/react";
import { AiFillFacebook } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

// import { useDispatch } from "react-redux";
import Instagram_logo from "../assets/Instagram_logo.svg.png";
import logo from "../assets/logo.jpg";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const toast = useToast();
  const nav = useNavigate();
  const [account, setAccount] = useState({
    emna: "",
    password: "",
  });
  async function onSubmit() {
    let token;
    try {
      const login = await api.get("/user/v1", { params: account });
      console.log(login.data.token);
      if (login.data.message == "login success") {
        localStorage.setItem("auth", JSON.stringify(login.data.token));
        token = login.data.token;
        await api
          .get("/user/token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            dispatch({
              type: "login",
              payload: res.data,
            });
            toast({
              title: "success login",
              status: "success",
              position: "top",
              duration: 1000,
              isClosable: true,
            });
            return nav("/dashboard");
          });
        // toast({
        //   position: "top",
        //   colorScheme: "cyan",
        //   title: "Logging In",
        //   description: login.data.message,
        //   status: "success",
        //   duration: 3000,
        //   isClosable: true,
        // });
      } else {
        toast({
          position: "top",
          colorScheme: "red",
          title: "Logging In",
          description: login.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  const [seePassword, setSeePassword] = useState(false);
  function inputHandler(event) {
    try {
      const { value, id } = event.target;
      const tempObj = {};
      tempObj[id] = value;
      setAccount({ ...account, ...tempObj });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Center>
        <Center
          w={"100vw"}
          h={"400px"}
          minW={"175px"}
          maxW={"400px"}
          // justifyContent={"space-between"}
          flexDir={"column"}
          border={"1px solid #e8e8e8"}
          marginTop={"50px"}
        >
          <Image w={"175px"} h={"100px"} src={logo} marginTop={"40px"} />
          <Center flexDir={"column"} alignItems={"center"}>
            <InputGroup display={"flex"} flexDir={"column"}>
              <Input
                width={"300px"}
                fontSize={"small"}
                placeholder="Phone number, username, or email address"
                borderRadius={"none"}
                id="emna"
                onChange={inputHandler}
              />
              <InputGroup>
                <Input
                  onChange={inputHandler}
                  type={seePassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  borderRadius={"none"}
                  fontSize={"small"}
                  width={"300px"}
                  marginTop={"5px"}
                />
                <InputRightElement h={"38px"}>
                  <Icon
                    mt={"15px"}
                    as={seePassword ? AiOutlineEyeInvisible : AiOutlineEye}
                    onClick={() => setSeePassword(!seePassword)}
                  />
                </InputRightElement>
              </InputGroup>
            </InputGroup>

            <Button
              borderRadius={"10px"}
              fontSize={"small"}
              width={"300px"}
              marginTop={"15px"}
              bgColor={"#4cb5f9"}
              color={"white"}
              cursor={"pointer"}
              onClick={onSubmit}
            >
              Masuk
            </Button>
            {/* <Center marginBottom={"20px"}>
              <hr
                style={{
                  border: "1px solid rgb(203, 203, 203)",
                  width: "125px",
                  marginTop: "30px",
                }}
              />
              <span
                style={{
                  color: "black",
                  fontWeight: "450",
                  margin: "30px 10px 0 10px",
                  // display: "flex",
                  // justifyContent: "center",
                }}
              >
                OR
              </span>
              <hr
                style={{
                  border: "1px solid rgb(203, 203, 203)",
                  width: "125px",
                  marginTop: "30px",
                }}
              />
            </Center>
            <Center>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                color={"#455585"}
                gap={"5px"}
              >
                <AiFillFacebook /> Login with Facebook
              </Box>
            </Center>
            <Box>Forgot password?</Box> */}
          </Center>
        </Center>
      </Center>
    </>
  );
}
