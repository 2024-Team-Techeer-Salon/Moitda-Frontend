/* eslint-disable lines-around-directive */
/* eslint-disable quotes */
'use client';
import React, { Component } from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface LinearWithValueLabelProps {
  value: number;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: -3, marginLeft: 5 }}>
      <Box sx={{ width: '80%'}}>
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

interface MannerBarState {
  progressValue: number;
}

class MannerBar extends Component<{}, MannerBarState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      progressValue: 80 // 초기값을 A에 해당하는 숫자로 설정합니다.
    };
  }

  render() {
    let progressValue: number = this.state.progressValue;
    let label: string;

    if (progressValue === 100) {
      // label = "A";
    } else if (progressValue === 80) {
      // label = "B";
    } else if (progressValue === 60) {
      // label = "C";
    } else if (progressValue === 40) {
      // label = "D";
    } else if (progressValue === 20) {
      // label = "E";
    } else {
      // label = "Unknown"; // 처리되지 않은 다른 값에 대한 처리
    }

    return (
      <Box sx={{ width: '60%'}}>
        <LinearProgressWithLabel value={progressValue} />
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        <p style={{marginTop: -50, fontSize: 17, fontWeight: 600, marginLeft: 40}}>매너 스탯</p>
      </Box>
    );
  }
}

export default MannerBar;