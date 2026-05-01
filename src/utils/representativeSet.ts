import type { SetResume, SerieResume } from '@tcgdex/sdk';

/** 시리즈 카드에 표시할 에셋 (대표 세트 커버 우선). */
export type SerieTile = SerieResume & {
    tileLogo?: string;
    representativeSetId?: string;
};

/**
 * 시리즈 ID → 대표로 고정할 세트 ID (자동 규칙이 마음에 안 들 때만 추가).
 */
export const REPRESENTATIVE_SET_OVERRIDES: Record<string, string> = {
    // 예: swsh: 'swsh1',
};

/** 블랙스타 프로모 · 에너지 상품 등 타일 대표로 부적절한 세트 제외 */
function shouldExcludeRepresentative(set: SetResume): boolean {
    const id = set.id.toLowerCase();
    const name = set.name.toLowerCase();

    if (/black\s*star\s*promos?/.test(name)) {
        return true;
    }

    // 흔한 프로모 세트 ID 패턴 (swshp, smp, svp …)
    if (/^(swsh|sm|sv|xy|bw|dp|hgss)(p)$/.test(id)) {
        return true;
    }

    // Scarlet & Violet 에너지 등 소형 에너지 상품
    if (/\benergy\b/.test(name) && set.cardCount.official <= 40) {
        return true;
    }

    // 아주 소형 스핀오프 (필요 시 목록만 확장)
    if (id === 'mfb' || id === 'fut2020') {
        return true;
    }

    return false;
}

/** SV 계열 (sv10.5w 등 문자 접미사 포함) */
function parseSvOrder(id: string): number | null {
    const m = id.match(/^sv(\d+)(?:\.(\d+))?([a-z])?$/);
    if (!m) {
        return null;
    }
    const major = Number.parseInt(m[1], 10);
    const minor = m[2] != null ? Number.parseInt(m[2], 10) / 100 : 0;
    const suffix = m[3] != null ? (m[3].charCodeAt(0) - 96) / 10_000 : 0;
    return major + minor + suffix;
}

/** 메인 라인 확장팩처럼 보이는 세트 ID에서 숫자 순서 추출 (낮을수록 시리즈 초기 확장에 가깝다고 가정). */
function mainLineOrder(setId: string): number {
    const id = setId.toLowerCase();

    const sv = parseSvOrder(id);
    if (sv != null && Number.isFinite(sv)) {
        return sv;
    }

    const trySeries = (prefix: RegExp): number | null => {
        const m = id.match(prefix);
        if (!m) {
            return null;
        }
        const major = Number.parseInt(m[1], 10);
        const minor = m[2] != null ? Number.parseInt(m[2], 10) : 0;
        return major + minor / 100;
    };

    return (
        trySeries(/^swsh(\d+)(?:\.(\d+))?$/) ??
        trySeries(/^sm(\d+)(?:\.(\d+))?$/) ??
        trySeries(/^xy(\d+)(?:\.(\d+))?$/) ??
        trySeries(/^bw(\d+)(?:\.(\d+))?$/) ??
        Number.POSITIVE_INFINITY
    );
}

/**
 * 시리즈에 속한 세트 목록에서 “타일용 대표 세트” 하나를 고른다.
 * - 프로모/에너지 등은 제외 후, 메인 라인 번호가 가장 빠른 세트 우선
 * - 같은 순서면 API 원본 배열 순서 유지
 */
export function pickRepresentativeSet(serieId: string, sets: SetResume[] | undefined): SetResume | undefined {
    if (!sets?.length) {
        return undefined;
    }

    const manualId = REPRESENTATIVE_SET_OVERRIDES[serieId];
    if (manualId) {
        const found = sets.find((s) => s.id === manualId);
        if (found) {
            return found;
        }
    }

    const indexed = sets.map((set, i) => ({ set, i }));
    const filtered = indexed.filter(({ set }) => !shouldExcludeRepresentative(set));
    const pool = filtered.length ? filtered : indexed;

    pool.sort((a, b) => {
        const ao = mainLineOrder(a.set.id);
        const bo = mainLineOrder(b.set.id);
        if (ao !== bo) {
            return ao - bo;
        }
        return a.i - b.i;
    });

    const preferLogo = (candidates: typeof pool): SetResume | undefined => {
        const withLogo = candidates.find((p) => p.set.logo);
        return (withLogo ?? candidates[0])?.set;
    };

    return preferLogo(pool);
}
