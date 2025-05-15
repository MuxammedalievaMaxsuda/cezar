import { UiButton, UiCard, UiInput } from 'src/components/ui'
import styles from './Encryption.module.scss'
import { Container } from '../container/Container'
import { Divider, Form } from 'antd'
import { useState, type FC, useEffect } from 'react'
import { dataKk } from 'src/data'
import { BiUpvote } from "react-icons/bi";

interface IEncrypData {
    encryp: boolean
}

const Encryption: FC<IEncrypData> = ({ encryp }) => {
    const [upLet, setUplet] = useState<boolean>(true)
    const [resultText, setResultText] = useState<string>('')
    const upperAlphabet = dataKk.map((item) => item.upperLetter);
    const lowerAlphabet = dataKk.map((item) => item.lowerLetter);
    const [form] = Form.useForm()

    const handleVirtualKeyClick = (letter: string) => {
        const current = form.getFieldValue('inputText') || '';
        form.setFieldsValue({ inputText: current + letter });
    };

    const encryptText = (
        text: string,
        count: number,
        upperAlphabet: string[],
        lowerAlphabet: string[]
    ): string => {
        return text
            .split('')
            .map((char) => {
                if (upperAlphabet.includes(char)) {
                    const index = upperAlphabet.indexOf(char);
                    const newIndex = (index + count) % upperAlphabet.length;
                    return upperAlphabet[newIndex];
                } else if (lowerAlphabet.includes(char)) {
                    const index = lowerAlphabet.indexOf(char);
                    const newIndex = (index + count) % lowerAlphabet.length;
                    return lowerAlphabet[newIndex];
                } else {
                    return char;
                }
            })
            .join('');
    };

    const decryptText = (
        text: string,
        count: number,
        upperAlphabet: string[],
        lowerAlphabet: string[]
    ): string => {
        return text
            .split('')
            .map((char) => {
                if (upperAlphabet.includes(char)) {
                    const index = upperAlphabet.indexOf(char);
                    const newIndex = (index - count + upperAlphabet.length) % upperAlphabet.length;
                    return upperAlphabet[newIndex];
                } else if (lowerAlphabet.includes(char)) {
                    const index = lowerAlphabet.indexOf(char);
                    const newIndex = (index - count + lowerAlphabet.length) % lowerAlphabet.length;
                    return lowerAlphabet[newIndex];
                } else {
                    return char;
                }
            })
            .join('');
    };
    useEffect(() => {
        form.resetFields()
        setResultText('')
    }, [encryp])

    return (
        <Container>
            <div className={styles.encryption}>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={(values) => {
                        const { inputText, count } = values;
                        const result = encryp
                            ? encryptText(inputText, count, upperAlphabet, lowerAlphabet)
                            : decryptText(inputText, count, upperAlphabet, lowerAlphabet);
                        setResultText(result);
                    }}
                >
                    <UiCard className={styles.card}>
                        <Form.Item
                            name='inputText'
                            className={styles.input}
                            label={encryp ? 'Ashiq tekst' : 'Jabiq tekst'}
                            rules={[{ required: true, message: 'Matinni kiriting' }]}
                        >
                            <UiInput
                                placeholder='Enter the text' />
                        </Form.Item>
                        <Form.Item
                            name='count'
                            className={styles.input}
                            label="K sani"
                            normalize={(value) => Number(value)}
                            rules={[{ required: true, message: 'K ni kiriting' }]}
                        >
                            <UiInput
                                type='number'
                                placeholder='Enter the K number' />
                        </Form.Item>
                        <p>{encryp ? 'Jabiq tekst' : 'Ashiq tekst'}</p>
                        <Divider />
                        <p style={{ height: '20px' }}>{resultText}</p>
                        <div className={styles.encryption_footer}>
                            <UiButton
                                htmlType='submit'
                                type='primary'
                            >
                                {encryp ? 'Shifrlaw' : 'Deshifrlaw'}
                            </UiButton>
                        </div>
                    </UiCard>
                </Form>
                <div className={styles.keyboard}>
                    <div className={styles.keyboard}>
                        <div className={styles.keyboard_inner}>
                            {
                                dataKk.map((letter) => (
                                    <UiButton
                                        key={letter.index}
                                        onClick={() => handleVirtualKeyClick(upLet ? letter.upperLetter : letter.lowerLetter)}
                                        className={styles.button}
                                    >
                                        {upLet ? letter.upperLetter : letter.lowerLetter}
                                    </UiButton>
                                ))
                            }
                            <UiButton onClick={() => setUplet(!upLet)} icon={<BiUpvote style={{ fontSize: upLet ? '20px' : '16px' }} />} />

                        </div>
                        <UiButton onClick={() => {
                            form.resetFields()
                            setResultText('')
                        }}>Tazalaw</UiButton>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export { Encryption }