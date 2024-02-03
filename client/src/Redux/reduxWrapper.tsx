'use client'
import { Provider } from "react-redux"
import store, { persistor } from "./store"
import { PersistGate } from "redux-persist/integration/react"

const ReduxWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default ReduxWrapper