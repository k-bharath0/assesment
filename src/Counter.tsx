import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Button, Box, Container, Typography } from "@mui/material";
import UserForm from "./UserForm";
import RichTextEditor from "./RichTextEditor";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  


  
  // Background color animation using React Spring
  const backgroundSpring = useSpring({
    backgroundColor: `rgba(100, 200, 255, ${count / 10})`, // Increases opacity
    config: { tension: 120, friction: 14 },
  });

  const handleReset = () => setCount(0);

  return (
    <animated.div style={{ ...backgroundSpring,minHeight: "100vh", padding: "20px",display:"flex", justifyContent:"center",alignItems:"center" }}>
    <div>
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <Typography variant="h4">Counter</Typography>
        <Typography variant="h2">{count}</Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={() => setCount(count + 1)} sx={{ m: 1 }}>
            Increment
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setCount(count - 1)} sx={{ m: 1 }}>
            Decrement
          </Button>
          <Button variant="contained" color="error" onClick={handleReset} sx={{ m: 1 }}>
            Reset
          </Button>
        </Box>
        <UserForm/>
        
        
      </Container>
      
      </div>
      <div>
      <RichTextEditor/>
      </div>
    </animated.div>

  );
};

export default Counter;
