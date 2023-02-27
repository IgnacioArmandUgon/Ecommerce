import { FC, useReducer } from 'react';
import { UiContext, uiReducer } from '.';

export interface UiState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

export const UiProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: '[UI] - Toggle menu' });
  };

  return (
    <UiContext.Provider value={{ ...state, toggleSideMenu }}>
      {children}
    </UiContext.Provider>
  );
};

//Se crea un componente funcional que será el que provea la data del contexto, que vendrá del reducer.
//También se crea el tipado para el state del contexto
