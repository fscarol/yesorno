import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import YesOrNo from './YesOrNo.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <YesOrNo />
  </StrictMode>
);
