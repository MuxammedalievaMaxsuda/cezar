import type { FC, ReactNode } from "react"
import { ConfigProvider, Button } from 'antd'
import type {ButtonProps} from 'antd'

interface UiButtonProps {
    children?: ReactNode
}

const UiButton: FC<UiButtonProps & ButtonProps> = (props) => {
    return (
        <ConfigProvider>
            <Button {...props} />
        </ConfigProvider>

    )
}

export { UiButton }