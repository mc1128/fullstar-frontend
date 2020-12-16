import React from "react";
import styled, { keyframes } from "styled-components";
import { Logo } from "./Icons";

const Animation = keyframes`
    0%{
        opacity:0
    }50%{
        opacity:1
    }100%{
        opacity:0;
    }
`;

const MiniLoader = styled.div`
  animation: ${Animation} 1s linear infinite;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export default () => (
  <MiniLoader>
    <Logo size={20} />
  </MiniLoader>
);
