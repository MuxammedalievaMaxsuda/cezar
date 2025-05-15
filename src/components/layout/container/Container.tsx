import type { FC, ReactNode } from 'react'
import styles from './Container.module.scss'

const Container: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export { Container }