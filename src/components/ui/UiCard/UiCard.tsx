import type { FC, ReactNode } from "react"
import { ConfigProvider, Card } from 'antd'
import type { CardProps } from 'antd'

interface UiCardProps {
    children?: ReactNode
}

const UiCard: FC<UiCardProps & CardProps> = (props) => {
    return (
        <ConfigProvider>
            <Card {...props} />
        </ConfigProvider>

    )
}

export { UiCard }