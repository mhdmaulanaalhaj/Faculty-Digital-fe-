import { Box, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isloading]);

  return (
    <>
      {isloading ? (
        <Center h={"100vh"}>
          <Spinner />
        </Center>
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;
