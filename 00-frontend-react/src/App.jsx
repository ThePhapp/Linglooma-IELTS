import { useContext, useEffect } from 'react';
import Routes from './Routes';
import axios from "@/utils/axios.customize";
import { AuthContext } from './components/context/auth.context';

function App() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await axios.get(`api/users/account`)
      console.log("check res", res);
      if (res) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res?.email ?? "",
            username: res?.name ?? "",
            phonenumber: res?.phone ?? "",
            gender: res?.gender ?? "",
            nationality: res?.nationality ?? ""
          }
        })
      }
    }
    fetchAccount();
  }, [])

  return (
    <Routes />
  );
}

export default App;