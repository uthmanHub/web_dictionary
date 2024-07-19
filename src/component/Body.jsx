import axios from "axios";
import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import dot from "./../assets/dot.png";
import emoji from "./../assets/emoji.svg";

const Content = () => {
  const [searchText, setSearchText] = useState(" ");
  const [audio, setAudio] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);

  function searchWord() {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`)
      .then(res => {
        let data = res.data[0];
        setResults(data);
        setError(false);
        data.phonetics.map(item => {
          let mark;
          if (item.audio) {
            mark = item.audio;
            setAudio(mark);
          } else {
            setAudio(null);
          }
        });
      })
      .catch(() => {
        setError(true);
      });
  }

  const playAudio = fineName => {
    let play = new Audio(fineName);
    play.play();
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      searchWord();
    }
  };

  return (
    <div className='mt-10 flex flex-col gap-10 '>
      <div>
        <div className='w-full mb-2 h-16 rounded-2xl relative'>
          <input
            type='text'
            onChange={e => {
              setSearchText(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder='Search for any word...'
            className={`p-5 pr-12 rounded-2xl w-full h-full text-gray2 outline-none ${
              !searchText ? "focus:outline-red" : ""
            } focus:outline-purple font-bold text-xl bg-[#cdcdcd] transition duration-300 ease-in-out delay-75 dark:bg-[#1f1f1f] dark:text-white`}
          />

          <FaMagnifyingGlass
            onClick={() => {
              searchWord();
            }}
            className='absolute cursor-pointer inset-y-6 size-5 right-5 py5 text-purple'
          />
        </div>
        {!searchText && (
          <span className='text-red ml-2 -mt-2'>Whoops, can't be empty…</span>
        )}
      </div>

      {error ? (
        <div className='flex flex-col justify-center items-center gap-10  text-center dark:text-gray4'>
          <img src={emoji} alt='' className='' />
          <div className='space-y-5'>
            <p className='font-bold text-xl text-gray2 dark:text-white'>
              No Definitions Found
            </p>
            <p className=' text-body-m dark:text-gray7'>
              Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at later time or head to
              the web instead.
            </p>
          </div>
        </div>
      ) : (
        <>
          {results && (
            <div className='flex justify-between items-center px-2 max-w-full'>
              <div className='flex flex-col gap wull'>
                <span className='text-[32px] md:text-[64px] text-gray2 font-bold lg:text-heading-l max-w-9 text-wrap dark:text-white'>
                  {results?.word}
                </span>
                <small className='text-body-m md:text-heading-m lg:text-heading-m  w-fit dark:text-white'>
                  {results?.phonetic}
                </small>
              </div>

              <div>
                <svg
                  type='button'
                  onClick={() => playAudio(audio)}
                  className='group transition-colors duration-300 ease-in-out delay-200 '
                  width='48'
                  height='48'
                  viewBox='0 0 48 48'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle
                    opacity='0.25'
                    cx='24'
                    cy='24'
                    r='24'
                    fill='#A445ED'
                    className=' group-hover:fill-purle group-hover:opacity-100 transition-colors duration-300 ease-in-out delay-200'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M19 18V31L32 24.5L19 18Z'
                    fill='#A445ED'
                    className='group-hover:fill-white '
                  />
                </svg>
              </div>
            </div>
          )}

          {/* word definitions */}
          {results &&
            results.meanings.map((item, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col gap-10 text-gray2 dark:text-white'
                >
                  <div className='flex justify-between items-center gap-8'>
                    <h2 className='text-body-m md:text-heading-m italic flex-1 font-bold'>
                      {item.partOfSpeech}
                    </h2>
                    <div className='border-t-2 border-[#e9e9e9] dark:border-[#3a3a3a] flex-[9]'></div>
                  </div>

                  <div className='flex flex-col gap-7'>
                    <h5 className='text-base md:text-heading-s text-gray7 '>
                      Meaning
                    </h5>
                    {item.definitions.map((def, index) => {
                      return (
                        <div key={index} className='flex flex-col gap-3'>
                          <div className='flex w-full items-start gap-3 md-gap-5'>
                            <img src={dot} alt='' className='mt-2' />
                            <div className='grid gap-1'>
                              <span className='text-base md:text-body-m text-gray2 dark:text-white'>
                                {def.definition}
                              </span>
                              {def.example && (
                                <div>
                                  <span className='text-base md:text-body-m text-gray7'>
                                    "{def.example}"
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {item.synonyms[0] && (
                    <div className='flex w-full gap-5'>
                      <span className='text-base text-gray7 md:text-heading-s'>
                        Synonyms
                      </span>
                      <p className='text-base md:text-xl font-bold text-purple hover:underline hover:cursor-pointer'>
                        {item.synonyms[0]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

          {/* word source url */}
          {results && (
            <div className='flex flex-col pb-10 md:flex-row md:gap-5 border-t-2 border-[#3a3a3a] pt-10 dark:text-white'>
              <p className='text-gray7 text-lg underline'>Source</p>
              <a
                href={results?.sourceUrls[0]}
                target='_blank'
                className='flex underline items-center gap-3'
              >
                <p className=' text-lg text-gray2 dark:text-white'>
                  {results?.sourceUrls[0]}
                </p>
                <FiExternalLink
                  size={24}
                  className='dark:text-gray7 text-gray2'
                />
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Content;
