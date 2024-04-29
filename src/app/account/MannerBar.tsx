/* eslint-disable lines-around-directive */
/* eslint-disable quotes */
'use client';
import React, { Component } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface MannerBarState {
  progressValue: number;
}

class MannerBar extends Component<{}, MannerBarState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      progressValue: 80     // 초기값을 A에 해당하는 숫자로 설정합니다.
    };
  }

  render() {
    let progressValue: number = this.state.progressValue;
    let label: string;

    if (progressValue === 100) {
      label = "A";
    } else if (progressValue === 80) {
      label = "B";
    } else if (progressValue === 60) {
      label = "C";
    } else if (progressValue === 40) {
      label = "D";
    } else if (progressValue === 20) {
      label = "E";
    } else {
      label = "F"; // 처리되지 않은 다른 값에 대한 처리
    }

    return (
      <Box sx={{ width: '60%'}}>
        <div className='mr-20'>
        <LinearProgress variant="determinate" value={progressValue} />
        <Typography variant="body2" color="text.secondary" >{label}</Typography>
        <p style={{marginTop: -50, fontSize: 17, fontWeight: 600, marginLeft: 20}}>매너 스탯</p>
        </div>
      </Box>
    );
  }
}

export default MannerBar;
