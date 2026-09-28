// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom de CRA 5 (jest 27) no expone TextEncoder/TextDecoder, y react-router 7
// los usa al cargar. Se toman de node para que los tests puedan importar el
// router. En el navegador ya existen, por eso el guard.
import { TextDecoder, TextEncoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
