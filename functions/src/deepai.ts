import deepai from 'deepai'

deepai.setApiKey('b1f6a192-c7fc-4ca2-917d-80e92cb1cc4f')

export const SENTIMENTS_NUMBERS = [
    'Verynegative',
    'Negative',
    'Neutral',
    'Positive',
    'Verypositive',
]

export const getSentimentForNumber = (value: number) => {
    value = Math.round(value)
    return SENTIMENTS_NUMBERS[value]
}

export const getSentiments = (text: string): Promise<number[]> => {
    return deepai
        .callStandardApi('sentiment-analysis', {
            text,
        })
        .then((res: { output: string[] }) => {
            return res.output.map((sentiment) =>
                SENTIMENTS_NUMBERS.indexOf(sentiment)
            )
        })
}
