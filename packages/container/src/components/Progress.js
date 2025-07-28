import React, { useEffect, useState } from "react";

import LinearProgress from "@material-ui/core/LinearProgress";

export default ({ delay = 0 }) => {
  const [showProgress, setShowProgress] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setShowProgress(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return showProgress ? <LinearProgress /> : null;
};
