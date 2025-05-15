import { useState } from 'react'
import styles from './Layout.module.scss'
import { Encryption } from './encryption/Encryption'
import { Header } from './header/Header'

const Layout = () => {
    const [encryp, setEncryp] = useState<boolean>(true)

    const onChangeEncryp = () => {
        setEncryp(!encryp)
    }

    return (
        <section className={styles.layout}>
            <Header onChangeEncryp={onChangeEncryp} />
            <Encryption encryp={encryp}/>
        </section>
    )
}

export { Layout }