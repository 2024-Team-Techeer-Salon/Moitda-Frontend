'use client';

import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: -8 }}>
      <Box sx={{ width: '100%', mr: 2 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>{
        switch (prevProgress){
            case "A":
                return 100;
            case "B":
                return 80;
            case "C":
                return 60;
            case "D":
                return 40;
            case "E":
                return 20;
            default:
                return 0;
        }
    });
    return () => {
        clearInterval(timer);
      };
    })
  }, []);

  return (
    <Box sx={{ width: '60%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
