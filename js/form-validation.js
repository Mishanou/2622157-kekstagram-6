const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const validateHashtagFormat = (value) => {
  const hashtags = value.trim().split(/\s+/).filter((tag) => tag !== '');
  return !hashtags.length || hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag));
};

const validateHashtagUniqueness = (value) => {
  const hashtags = value.trim().split(/\s+/).filter((tag) => tag !== '');
  return !hashtags.length || new Set(hashtags.map((tag) => tag.toLowerCase())).size === hashtags.length;
};

const validateHashtagCount = (value) => {
  const hashtags = value.trim().split(/\s+/).filter((tag) => tag !== '');
  return !hashtags.length || hashtags.length <= MAX_HASHTAGS;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

export { validateHashtagFormat, validateHashtagUniqueness, validateHashtagCount, validateComment, MAX_COMMENT_LENGTH, MAX_HASHTAGS };
