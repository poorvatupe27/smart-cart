import { Navigate } from "react-router-dom";

// This file redirects to the main app - Home page is the entry point
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
