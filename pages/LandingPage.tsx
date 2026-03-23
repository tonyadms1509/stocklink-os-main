import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to Admin page on mount
    navigate('/admin');
  }, [navigate]);
  
  return null; // Don't render anything
};

export default LandingPage;
