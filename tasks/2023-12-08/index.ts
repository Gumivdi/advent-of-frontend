export interface Letter {
  content: string;
  country: "pl" | "de" | "us";
  priority: "high" | "medium" | "low";
}

export interface ISortingStrategy {
  sortLetters(letters: Letter[]): Letter[];
}

export type TLetterCountry = Letter["country"];
export type TLetterPriority = Letter["priority"];

export class LetterSorter {
  constructor(private strategy: ISortingStrategy) {}

  sortLetters(letters: Letter[]): Letter[] {
    return this.strategy.sortLetters(letters);
  }
}

export class PriorityStrategy implements ISortingStrategy {
  sortLetters(letters: Letter[]) {
    const priorities: TLetterPriority[] = ["high", "medium", "low"];
    return letters.sort(
      (a, b) => priorities.indexOf(a.priority) - priorities.indexOf(b.priority)
    );
  }
}

export class LengthStrategy implements ISortingStrategy {
  sortLetters(letters: Letter[]) {
    return letters.sort((a, b) => a.content.length - b.content.length);
  }
}

export class CountryStrategy implements ISortingStrategy {
  sortLetters(letters: Letter[]) {
    const priority: TLetterCountry = "pl";

    return letters.sort((a, b) => {
      const firstHasPriority = a.country === priority && b.country !== priority;
      const secondHasPriority =
        a.country !== priority && b.country === priority;

      if (firstHasPriority) {
        return -1;
      } else if (secondHasPriority) {
        return 1;
      } else {
        return a.country.localeCompare(b.country);
      }
    });
  }
}
