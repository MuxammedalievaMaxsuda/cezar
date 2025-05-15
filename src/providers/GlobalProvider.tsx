import type { FC, ReactNode } from 'react'
import { AntProvider } from './AntProvider/AntProvider'

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AntProvider>
            {children}
        </AntProvider>
    )
}

export { GlobalProvider }