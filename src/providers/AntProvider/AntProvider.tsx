import type { FC, ReactNode } from "react"
import { ConfigProvider } from 'antd'

const AntProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ConfigProvider
            componentSize="large"
            theme={{
                token: {
                    colorPrimary: '#228B22'
                }
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export { AntProvider }