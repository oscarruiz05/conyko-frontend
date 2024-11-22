import { Register } from "@/interfaces/auth";
import { login, logout, register } from "@/services/auth";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await login({ email, password });
      localStorage.setItem("token_conyko", data.token);
      localStorage.setItem("user_conyko", JSON.stringify(data.user));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      toast({
        description: "Credenciales incorrectas",
        variant: "destructive",
      });
    }
  };

  const fetchRegistro = async (body: Register) => {
    setLoading(true);
    try {
      const { data } = await register(body);
      localStorage.setItem("token_conyko", data.token);
      localStorage.setItem("user_conyko", JSON.stringify(data.user));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchLogout = async () => {
    setLoading(true);
    await logout();
    localStorage.removeItem("token_conyko");
    localStorage.removeItem("user_conyko");
    setLoading(false);
  };

  return { loading, fetchLogin, fetchRegistro, fetchLogout };
};

export default useLogin;
