/**
 * Complete dataset of all 64 I Ching hexagrams in King Wen order.
 *
 * Each entry is keyed by its 6-character binary representation, written
 * TOP-to-BOTTOM (binaryKey[0] = top line / sixth line, binaryKey[5] =
 * bottom line / first line). 1 = yang (solid), 0 = yin (broken).
 *
 * The `judgment` and `image` fields are original paraphrased text conveying
 * the traditional meaning associated with each hexagram's Judgment and
 * Image - they are not direct quotations from any copyrighted translation.
 * The `interpretation` field is an original modern reading.
 */

import type { HexagramData } from '../types/iching';

export const hexagrams: Record<string, HexagramData> = {
  "111111": {
    number: 1,
    binary: "111111",
    unicode: "䷀",
    name: "The Creative",
    chinese: "Qián",
    upper_trigram: "Heaven",
    lower_trigram: "Heaven",
    judgment:
      "Pure creative force moves without obstruction. What begins here is sustained by persistence and clarity of purpose, bringing great and lasting success to those who act with integrity.",
    image:
      "Heaven stacked upon Heaven: tireless, cyclical motion without end. A person of strong character draws on this rhythm, applying steady effort day after day without becoming exhausted.",
    interpretation:
      "A moment of pure potential and creative momentum. Initiative, leadership, and bold first steps are favored now, but they should be paired with discipline so the energy does not scatter.",
  },
  "000000": {
    number: 2,
    binary: "000000",
    unicode: "䷁",
    name: "The Receptive",
    chinese: "Kūn",
    upper_trigram: "Earth",
    lower_trigram: "Earth",
    judgment:
      "Receptive devotion brings success through yielding rather than forcing. Like a mare following the lead, gentle and steady cooperation carries one safely toward a good outcome.",
    image:
      "Earth beneath Earth: vast, nurturing, and supportive. A person of character takes on this quality, carrying others and providing a stable foundation through quiet endurance.",
    interpretation:
      "A time to support rather than lead, to listen rather than push. Patience, adaptability, and trust in a gradual process will accomplish more than forceful action.",
  },
  "010100": {
    number: 3,
    binary: "010100",
    unicode: "䷂",
    name: "Difficulty at the Beginning",
    chinese: "Zhūn",
    upper_trigram: "Water",
    lower_trigram: "Thunder",
    judgment:
      "New growth pushes against resistance at the very start. Difficulty now does not mean failure later; gathering reliable support and moving carefully will allow the situation to take root.",
    image:
      "Thunder rumbles beneath Water: chaotic energy struggling toward order. A person of character organizes what is scattered, bringing structure to the early, confusing stages of a venture.",
    interpretation:
      "Beginnings are often messy and slow. Rather than forcing rapid progress, focus on building foundations, securing allies, and being patient with the inevitable early obstacles.",
  },
  "001010": {
    number: 4,
    binary: "001010",
    unicode: "䷃",
    name: "Youthful Folly",
    chinese: "Méng",
    upper_trigram: "Mountain",
    lower_trigram: "Water",
    judgment:
      "Inexperience seeks guidance. Sincere effort to learn brings success, but repeated careless questioning without real intent to act on the answer leads nowhere.",
    image:
      "Mountain rising above Water: a spring emerging at the base of a peak, not yet finding its course. A person of character cultivates patience, working steadily to bring clarity out of confusion.",
    interpretation:
      "A learning phase. Approach the situation with humility, seek out mentors or better information, and be willing to be corrected. Acting on incomplete understanding now invites mistakes.",
  },
  "010111": {
    number: 5,
    binary: "010111",
    unicode: "䷄",
    name: "Waiting",
    chinese: "Xū",
    upper_trigram: "Water",
    lower_trigram: "Heaven",
    judgment:
      "Waiting with sincerity, as one stands at the edge of water before crossing. Remaining calm and trustworthy while conditions develop leads to good fortune.",
    image:
      "Water gathers above Heaven: clouds forming before rain. A person of character eats, drinks, and rests contentedly, conserving strength while the right moment approaches.",
    interpretation:
      "Not every goal can be reached immediately. This is a time for preparation and patience rather than premature action - gather resources and stay composed until the path is clear.",
  },
  "111010": {
    number: 6,
    binary: "111010",
    unicode: "䷅",
    name: "Conflict",
    chinese: "Sòng",
    upper_trigram: "Heaven",
    lower_trigram: "Water",
    judgment:
      "Conflict arises when intentions diverge, even when one party means well. Caution and a willingness to find middle ground prevent a dispute from escalating into lasting harm.",
    image:
      "Heaven moves above, Water flows downward: opposing directions create tension. A person of character considers carefully before beginning any undertaking, anticipating where disagreement might arise.",
    interpretation:
      "Disputes or tensions are present or brewing. Pursuing a dispute to total victory rarely serves anyone well; seeking a fair compromise or simply stepping back preserves relationships and resources.",
  },
  "000010": {
    number: 7,
    binary: "000010",
    unicode: "䷆",
    name: "The Army",
    chinese: "Shī",
    upper_trigram: "Earth",
    lower_trigram: "Water",
    judgment:
      "A disciplined force, well-led, brings order out of disorder. Strength used with restraint and a clear sense of purpose accomplishes far more than impulsive aggression.",
    image:
      "Earth contains Water: groundwater hidden beneath the surface, vast but unseen. A person of character builds quiet strength among people, fostering unity and shared purpose.",
    interpretation:
      "Organization, discipline, and collective effort are called for. Whether leading a team or coordinating resources, success depends on structure, clear roles, and a shared sense of direction.",
  },
  "010000": {
    number: 8,
    binary: "010000",
    unicode: "䷇",
    name: "Holding Together",
    chinese: "Bǐ",
    upper_trigram: "Water",
    lower_trigram: "Earth",
    judgment:
      "Coming together in unity brings strength, as scattered streams join into Water. Those who arrive late to this unity, or who hold back from full commitment, find things more difficult.",
    image:
      "Water spreads over Earth: rivers and lakes finding their natural confluence. A person of character draws people together, building communities and lasting connections.",
    interpretation:
      "Alliances, partnerships, and community matter now. Joining with others - openly and wholeheartedly - strengthens your position, while isolation or hesitation weakens it.",
  },
  "011111": {
    number: 9,
    binary: "011111",
    unicode: "䷈",
    name: "Small Taming",
    chinese: "Xiǎo Xù",
    upper_trigram: "Wind",
    lower_trigram: "Heaven",
    judgment:
      "Small Taming describes gentle, gradual restraint - like a light wind that shapes clouds without yet bringing rain. Progress continues, but only in small steps for now.",
    image:
      "Wind moves across Heaven: an influence that is felt everywhere but acts subtly. A person of character refines their inner qualities through small, consistent improvements.",
    interpretation:
      "Larger plans must wait; focus on small, achievable steps and refining details. Outward expansion is restrained for the moment, but quiet, incremental progress is still being made.",
  },
  "111110": {
    number: 10,
    binary: "111110",
    unicode: "䷉",
    name: "Treading",
    chinese: "Lǚ",
    upper_trigram: "Heaven",
    lower_trigram: "Lake",
    judgment:
      "Treading carefully, even through a precarious situation, brings safety when conducted with respect and propriety. What might seem dangerous is navigated successfully through correct conduct.",
    image:
      "Heaven rises above the Lake: a vast and open sky reflected in still water below. A person of character distinguishes between higher and lower, acting with appropriate respect in every relationship.",
    interpretation:
      "The situation may feel delicate or even risky, but careful, respectful conduct allows you to move through it safely. Mind your manners and your boundaries, and the path stays clear.",
  },
  "000111": {
    number: 11,
    binary: "000111",
    unicode: "䷊",
    name: "Peace",
    chinese: "Tài",
    upper_trigram: "Earth",
    lower_trigram: "Heaven",
    judgment:
      "Peace describes a time when complementary forces meet in balance - what is below rises, what is above descends, and harmony results. Great things can be accomplished now.",
    image:
      "Earth rests above Heaven: a season of balance where opposites meet and support one another. A person of character apportions resources fairly and harmonizes differing interests.",
    interpretation:
      "A favorable, harmonious period where effort meets receptive conditions. This is an excellent time to build, connect, and move plans forward, though such peaceful periods do not last forever - use them well.",
  },
  "111000": {
    number: 12,
    binary: "111000",
    unicode: "䷋",
    name: "Standstill",
    chinese: "Pǐ",
    upper_trigram: "Heaven",
    lower_trigram: "Earth",
    judgment:
      "Standstill describes a period when communication breaks down and progress stalls, often because those who should cooperate are working at odds with one another.",
    image:
      "Heaven rises above Earth: forces drawing apart rather than meeting. A person of character withdraws from public affairs during such times, conserving integrity rather than struggling against the current.",
    interpretation:
      "This is not the moment for major new initiatives - efforts may meet with little response or active resistance. Conserve your resources, maintain your principles privately, and wait for conditions to shift.",
  },
  "111101": {
    number: 13,
    binary: "111101",
    unicode: "䷌",
    name: "Fellowship",
    chinese: "Tóng Rén",
    upper_trigram: "Heaven",
    lower_trigram: "Fire",
    judgment:
      "Fellowship with others, when based on shared, open-hearted values rather than narrow self-interest, brings success even across differences of background or opinion.",
    image:
      "Fire rises beneath Heaven: light reaching outward to illuminate a wide expanse. A person of character distinguishes between groups while still finding common ground that unites them.",
    interpretation:
      "Collaboration across differences is favored, but only if the shared purpose is genuine and broad rather than serving a narrow clique. Seek alliances built on real common ground.",
  },
  "101111": {
    number: 14,
    binary: "101111",
    unicode: "䷍",
    name: "Great Possession",
    chinese: "Dà Yǒu",
    upper_trigram: "Fire",
    lower_trigram: "Heaven",
    judgment:
      "Great Possession describes abundance held with humility - resources, influence, or opportunity gathered not for selfish ends but to be used wisely and shared appropriately.",
    image:
      "Fire blazes above Heaven: brilliant light illuminating everything below. A person of character restrains what is harmful and promotes what is good, using abundance responsibly.",
    interpretation:
      "Resources, recognition, or opportunity may be flowing toward you. The challenge now is not acquisition but stewardship - use what you have generously and avoid arrogance or excess.",
  },
  "000001": {
    number: 15,
    binary: "000001",
    unicode: "䷎",
    name: "Modesty",
    chinese: "Qiān",
    upper_trigram: "Earth",
    lower_trigram: "Mountain",
    judgment:
      "Modesty brings lasting success. Those who hold real ability or merit but do not flaunt it earn deeper respect and avoid the resentment that pride invites.",
    image:
      "Earth contains Mountain: a great height humbly nestled within the land rather than towering apart from it. A person of character levels what is too high and raises what is too low, maintaining balance through humility.",
    interpretation:
      "Understated competence serves you better than self-promotion right now. Letting your work speak for itself, and giving credit generously to others, builds goodwill that pays off over time.",
  },
  "100000": {
    number: 16,
    binary: "100000",
    unicode: "䷏",
    name: "Enthusiasm",
    chinese: "Yù",
    upper_trigram: "Thunder",
    lower_trigram: "Earth",
    judgment:
      "Enthusiasm, when it arises naturally and is shared with others, moves people to willing action. Genuine inspiration accomplishes what coercion cannot.",
    image:
      "Thunder bursts forth from Earth: a sudden, energizing release that stirs everything around it. A person of character uses music, celebration, and shared joy to bring people together.",
    interpretation:
      "Momentum and motivation are building, and this is a good time to inspire others toward a shared goal. Genuine enthusiasm, rather than pressure, is what will move things forward now.",
  },
  "110100": {
    number: 17,
    binary: "110100",
    unicode: "䷐",
    name: "Following",
    chinese: "Suí",
    upper_trigram: "Lake",
    lower_trigram: "Thunder",
    judgment:
      "Following the right path at the right time, with sincerity rather than blind compliance, brings great success. What matters is choosing wisely whom or what to follow.",
    image:
      "Lake rests above Thunder: movement that settles into a natural rhythm. A person of character rests when the day's work is done, aligning their pace with the rhythm of events.",
    interpretation:
      "Aligning yourself with the right people, trends, or processes - rather than insisting on your own path - brings good results now. Choose your influences and alliances thoughtfully, then commit.",
  },
  "001011": {
    number: 18,
    binary: "001011",
    unicode: "䷑",
    name: "Work on the Decayed",
    chinese: "Gǔ",
    upper_trigram: "Mountain",
    lower_trigram: "Wind",
    judgment:
      "Addressing decay or corruption that has built up over time requires patience and care. What was neglected can be restored, but only through deliberate, sustained effort.",
    image:
      "Mountain rises above Wind: stillness above, gentle movement below, hinting at things that have settled and gone stale. A person of character rouses others and strengthens what has weakened through quiet resolve.",
    interpretation:
      "Something has been neglected and needs attention - old habits, unresolved issues, or accumulated problems. Facing this directly, even if it is uncomfortable, prevents further decline.",
  },
  "000110": {
    number: 19,
    binary: "000110",
    unicode: "䷒",
    name: "Approach",
    chinese: "Lín",
    upper_trigram: "Earth",
    lower_trigram: "Lake",
    judgment:
      "Approach describes a favorable opening, a season of growth and increasing influence. Yet even good fortune calls for care, since what rises must eventually face a turning point.",
    image:
      "Earth rises above Lake: the shoreline gradually extending its reach. A person of character teaches and nurtures others without limit, recognizing that growth shared widely lasts longest.",
    interpretation:
      "Conditions are improving and opportunities are opening up. Make the most of this favorable period, but remain humble and prepared, since circumstances will continue to shift over time.",
  },
  "011000": {
    number: 20,
    binary: "011000",
    unicode: "䷓",
    name: "Contemplation",
    chinese: "Guān",
    upper_trigram: "Wind",
    lower_trigram: "Earth",
    judgment:
      "Contemplation describes stepping back to observe with clear, unbiased attention - like a ruler surveying the land before acting. What is seen clearly can be addressed wisely.",
    image:
      "Wind moves above Earth: an influence that travels widely, touching everything it passes over. A person of character examines the customs and conditions of the people, shaping their own conduct accordingly.",
    interpretation:
      "Before acting, take time to observe carefully - your own situation, the people involved, the broader trends at play. Clear-eyed reflection now leads to better decisions later.",
  },
  "101100": {
    number: 21,
    binary: "101100",
    unicode: "䷔",
    name: "Biting Through",
    chinese: "Shì Kè",
    upper_trigram: "Fire",
    lower_trigram: "Thunder",
    judgment:
      "Biting Through describes the firm, decisive action needed to remove an obstacle that is blocking progress. Justice applied promptly, though it may be unwelcome, restores order.",
    image:
      "Fire rises above Thunder: bright clarity combined with decisive movement. A person of character applies penalties and corrections clearly, so that wrongs are addressed and order is restored.",
    interpretation:
      "An obstacle, dispute, or piece of dishonesty needs to be confronted directly rather than avoided. Decisive, fair action - even if it causes short-term discomfort - clears the way forward.",
  },
  "001101": {
    number: 22,
    binary: "001101",
    unicode: "䷕",
    name: "Grace",
    chinese: "Bì",
    upper_trigram: "Mountain",
    lower_trigram: "Fire",
    judgment:
      "Grace describes refinement and beauty applied to substance - the outward form that expresses inner worth. Small matters benefit from this attention, though it should not replace what is essential.",
    image:
      "Fire glows beneath Mountain: light illuminating the surface of something solid and enduring. A person of character attends to outward forms and details without neglecting deeper matters.",
    interpretation:
      "Presentation, style, and how things appear to others matter now, but should support rather than substitute for substance. Polish your work and your image, while keeping the foundation solid.",
  },
  "001000": {
    number: 23,
    binary: "001000",
    unicode: "䷖",
    name: "Splitting Apart",
    chinese: "Bō",
    upper_trigram: "Mountain",
    lower_trigram: "Earth",
    judgment:
      "Splitting Apart describes a period of decline, where what has supported a situation is gradually being eroded from below. Resisting directly is unwise; preserving what is essential matters most.",
    image:
      "Mountain rests above Earth: a great mass resting on a foundation that is wearing away beneath it. A person of character, recognizing the season, withdraws from exposed positions to preserve their core strength.",
    interpretation:
      "A period of erosion or decline is underway - in a relationship, project, or situation. Rather than fighting every loss, focus on protecting what matters most and prepare for renewal once the decline runs its course.",
  },
  "000100": {
    number: 24,
    binary: "000100",
    unicode: "䷗",
    name: "Return",
    chinese: "Fù",
    upper_trigram: "Earth",
    lower_trigram: "Thunder",
    judgment:
      "Return describes the turning point after decline, when a small but genuine positive change begins to take root. Movement is gentle at first but represents a real shift in direction.",
    image:
      "Thunder rests within Earth: a single spark of movement beneath a still surface, the first stirring of renewal. A person of character withdraws to rest and reflect at times that call for stillness, allowing natural cycles to unfold.",
    interpretation:
      "After a period of difficulty or stagnation, a positive shift is beginning - though it may still be small or fragile. Nurture this new direction gently rather than forcing rapid change.",
  },
  "111100": {
    number: 25,
    binary: "111100",
    unicode: "䷘",
    name: "Innocence",
    chinese: "Wú Wàng",
    upper_trigram: "Heaven",
    lower_trigram: "Thunder",
    judgment:
      "Innocence describes acting in accordance with one's true nature, without calculation or ulterior motive. Such sincerity brings good fortune, though forcing outcomes against this natural flow leads to trouble.",
    image:
      "Thunder moves beneath Heaven: spontaneous, natural energy arising under the broad order of the cosmos. A person of character nurtures all things in harmony with their nature, without imposing artificial control.",
    interpretation:
      "Acting with sincerity and natural motivation, rather than from calculation or anxiety, brings the best results now. Trying to manufacture an outcome through manipulation is likely to backfire.",
  },
  "001111": {
    number: 26,
    binary: "001111",
    unicode: "䷙",
    name: "Great Taming",
    chinese: "Dà Xù",
    upper_trigram: "Mountain",
    lower_trigram: "Heaven",
    judgment:
      "Great Taming describes the accumulation of substantial resources, strength, or knowledge through patient restraint. What is firmly held in check now can later be released to great effect.",
    image:
      "Mountain rises above Heaven: vast power held firmly in place, restrained rather than released. A person of character studies the past and accumulates knowledge, building inner strength through disciplined study.",
    interpretation:
      "Significant resources or capabilities are being built up, even if they are not yet being used. This is a time for accumulation, training, and preparation - the payoff comes from holding steady now.",
  },
  "001100": {
    number: 27,
    binary: "001100",
    unicode: "䷚",
    name: "Nourishment",
    chinese: "Yí",
    upper_trigram: "Mountain",
    lower_trigram: "Thunder",
    judgment:
      "Nourishment concerns what we take in - food, ideas, influences - and how we, in turn, provide for others. Care in both receiving and giving sustenance leads to good fortune.",
    image:
      "Mountain rests above Thunder: stillness above movement, like jaws working to nourish the body. A person of character is careful about what they say and what they consume, recognizing that both shape their wellbeing.",
    interpretation:
      "Pay attention to what is sustaining you - and what you are providing to others - whether that means literal nourishment, information, emotional support, or resources. Quality and care in this exchange matter.",
  },
  "110011": {
    number: 28,
    binary: "110011",
    unicode: "䷛",
    name: "Great Preponderance",
    chinese: "Dà Guò",
    upper_trigram: "Lake",
    lower_trigram: "Wind",
    judgment:
      "Great Preponderance describes a situation under unusual strain, where the load is heavier than the support beneath it can comfortably bear. Careful, exceptional measures are required to avoid collapse.",
    image:
      "Lake rises above Wind: water gathering above a yielding foundation, the structure bending under pressure. A person of character stands firm even when isolated, accepting that extraordinary times call for extraordinary resolve.",
    interpretation:
      "Pressure or stakes are unusually high, and ordinary approaches may not be sufficient. This calls for careful, sometimes unconventional measures, along with the willingness to stand firm even without much support.",
  },
  "010010": {
    number: 29,
    binary: "010010",
    unicode: "䷜",
    name: "The Abysmal Water",
    chinese: "Kǎn",
    upper_trigram: "Water",
    lower_trigram: "Water",
    judgment:
      "The Abysmal describes repeated danger, like flowing water that moves through one obstacle after another. Maintaining sincerity and a clear inner course allows one to pass through safely.",
    image:
      "Water repeats above Water: a continuous flow finding its way regardless of the terrain. A person of character practices consistent behavior and teaches through repeated, reliable example.",
    interpretation:
      "Repeated challenges or a sense of being in over your head may be present. Like water finding its way around obstacles, persistence and a steady inner approach will get you through, even if progress feels gradual.",
  },
  "101101": {
    number: 30,
    binary: "101101",
    unicode: "䷝",
    name: "The Clinging Fire",
    chinese: "Lí",
    upper_trigram: "Fire",
    lower_trigram: "Fire",
    judgment:
      "The Clinging describes brightness and clarity, like fire that depends on fuel to keep burning. Maintaining the conditions that sustain this brightness brings continued success.",
    image:
      "Fire repeats above Fire: brilliant light reflected and renewed in succession. A person of character cultivates and maintains their own brightness, like a flame that is carefully tended.",
    interpretation:
      "Clarity, visibility, and energy are present, but they depend on ongoing support - attention, resources, or relationships that keep the 'fire' burning. Maintain what sustains your momentum.",
  },
  "110001": {
    number: 31,
    binary: "110001",
    unicode: "䷞",
    name: "Influence",
    chinese: "Xián",
    upper_trigram: "Lake",
    lower_trigram: "Mountain",
    judgment:
      "Influence describes the mutual attraction and responsiveness between two parties, like the beginning of a meaningful relationship. Approached with sincerity, this connection brings success.",
    image:
      "Lake rests above Mountain: a body of water resting against solid ground, each shaping the other through gentle contact. A person of character remains receptive, allowing themselves to be influenced even as they influence others.",
    interpretation:
      "A new connection, relationship, or mutual influence is forming. Openness and genuine responsiveness - rather than rigid positions - will help this connection develop in a positive direction.",
  },
  "100011": {
    number: 32,
    binary: "100011",
    unicode: "䷟",
    name: "Duration",
    chinese: "Héng",
    upper_trigram: "Thunder",
    lower_trigram: "Wind",
    judgment:
      "Duration describes what continues steadily over time, neither rushing nor stagnating. Lasting success comes from consistent principles applied through changing circumstances.",
    image:
      "Thunder moves above Wind: motion that persists in a steady, recurring pattern. A person of character maintains their direction, adapting the details of their approach while holding firm to their underlying purpose.",
    interpretation:
      "Consistency and staying the course matter more than dramatic gestures right now. Whatever you are building benefits from steady, sustained effort applied over time, even when progress feels slow.",
  },
  "111001": {
    number: 33,
    binary: "111001",
    unicode: "䷠",
    name: "Retreat",
    chinese: "Dùn",
    upper_trigram: "Heaven",
    lower_trigram: "Mountain",
    judgment:
      "Retreat describes a strategic withdrawal at the right time, before a situation becomes unfavorable. Stepping back gracefully now preserves strength for a better moment.",
    image:
      "Heaven rises above Mountain: a great height retreating gradually behind a rising barrier. A person of character keeps their distance from what is corrupting while remaining outwardly courteous.",
    interpretation:
      "Sometimes the wisest move is to step back rather than push forward, especially if conditions are turning unfavorable. A timely retreat is not defeat - it preserves your position for a better moment.",
  },
  "100111": {
    number: 34,
    binary: "100111",
    unicode: "䷡",
    name: "Great Power",
    chinese: "Dà Zhuàng",
    upper_trigram: "Thunder",
    lower_trigram: "Heaven",
    judgment:
      "Great Power describes strength that is real and considerable, but which must be guided by what is right. Power used recklessly, without regard for what is appropriate, leads to setbacks.",
    image:
      "Thunder moves above Heaven: tremendous energy expressed openly and boldly. A person of character does not act against what they know to be proper, even when they have the strength to do so.",
    interpretation:
      "You may have significant strength, momentum, or leverage right now. The key question is how it is used - applied with restraint and integrity, it leads to lasting gains; used carelessly, it invites backlash.",
  },
  "101000": {
    number: 35,
    binary: "101000",
    unicode: "䷢",
    name: "Progress",
    chinese: "Jìn",
    upper_trigram: "Fire",
    lower_trigram: "Earth",
    judgment:
      "Progress describes steady advancement that is recognized and rewarded, like a trusted official rising in favor. Continuing along this path with diligence brings increasing success.",
    image:
      "Fire rises above Earth: the sun climbing above the horizon, illuminating more of the land as it ascends. A person of character builds on their own bright qualities, becoming an example that others naturally look to.",
    interpretation:
      "Things are moving in a favorable direction, and your efforts are likely to be noticed. Continue building on your strengths and contributions; recognition and further opportunities tend to follow steady progress.",
  },
  "000101": {
    number: 36,
    binary: "000101",
    unicode: "䷣",
    name: "Darkening of the Light",
    chinese: "Míng Yí",
    upper_trigram: "Earth",
    lower_trigram: "Fire",
    judgment:
      "Darkening of the Light describes a period when one's true qualities must be concealed, often because the surrounding situation is hostile or unfavorable to openness. Inner steadiness matters even when outward expression is limited.",
    image:
      "Fire sets beneath Earth: brightness hidden below the surface rather than shining outward. A person of character, in difficult times, conceals their brilliance outwardly while remaining clear and steady within.",
    interpretation:
      "This may not be the time to be fully open about your intentions, feelings, or plans - circumstances around you are not receptive. Maintain your integrity privately, and wait for a safer moment to act more openly.",
  },
  "011101": {
    number: 37,
    binary: "011101",
    unicode: "䷤",
    name: "The Family",
    chinese: "Jiā Rén",
    upper_trigram: "Wind",
    lower_trigram: "Fire",
    judgment:
      "The Family describes the foundational unit from which order radiates outward - clear roles, mutual respect, and consistent behavior within close relationships support stability in the wider world.",
    image:
      "Wind emerges from Fire: warmth and influence radiating outward from a central source. A person of character speaks with consistency and acts with reliability, so that words and conduct reinforce one another within close relationships.",
    interpretation:
      "Attention to close relationships - family, household, or core team - pays dividends now. Clear communication, consistent behavior, and respecting each person's role strengthen the foundation everything else rests on.",
  },
  "101110": {
    number: 38,
    binary: "101110",
    unicode: "䷥",
    name: "Opposition",
    chinese: "Kuí",
    upper_trigram: "Fire",
    lower_trigram: "Lake",
    judgment:
      "Opposition describes a situation where two parties move in different directions, yet still need to coexist. Small matters can still go well even amid this divergence, if handled with care.",
    image:
      "Fire rises above Lake: two elements that do not naturally combine, existing side by side. A person of character notes differences while still finding ways to work alongside others despite them.",
    interpretation:
      "Disagreement or a sense of being at odds with someone is present, but this does not have to derail everything. Smaller, practical matters can still be handled cooperatively even while larger differences remain unresolved.",
  },
  "010001": {
    number: 39,
    binary: "010001",
    unicode: "䷦",
    name: "Obstruction",
    chinese: "Jiǎn",
    upper_trigram: "Water",
    lower_trigram: "Mountain",
    judgment:
      "Obstruction describes a difficult passage, like a path blocked by rough terrain. Seeking help from those with more experience, and choosing the right moment to act, allows one to overcome the difficulty.",
    image:
      "Water gathers above Mountain: a steep slope made more difficult by rain. A person of character examines their own conduct and inner qualities when faced with obstacles, improving themselves rather than blaming external circumstances alone.",
    interpretation:
      "Progress is slower than you'd like, with real obstacles in the way. Rather than forcing through alone, look for guidance or support from others, and use this slower period to refine your own approach.",
  },
  "100010": {
    number: 40,
    binary: "100010",
    unicode: "䷧",
    name: "Deliverance",
    chinese: "Jiě",
    upper_trigram: "Thunder",
    lower_trigram: "Water",
    judgment:
      "Deliverance describes a release of tension after a difficult period - like a storm passing and clearing the air. Resolving lingering issues promptly, without dwelling on them, allows for fresh movement forward.",
    image:
      "Thunder moves above Water: pent-up tension releasing in a sudden burst of activity. A person of character forgives past mistakes and lightens penalties once the underlying difficulty has passed.",
    interpretation:
      "A period of difficulty is easing, and there is room to move forward again. This is a good time to resolve lingering issues, let go of old grievances, and redirect energy toward what comes next.",
  },
  "001110": {
    number: 41,
    binary: "001110",
    unicode: "䷨",
    name: "Decrease",
    chinese: "Sǔn",
    upper_trigram: "Mountain",
    lower_trigram: "Lake",
    judgment:
      "Decrease describes a situation where something must be given up or reduced - and when done with the right intention, this reduction can ultimately support something more valuable.",
    image:
      "Mountain rises above Lake: water gradually wearing down a great height over time. A person of character restrains their anger and moderates their desires, willingly giving up what is excessive.",
    interpretation:
      "Some kind of reduction, sacrifice, or simplification is called for - whether that's cutting expenses, scaling back commitments, or letting go of excess. Done thoughtfully, this creates space for something better to grow.",
  },
  "011100": {
    number: 42,
    binary: "011100",
    unicode: "䷩",
    name: "Increase",
    chinese: "Yì",
    upper_trigram: "Wind",
    lower_trigram: "Thunder",
    judgment:
      "Increase describes a favorable flow where benefit moves from those with abundance toward those in need, strengthening the whole. Acting on worthy undertakings now brings good results.",
    image:
      "Wind moves above Thunder: combined movement that amplifies its effect. A person of character, upon seeing good, emulates it, and upon recognizing faults, corrects them, continually increasing their own virtue.",
    interpretation:
      "Resources, support, or momentum are flowing in a helpful direction. This is a good time to invest in worthwhile projects, share benefits generously, and build on positive momentum while it is present.",
  },
  "110111": {
    number: 43,
    binary: "110111",
    unicode: "䷪",
    name: "Breakthrough",
    chinese: "Guài",
    upper_trigram: "Lake",
    lower_trigram: "Heaven",
    judgment:
      "Breakthrough describes the final, decisive resolution of a long-standing problem - achieved openly and with the support of others, rather than through secrecy or compromise.",
    image:
      "Lake rises above Heaven: water gathering until it must overflow. A person of character distributes resources generously to those below, recognizing that strength shared widely is more secure than strength hoarded.",
    interpretation:
      "A long-standing issue is reaching a decisive turning point. Address it openly and decisively, with the awareness and support of others, rather than letting it linger unresolved any longer.",
  },
  "111011": {
    number: 44,
    binary: "111011",
    unicode: "䷫",
    name: "Coming to Meet",
    chinese: "Gòu",
    upper_trigram: "Heaven",
    lower_trigram: "Wind",
    judgment:
      "Coming to Meet describes an unexpected encounter or influence entering a situation - it should be approached with caution, since not every new element that arrives is beneficial.",
    image:
      "Heaven rises above Wind: a powerful presence meeting a subtle, pervasive influence. A person of character is cautious in dealings with those whose character or intentions are not yet known.",
    interpretation:
      "Something new - a person, opportunity, or influence - is entering the picture, somewhat unexpectedly. Approach it with healthy caution rather than immediate full trust, until its nature becomes clearer.",
  },
  "110000": {
    number: 45,
    binary: "110000",
    unicode: "䷬",
    name: "Gathering Together",
    chinese: "Cuì",
    upper_trigram: "Lake",
    lower_trigram: "Earth",
    judgment:
      "Gathering Together describes people or resources coming together around a common purpose, particularly under capable leadership. Such gatherings benefit from sincerity and appropriate offerings or commitments.",
    image:
      "Lake rises above Earth: water collecting in a low place, drawing together what flows toward it. A person of character prepares defenses and addresses problems before they arise, anticipating what a gathering of people or resources may require.",
    interpretation:
      "People, resources, or efforts are coming together around a shared goal. This is a good time to organize, build community, and make sure the gathering has the structure and preparation it needs to be productive.",
  },
  "000011": {
    number: 46,
    binary: "000011",
    unicode: "䷭",
    name: "Pushing Upward",
    chinese: "Shēng",
    upper_trigram: "Earth",
    lower_trigram: "Wind",
    judgment:
      "Pushing Upward describes gradual, organic growth - like a plant rising steadily toward the light. Seeking the support of capable people and proceeding without anxiety leads to success.",
    image:
      "Earth contains Wood pushing upward (traditionally associated with Wind/Wood rising through Earth): gradual growth emerging from a stable base. A person of character accumulates small virtues, building toward something greater through steady development.",
    interpretation:
      "Gradual growth and development are underway, even if progress feels slow at times. Seek out mentors, allies, or supportive conditions, and trust that steady upward movement will continue if nurtured.",
  },
  "110010": {
    number: 47,
    binary: "110010",
    unicode: "䷮",
    name: "Oppression",
    chinese: "Kùn",
    upper_trigram: "Lake",
    lower_trigram: "Water",
    judgment:
      "Oppression describes a difficult, constraining situation in which resources or support feel limited. Maintaining inner composure and integrity, even under pressure, leads to eventual success.",
    image:
      "Water sits beneath Lake: water draining away, leaving the lake diminished. A person of character, even when constrained, holds firmly to their purpose and does not let outward difficulty compromise their inner resolve.",
    interpretation:
      "You may feel constrained, depleted, or under pressure - resources or support seem harder to access than usual. Maintaining your composure and core values through this period matters more than trying to force a quick fix.",
  },
  "010011": {
    number: 48,
    binary: "010011",
    unicode: "䷯",
    name: "The Well",
    chinese: "Jǐng",
    upper_trigram: "Water",
    lower_trigram: "Wind",
    judgment:
      "The Well describes a steady source that provides for many, regardless of who comes to draw from it. What matters is keeping this source clear, accessible, and well-maintained.",
    image:
      "Water rises above Wind: water drawn upward, as from a well, to nourish what is above. A person of character encourages others and offers help generously, like a well that serves all who come to it.",
    interpretation:
      "Reliable resources, knowledge, or support exist and are available to be drawn upon - but they need to be maintained and kept accessible. Make sure whatever sustains you (and others) is being properly cared for.",
  },
  "110101": {
    number: 49,
    binary: "110101",
    unicode: "䷰",
    name: "Revolution",
    chinese: "Gé",
    upper_trigram: "Lake",
    lower_trigram: "Fire",
    judgment:
      "Revolution describes a fundamental change that becomes necessary and, when undertaken at the right time and with the right intentions, is accepted and ultimately brings success.",
    image:
      "Lake rests above Fire: water and flame, each capable of transforming the other. A person of character studies the patterns of change over time, preparing for shifts before they fully arrive.",
    interpretation:
      "Significant change - in direction, structure, or approach - may be needed and is becoming possible. If the timing is right and the change is well-founded, it is likely to be accepted, even if it feels disruptive at first.",
  },
  "101011": {
    number: 50,
    binary: "101011",
    unicode: "䷱",
    name: "The Cauldron",
    chinese: "Dǐng",
    upper_trigram: "Fire",
    lower_trigram: "Wind",
    judgment:
      "The Cauldron describes transformation through careful preparation - raw materials refined into something nourishing and valuable. Attending to this process with care brings good results.",
    image:
      "Fire rises above Wind: heat applied to what is being transformed, refining it. A person of character consolidates their position and strengthens what is good, much as a cauldron holds and transforms its contents.",
    interpretation:
      "A process of refinement or transformation is underway - turning raw effort, ideas, or resources into something more valuable. Tend to this process attentively, and the results will be worth the care invested.",
  },
  "100100": {
    number: 51,
    binary: "100100",
    unicode: "䷲",
    name: "The Arousing Thunder",
    chinese: "Zhèn",
    upper_trigram: "Thunder",
    lower_trigram: "Thunder",
    judgment:
      "The Arousing describes a sudden shock or disruption that, while startling, need not be harmful if met with composure. Maintaining presence of mind through the shock allows one to proceed safely afterward.",
    image:
      "Thunder repeats above Thunder: successive shocks that startle but do not necessarily damage. A person of character responds to such moments with caution and self-examination, treating disruption as a prompt for reflection.",
    interpretation:
      "A sudden, jolting development may occur - news, a change of plans, an unexpected event. The shock itself is less important than your response: staying composed allows you to adapt quickly rather than being thrown off course.",
  },
  "001001": {
    number: 52,
    binary: "001001",
    unicode: "䷳",
    name: "Keeping Still Mountain",
    chinese: "Gèn",
    upper_trigram: "Mountain",
    lower_trigram: "Mountain",
    judgment:
      "Keeping Still describes a deliberate stillness - not stagnation, but a conscious pause that allows clarity to emerge. Stopping at the right time and in the right way brings good fortune.",
    image:
      "Mountain rests above Mountain: an immovable presence, solid and unmoving. A person of character keeps their thoughts from wandering beyond what is relevant to their current position, cultivating focused stillness.",
    interpretation:
      "This is a time for deliberate pause rather than constant motion. Stepping back from activity, quieting the mind, and focusing only on what is directly in front of you brings clarity that constant busyness would obscure.",
  },
  "011001": {
    number: 53,
    binary: "011001",
    unicode: "䷴",
    name: "Development",
    chinese: "Jiàn",
    upper_trigram: "Wind",
    lower_trigram: "Mountain",
    judgment:
      "Development describes gradual, step-by-step progress, like the slow movement of a journey covered in careful stages. Patience with this pace, rather than rushing, leads to good results.",
    image:
      "Wind moves above Mountain: a gentle influence gradually shaping a solid form over time. A person of character cultivates virtue gradually, improving their own character and their surroundings through patient, ongoing effort.",
    interpretation:
      "Progress is happening, but gradually - and trying to rush it is likely to backfire. Take the steady, step-by-step approach, building each stage on the one before it, and trust that the cumulative effect will be substantial.",
  },
  "100110": {
    number: 54,
    binary: "100110",
    unicode: "䷵",
    name: "The Marrying Maiden",
    chinese: "Guī Mèi",
    upper_trigram: "Thunder",
    lower_trigram: "Lake",
    judgment:
      "The Marrying Maiden describes a situation entered into from a position of lesser influence or control. Proceeding with awareness of this imbalance, and acting appropriately within it, avoids difficulty.",
    image:
      "Thunder moves above Lake: movement that stirs what lies beneath, an arrangement not fully under one's own control. A person of character considers how a situation may end, even as it begins, anticipating eventual outcomes.",
    interpretation:
      "You may be entering a situation where you have less control or influence than you would prefer. Recognizing this honestly, and acting with care and appropriate expectations, helps you navigate it without unnecessary friction.",
  },
  "100101": {
    number: 55,
    binary: "100101",
    unicode: "䷶",
    name: "Abundance",
    chinese: "Fēng",
    upper_trigram: "Thunder",
    lower_trigram: "Fire",
    judgment:
      "Abundance describes a high point - a season of fullness and brightness. Such peaks are real, but temporary by nature; appreciating them fully while they last is wise, without expecting them to be permanent.",
    image:
      "Thunder moves above Fire: both movement and brilliance combined at their height. A person of character, recognizing a moment of abundance, settles disputes and administers justice clearly, making the most of a favorable time.",
    interpretation:
      "You may be at or near a high point - of activity, recognition, resources, or opportunity. Enjoy and make good use of this peak, while keeping in mind that all such peaks eventually shift, so plan accordingly.",
  },
  "101001": {
    number: 56,
    binary: "101001",
    unicode: "䷷",
    name: "The Wanderer",
    chinese: "Lǚ",
    upper_trigram: "Fire",
    lower_trigram: "Mountain",
    judgment:
      "The Wanderer describes a period of travel or transition, away from one's usual base of support. Small, careful actions and maintaining good relations along the way bring success during such a time.",
    image:
      "Fire rests above Mountain: a fire burning on a hillside, moving on rather than settling permanently. A person of character is careful and clear in administering justice, and does not let disputes linger when away from familiar ground.",
    interpretation:
      "You may be in transition - between roles, places, or phases of life - without the usual support structures fully in place. Stay adaptable, keep things simple, and maintain good relationships wherever you find yourself.",
  },
  "011011": {
    number: 57,
    binary: "011011",
    unicode: "䷸",
    name: "The Gentle Wind",
    chinese: "Xùn",
    upper_trigram: "Wind",
    lower_trigram: "Wind",
    judgment:
      "The Gentle describes influence that works through repetition and subtlety, like wind that gradually shapes the landscape. Persisting with this gentle approach, supported by capable guidance, brings success.",
    image:
      "Wind repeats above Wind: a pervasive influence that reaches everywhere gradually. A person of character spreads their intentions gently and repeatedly, working through influence rather than force.",
    interpretation:
      "Gentle, repeated influence - rather than a single dramatic intervention - is the most effective approach right now. Consistency and subtlety, applied over time, will shape the outcome more reliably than force.",
  },
  "110110": {
    number: 58,
    binary: "110110",
    unicode: "䷹",
    name: "The Joyous Lake",
    chinese: "Duì",
    upper_trigram: "Lake",
    lower_trigram: "Lake",
    judgment:
      "The Joyous describes genuine pleasure and openness shared between people, which strengthens connection and brings success when it arises from sincerity rather than mere indulgence.",
    image:
      "Lake rests above Lake: two bodies of water reflecting and reinforcing one another. A person of character engages in open discussion and practice with friends, deepening understanding through shared joy.",
    interpretation:
      "Connection, communication, and shared enjoyment with others are favored now. Genuine openness and good humor - not forced positivity - strengthen relationships and create a foundation for further cooperation.",
  },
  "011010": {
    number: 59,
    binary: "011010",
    unicode: "䷺",
    name: "Dispersion",
    chinese: "Huàn",
    upper_trigram: "Wind",
    lower_trigram: "Water",
    judgment:
      "Dispersion describes a situation where something rigid or stuck needs to be loosened and spread out, allowing renewal. Approached with sincerity, even significant undertakings can succeed during this dispersal.",
    image:
      "Wind moves above Water: a breeze scattering mist across the surface of a lake. A person of character, in times of dispersion, makes offerings and connects with what is meaningful, finding renewal through reflection.",
    interpretation:
      "Something that has been overly concentrated, rigid, or stuck may need to be loosened or spread out - whether that's a tense situation, a backlog, or an old pattern. This dispersal, approached thoughtfully, opens the way for renewal.",
  },
  "010110": {
    number: 60,
    binary: "010110",
    unicode: "䷻",
    name: "Limitation",
    chinese: "Jié",
    upper_trigram: "Water",
    lower_trigram: "Lake",
    judgment:
      "Limitation describes the value of appropriate boundaries - too few, and structure collapses; too many, and movement becomes impossible. Finding the right measure brings success.",
    image:
      "Water rests above Lake: a body of water contained within defined banks. A person of character establishes standards of conduct and examines their own virtue, recognizing that healthy limits create order rather than restriction.",
    interpretation:
      "Setting appropriate limits - on time, resources, commitments, or behavior - supports rather than restricts your goals right now. The challenge is finding the right measure: enough structure to function, without becoming rigid.",
  },
  "011110": {
    number: 61,
    binary: "011110",
    unicode: "䷼",
    name: "Inner Truth",
    chinese: "Zhōng Fú",
    upper_trigram: "Wind",
    lower_trigram: "Lake",
    judgment:
      "Inner Truth describes sincerity that resonates beyond its immediate source, like a calf responding to its mother's call. Genuine inner conviction, rather than outward display, brings the most lasting success.",
    image:
      "Wind moves above Lake: an influence that moves gently over a receptive surface, in tune with what lies beneath. A person of character examines legal cases and disputes with care and compassion, seeking to understand the truth behind appearances.",
    interpretation:
      "Genuine sincerity - in your intentions, communications, or commitments - has more impact now than impressive presentation. Trust that being truthful and consistent, even quietly, will resonate where it matters.",
  },
  "100001": {
    number: 62,
    binary: "100001",
    unicode: "䷽",
    name: "Small Preponderance",
    chinese: "Xiǎo Guò",
    upper_trigram: "Thunder",
    lower_trigram: "Mountain",
    judgment:
      "Small Preponderance describes a situation calling for caution and attention to detail rather than grand gestures. Modest, careful action suited to the moment brings success; overreaching does not.",
    image:
      "Thunder moves above Mountain: movement constrained by a solid presence beneath it, producing effects that are real but limited in scope. A person of character, in such times, attends to small matters with appropriate care, neither neglecting them nor overreacting.",
    interpretation:
      "This is not the time for dramatic moves - small, careful, well-considered actions suit the situation better. Attend to details and modest tasks; larger ambitions are better set aside for a more favorable moment.",
  },
  "010101": {
    number: 63,
    binary: "010101",
    unicode: "䷾",
    name: "After Completion",
    chinese: "Jì Jì",
    upper_trigram: "Water",
    lower_trigram: "Fire",
    judgment:
      "After Completion describes a point where a goal has been substantially achieved - yet success at this stage can shift if attention lapses. Continued care, even after apparent completion, sustains the gains made.",
    image:
      "Water rests above Fire: a balance achieved between elements that could otherwise extinguish or overwhelm each other. A person of character considers potential difficulties in advance, preparing for them even during a time of apparent stability.",
    interpretation:
      "Something has reached a point of completion or stability - but this is not the moment to become careless. Continue to pay attention to details and emerging issues, so that what has been achieved is not undone by neglect.",
  },
  "101010": {
    number: 64,
    binary: "101010",
    unicode: "䷿",
    name: "Before Completion",
    chinese: "Wèi Jì",
    upper_trigram: "Fire",
    lower_trigram: "Water",
    judgment:
      "Before Completion describes a situation that is close to resolution but not yet finished - like a crossing that has been almost, but not entirely, made. Careful attention at this final stage brings eventual success.",
    image:
      "Fire rests above Water: elements not yet in their settled, natural positions, still in the process of finding balance. A person of character is careful in distinguishing between things, ensuring that each finds its proper place before considering the matter finished.",
    interpretation:
      "You're close to a resolution or goal, but not quite there yet - this is not the time to relax prematurely. Careful attention through this final stretch, without assuming the outcome is already secured, brings things to a successful close.",
  },
};

/**
 * Lookup table for retrieving hexagram data by King Wen number (1-64).
 */
export const hexagramsByNumber: Record<number, HexagramData> = Object.fromEntries(
  Object.values(hexagrams).map((h) => [h.number, h])
);
