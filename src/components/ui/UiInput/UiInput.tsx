import type { FC, ReactNode } from "react"
import { ConfigProvider, Input } from 'antd'
import type { InputProps } from 'antd'

interface UiInputProps {
    children?: ReactNode
}

const UiInput: FC<UiInputProps & InputProps> = (props) => {
    return (
        <ConfigProvider>
            <Input {...props} />
        </ConfigProvider>
    )
}

export { UiInput }