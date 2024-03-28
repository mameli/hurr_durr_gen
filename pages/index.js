import Head from 'next/head'
import { useState, useEffect } from 'react';

export default function Home() {
  const [sentence, setSentence] = useState("");
  const [hurrDurredSentence, setHurrDurredSentence] = useState("Hurr durr uh?");
  const [shuffle, setShuffle] = useState(true);
  const [toClipboard, setToClipboard] = useState(false);



  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const charDict = {
      'a': '4æäåâ',
      'e': '3ëę',
      'i': '1î',
      'o': '0œøö',
      'u': 'üû',
      'c': 'čç',
      's': 'š',
      'z': 'žż',
      'n': 'ñ'
    }

    const pickCharDict = (chars) => {
      if (chars.length == 1) return chars
      const r = getRandomInt(chars.length)
      return chars[r]
    }

    const hurrDurrChar = (c) => {
      const r = getRandomInt(2)
      if (r == 0) return c.toUpperCase();
      if (r == 1) return charDict[c] ? pickCharDict(charDict[c]) : c;
      return c;
    }

    let tmpArrSentence = Array.from(sentence);;
    for (let i = 0; i < sentence.length; i++) {
      tmpArrSentence[i] = hurrDurrChar(tmpArrSentence[i])
    }
    if (sentence) setHurrDurredSentence(tmpArrSentence.join(''))
  }, [shuffle, sentence])

  useEffect(() => {
    if (toClipboard) {
      setTimeout(function () {
        setToClipboard(!toClipboard)
      }, 2000);
    }
  }, [toClipboard])

  return (
    <div className="container mx-auto max-w-full bg-white dark:bg-slate-800 flex flex-col h-screen justify-between">
      <Head>
        <title>Hurr Durr App</title>
        <meta name="description" content="Hurr Durr App" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center h-full">
        <div class="flex flex-col justify-center items-center h-auto">
          <div className="h-20">
            <h1 className="text-3xl font-bold underline text-center">
              Hurr Durr Me
            </h1>
          </div>
          <div className="h-fit max-w-xl">
            {sentence ? (
              <p className='text-clip text-4xl text-center font-medium overflow-scroll'
                onClick={() => { navigator.clipboard.writeText(hurrDurredSentence); setToClipboard(true) }}
              >
                {hurrDurredSentence.length > 100
                  ? hurrDurredSentence.slice(0, 100) + "..."
                  : hurrDurredSentence
                }
              </p>
            ) : (
              <p className='text-clip text-4xl text-center font-medium'
                onClick={() => { navigator.clipboard.writeText(hurrDurredSentence); setToClipboard(true) }}
              >
                Hurr durr uh?
              </p>
            )}
          </div>
          <div className="h-10">
            {toClipboard ?
              <p className='text-1xl text-center font-extralight tracking-widest underline decoration-wavy underline-offset-4 decoration-lime-500'
              >copied to clipboard</p>
              : null
            }
          </div>
          <div className="h-20 max-w-prose">
            <textarea className="caret-orange-600 w-80 shadow appearance-none border rounded py-2 px-3 text-gray-800 dark:text-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline" id="sentence" type="text" placeholder="Hurr durr uh?"
              value={sentence}
              onChange={e => setSentence(e.target.value)} />
          </div>
          <div className="h-20">
            <button className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
              onClick={_ => setShuffle(!shuffle)}>
              Shuffle!
            </button>
          </div>
        </div>
      </main>
      <footer className="flex flex-col justify-center h-10">
        <hr />
        <span className="m-auto">Created by <a
          className="text-lime-500 hover:underline underline-offset-2"
          href="https://github.com/mameli"
        >
          @Mameli 🗿
        </a></span>
      </footer>
    </div>
  )
}
