import { useEffect } from "react";

const Helmet = ({ title }) => {
  useEffect(() => {
    // Set document title
    document.title = title || 'Default Title';

  }, [title]);

  return null;
};

export default Helmet;