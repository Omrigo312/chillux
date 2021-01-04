import { Button } from '@material-ui/core';
import React from 'react';

export default function Landing() {
  return (
    <div className="island-background">
      <div className="landing-buttons">
        <Button variant="contained" color="primary">
          Login
        </Button>
        <Button variant="contained" color="primary">
          Register
        </Button>
      </div>
    </div>
  );
}
