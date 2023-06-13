import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import CommonLayout from "./layouts/CommonLayout";
import store from "./redux/store";
import AppRoute from "./routes/AppRoute";

function App() {
  const queryClient = new QueryClient();
  return (
    <StyledEngineProvider>
      <Provider store={store}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <CommonLayout>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover={false}
                draggable
                theme="colored"
              />
              <AppRoute />
            </CommonLayout>
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
