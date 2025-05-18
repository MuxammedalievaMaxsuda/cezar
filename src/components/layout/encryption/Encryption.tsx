import { UiButton, UiCard, UiInput } from 'src/components/ui'
import styles from './Encryption.module.scss'
import { Container } from '../container/Container'
import { Divider, Form } from 'antd'
import { useState, type FC, useEffect } from 'react'
import { dataKk } from 'src/data'

interface IEncrypData {
    encryp: boolean
}

const Encryption: FC<IEncrypData> = ({ encryp }) => {
    const [resultText, setResultText] = useState<string>('')
    const upperAlphabet = dataKk.map((item) => item.upperLetter);
    const lowerAlphabet = dataKk.map((item) => item.lowerLetter);
    const [form] = Form.useForm()

    const tokenize = (text: string): string[] => {
        const tokens: string[] = [];
        let i = 0;
        while (i < text.length) {
            const twoChars = text.slice(i, i + 2).toLowerCase();

            if (twoChars === 'sh' || twoChars === 'ch') {
                tokens.push(text.slice(i, i + 2));
                i += 2;
            } else {
                tokens.push(text[i]);
                i += 1;
            }
        }
        return tokens;
    };


    const encryptText = (
        text: string,
        count: number,
        upperAlphabet: string[],
        lowerAlphabet: string[]
    ): string => {
        const tokens = tokenize(text);

        return tokens
            .map((token) => {
                if (upperAlphabet.includes(token)) {
                    const index = upperAlphabet.indexOf(token);
                    const newIndex = (index + count) % upperAlphabet.length;
                    return upperAlphabet[newIndex];
                }
                else if (lowerAlphabet.includes(token)) {
                    const index = lowerAlphabet.indexOf(token);
                    const newIndex = (index + count) % lowerAlphabet.length;
                    return lowerAlphabet[newIndex];
                }
                else {
                    return token;
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
        const tokens = tokenize(text);

        return tokens
            .map((token) => {
                if (upperAlphabet.includes(token)) {
                    const index = upperAlphabet.indexOf(token);
                    const newIndex = (index - count + upperAlphabet.length) % upperAlphabet.length;
                    return upperAlphabet[newIndex];
                } else if (lowerAlphabet.includes(token)) {
                    const index = lowerAlphabet.indexOf(token);
                    const newIndex = (index - count + lowerAlphabet.length) % lowerAlphabet.length;
                    return lowerAlphabet[newIndex];
                } else {
                    return token;
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
                <UiCard className={styles.card}>
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
                        <Form.Item
                            name='inputText'
                            className={styles.input}
                            label={encryp ? 'Ashıq tekst' : 'Shifrlanǵan tekst'}
                            rules={[{ required: true, message: 'Tekstti kiritiń!' }]}
                        >
                            <UiInput
                                placeholder='Tekstti kiritiń' />
                        </Form.Item>
                        <Form.Item
                            name='count'
                            className={styles.input}
                            label="K sanı"
                            normalize={(value) => Number(value)}
                            rules={[{ required: true, message: 'K sanın kiritiń!' }]}
                        >
                            <UiInput
                                type='number'
                                placeholder='K sanın kiritiń' />
                        </Form.Item>
                        <div className={styles.encryption_footer}>
                            <div className={styles.btns}>
                                <UiButton onClick={() => {
                                    form.resetFields()
                                    setResultText('')
                                }}>
                                    Tazalaw
                                </UiButton>
                                <UiButton
                                    htmlType='submit'
                                    type='primary'
                                >
                                    {encryp ? 'Shifrlaw' : 'Deshifrlaw'}
                                </UiButton>
                            </div>
                        </div>
                        <div className={styles.result}>
                            <Divider orientation='left'>
                                <span style={{ fontWeight: 'normal' }}>
                                    {encryp ? 'Shifrlanǵan tekst:' : 'Ashıq tekst:'}
                                </span>
                            </Divider>
                            <p >{resultText}</p>
                        </div>
                    </Form>
                </UiCard>
            </div>
        </Container>
    )
}

export { Encryption }