import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {App} from "./App";
import {store} from "@/store";
import {checkAuth} from "@/store/actions/authActions";
import './index.css';

async function bootstrap() {
    store.dispatch(checkAuth() as any);

    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    );
}

bootstrap();


