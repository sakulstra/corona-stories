import deepai from 'deepai'

deepai.setApiKey('b1f6a192-c7fc-4ca2-917d-80e92cb1cc4f')

type StyleTransferInput = {
    content: string
    style: string
}

export const getStyletransfer = (arg: StyleTransferInput) =>
    deepai.callStandardApi('neural-style', arg)

export default deepai
