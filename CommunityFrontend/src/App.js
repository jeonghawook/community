import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Topbar from "./components/shared/Topbar";
import StorePage from "./pages/StorePage";
import SignupPage from "./pages/Signup";
import DefaultPage from "./pages/DefaultPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import LeftSidebar from "./components/shared/LeftSidebar";
import CreatePage from "./pages/CreatePage";
import RightSidebar from "./components/shared/RightSidebar";
import useAuthStore from "./api/store";
import socialLogin from "./components/socialLogin";
import SocialLogin from "./components/socialLogin";

const queryClient = new QueryClient();

function App() {
  const {userId} = useAuthStore()
  console.log(userId)
  return (
    <Box>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Grid
            bg="#FEFFE6"
            templateAreas={`"header header header"
          "nav main friend"
          `}
            gridTemplateRows={"60px 1fr "}
            gridTemplateColumns={"18% 64% 18%"}
            h="100vh"
            color="blackAlpha.700"
            fontWeight="bold"
            position="relative"
          >
            <GridItem
              bg="#F7E600"
              area={"header"}
              position="fixed"
              width="100%"
            >
              <Topbar />
            </GridItem>
            <GridItem bg="#FEFFE6" area={"nav"} height="100%">
              <LeftSidebar />
            </GridItem>
            <GridItem
              bg="FFFFFF"
              area={"main"}
              overflowY="auto"
              width="100%" // Set maximum width to viewport width
              css={{
                "&::-webkit-scrollbar": {
                  width: "0", // Adjust the width as needed
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "transparent", // Hide the thumb
                },
              }}
            >
              <Routes>
                <Route path="/socialLogin" element={<SocialLogin/>}/>
                <Route path="/" element={<DefaultPage />} />
                <Route path="/member" element={<MainPage />} />
                <Route path="/store/:storeId/page" element={<StorePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/create" element={<CreatePage />} />
              </Routes>
            </GridItem>

            <GridItem area={"friend"} bg="#FEFFE6">
              <RightSidebar userId={userId} />
            </GridItem>
          </Grid>
        </BrowserRouter>
      </QueryClientProvider>
    </Box>
  );
}

export default App;
