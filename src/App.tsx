import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import LetovanjaPage from "@/pages/LetovanjaPage";
import ZimovanjaPage from "@/pages/ZimovanjaPage";
import IzletiPage from "@/pages/IzletiPage";
import HoteliPage from "@/pages/HoteliPage";
import ONamaPage from "@/pages/ONamaPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();
  const isAdmin = location === "/admin";

  if (isAdmin) {
    return <AdminPage />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/letovanja" component={LetovanjaPage} />
          <Route path="/zimovanja" component={ZimovanjaPage} />
          <Route path="/izleti" component={IzletiPage} />
          <Route path="/hoteli" component={HoteliPage} />
          <Route path="/o-nama" component={ONamaPage} />
          <Route path="/admin" component={AdminPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
