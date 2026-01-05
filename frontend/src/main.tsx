import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {App} from './App';
import {store} from '@/app/store';
import type {AppDispatch} from '@/app/store';
import {checkAuth} from '@/app/store/auth/actions';
import './index.css';

(store.dispatch as AppDispatch)(checkAuth());

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
