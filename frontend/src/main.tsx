import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {App} from './App';
import {store} from '@/app/store';
import type {AppDispatch} from '@/app/store';
import {checkAuth} from '@/app/store/auth/actions';
import './index.css';

async function bootstrap() {
    await (store.dispatch as AppDispatch)(checkAuth());

    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    );
}

bootstrap();
