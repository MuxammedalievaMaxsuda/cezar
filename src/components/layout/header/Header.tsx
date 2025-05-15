import { UiButton } from 'src/components/ui'
import { Container } from '../container/Container'
import styles from './Header.module.scss'
import { HiSwitchHorizontal } from 'react-icons/hi'
import type { FC } from 'react'

interface IHeaderData {
    onChangeEncryp: () => void
}

const Header: FC<IHeaderData> = ({ onChangeEncryp }) => {
    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.header_inner}>
                    <div className={styles.logo}>
                        <h1>Cezar</h1>
                        <p>Qaraqalpaq tili ushın</p>
                    </div>
                    <UiButton
                        onClick={() => onChangeEncryp()}
                        icon={<HiSwitchHorizontal />}
                        type='primary'
                    />
                </div>
            </Container>
        </header>
    )
}

export { Header }