export interface Guess {
	id: string | null,
	created: string | null,
	text: string,
	exactMatches: Number | null,
	nearMatches: Number | null,
}

