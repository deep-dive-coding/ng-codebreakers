export interface Code {
	id: string | null,
	created: string | null,
	pool: string,
	length: number,
	guessCount: number | null,
	solved: boolean | null,
	text: string | null,
}