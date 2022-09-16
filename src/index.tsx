import './i18n';
import './styles/global.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import i18n from 'i18next';

import { App } from './App';
import { EthereumJsonRpcContextProvider } from './contexts/ethereum-json-rpc.context';
import { ErrorBoundary } from './ErrorBoundary';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <EthereumJsonRpcContextProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </EthereumJsonRpcContextProvider>
    </I18nextProvider>
  </BrowserRouter>,
);
