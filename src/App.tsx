import { useEffect } from "react";
import PlanetList from './views/planetList';
import { StoreContextProvider } from "./store/store-context";

function App() {
  return (
      <StoreContextProvider>
        <PlanetList/>
      </StoreContextProvider>
  )
}

export default App
