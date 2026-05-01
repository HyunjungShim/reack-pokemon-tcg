import { useOutletContext } from 'react-router-dom';
import { PokemonOutletContext } from './PokemonScreen';
import { useEffect, useState, useRef } from 'react';
import type { Serie, SerieList } from '@tcgdex/sdk';
import type { SerieTile } from '../utils/representativeSet';
import { pickRepresentativeSet } from '../utils/representativeSet';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import '../assets/styles/common/card.scss';
import '../assets/styles/page/poke_series.scss'
import 'hover-tilt/web-component';

export default function SelectSeries() {
    const { pokemonModel } = useOutletContext<PokemonOutletContext>();
    const [allSeries, setAllSeries] = useState<SerieTile[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [totalDistance, setTotalDistance] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });
    const x = useTransform(scrollYProgress, [0, 1], [(cardRef.current?.clientWidth ?? 0) / 2, -totalDistance]);

    /** 끝에서 더 볼 내용이 있을 때만 왼쪽 끝 페이드(스크롤 초반에는 숨김) */
    const leftEdgeOpacity = useTransform(scrollYProgress, [0, 0.06, 1], [0, 1, 1]);
    /** 시작에서 더 볼 내용이 있을 때만 오른쪽 끝 페이드(스크롤 끝에서는 숨김) */
    const rightEdgeOpacity = useTransform(scrollYProgress, [0, 0.94, 1], [1, 1, 0]);
    const visibleSeries = allSeries.filter((series) => series.tileLogo ?? series.logo);
    const activeSeries = visibleSeries[activeIndex] ?? visibleSeries[0];
    const activeTheme = getSeriesTheme(activeSeries?.id, activeSeries?.name);

    useEffect(() => {
        const fetchAllSeries = async () => {
            const list = (await pokemonModel.handleDataFetch('series')) as SerieList | undefined;
            if (!list?.length) {
                setAllSeries([]);
                return;
            }
            const enriched: SerieTile[] = await Promise.all(
                list.map(async (serie) => {
                    try {
                        const full = (await pokemonModel.handleDataFetch('series', serie.id)) as Serie | null;
                        const sets = full && 'sets' in full && Array.isArray(full.sets) ? full.sets : undefined;
                        const rep = pickRepresentativeSet(serie.id, sets);
                        const tileLogo = rep?.logo ?? serie.logo;
                        return {
                            ...serie,
                            tileLogo,
                            representativeSetId: rep?.id,
                        };
                    } catch {
                        return { ...serie, tileLogo: serie.logo };
                    }
                }),
            );
            setAllSeries(enriched);
            console.log('enriched', enriched);
        };
        fetchAllSeries();
    }, [pokemonModel]);

    useEffect(() => {
        const updateDistance = () => {
            if (!containerRef.current) {
                return;
            }
            console.log('scrollYProgress', scrollYProgress);

            const parentWidth = containerRef.current.parentElement?.clientWidth ?? 0;
            const maxDistance = Math.max(containerRef.current.scrollWidth - parentWidth + (cardRef.current?.clientWidth ?? 0), 0);
            console.log('maxDistance', maxDistance);
            console.log('cardRef', cardRef.current?.clientWidth);
            setTotalDistance(maxDistance);
        };

        updateDistance();
        window.addEventListener('resize', updateDistance);
        return () => window.removeEventListener('resize', updateDistance);
    }, [allSeries]);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        const count = visibleSeries.length;
        if (count === 0) {
            setActiveIndex(0);
            return;
        }
        const nextIndex = Math.min(Math.floor(value * count), count - 1);
        setActiveIndex(nextIndex);
    });

    return (
        <section className="slide-section" ref={sectionRef}>
            <div className="slide-wrapper">
                <div className="series-bg" aria-hidden>
                    <div
                        className="series-bg__base"
                        style={{
                            background: activeTheme.gradient,
                        }}
                    />
                    {activeSeries?.tileLogo ?? activeSeries?.logo ? (
                        <div
                            className="series-bg__logo"
                            style={{
                                backgroundImage: `url(${(activeSeries.tileLogo ?? activeSeries.logo)!}.webp)`,
                            }}
                        />
                    ) : null}
                    <div className="series-bg__overlay" />
                </div>
                <motion.div className="slide-container" ref={containerRef} style={{ x }}>
                    {visibleSeries.map((series, index) => (
                        <div key={series.id}
                            className={
                                `[&::part(container)]:rounded-[4.55%/3.5%] card-container card ${activeIndex === index ? 'active' : ''}
                                `
                            }
                            onClick={() => { setActiveIndex(index); }}
                        >
                            <div className="image-container" ref={cardRef}>
                                <img
                                    src={`${series.tileLogo ?? series.logo}.webp`}
                                    alt={series.name}
                                    className="rounded-[inherit]"
                                    style={{ width: '200px' }}
                                />
                                <h1>{series.name}</h1>
                            </div>
                        </div>
                    ))}
                </motion.div>
                {totalDistance > 0 ? (
                    <>
                        <motion.div
                            className="slide-edge slide-edge--left"
                            style={{ opacity: leftEdgeOpacity }}
                            aria-hidden
                        />
                        <motion.div
                            className="slide-edge slide-edge--right"
                            style={{ opacity: rightEdgeOpacity }}
                            aria-hidden
                        />
                    </>
                ) : null}
            </div>
        </section>
    );
}

function getSeriesTheme(seriesId?: string, seriesName?: string) {
    const key = `${seriesId ?? ''}-${seriesName ?? ''}`.toLowerCase();
    let hash = 0;
    for (let i = 0; i < key.length; i += 1) {
        hash = (hash << 5) - hash + key.charCodeAt(i);
        hash |= 0;
    }

    const hueA = Math.abs(hash) % 360;
    const hueB = (hueA + 55) % 360;
    const gradient = `radial-gradient(circle at 20% 20%, hsl(${hueA} 68% 58%) 0%, hsl(${hueB} 66% 38%) 45%, hsl(${(hueB + 25) % 360} 62% 22%) 100%)`;
    return { gradient };
}
