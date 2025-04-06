import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/auth.context";
import AuthForm from "./pages/AuthForm";
import Home from "./pages/Home";
import TrainList from "./pages/TrainList";
import ProtectedRoute from "./components/ProtectedRoute";
import BookForm from "./pages/BookForm";
import BookingSummary from "./pages/BookingSummary";
import RootLayout from "./layout/rootLayout";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import UserBookings from "./pages/UserBookings";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <>
      <Provider store={store}>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <AuthProvider>
                <Routes>
                  {/* Public Route */}
                  <Route path="/auth" element={<AuthForm />} />

                  {/* Root Layout with nested routes */}
                  <Route path="/" element={<RootLayout />}>
                    {/* Redirection */}
                    <Route index element={<Navigate to="/home" replace />} />

                    {/* Public nested routes */}
                    <Route path="home" element={<Home />} />
                    <Route path="trains" element={<TrainList />} />

                    {/* Protected routes */}
                    <Route path="book" element={<ProtectedRoute />}>
                      <Route path="form" element={<BookForm />} />
                      <Route path="summary" element={<BookingSummary />} />
                    </Route>

                    <Route path="my-bookings" element={<ProtectedRoute />}>
                      <Route index element={<UserBookings />} />
                    </Route>
                  </Route>

                  {/* Catch-all route for 404 handling */}
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </AuthProvider>
            </Router>
            <Toaster />
          </QueryClientProvider>
        </TooltipProvider>
      </Provider>
    </>
  );
}

export default App;
