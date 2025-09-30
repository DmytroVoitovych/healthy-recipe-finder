export const getFirstSentence = (summary:string) => {
  const sentencePattern = /[^\s].*?[.!?。！？؟](?=\s+[\p{Lu}\p{Lt}]|\s*$)/gu;  
  const sentences = summary.match(sentencePattern);
  return sentences ? sentences[0] : summary.substring(0, 100) + '...';
};