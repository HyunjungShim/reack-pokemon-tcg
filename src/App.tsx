import React, { useState } from 'react';
import TCGdex, { Card } from '@tcgdex/sdk'
import { useEffect } from 'react';
import CardComponent from './components/Card';
import { ExtendedCard, VariantDetailed } from './types/pokemon/card-types';
import 'hover-tilt/web-component';
import './assets/styles/common/card.scss';
const tcgdex = new TCGdex('en');

function App() {
  const [cards, setCards] = useState<ExtendedCard[]>([]);
  const [holofoilCards, setHolofoilCards] = useState<ExtendedCard[]>([]);
  useEffect(() => {
    const fetchPokemon = async () => {
      // const series = await tcgdex.serie.get('tcgp');
      // console.log(series);
      const allSeries = await tcgdex.serie.list();
      console.log('all series', allSeries);

      const series = await tcgdex.serie.get("me");
      console.log('series', series);

      const sets = await tcgdex.set.get("me01");
      console.log('sets', sets);

      const res = await tcgdex.fetch('rarities')
      console.log('res', res);

      const eachCardList: Array<ExtendedCard | null> = await Promise.all(sets?.cards.map(async (card): Promise<ExtendedCard | null> => {
        const cardData = await tcgdex.card.get(card.id);
        if (!cardData) {
          return null;
        }
        const mergedRarityClass = () => {
          let rarityValue = (cardData as ExtendedCard)?.rarity?.toLowerCase() || '';
          let variantsValue = (cardData as ExtendedCard).variants_detailed?.map((variant: VariantDetailed) => variant.type.toLowerCase()).join(' ') || '';

          let mergedValue = `${rarityValue} ${variantsValue}`
          mergedValue.split('').filter((el,index,arr) => arr.indexOf(el) === index).join(' ');
          return mergedValue;
        }
          const transformedCardData: ExtendedCard = {
          ...cardData,
          rarity_class: mergedRarityClass(),
          classType: (cardData as ExtendedCard).types?.map((type) => type.toLowerCase()).join(' ') || '',
          subTypes: (cardData as ExtendedCard).stage?.toLowerCase() || '',
        }
        return transformedCardData;
      }) || []);
      const validCardList = eachCardList.filter((card): card is ExtendedCard => card !== null);
      console.log('eachCardList', eachCardList);
      setCards(validCardList);
      const holofoilCards = validCardList.filter((card) => card?.variants?.holo == true);
      console.log('holofoilCards', holofoilCards);
      setHolofoilCards(holofoilCards);

      // const test = await fetch('https://api.pokewallet.io/sets/swsh12/image' , {
      //   headers: {
      //   'X-API-Key': `pk_test_93e063d5ec3b521079eeda2cf8df82f8259810ea42b600ea`
      //   }
      // })
      // .then(res => res.json())
      // console.log('test', test);
    }
    fetchPokemon();
  }, []);
  return (
      <div className="App">
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        {cards.map((card) => (
          <hover-tilt
            
            className={`[&::part(container)]:rounded-[4.55%/3.5%] card-container ${card.classType} `}
            data-subtypes={card.subTypes}
            class="card"
            // data-rarity={card.rarity_class}
            data-rarity='rare holo'
            glare-mask={`url(https://poke-holo.b-cdn.net/foils/${card.id.split('-')[0]}/masks/upscaled/${card.id.split('-')[1]}_foil_holo${card.rarity_class?.includes('reverse') ? '_reverse' : ''}_2x.webp), url(https://poke-holo.b-cdn.net/foils/${card.id.split('-')[0]}/foils/upscaled/${card.id.split('-')[1]}_foil_holo${card.rarity_class?.includes('reverse') ? '_reverse' : ''}_2x.webp)`}
            glare-mask-mode="luminance"
            glare-mask-composite="exclude"
            shadow
            shadow-blur={60}
            // blend-mode="hard-light"
            blend-mode="overlay"
            glare-intensity={4}
            glare-hue={270}
          >
            {/* <div className="card__translater">
              <div className="card__rotator">
                <div className="card__front" > */}
                  <img
                    src={`${card.image}/high.png`}
                    alt={card.name}
                    className="rounded-[inherit]"
                  />
                  <div className="card__shine"></div>
                  <div className="card__glare"></div>
                {/* </div>
              </div>
            </div> */}
          </hover-tilt>
        ))}
        <hover-tilt
          shadow
          className="[&::part(container)]:rounded-[4.55%/3.5%]"
        >
          <img
            src="/pokemon/sv3-5_en_035_std.webp"
            alt="Pokémon #0035: Clefairy"
            loading="lazy"
            className="rounded-[inherit]"
          />
        </hover-tilt>
        <CardComponent />
      </div>
  );
}

export default App;
