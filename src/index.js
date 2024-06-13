import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
// import "@fontsource/roboto";
import rootReducer from "./redux/store";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import AuthProvider from "../src/hoc/authProvider";

const store = configureStore({ reducer: rootReducer, middleware: [thunk] });
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);

reportWebVitals();

// import { Flex, Box, Icon, Avatar, Image, Center } from "@chakra-ui/react";
// import { TiHome } from "react-icons/ti";
// import { AiOutlineCompass } from "react-icons/ai";
// import { TbSquareRoundedPlus } from "react-icons/tb";
// import { GrCompass } from "react-icons/gr";
// import { useNavigate } from "react-router-dom";
// import { MdSlowMotionVideo } from "react-icons/md";
// import direct from "../assets/direct.png";
// import { BiPaperPlane } from "react-icons/bi";

// export default function Navbar() {
//   const nav = useNavigate();
//   return (
//     <>
//       <Center w={"100vw"} h="48px" bottom={"0"} position={"fixed"}>
//         <Flex
//           w={"100vw"}
//           // height={"50px"}
//           // minWidth={"767px"}
//           maxW={"470px"}
//           // display={"flex"}
//           justifyContent={"space-around"}
//           alignItems={"center"}
//           border={"1px solid #e8e8e8"}
//           bgColor={"white"}
//         >
//           <Box>
//             <Icon
//               as={TiHome}
//               width={"30px"}
//               height={"30px"}
//               cursor={"pointer"}
//               onClick={() => nav("/")}
//             />
//           </Box>
//           <Box>
//             <Icon
//               as={GrCompass}
//               width={"30px"}
//               height={"30px"}
//               cursor={"pointer"}
//             />
//           </Box>
//           <Box>
//             <Icon
//               as={MdSlowMotionVideo}
//               width={"30px"}
//               height={"30px"}
//               cursor={"pointer"}
//             />
//           </Box>
//           <Box>
//             <Icon
//               as={TbSquareRoundedPlus}
//               width={"30px"}
//               height={"30px"}
//               cursor={"pointer"}
//             />
//           </Box>
//           <Box>
//             <Icon
//               as={BiPaperPlane}
//               width={"30px"}
//               height={"30px"}
//               cursor={"pointer"}
//             />
//           </Box>

//           <Box>
//             <Avatar
//               width={"30px"}
//               height={"30px"}
//               cursor={"pointer"}
//               onClick={() => nav("/homeProfile")}
//             />
//           </Box>
//         </Flex>
//       </Center>
//     </>
//   );
// }
