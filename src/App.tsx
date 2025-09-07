
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Penjadwalan from "./pages/Penjadwalan";
import NotFound from "./pages/NotFound";
import Data from "./pages/Data";
import Guru from "./pages/Guru";
import MataPelajaran from "./pages/MataPelajaran";
import GuruPengampu from "./pages/GuruPengampu";
import Ruang from "./pages/Ruang";
import Jam from "./pages/Jam";
import Hari from "./pages/Hari";
import WaktuTidakTersedia from "./pages/WaktuTidakTersedia";
import Proses from "./pages/Proses";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/data" element={
            <ProtectedRoute>
              <Data />
            </ProtectedRoute>
          } />
          <Route path="/guru" element={
            <ProtectedRoute>
              <Guru />
            </ProtectedRoute>
          } />
          <Route path="/mata-pelajaran" element={
            <ProtectedRoute>
              <MataPelajaran />
            </ProtectedRoute>
          } />
          <Route path="/guru-pengampu" element={
            <ProtectedRoute>
              <GuruPengampu />
            </ProtectedRoute>
          } />
          <Route path="/ruang" element={
            <ProtectedRoute>
              <Ruang />
            </ProtectedRoute>
          } />
          <Route path="/jam" element={
            <ProtectedRoute>
              <Jam />
            </ProtectedRoute>
          } />
          <Route path="/hari" element={
            <ProtectedRoute>
              <Hari />
            </ProtectedRoute>
          } />
          <Route path="/waktu-tidak-tersedia" element={
            <ProtectedRoute>
              <WaktuTidakTersedia />
            </ProtectedRoute>
          } />
          <Route path="/proses" element={
            <ProtectedRoute>
              <Proses />
            </ProtectedRoute>
          } />
          <Route path="/penjadwalan" element={
            <ProtectedRoute>
              <Penjadwalan />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
