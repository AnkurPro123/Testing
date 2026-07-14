import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import './App.css'

import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Dashboard from "./component/Dashboard";
import Mail from "./component/Mail";
import Hero from "./component/Hero";
import Test from "./component/Test"
import HeroSection from "./component/Hero";
import NewDashboard from "./component/NewDashboard"



  function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
      supabase.auth.getSession().then(({ data }) => {
        setSession(data.session);
        console.log("Set Session:", data.session)
      });

      const {
        data: { subscription }, 
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        console.log("Session:",session)
      });

      return () => subscription.unsubscribe();
    }, []);

    if (session) {
      return <Dashboard />;
    }

  return (
    <>
    
    <Test/>
    


    
    
    
    </>
  );
}

export default App;